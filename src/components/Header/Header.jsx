import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Header = () => {
  return (
      <div className="header">
        {/* LOGO */}
        <div className="header__logo">
            <img src={logo} alt="RAYTEL" width={40} />
            <h1 className='header__logo-text'>
              <span>Ray</span>tel
            </h1>
        </div> 
        {/* SEARCH */}
        <form className='header__search'>
            <input placeholder="Qidiruv..." type="text" name="search" id="search" className="header__search-input" />
            <button className='header__search-btn'>
                <i className='bx bx-search'></i>
            </button>
        </form>
        {/* NAVIGATIONS */}
        <div className="header__navigations">
          {/* ITEM */}
          <div className="header__navigation">
            <div className="badge">5</div>
            <i className='bx bx-basket'></i>
            <span className='header__navigation-text'>Savatcha</span>
          </div>
          {/* ITEM */}
          <div className="header__navigation">
            <div className="badge">8</div>
            <i className='bx bx-star' ></i>
            <span className='header__navigation-text'>Sevimlilar</span>
          </div>
          {/* ITEM */}
          <div className="header__navigation">
            <i class='bx bx-user'></i>
            <span className='header__navigation-text'>Kabinet</span>
          </div>
          {/* RESPONSIVE */}
          <div className="header__navigation res">
            <i class='bx bx-search'></i>
            <span className='header__navigation-text'>Qidiruv</span>
          </div>
        </div>
    </div>
  )
}

export default Header