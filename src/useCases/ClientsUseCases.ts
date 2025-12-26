// import type { DocumentReference, CollectionReference } from 'firebase-admin/firestore'
import type { DB } from '../infra/database/FirestoreConnection'

const collectionName = 'clients'

class ClientsUseCases {
  constructor (private readonly db: DB) {}

  async createClient (data: object): Promise<object> {
    const res = await this.db.collection(collectionName).add(data)
    return {
      id: res.id,
      ...data
    }
  }

  async updateClient (clientId: string, data: object): Promise<object> {
    await this.db.collection(collectionName).doc(clientId).update(data)
    return {
      id: clientId,
      ...data
    }
  }

  async deleteClient (clientId: string): Promise<object> {
    return await this.db.collection(collectionName).doc(clientId).delete()
  }
}

export default ClientsUseCases
