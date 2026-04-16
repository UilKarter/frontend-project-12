import { Button } from 'react-bootstrap'

const BasicChannel = ({ channel, isActive, onClick }) => {
  return (
    <li className="nav-item w-100">
      <Button
        className="w-100 rounded-0 text-start text-truncate"
        variant={isActive ? 'secondary' : 'light'}
        onClick={onClick}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
  )
}

export default BasicChannel
