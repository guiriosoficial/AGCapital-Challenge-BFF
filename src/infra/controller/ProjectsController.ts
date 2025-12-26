import type HttpServer from '../http/HttpServer'
import type ProjectsUseCases from '../../useCases/ProjectsUseCases'
import type { HttpServerCallbackDTO } from '../../domain/types/HttpServerCallbackDTO'
import GatewayError from '../../domain/errors/GatewayError'

const projectsPath = '/projects'
const defaultError = {
  message: 'Internal Server Error',
  status: 500
}

class ProjectsController {
  public readonly ok = true

  constructor (
    readonly httpServer: HttpServer,
    readonly projectsUseCases: ProjectsUseCases
  ) {
    httpServer.on('get', `${projectsPath}`, async (
      _params: object,
      _body: object,
      _headers: object,
      query: { status: string, searchTerm?: string }
    ): Promise<HttpServerCallbackDTO> => {
      try {
        const result = await this.projectsUseCases.searchProjects(query.status, query.searchTerm)
        return {
          status: 200,
          body: result
        }
      } catch (error) {
        throw new GatewayError(error as GatewayError ?? defaultError)
      }
    })

    httpServer.on('put', `${projectsPath}/:clientId`, async (
      params: { clientId: string },
      body: object,
      _headers: object,
      _query: object
    ): Promise<HttpServerCallbackDTO> => {
      try {
        const result = await this.projectsUseCases.createProject(params.clientId, body)
        return {
          status: 201,
          body: result
        }
      } catch (error) {
        throw new GatewayError(error as GatewayError ?? defaultError)
      }
    })

    httpServer.on('patch', `${projectsPath}/:projectId`, async (
      params: { projectId: string },
      body: object,
      _headers: object,
      _query: object
    ): Promise<HttpServerCallbackDTO> => {
      try {
        const result = await this.projectsUseCases.editProject(params.projectId, body)
        return {
          status: 200,
          body: result
        }
      } catch (error) {
        throw new GatewayError(error as GatewayError ?? defaultError)
      }
    })

    httpServer.on('delete', `${projectsPath}/:projectId`, async (
      params: { projectId: string },
      _body: object,
      _headers: object,
      _query: object
    ): Promise<HttpServerCallbackDTO> => {
      try {
        await this.projectsUseCases.deleteProject(params.projectId)
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

export default ProjectsController
