import { getVisitorId } from './track'

export async function get(
  url: string,
  config?: { params: Record<string, string> | undefined }
) {
  if (!url.startsWith('http')) {
    url = `${process.env.NEXT_PUBLIC_SERVER_API}` + url
  }
  const u: URL = new URL(url)
  if (config) {
    u.search = new URLSearchParams(config.params).toString()
  }
  const visitor_id = await getVisitorId()
  return fetch(u.href, {
    headers: {
      visitorId: visitor_id,
    },
  }).then((response) => response.json())
}

export async function post(url: string, config?: { body: object | undefined }) {
  const visitor_id = await getVisitorId()
  if (!url.startsWith('http')) {
    url = `${process.env.NEXT_PUBLIC_SERVER_API}` + url
  }
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      visitorId: visitor_id,
    },
    body: config ? JSON.stringify(config.body) : ({} as any),
  }).then((response) => response.json())
}
