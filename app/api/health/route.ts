import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    version: '8.0.0',
    name: 'RYVYNN NEXXT GEN',
    timestamp: new Date().toISOString(),
    message: 'From Our Darkest Hours to Our Brightest Days',
  });
}
