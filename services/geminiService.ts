
import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: `You are 'CricBot', an expert AI assistant passionate about cricket. Your knowledge is vast, covering everything from historical matches, player statistics, rules, current events, and team strategies.
- Engage users in a friendly, enthusiastic, and conversational manner. 
- Format your answers clearly using markdown for lists, bold text, and italics to improve readability.
- Never break character. Always stay on the topic of cricket. 
- If asked about something else, politely steer the conversation back to cricket by saying something like, "That's an interesting topic, but my expertise is in the world of cricket! Do you have a cricket question I can help with?"`,
  },
});


export const sendMessageToGeminiStream = async (message: string) => {
  try {
    const result = await chat.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw new Error("Failed to get a response from the CricBot. Please try again.");
  }
};
