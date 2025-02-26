import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { HttpClient } from './HttpClient'
import { $fetch } from 'ofetch'
import { container } from '../config/inversify.config'
import { TYPES } from '../config/inversify'
import { HttpClientError } from '~/server/error/HttpClientError'

// $fetchのモック
vi.mock('ofetch', () => ({
  $fetch: vi.fn(),
}))

describe('HttpClientImpl', () => {
  let httpClient: HttpClient
  const mockFetch = $fetch as unknown as ReturnType<typeof vi.fn>

  beforeEach(() => {
    // モックをリセット
    vi.clearAllMocks()

    // 既存のコンテナからHttpClientのインスタンスを取得
    httpClient = container.get<HttpClient>(TYPES.HttpClient)
  })

  describe('get', () => {
    it('正常にGETリクエストを実行できること', async () => {
      // モックの戻り値を設定
      const mockResponse = { name: 'test-data' }
      mockFetch.mockResolvedValueOnce(mockResponse)

      // テスト対象のメソッドを実行
      const result = await httpClient.get<typeof mockResponse>('/api/test')

      // 検証
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          method: 'GET',
          responseType: 'json',
        }),
      )
      expect(result).toEqual({
        data: mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
      })
    })

    it('クエリパラメータ付きのGETリクエストを実行できること', async () => {
      // モックの戻り値を設定
      const mockResponse = { name: 'test-data' }
      mockFetch.mockResolvedValueOnce(mockResponse)

      // テスト対象のメソッドを実行
      const result = await httpClient.get<typeof mockResponse>('/api/test', {
        query: { id: 123, filter: 'active' },
      })

      // 検証
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          method: 'GET',
          query: { id: 123, filter: 'active' },
          responseType: 'json',
        }),
      )
      expect(result.data).toEqual(mockResponse)
    })
  })

  describe('post', () => {
    it('正常にPOSTリクエストを実行できること', async () => {
      // モックの戻り値を設定
      const mockResponse = { id: 1, success: true }
      mockFetch.mockResolvedValueOnce(mockResponse)

      // リクエストデータ
      const postData = { name: 'test', value: 42 }

      // テスト対象のメソッドを実行
      const result = await httpClient.post<typeof mockResponse, typeof postData>('/api/test', postData)

      // 検証
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          method: 'POST',
          body: postData,
          responseType: 'json',
        }),
      )
      expect(result.data).toEqual(mockResponse)
    })

    it('オプション付きのPOSTリクエストを実行できること', async () => {
      // モックの戻り値を設定
      const mockResponse = { id: 1, success: true }
      mockFetch.mockResolvedValueOnce(mockResponse)

      // リクエストデータとオプション
      const postData = { name: 'test', value: 42 }
      const options = {
        headers: { 'X-Custom-Header': 'test-value' },
      }

      // テスト対象のメソッドを実行
      const result = await httpClient.post<typeof mockResponse, typeof postData>('/api/test', postData, options)

      // 検証
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          method: 'POST',
          body: postData,
          headers: options.headers,
          responseType: 'json',
        }),
      )
      expect(result.data).toEqual(mockResponse)
    })
  })

  describe('put', () => {
    it('正常にPUTリクエストを実行できること', async () => {
      // モックの戻り値を設定
      const mockResponse = { id: 1, updated: true }
      mockFetch.mockResolvedValueOnce(mockResponse)

      // リクエストデータ
      const putData = { id: 1, name: 'updated-test' }

      // テスト対象のメソッドを実行
      const result = await httpClient.put<typeof mockResponse, typeof putData>('/api/test/1', putData)

      // 検証
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test/1',
        expect.objectContaining({
          method: 'PUT',
          body: putData,
          responseType: 'json',
        }),
      )
      expect(result.data).toEqual(mockResponse)
    })
  })

  describe('delete', () => {
    it('正常にDELETEリクエストを実行できること', async () => {
      // モックの戻り値を設定
      const mockResponse = { success: true }
      mockFetch.mockResolvedValueOnce(mockResponse)

      // テスト対象のメソッドを実行
      const result = await httpClient.delete<typeof mockResponse>('/api/test/1')

      // 検証
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test/1',
        expect.objectContaining({
          method: 'DELETE',
          responseType: 'json',
        }),
      )
      expect(result.data).toEqual(mockResponse)
    })
  })

  describe('エラーハンドリング', () => {
    it('APIエラー時にHttpClientErrorをスローすること', async () => {
      // エラーをモック
      const originalError = new Error('Network Error')
      mockFetch.mockRejectedValueOnce(originalError)

      // テスト対象のメソッドを実行し、エラーをキャッチ
      try {
        await httpClient.get('/api/test')
        // エラーが発生しなかった場合はテスト失敗
        expect.fail('エラーが発生しませんでした')
      } catch (error: unknown) {
        // エラーを適切な型にキャスト
        const err = error as HttpClientError

        // エラーメッセージを検証
        expect(err).toBeInstanceOf(HttpClientError)
        expect(err.message).toBe('Failed to fetch API: /api/test')
        // originalErrorプロパティを検証
        expect(err.originalError).toBe(originalError)
      }
    })

    it('不明なエラー時にもHttpClientErrorをスローすること', async () => {
      // 文字列エラーをモック
      const originalError = 'Unknown error'
      mockFetch.mockRejectedValueOnce(originalError)

      // テスト対象のメソッドを実行し、エラーをキャッチ
      try {
        await httpClient.get('/api/test')
        // エラーが発生しなかった場合はテスト失敗
        expect.fail('エラーが発生しませんでした')
      } catch (error: unknown) {
        // エラーを適切な型にキャスト
        const err = error as HttpClientError

        // エラーメッセージを検証
        expect(err).toBeInstanceOf(HttpClientError)
        expect(err.message).toBe('Failed to fetch API: /api/test')
        // originalErrorプロパティを検証
        expect(err.originalError).toBe(originalError)
      }
    })
  })
})
