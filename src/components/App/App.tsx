import MenuIcon from '@mui/icons-material/Menu'
import { styled } from '@mui/system'
import {
  AnimatedTitle,
  Drawer,
  Eyes,
  Logo,
  ShowTile,
  SwipeList,
  SelectedProject
} from 'components'
import { DataContext } from 'contexts'
import { useContext, useState } from 'react'

const MenuWrapper = styled('button')`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: 0.25rem solid #333333;
  background: #fff;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0.2rem 1rem 1rem rgba(0, 0, 0, 0.1);
  z-index: 2;
`

const SwipeListWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
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
        <SwipeListWrapper>
          {menu &&
            Object.keys(menu).map((key: any) => {
              const items = menu[key]

              const menuItems = items.map((item: any) => (
                <>
                  <ShowTile
                    title={item.title}
                    img={{
                      src:
                        item.media && item.media.length > 0
                          ? item.media[0].src
                          : ''
                    }}
                    onClick={() => handleSelectedProject(item)}
                  />
                </>
              ))

              return (
                <div>
                  <AnimatedTitle isSmall title={key} />
                  <SwipeList>{menuItems}</SwipeList>
                </div>
              )
            })}
        </SwipeListWrapper>
      </Drawer>
      <Drawer show={selectedProject !== null} onClose={handleCloseContent}>
        <>
          {selectedProject && (
            <SelectedProject selectedProject={selectedProject} />
          )}
        </>

        {/* <ContentWrapper>
          {selectedProject && {

            
          })


            <div>

<div>
                    <AnimatedTitle isRightAligned title={title} />
                    <Typography align='right' variant='body2'>
                      {copy}
                    </Typography>
                  </div>

                  <div>{media && <img src={media[0].src} />}</div>


            </div>

            <SplitSlice
              isSecondaryOnTopResponsive={true}
              renderPrimary={() => {
                const { title, copy, media } = selectedProject

                return (
                  
                )
              }}
              renderSecondary={() => {
                const { media } = selectedProject

                return <div>{media && <img src={media[0].src} />}</div>
              }}
            />
          )}
        </ContentWrapper> */}
      </Drawer>
    </>
  )
}
