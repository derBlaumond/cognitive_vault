import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const llmModel = "gpt-3.5-turbo";
export default openai;