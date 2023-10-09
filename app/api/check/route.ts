import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const response = await fetch('https://fourdle-api.vercel.app/validate/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word: body.word }),
  })

  const data: string[] = await response.json()
  const result = data.map((color, i) => ({ color, letter: body.word[i] }))

  return NextResponse.json(result)
}
