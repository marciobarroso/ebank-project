import { NextRequest } from 'next/server'

export function createRequest(
  method: string,
  url: string,
  body?: any
): NextRequest {
  const req = new NextRequest(new URL(url, 'http://localhost:3000'), {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return req
}

export function createParams(params: Record<string, string>) {
  return { params }
}
