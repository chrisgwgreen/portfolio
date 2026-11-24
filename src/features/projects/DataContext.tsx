'use client'

import { Projects } from 'lib/projects'
import { createContext, ReactNode } from 'react'

interface DataContextProps {
  projects: Projects
}

interface Props {
  projects: Projects
  children: ReactNode
}

export const DataContext = createContext<DataContextProps>(
  {} as DataContextProps
)

export const DataProvider = (props: Props) => {
  const { projects, children } = props

  return (
    <DataContext.Provider value={{ projects }}>{children}</DataContext.Provider>
  )
}

export const DataConsumer = DataContext.Consumer
