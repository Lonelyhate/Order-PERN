import React from 'react'
import { Link } from 'react-router-dom'
import './HomeMenu.scss'

const HomeMenu = () => {
  return (
    <ul className='home-menu'>
        <li className="home-menu__item">
            <Link to='/order' className='home-menu__link'>Заказы</Link>
        </li>
        <li className="home-menu__item">
            <Link to='/dish' className='home-menu__link'>Блюда</Link>
        </li>
    </ul>
  )
}

export default HomeMenu