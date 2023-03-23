import { useState, useContext, useEffect } from 'react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Eyes, Logo, Drawer, SplitSlice, AnimatedTitle } from 'components'
import { DataContext } from 'contexts'

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

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContentOpen, setIsContentOpen] = useState(false)

  const { projects } = useContext(DataContext)

  useEffect(() => {
    console.log('---->', projects)
  }, [projects])

  const handleCloseMenu = () => setIsMenuOpen(false)
  const handleCloseContent = () => setIsContentOpen(false)

  return (
    <>
      <MenuWrapper onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <MenuIcon fontSize='medium' />
      </MenuWrapper>

      <Drawer show={isMenuOpen} onClose={handleCloseMenu}>
        <>
          <button onClick={() => setIsContentOpen(true)}>Content</button>
        </>
      </Drawer>
      <Drawer show={isContentOpen} onClose={handleCloseContent}>
        <SplitSlice
          renderPrimary={() => (
            <>
              <AnimatedTitle isRightAligned title='This is a test title' />
              <Typography align='right' variant='body2'>
                This is test copy
              </Typography>
            </>
          )}
          renderSecondary={() => <>SOME CONTENT</>}
        />
      </Drawer>
      <Eyes />
      <Logo />
    </>
  )
}
