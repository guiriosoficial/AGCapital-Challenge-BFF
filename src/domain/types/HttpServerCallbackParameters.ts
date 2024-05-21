import type HttpHeaders from '../entity/HttpHeaders'

interface HttpServerCallbackParameters {
  params: object
  body: object
  headers: HttpHeaders
  query: object
}

export type { HttpServerCallbackParameters }
