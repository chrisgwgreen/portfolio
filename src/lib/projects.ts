import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, query } from 'firebase/firestore'
import { Project } from 'types'

// Runs at build time only, so these values never reach the browser bundle
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID
}

export type Projects = Record<string, Project>

export const getProjects = async (): Promise<Projects> => {
  const db = getFirestore(initializeApp(firebaseConfig))
  const snapshot = await getDocs(query(collection(db, 'projects')))

  const projects: Projects = {}
  snapshot.forEach(doc => (projects[doc.id] = doc.data() as Project))

  // Strip Firestore class instances (e.g. Timestamps) so the data can be passed to client components
  return JSON.parse(JSON.stringify(projects))
}
