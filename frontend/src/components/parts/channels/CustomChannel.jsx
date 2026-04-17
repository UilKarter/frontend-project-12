import { useState } from 'react'
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import RemoveChannelModal from './modals/RemoveChannelModal'
import RenameChannelModal from './modals/RenameChannelModal'

const CustomChannel = ({ channel, isActive, onClick }) => {
  const [isOpenRemove, setIsOpenRemove] = useState(false)
  const [isOpenRename, setIsOpenRename] = useState(false)
  const { t } = useTranslation()

  return (
    <>
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
          />

          <Dropdown.Menu
            renderMenuOnMount
          >
            <Dropdown.Item onClick={() => setIsOpenRename(true)}>
              {t('home.channels.dropdownRename')}
            </Dropdown.Item>
            <Dropdown.Item
              className="text-danger"
              onClick={() => setIsOpenRemove(true)}
            >
              {t('home.channels.dropdownRemove')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>

      <RemoveChannelModal
        channelId={channel.id}
        show={isOpenRemove}
        onHide={() => setIsOpenRemove(false)}
      />
      <RenameChannelModal
        channel={channel}
        show={isOpenRename}
        onHide={() => setIsOpenRename(false)}
      />
    </>
  )
}

export default CustomChannel
