import type HttpServer from '../http/HttpServer'
import type HttpClient from '../http/HttpClient'
import type HttpHeaders from '../../domain/entity/HttpHeaders'
import RequestInput from '../../domain/entity/RequestInput'
import GatewayError from '../../domain/errors/GatewayError'
import { type HttpServerCallbackDTO } from '../../domain/types/HttpServerCallbackDTO'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const defaultError = {
  message: 'Internal Server Error',
  status: 500
}
const configurationsBffPath = String(process.env.CONFIGURATIONS_BFF_BASE_URL)

export default class RestController {
  public readonly ok = true

  constructor (
    readonly httpServer: HttpServer,
    readonly workspacesApi: HttpClient
  ) {
    console.log(configurationsBffPath)

    httpServer.on('get', `${configurationsBffPath}/api-integration/list`, async (
      _params: object,
      _body: object,
      headers: HttpHeaders,
      query: { featureId: number }
    ): Promise<HttpServerCallbackDTO> => {
      try {
        if (query?.featureId === null) {
          return {
            status: 400,
            body: {
              message: 'Campo "featureId" não informado.'
            }
          }
        }

        const { properties } = await workspacesApi.get(`/feature/${query.featureId}/properties`, new RequestInput({}, {}, headers)) as {
          featureId: number
          properties: object[]
          workspaceId: number
        }

        return {
          status: 200,
          body: properties
        }
      } catch (error) { throw new GatewayError(error ?? defaultError) }
    })

    httpServer.on('get', `${configurationsBffPath}/healthcheck`, async () => ({ status: 200, body: {} }))
  }
}
