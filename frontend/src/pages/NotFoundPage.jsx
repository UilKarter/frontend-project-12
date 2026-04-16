import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../components/parts/Header'
import { ExclamationTriangle } from 'react-bootstrap-icons'

const NotFoundPage = () => {
  const token = localStorage.getItem('token')
  const homeLink = token ? '/' : '/login'

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <ExclamationTriangle size={64} className="text-warning mb-3" />
        <h1 className="display-1">404</h1>
        <h2 className="mb-4">Страница не найдена</h2>
        <p className="text-muted mb-4">
          Извините, запрашиваемая страница не существует или была перемещена.
        </p>
        <Button as={Link} to={homeLink} variant="primary">
          Вернуться на главную
        </Button>
      </Container>
    </div>
  )
}

export default NotFoundPage
