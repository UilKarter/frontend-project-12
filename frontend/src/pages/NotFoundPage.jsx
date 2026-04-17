import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ExclamationTriangle } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'

import Header from '../components/parts/Header'

const NotFoundPage = () => {
  const { t } = useTranslation()
  const token = localStorage.getItem('token')
  const homeLink = token ? '/' : '/login'

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <ExclamationTriangle size={64} className="text-warning mb-3" />
        <h1 className="display-1">{t('notFound.nfError')}</h1>
        <h2 className="mb-4">{t('notFound.pageNotFound')}</h2>
        <p className="text-muted mb-4">{t('notFound.appologise')}</p>
        <Button as={Link} to={homeLink} variant="primary">
          {t('notFound.returnToMain')}
        </Button>
      </Container>
    </div>
  )
}

export default NotFoundPage
