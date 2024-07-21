const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const chatSession = model.startChat({
  generationConfig,
});

export async function generateResponse(inputPrompt) {
  try {
    const result = await chatSession.sendMessage(inputPrompt);
    return generateJsonResponse(result); // Return the result of sendMessage
  } catch (error) {
    throw new Error(`Error in generateResponse: ${error.message}`);
  }
}

function generateJsonResponse(result) {
   return result.response.text().replace("```json", "").replace("```", "");
   
}



