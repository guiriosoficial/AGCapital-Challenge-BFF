import type RequestInput from '../../domain/entity/RequestInput'

interface HttpClient {
  get: (url: string, input: RequestInput) => Promise<object>

  post: (url: string, input: RequestInput) => Promise<object>

  patch: (url: string, input: RequestInput) => Promise<object>

  put: (url: string, input: RequestInput) => Promise<object>

  delete: (url: string, input: RequestInput) => Promise<object>
}

export default HttpClient
