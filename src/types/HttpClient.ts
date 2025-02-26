import type { FetchOptions } from 'ofetch'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/**
 * HTTPクライアントのオプション
 * すべてのHTTPメソッドで共通して使用できる基本オプション
 */
export interface HttpClientOptions<T = unknown> extends Omit<FetchOptions, 'body' | 'method'> {
  /**
   * クエリパラメータ
   */
  query?: Record<string, string | number | boolean | null | undefined>

  /**
   * リクエストボディ
   */
  body?: T
}

/**
 * HTTPクライアントのレスポンス
 */
export interface HttpClientResponse<T> {
  /**
   * レスポンスデータ
   */
  data: T

  /**
   * ステータスコード
   */
  status: number

  /**
   * ステータステキスト
   */
  statusText: string

  /**
   * レスポンスヘッダー
   */
  headers: Record<string, string>
}
