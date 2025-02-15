import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY!,
});

// TODO authorize request
export async function POST() {
  const tempToken = await client.realtime.createTemporaryToken({
    expires_in: 3600, // 1 hr
  });
  return NextResponse.json({ token: tempToken });
}
