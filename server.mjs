import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());

const genAI = new GoogleGenerativeAI('AIzaSyClpPDs6L80Qizi3GRG_0VpFTa_RSERXw8');

const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const chat = model.startChat({
    history: [],
    generationConfig: {
        maxOutputTokens: 500,
    },
});

app.post("/sendMessage", async (req, res) => {
    const message = req.body.message.trim();
    if (message !== "") {
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = await response.text();
        res.json({ message: text });
    }
});

// Added to handle the root URL
app.get("/", (req, res) => {
    res.sendFile(require('path').join(__dirname + "/chat.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
