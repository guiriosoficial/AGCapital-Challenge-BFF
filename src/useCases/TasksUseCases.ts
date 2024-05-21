// import type { DocumentReference, Firestore } from 'firebase/firestore'
import type { DB } from '../infra/database/FirestoreConection'

const collectionName = 'tasks'

class TasksUseCases {
  constructor (private readonly db: DB) {}

  async searchTasks (projectId: string): Promise<object> {
    const res = await this.db.collection(collectionName).where('projectId', '==', projectId).get()
    const mappedRes = res.docs.map((doc) => ({
      id: doc.id,
      status: doc.data().status,
      description: doc.data().description
    }))

    return mappedRes
  }

  async createTask (projecId: string, data: object): Promise<object> {
    const payload = {
      ...data,
      projectId: projecId
    }
    const res = await this.db.collection(collectionName).add(payload)
    return {
      id: res.id,
      ...data
    }
  }

  async editTask (taskId: string, data: object): Promise<object> {
    await this.db.collection(collectionName).doc(taskId).update(data)
    const res = await this.db.collection(collectionName).doc(taskId).get()

    return {
      description: res.data()?.description,
      status: res.data()?.status,
      id: res.id
    }
  }

  async deleteTask (taskId: string): Promise<object> {
    return await this.db.collection(collectionName).doc(taskId).delete()
  }
}

export default TasksUseCases
