import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
    <div>
      <h1>Главная страница</h1>
      <Link to="/login" className="login-button">
        Войти
      </Link>
    </div>
  )
}

export default MainPage
