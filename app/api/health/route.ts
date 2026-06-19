import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'ai-archives',
    timestamp: new Date().toISOString(),
  });
}
