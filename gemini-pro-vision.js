import dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyClpPDs6L80Qizi3GRG_0VpFTa_RSERXw8');

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType,
        },
    };
}

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = "What is the difference";

    const imageParts = [
        fileToGenerativePart("paper.JPEG", "image/JPEG"),
        fileToGenerativePart("page-pen.JPEG", "image/JPEG")
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();
