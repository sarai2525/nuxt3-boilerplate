import type { FetchOptions, FetchResponse } from 'ofetch'

export type HttpMethod = 'POST' | 'GET' | 'PUT'

export interface HttpRequestOptions extends Pick<FetchOptions, 'method' | 'body' | 'params' | 'query'> {
  method?: HttpMethod
  params?: Record<string, string>
  body?: Record<string, unknown>
  query?: Record<string, string>
}

export interface HttpClient {
  post<T>(path: string, options?: HttpRequestOptions): Promise<FetchResponse<T>>
  get<T>(path: string, options?: HttpRequestOptions): Promise<FetchResponse<T>>
  put<T>(path: string, options?: HttpRequestOptions): Promise<FetchResponse<T>>
}
