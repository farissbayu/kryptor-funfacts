import { openai } from "@/utils/openai";
import { prisma } from "@/utils/prisma";

export default async function FetchFact(topics, userId) {
  console.log(topics);
  const systemPrompt = `Please give short unique fun fact that people maybe doesnt know about that fact with maximum 300 Characters and answer with maximum 15 fun fact.  the fact must be different for every request dont use cache, You will answer in Bahasa Indonesia.
            Only Output with Json Format
            Here the example of json format :
            {
                "data": [
                {
                    "Judul": "Luar Angkasa Tidak Sepenuhnya Hampa",
                    "Content": "Meskipun sering dianggap vakum sempurna, luar angkasa mengandung partikel seperti atom hidrogen dan helium, serta debu kosmik.",
                    "Topic": "Luar Angkasa",
                    "reference": "https://osc.medcom.id/community/fakta-menarik-tentang-luar-angkasa-yang-harus-kamu-tahu-6836"
                }]
            }
            `;
  const userPrompt = `Hi Berikan funfact tentang topic ${topics[0].name}, ${topics[1].name} , ${topics[2].name} sebanyak 15 fakta, berikan referensinya atas fakta tersebut`;
  const messages = [
    { role: "system", content: [{ type: "text", text: systemPrompt }] },
    { role: "user", content: [{ type: "text", text: userPrompt }] },
  ];
  const request = await openai.chat.completions.create({
    model: "deepseek-chat",
    // model: "gpt-4o-mini",
    store: true,
    messages: messages,
  });
  const content = request.choices[0].message.content;
  const cleanedResponse = content.replace(/```json|```/g, "").trim();
  const result = JSON.parse(cleanedResponse);
  const mappingData = result.data.map((item) => {
    return {
      title: item.Judul,
      content: item.Content,
      references: item.reference,
      createdAt: new Date(),
      preferenceId: item.Topic,
    };
  });
  console.log("Data From AI: ", result);

  console.log("Mapping Data: ", mappingData);

  const extract = mappingData.map((item) => ({
    title: item.title,
    content: item.content,
    references: item.references,
    createdAt: item.createdAt,
    preferenceId: item.preferenceId,
    userId: userId,
  }));
  console.log("Extract data", extract);

  await prisma.fact.createMany({
    data: extract,
    skipDuplicates: true,
  });

  return {
    status: "Generated!",
  };
}
