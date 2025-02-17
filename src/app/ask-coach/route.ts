import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// TODO authorize request
export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const response = await openai.chat.completions.create({
    model: "o3-mini",
    messages: [
      {
        role: "user",
        content: `please be concise in your response towards the following request: ${text}`,
      },
    ],
  });
  return NextResponse.json({
    message: response.choices[0].message.content,
  });
}
