import type HttpServer from '../http/HttpServer'
import type TasksUseCases from '../../useCases/TasksUseCases'
import type { HttpServerCallbackDTO } from '../../domain/types/HttpServerCallbackDTO'
import GatewayError from '../../domain/errors/GatewayError'

const tasksPath = '/tasks'
const defaultError = {
  message: 'Internal Server Error',
  status: 500
}

class TasksController {
  public readonly ok = true

  constructor (
    readonly httpServer: HttpServer,
    readonly tasksUseCases: TasksUseCases
  ) {
    httpServer.on('get', `${tasksPath}`, async (
      _params: object,
      _body: object,
      _headers: object,
      query: { projectId: string }
    ): Promise<HttpServerCallbackDTO> => {
      try {
        const result = await this.tasksUseCases.searchTasks(query.projectId)
        return {
          status: 200,
          body: result
        }
      } catch (error) {
        throw new GatewayError(error as GatewayError ?? defaultError)
      }
    })

    httpServer.on('put', `${tasksPath}/:projectId`, async (
      params: { projectId: string },
      body: object,
      _headers: object,
      _query: object
    ): Promise<HttpServerCallbackDTO> => {
      try {
        const result = await this.tasksUseCases.createTask(params.projectId, body)
        return {
          status: 201,
          body: result
        }
      } catch (error) {
        throw new GatewayError(error as GatewayError ?? defaultError)
      }
    })

    httpServer.on('patch', `${tasksPath}/:taskId`, async (
      params: { taskId: string },
      body: object,
      _headers: object,
      _query: object
    ): Promise<HttpServerCallbackDTO> => {
      try {
        const result = await this.tasksUseCases.editTask(params.taskId, body)
        return {
          status: 200,
          body: result
        }
      } catch (error) {
        throw new GatewayError(error as GatewayError ?? defaultError)
      }
    })

    httpServer.on('delete', `${tasksPath}/:taskId`, async (
      params: { taskId: string },
      _body: object,
      _headers: object,
      _query: object
    ): Promise<HttpServerCallbackDTO> => {
      try {
        await this.tasksUseCases.deleteTask(params.taskId)
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

export default TasksController
