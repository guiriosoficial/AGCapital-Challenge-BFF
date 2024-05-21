import type HttpServer from '../http/HttpServer'
import type ClientsUseCases from '../../useCases/ClientsUseCases'
import type { HttpServerCallbackDTO } from '../../domain/types/HttpServerCallbackDTO'
import GatewayError from '../../domain/errors/GatewayError'

const clientsPath = '/clients'
const defaultError = {
  message: 'Internal Server Error',
  status: 500
}

class ClientsController {
  public readonly ok = true

  constructor (
    readonly httpServer: HttpServer,
    readonly clientsUseCase: ClientsUseCases
  ) {
    httpServer.on('put', `${clientsPath}`, async (
      _params: object,
      body: object,
      _headers: object,
      _query: object
    ): Promise<HttpServerCallbackDTO> => {
      try {
        const result = await this.clientsUseCase.createClient(body)
        return {
          status: 201,
          body: result
        }
      } catch (error) {
        throw new GatewayError(error as GatewayError ?? defaultError)
      }
    })

    httpServer.on('post', `${clientsPath}/:clientId`, async (
      params: { clientId: string },
      body: object,
      _headers: object,
      _query: object
    ): Promise<HttpServerCallbackDTO> => {
      try {
        const result = await this.clientsUseCase.updateClient(params.clientId, body)
        return {
          status: 200,
          body: result
        }
      } catch (error) {
        throw new GatewayError(error as GatewayError ?? defaultError)
      }
    })

    httpServer.on('delete', `${clientsPath}/:clientId`, async (
      params: { clientId: string },
      _body: object,
      _headers: object,
      _query: object
    ): Promise<HttpServerCallbackDTO> => {
      try {
        await this.clientsUseCase.deleteClient(params.clientId)
        return {
          status: 204,
          body: params
        }
      } catch (error) {
        throw new GatewayError(error as GatewayError ?? defaultError)
      }
    })
  }
}

export default ClientsController
