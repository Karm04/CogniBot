import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI('AIzaSyClpPDs6L80Qizi3GRG_0VpFTa_RSERXw8');

async function run(){
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt=
         "Write a sonnet about a programmers life, but also make it rhyme.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();