import { createContext, useState, useCallback, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, getDocs, collection, query } from 'firebase/firestore'
import { Project } from 'types'

interface DataContextProps {
  projects: Project[]
}

interface Props {
  children: JSX.Element
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const DataContext = createContext<DataContextProps>(
  {} as DataContextProps
)

export const DataProvider = (props: Props) => {
  const { children } = props

  const [projects, setProjects] = useState<any>(null)

  const fetchProjects = useCallback(async () => {
    const docRef = collection(db, 'projects')

    const projectsQuery = query(docRef)
    const projectsQuerySnapshot = await getDocs(projectsQuery)
    let projects = {}

    projectsQuerySnapshot.forEach(
      doc => (projects = { ...projects, [doc.id]: doc.data() as any })
    )

    setProjects(projects)
  }, [setProjects])

  useEffect(() => {
    !projects && fetchProjects()
  }, [fetchProjects, projects])

  return (
    <DataContext.Provider value={{ projects }}>{children}</DataContext.Provider>
  )
}

export const DataConsumer = DataContext.Consumer
