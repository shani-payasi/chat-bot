const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateResponse(chatHistory) {

    // History ko ek single prompt me convert kar rahe hain
    const conversation = chatHistory
        .map((chat) => {
            return `${chat.role}: ${chat.message}`;
        })
        .join('\n');

    const response = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: conversation
    });

    return response.output_text;
}

module.exports = {
    generateResponse
};