import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const BasicChannel = ({ channel, isActive, onClick }) => {
  const { t } = useTranslation()
  return (
    <li className="nav-item w-100">
      <Button
        className="w-100 rounded-0 text-start text-truncate"
        variant={isActive ? 'secondary' : 'light'}
        onClick={onClick}
        aria-label={channel.name}
      >
        <span className="me-1">{t('home.channels.hash')}</span>
        {channel.name}
      </Button>
    </li>
  )
}

export default BasicChannel
