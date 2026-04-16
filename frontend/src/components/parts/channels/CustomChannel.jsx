import { useState } from 'react'
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap'
import RemoveChannelModal from './modals/RemoveChannelModal'
import RenameChannelModal from './modals/RenameChannelModal'

const CustomChannel = ({ channel, isActive, onClick }) => {
  const [isOpenRemove, setIsOpenRemove] = useState(false)
  const [isOpenRename, setIsOpenRename] = useState(false)

  return (
    <>
      <li className="nav-item w-100">
        <Dropdown as={ButtonGroup} className="d-flex w-100">
          <Button
            className="w-100 text-start text-truncate rounded-0"
            variant={isActive ? 'secondary' : 'light'}
            onClick={onClick}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>

          <Dropdown.Toggle split variant={isActive ? 'secondary' : 'light'} />

          <Dropdown.Menu
            renderMenuOnMount
          >
            <Dropdown.Item onClick={() => setIsOpenRename(true)}>
              Переименовать
            </Dropdown.Item>
            <Dropdown.Item
              className="text-danger"
              onClick={() => setIsOpenRemove(true)}
            >
              Удалить
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>

      <RemoveChannelModal
        channelId={channel.id}
        isOpen={isOpenRemove}
        setIsOpen={setIsOpenRemove}
      />

      <RenameChannelModal
        channel={channel}
        isOpen={isOpenRename}
        setIsOpen={setIsOpenRename}
      />
    </>
  )
}

export default CustomChannel
