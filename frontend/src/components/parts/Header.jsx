import { Navbar, Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
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
        <Navbar.Brand as={Link} to={homeLink}>Hexlet Chat</Navbar.Brand>
        {isAuthenticated && (
          <Button variant="outline-secondary" onClick={handleLogout}>
            Выйти
          </Button>
        )}
      </Container>
    </Navbar>
  )
}

export default Header
