import type { HttpClientOptions, HttpClientResponse } from '@/types/HttpClient'

/**
 * HTTPクライアントインターフェース
 */
export interface HttpClient {
  /**
   * GETリクエストを実行します
   * @param url リクエスト先URL
   * @param options リクエストオプション（主にqueryを使用）
   */
  get<T>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<T>>

  /**
   * POSTリクエストを実行します
   * @param url リクエスト先URL
   * @param data リクエストボディ
   * @param options その他のリクエストオプション
   */
  post<T>(url: string, data?: unknown, options?: HttpClientOptions): Promise<HttpClientResponse<T>>

  /**
   * PUTリクエストを実行します
   * @param url リクエスト先URL
   * @param data リクエストボディ
   * @param options その他のリクエストオプション
   */
  put<T>(url: string, data?: unknown, options?: HttpClientOptions): Promise<HttpClientResponse<T>>

  /**
   * DELETEリクエストを実行します
   * @param url リクエスト先URL
   * @param options リクエストオプション
   */
  delete<T>(url: string, options?: HttpClientOptions): Promise<HttpClientResponse<T>>
}

export const HTTP_CLIENT_TOKEN = Symbol.for('HttpClient')
