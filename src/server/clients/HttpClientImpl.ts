import { injectable } from 'inversify'
import { ofetch, type FetchResponse } from 'ofetch'
import type { HttpClient, HttpRequestOptions } from './HttpClient'
import 'reflect-metadata'

@injectable()
export class HttpClientImpl implements HttpClient {
  async post<T>(path: string, options?: HttpRequestOptions): Promise<FetchResponse<T>> {
    return await this.fetch<T>(path, { ...options, method: 'POST' })
  }

  async get<T>(path: string, options?: HttpRequestOptions): Promise<FetchResponse<T>> {
    return await this.fetch<T>(path, { ...options, method: 'GET' })
  }

  async put<T>(path: string, options?: HttpRequestOptions): Promise<FetchResponse<T>> {
    return await this.fetch<T>(path, { ...options, method: 'PUT' })
  }

  private async fetch<T>(path: string, options?: HttpRequestOptions): Promise<FetchResponse<T>> {
    const config = useRuntimeConfig()
    const apiFetch = ofetch.create({
      baseURL: config.crBeApiUrl,
      parseResponse: JSON.parse,
      retry: 3,
    })
    const { method, body, params, query } = options ?? {}
    try {
      return await apiFetch.raw<T>(path, {
        method,
        body,
        params,
        query,
      })
    } catch (error: unknown) {
      throw new Error(`Failed to fetch creative insight API`, { cause: error })
    }
  }
}
