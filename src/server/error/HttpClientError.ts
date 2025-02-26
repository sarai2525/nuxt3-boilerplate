/**
 * HTTPクライアントのエラークラス
 * 元のエラーをcauseとして保持します
 */
export class HttpClientError extends Error {
  /**
   * コンストラクタ
   * @param message エラーメッセージ
   * @param options エラーオプション（cause: 元のエラー）
   */
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options)
    this.name = 'HttpClientError'
  }

  /**
   * 元のエラー
   */
  get originalError(): unknown {
    return this.cause
  }
}
