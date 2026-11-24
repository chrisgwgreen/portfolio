import { App } from 'components/App/App'
import { DataProvider } from 'contexts'
import { getProjects } from 'lib/projects'

const Home = async () => {
  const projects = await getProjects()

  return (
    <DataProvider projects={projects}>
      <App />
    </DataProvider>
  )
}

export default Home
