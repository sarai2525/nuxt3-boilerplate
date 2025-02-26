import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Container } from 'inversify'
import { HttpClientImpl } from './HttpClientImpl'
import type { HttpClient } from './HttpClient'
import { TYPES } from '../config/inversify'
import { $fetch } from 'ofetch'

// $fetchのモック
vi.mock('ofetch', () => ({
  $fetch: vi.fn(),
}))

describe('HttpClientImpl', () => {
  let container: Container
  let httpClient: HttpClient
  const mockFetch = $fetch as unknown as ReturnType<typeof vi.fn>

  beforeEach(() => {
    // モックをリセット
    vi.clearAllMocks()

    // DIコンテナの設定
    container = new Container()
    container.bind<HttpClient>(TYPES.HttpClient).to(HttpClientImpl)

    // HttpClientのインスタンスを取得
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
      const result = await httpClient.post<typeof mockResponse>('/api/test', postData)

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
      const result = await httpClient.post<typeof mockResponse>('/api/test', postData, options)

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
      const result = await httpClient.put<typeof mockResponse>('/api/test/1', putData)

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
    it('APIエラー時に適切なエラーメッセージをスローすること', async () => {
      // エラーをモック
      const errorMessage = 'Network Error'
      mockFetch.mockRejectedValueOnce(new Error(errorMessage))

      // テスト対象のメソッドを実行し、エラーをキャッチ
      await expect(httpClient.get('/api/test')).rejects.toThrow(`Failed to fetch API: /api/test - ${errorMessage}`)
    })

    it('不明なエラー時にデフォルトのエラーメッセージをスローすること', async () => {
      // 文字列エラーをモック
      mockFetch.mockRejectedValueOnce('Unknown error')

      // テスト対象のメソッドを実行し、エラーをキャッチ
      await expect(httpClient.get('/api/test')).rejects.toThrow('Failed to fetch API: /api/test')
    })
  })
})
