import OpenAI from "openai";

export const openai = new OpenAI({
  // baseURL: "https://api.deepseek.com",
  apiKey: process.env.GPT_API_KEY,
});
