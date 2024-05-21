import { type HttpServerCallbackDTO } from '../../domain/types/HttpServerCallbackDTO'

interface HttpServer {
  on: (
    method: string,
    url: string,
    callback: (
      params: any,
      body: any,
      headers: any,
      query: any
    ) => Promise<HttpServerCallbackDTO>
  ) => void

  listen: (port: number) => any
}

export default HttpServer
