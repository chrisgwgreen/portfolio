import { useState, useContext, useEffect } from 'react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Eyes,
  Logo,
  Drawer,
  SplitSlice,
  AnimatedTitle,
  BrowserImgFrame,
  Reflection
} from 'components'
import { DataContext } from 'contexts'

import { Swiper, SwiperSlide } from 'swiper/react'

const MenuWrapper = styled('button')`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: #fff;
  margin: 0.5rem;
  cursor: pointer;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
`

const StyledSwiper = styled(Swiper)`
  margin: 2rem 0 3rem 0;
  overflow: visible;
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
                <button onClick={() => handleSelectedProject(item)}>
                  {item.title}
                </button>
              ))

              return (
                <>
                  <Typography>{key}</Typography>
                  {menuItems}
                </>
              )
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

                return (
                  <>
                    {media && (
                      <Reflection>
                        <BrowserImgFrame src={media[0]} />
                      </Reflection>
                    )}
                  </>
                  // <StyledSwiper
                  // // navigation
                  // // spaceBetween={50}
                  // // pagination={{ clickable: true }}
                  // >
                  //   <SwiperSlide>TEST 1</SwiperSlide>
                  //   <SwiperSlide>TEST 2</SwiperSlide>
                  //   <SwiperSlide>TEST 2</SwiperSlide>
                  //   <SwiperSlide>TEST 2</SwiperSlide>
                  // </StyledSwiper>
                )
              }}
            />
          )}
        </ContentWrapper>
      </Drawer>
    </>
  )
}
