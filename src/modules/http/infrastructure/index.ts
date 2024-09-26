const BASE_URL = 'https://draliatest.azurewebsites.net/api'

export async function api<T>(path: string, method: 'get' | 'post', body?: any): Promise<T> {
  const response = await fetch(`${BASE_URL}/${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json() as T
}

export async function get<T>(path: string): Promise<T> {
  return api(path, 'get')
}


export async function post<T>(path: string, body: any): Promise<T> {
  return api(path, 'post', body)
}


export default {
  get,
  post
}