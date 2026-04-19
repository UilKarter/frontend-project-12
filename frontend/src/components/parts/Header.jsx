import { useDispatch } from 'react-redux'
import { Navbar, Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { isAuthenticated, clearAuth } from '../../utils/auth'
import { logout } from '../../store/slices/authSlice'
import appRoutes from '../../routes/appRoutes'

const Header = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authenticated = isAuthenticated()

  const handleLogout = () => {
    clearAuth()
    dispatch(logout())
    navigate(appRoutes.login)
  }

  const homeLink = authenticated ? appRoutes.home : appRoutes.login

  return (
    <Navbar bg="white" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to={homeLink}>
          {t('header.brand')}
        </Navbar.Brand>
        {authenticated && (
          <Button variant="outline-secondary" onClick={handleLogout}>
            {t('header.logoutButton')}
          </Button>
        )}
      </Container>
    </Navbar>
  )
}

export default Header
