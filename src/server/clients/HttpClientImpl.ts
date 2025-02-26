import { injectable } from 'inversify'
import type { HttpClient } from './HttpClient'
import type { HttpClientOptions, HttpClientResponse, HttpMethod } from '@/types/HttpClient'
import { $fetch, type FetchOptions } from 'ofetch'

@injectable()
export class HttpClientImpl implements HttpClient {
  /**
   * GETリクエストを実行します
   * @param url リクエスト先URL
   * @param options リクエストオプション（主にqueryを使用）
   */
  async get<T>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<T>> {
    return this.fetch<T>(url, 'GET', undefined, options)
  }

  /**
   * POSTリクエストを実行します
   * @param url リクエスト先URL
   * @param data リクエストボディ
   * @param options その他のリクエストオプション
   */
  async post<T, D = unknown>(url: string, data?: D, options?: HttpClientOptions): Promise<HttpClientResponse<T>> {
    return this.fetch<T>(url, 'POST', data, options)
  }

  /**
   * PUTリクエストを実行します
   * @param url リクエスト先URL
   * @param data リクエストボディ
   * @param options その他のリクエストオプション
   */
  async put<T, D = unknown>(url: string, data?: D, options?: HttpClientOptions): Promise<HttpClientResponse<T>> {
    return this.fetch<T>(url, 'PUT', data, options)
  }

  /**
   * DELETEリクエストを実行します
   * @param url リクエスト先URL
   * @param options リクエストオプション
   */
  async delete<T>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<T>> {
    return this.fetch<T>(url, 'DELETE', undefined, options)
  }

  /**
   * 汎用的なHTTPリクエストを実行します
   * @param url リクエスト先URL
   * @param method HTTPメソッド
   * @param data リクエストボディ（POST/PUTで使用）
   * @param options その他のリクエストオプション
   */
  private async fetch<T, D = unknown>(
    url: string,
    method: HttpMethod,
    data?: D,
    options?: HttpClientOptions,
  ): Promise<HttpClientResponse<T>> {
    try {
      // $fetchに渡すオプションを構築
      const fetchOptions: FetchOptions<'json'> = {
        method,
        query: options?.query,
        body: data as Record<string, unknown> | string | Blob | ArrayBuffer | null | undefined,
        headers: options?.headers,
        responseType: 'json',
      }

      // リクエスト実行
      const response = await $fetch<T>(url, fetchOptions)

      // レスポンスの構築
      return {
        data: response,
        status: 200,
        statusText: 'OK',
        headers: {},
      }
    } catch (error) {
      throw new Error(`Failed to fetch API: ${url}`, { cause: error })
    }
  }
}
