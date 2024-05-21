import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from './credentials'

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: 'agcapital-challenge.firebaseapp.com',
//   databaseURL: 'https://agcapital-challenge-default-rtdb.firebaseio.com',
//   projectId: 'agcapital-challenge',
//   storageBucket: 'agcapital-challenge.appspot.com',
//   messagingSenderId: '222052615987',
//   appId: '1:222052615987:web:7953d6f9007b028f946046'
// }

// const app = initializeApp(firebaseConfig)

// const db = getFirestore(app)

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  databaseURL: 'https://agcapital-challenge-default-rtdb.firebaseio.com'
})

const db = getFirestore()
type DB = typeof db

export default db
export type { DB }
