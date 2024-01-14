import { NextRequest } from 'next/server';

export async function GET(_request: NextRequest) {
  return Response.json('Hello World!');
}
