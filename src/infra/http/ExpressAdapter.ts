import express, { type Response, type Request } from 'express'
import type HttpServer from './HttpServer'
import cors from 'cors'
import { inspect } from 'util'
import { type HttpServerCallbackDTO } from '../../domain/types/HttpServerCallbackDTO'

class ExpressAdapter implements HttpServer {
  app: any

  constructor (private readonly baseUrl: string) {
    this.app = express()
    this.app.use(cors())
    this.app.use(express.json())
  }

  on (method: string, url: string, callback: (params: any, body: any, headers: any, query: any) => Promise<HttpServerCallbackDTO>): void {
    this.app[method](`${this.baseUrl}${url}`, async function (req: Request, res: Response) {
      console.table({ method, url })
      console.info({
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers
      })

      let status, body

      try {
        ({ status, body } = await callback(req.params, req.body, req.headers, req.query))
      } catch (error: any) {
        console.error('Request error:', inspect(error))

        status = Number(error.status ?? error.code ?? 500)
        body = { message: error?.message ?? 'Internal Server Error' }
      }

      res.status(status).json(body)
    })
  }

  listen (port: number): any {
    return this.app.listen(port)
  }
}

export default ExpressAdapter
