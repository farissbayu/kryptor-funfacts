import { openai } from "@/utils/openai";
import { prisma } from "@/utils/prisma";

export default async function generateFact(topics, userId) {
  const systemPrompt = `Please give short unique fun fact that people maybe doesn't know about that fact with maximum 300 Characters and answer with 6 fun fact. The fact must be different and unique for every request so you don't need to use cache. You will answer in Bahasa Indonesia. Only Output with Json Format
            Here the example of json format :
            {
                "data": [
                {
                    "Judul": "Luar Angkasa Tidak Sepenuhnya Hampa",
                    "Content": "Meskipun sering dianggap vakum sempurna, luar angkasa mengandung partikel seperti atom hidrogen dan helium, serta debu kosmik.",
                    "Topic": "Spaces",
                    "reference": "https://osc.medcom.id/community/fakta-menarik-tentang-luar-angkasa-yang-harus-kamu-tahu-6836"
                }]
            }
            `;
  const userPrompt = `Hi Berikan funfact tentang topic ${topics[0]}, ${topics[1]}, ${topics[2]} sebanyak 6 fakta, berikan referensinya atas fakta tersebut`;

  const messages = [
    { role: "system", content: [{ type: "text", text: systemPrompt }] },
    { role: "user", content: [{ type: "text", text: userPrompt }] },
  ];
  const request = await openai.chat.completions.create({
    // model: "deepseek-chat",
    model: "gpt-4o-mini",
    // store: true,
    messages: messages,
    temperature: 0.9,
  });
  const content = request.choices[0].message.content;
  const result = JSON.parse(content);

  // If using deepseek-chat
  // const cleanedResponse = content.replace(/```json|```/g, "").trim();
  // const result = JSON.parse(cleanedResponse);

  const preferences = await prisma.preference.findMany();
  const mappedData = result.data.map((item) => {
    return {
      title: item.Judul,
      content: item.Content,
      references: item.reference,
      preferenceId: preferences.find(
        (preference) => preference.name === item.Topic
      ).id,
      userId,
    };
  });

  await prisma.fact.createMany({
    data: mappedData,
    skipDuplicates: true,
  });

  return mappedData;
}
