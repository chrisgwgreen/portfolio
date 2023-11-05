import { AnimatedTitle, ShowTile, SwipeList } from 'components'
import { Project } from 'types'

interface Props {
  title: string
  items: Project[]
  handleSelectedProject: (item: Project) => void
}

export const ProjectList = (props: Props) => {
  const { title, items, handleSelectedProject } = props

  const menuItems = items.map((item: Project) => (
    <>
      <ShowTile
        title={item.title}
        img={{
          src: item.media && item.media.length > 0 ? item.media[0].src : ''
        }}
        onClick={() => handleSelectedProject(item)}
      />
    </>
  ))

  return (
    <div>
      <AnimatedTitle isSmall title={title} />
      <SwipeList>{menuItems}</SwipeList>
    </div>
  )
}
