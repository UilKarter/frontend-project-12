import { Navbar, Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { isAuthenticated, clearAuth } from '../../utils/auth'

const Header = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const authenticated = isAuthenticated()

  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  const homeLink = authenticated ? '/' : '/login'

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
