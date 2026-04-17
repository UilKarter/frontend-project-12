import { Navbar, Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  const homeLink = isAuthenticated ? '/' : '/login'

  return (
    <Navbar bg="white" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to={homeLink}>{t('header.brand')}</Navbar.Brand>
        {isAuthenticated && (
          <Button variant="outline-secondary" onClick={handleLogout}>
            {t('header.logoutButton')}
          </Button>
        )}
      </Container>
    </Navbar>
  )
}

export default Header
