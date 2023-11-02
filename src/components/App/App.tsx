import MenuIcon from '@mui/icons-material/Menu'
import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import {
  AnimatedTitle,
  Drawer,
  Eyes,
  Logo,
  ShowTile,
  SplitSlice,
  SwipeList
} from 'components'
import { DataContext } from 'contexts'
import { useContext, useState } from 'react'

const MenuWrapper = styled('button')`
  position: fixed;
  top: 1rem;
  right: 1rem;
  border: 0.25rem solid black;
  background: #fff;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0.2rem 1rem 1rem rgba(0, 0, 0, 0.1);
`

const ContentWrapper = styled('div')`
  // overflow: scroll;
`

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any | null>(null)

  const { projects } = useContext(DataContext)

  const handleCloseMenu = () => setIsMenuOpen(false)
  const handleCloseContent = () => setSelectedProject(null)
  const handleSelectedProject = (item: any) => setSelectedProject(item)

  const menu = projects
    ? Object.keys(projects).reduce((acc: any, key: any) => {
        const { type } = projects[key]
        return {
          ...acc,
          [type]: [...(acc[type] ? acc[type] : []), projects[key]]
        }
      }, {})
    : {}

  return (
    <>
      <Eyes />
      <Logo />
      <MenuWrapper onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <MenuIcon fontSize='medium' />
      </MenuWrapper>
      <Drawer show={isMenuOpen} onClose={handleCloseMenu}>
        <>
          {menu &&
            Object.keys(menu).map((key: any) => {
              const items = menu[key]

              const menuItems = items.map((item: any) => (
                <ShowTile
                  title='Test'
                  img={{
                    src: ''
                  }}
                  onClick={() => handleSelectedProject(item)}
                />
                // <button >
                //   {item.title}
                // </button>
              ))

              return <SwipeList>{menuItems}</SwipeList>
            })}
        </>
      </Drawer>
      <Drawer show={selectedProject !== null} onClose={handleCloseContent}>
        <ContentWrapper>
          {selectedProject && (
            <SplitSlice
              isSecondaryOnTopResponsive={true}
              renderPrimary={() => {
                const { title, copy, media } = selectedProject

                return (
                  <>
                    <AnimatedTitle isRightAligned title={title} />
                    <Typography align='right' variant='body2'>
                      {copy}
                    </Typography>
                  </>
                )
              }}
              renderSecondary={() => {
                const { media } = selectedProject

                return <>{media && <img src={media[0].src} />}</>
              }}
            />
          )}
        </ContentWrapper>
      </Drawer>
    </>
  )
}
