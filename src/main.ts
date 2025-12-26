import * as dotenv from 'dotenv'
import ExpressAdapter from './infra/http/ExpressAdapter'
import ProjectsUseCases from './useCases/ProjectsUseCases'
import TasksUseCases from './useCases/TasksUseCases'
import ClientsUseCases from './useCases/ClientsUseCases'
import ProjectsController from './infra/controller/ProjectsController'
import TasksController from './infra/controller/TasksController'
import ClientsController from './infra/controller/ClientsController'
import db from './infra/database/FirestoreConnection'

dotenv.config({ path: '.env.local' })
dotenv.config()

const httpServer = new ExpressAdapter('/api')
const projectsUseCases = new ProjectsUseCases(db)
const tasksUseCases = new TasksUseCases(db)
const clientsUseCases = new ClientsUseCases(db)

const projectsController = new ProjectsController(
  httpServer,
  projectsUseCases
)
const clientsController = new ClientsController(
  httpServer,
  clientsUseCases
)
const tasksController = new TasksController(
  httpServer,
  tasksUseCases
)

if (
  projectsController.ok &&
  clientsController.ok &&
  tasksController.ok
) {
  const PORT = 3000
  httpServer.listen(PORT)
  console.clear()
  console.log(`http://localhost:${PORT} >> Started and ready to receive requests`)
}
