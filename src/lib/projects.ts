import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore, query } from 'firebase/firestore'
import { cache } from 'react'
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

export const slugify = (title: string) =>
  title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// cache() shares one Firestore read between a page, its layout and its metadata
export const getProjects = cache(async (): Promise<Projects> => {
  const db = getFirestore(initializeApp(firebaseConfig))
  const snapshot = await getDocs(query(collection(db, 'projects')))

  const projects: Projects = {}
  const slugs = new Set<string>()

  snapshot.forEach(doc => {
    const data = doc.data() as Project
    // An optional `slug` field in Firestore keeps a URL stable if the title changes
    const slug = data.slug || slugify(data.title)

    if (slugs.has(slug)) {
      throw new Error(`Two projects share the URL /projects/${slug}`)
    }

    slugs.add(slug)
    projects[doc.id] = { ...data, slug }
  })

  // Strip Firestore class instances (e.g. Timestamps) so the data can be passed to client components
  return JSON.parse(JSON.stringify(projects))
})

export const getProject = async (slug: string) =>
  Object.values(await getProjects()).find(project => project.slug === slug)
