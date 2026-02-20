import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  //TODO TASK 1
  // const systemPrompt = `You are a helpful assistant.`;

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: "An AI-powered chatbot designed to assist students with college placement activities. It provides information about upcoming companies, eligibility criteria, interview preparation tips, resume guidance, aptitude practice, and placement statistics. The chatbot acts as a 24/7 virtual placement officer to improve student readiness and awareness.",
    //system: "you are helpful"
    messages: await convertToModelMessages(messages),

    //TODO TASK 2 - Tool Calling
    // tools,            // Uncomment to enable tool calling
    // maxSteps: 5,      // Allow multi-step tool use (model calls tool → gets result → responds)
  });

  return result.toUIMessageStreamResponse();
}
