import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from './credentials'

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
})

const db = getFirestore(app)
type DB = typeof db

export default db
export type { DB }
