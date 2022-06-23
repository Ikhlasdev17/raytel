import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { URL } from '../../assets/URL'
import Login from '../Login/Login'
import Modal from '../Modal/Modal'

const Header = () => {
  const [showModal, setShowModal] = useState(false)
  const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged'))
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '')
  const [userShowData, setShowUserData] = useState(false)
  const login = () => <Login onClose={setShowModal} setUser={setUser} setIsLogged={setIsLogged} />
  let navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isLogged')
    navigate("/", { replace: true })
    window.location.reload()
  } 
  const [products, setProducts] = useState()
  const [basket, setBasket] = useState([])

  // FETCHING PRODUCTS
  useEffect(() => {
    if (localStorage.getItem('isLogged')){
        axios.get(`${URL}/api/products`, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('raytel_token')
            }
        })
        .then(res => {
            setProducts(res.data.data)
        })
        .finally(() => {
        })
    } else {
        axios.get(`${URL}/api/products/guest`)
        .then(res => {
            setProducts(res.data.data)
        })
      }
    axios.get(`${URL}/api/orders`,{
      headers: {
        "Authorization": 'Bearer ' + localStorage.getItem('raytel_token')
    }
    })
    .then(res => {
      setBasket(res.data.orders)
    })
}, [])
 

  return (
      <div className="header">
        {/* LOGO */}
        <Link to='/' className="header__logo">
            <img src={logo} alt="RAYTEL" width={40} />
            <h1 className='header__logo-text'>
              <span>Ray</span>tel
            </h1>
        </Link> 
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
            <Link to='/' className='header__navigation res'> 
            <i className='bx bx-home' ></i>
            <span className='header__navigation-text'>Bosh sahifa</span>
            </Link>
          </div>
          {/* ITEM */}
          <div className="header__navigation">
            {
              isLogged ? (
                <Link to={'/basket'} className="header__navigation">
                  <div className="badge">{basket?.length}</div>
                  <i className='bx bx-basket'></i>
                  <span className='header__navigation-text'>Savatcha</span>
                </Link>
              ) : (
                <div onClick={() => setShowModal(!showModal)} className="header__navigation"> 
                  <i className='bx bx-basket'></i>
                  <span className='header__navigation-text'>Savatcha</span>
                </div>
              )
            }
          </div>
          {/* ITEM */}
          {
            isLogged ? (
              <Link to="favourites" className="header__navigation">
                <div className="badge">{products?.filter(item => item.is_favorite === true)?.length}</div>
                <i className='bx bx-star' ></i>
                <span className='header__navigation-text'>Sevimlilar</span>
              </Link>
            ) : (
              <div className="header__navigation" onClick={() => setShowModal(!showModal)}> 
                <i className='bx bx-star' ></i>
                <span className='header__navigation-text'>Sevimlilar</span>
              </div>
            )
          }
          {/* ITEM */}
          {
            isLogged ? (
              <div className="login header__navigation" onClick={() => setShowUserData(!userShowData)}>
                <i className='bx bx-user'></i>
                <span className='header__navigation-text'>Kabinet</span>
              </div>
            ):(
              <div className="login header__navigation" onClick={() => setShowModal(true)}>
                <i className='bx bx-user'></i>
                <span className='header__navigation-text'>Kabinet</span>
              </div>
            )
          } 
        </div>

        {
          userShowData && (
            <div className='userData'>
              <ul>
                <li>{user?.name}</li>
                <li>{user?.email}</li>
              </ul>
              <ul>
                <li onClick={() => {
                  logout()
                  setIsLogged(false)
                  setShowUserData(false)
                }} className='logout'>Chiqish <i class='bx bx-log-in'></i></li>
              </ul>
            </div>
          )
        }

        {
          showModal && (
            <Modal content={login} onClose={setShowModal} isOpen={showModal}  />
          )
        }
    </div>
  )
}

export default Header