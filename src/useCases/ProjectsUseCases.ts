// import type { QueryDocumentSnapshot } from 'firebase/firestore'
import type { DB } from '../infra/database/FirestoreConnection'

const projectsCollections = 'projects'
const clientsCollection = 'clients'

class ProjectsUseCases {
  constructor (private readonly db: DB) {}

  async searchProjects (status: string, searchTerm?: string): Promise<object[]> {
    const projectsByClientsList: any[] = []
    const clientsSnapshot = await this.db.collection(clientsCollection).get()
    const projectsSnapshot = await this.db.collection(projectsCollections).where('status', '==', status).get()

    for (let i: number = 0; i < clientsSnapshot.docs.length; i++) {
      const mappedProjects = projectsSnapshot.docs
        .filter((projectDoc) => {
          return projectDoc.data().clientId === String(clientsSnapshot.docs[i].id)
        })
        .map((doc) => ({
          description: doc.data().description,
          name: doc.data().name,
          status: doc.data().status,
          id: doc.id
        }))

      if (mappedProjects.length > 0 || status === 'OPEN') {
        projectsByClientsList.push({
          ...clientsSnapshot.docs[i].data(),
          id: String(clientsSnapshot.docs[i].id),
          projects: mappedProjects
        })
      }
    }

    return projectsByClientsList
  }

  async createProject (clientId: string, data: object): Promise<object> {
    const payload = {
      ...data,
      status: 'OPEN',
      clientId
    }
    const res = await this.db.collection(projectsCollections).add(payload)
    return {
      ...data,
      id: res.id
    }
  }

  async editProject (projectId: string, data: object): Promise<object> {
    await this.db.collection(projectsCollections).doc(projectId).update(data)
    const res = await this.db.collection(projectsCollections).doc(projectId).get()
    return {
      id: res.id,
      name: res.data()?.name,
      description: res.data()?.description,
      status: res.data()?.status
    }
  }

  async deleteProject (projectId: string): Promise<object> {
    return await this.db.collection(projectsCollections).doc(projectId).delete()
  }
}

export default ProjectsUseCases
