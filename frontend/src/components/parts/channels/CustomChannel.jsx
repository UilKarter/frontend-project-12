import { Dropdown, ButtonGroup, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../store/slices/modalSlice'

const CustomChannel = ({ channel, isActive, onClick }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleRename = () => dispatch(openModal({ type: 'rename', data: channel }))
  const handleRemove = () => dispatch(openModal({ type: 'remove', data: { id: channel.id } }))

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex w-100">
        <Button
          className="w-100 rounded-0 text-start text-truncate"
          variant={isActive ? 'secondary' : 'light'}
          onClick={onClick}
          aria-label={channel.name}
        >
          <span className="me-1">{t('home.channels.hash')}</span>
          {channel.name}
        </Button>

        <Dropdown.Toggle
          split
          variant={isActive ? 'secondary' : 'light'}
          aria-label={t('home.channels.dropdownToggle')}
        >
          <span className="visually-hidden">{t('home.channels.dropdownToggle')}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu renderMenuOnMount>
          <Dropdown.Item onClick={handleRename}>
            {t('home.channels.dropdownRename')}
            <span className="visually-hidden">{t('home.channels.dropdownRename')}</span>
          </Dropdown.Item>
          <Dropdown.Item className="text-danger" onClick={handleRemove}>
            {t('home.channels.dropdownRemove')}
            <span className="visually-hidden">{t('home.channels.dropdownRemove')}</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  )
}

export default CustomChannel
