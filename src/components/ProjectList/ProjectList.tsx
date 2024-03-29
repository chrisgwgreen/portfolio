import { AnimatedTitle, ProjectTile, SwipeList } from 'components'
import { Project } from 'types'

interface Props {
  title: string
  items: Project[]
  handleSelectedProject: (item: Project) => void
}

export const ProjectList = (props: Props) => {
  const { title, items, handleSelectedProject } = props

  const menuItems =
    items &&
    items.map((item: Project) => (
      <ProjectTile
        key={`project-list-tile-${item.title}`}
        title={item.title}
        img={{
          src: item.media && item.media.length > 0 ? item.media[0].src : ''
        }}
        onClick={() => handleSelectedProject(item)}
      />
    ))

  return (
    <div key={`project-list-${title}`}>
      <AnimatedTitle isSmall title={title} />
      <SwipeList>{menuItems}</SwipeList>
    </div>
  )
}
