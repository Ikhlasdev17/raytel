import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { URL } from '../../assets/URL';

const Login = ({ onClose, userData }) => {
    const [type, setType] = useState('login');
    const [loginUser, setLoginUser] = useState({
        email: '',
        password: ''
    })
    const [registerUser, setRegisterUser] = useState({
        email: '',
        name: '',
        password: ''
    })


    // handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault()
        // data for sending
        const data = type === 'login' ? loginUser : registerUser;
        // send data
        if (type === 'login') {
            axios.post(`${URL}/api/login`, data)
            .then(res => {
                Swal.fire({
                    title: 'Muvaffaqiyatli yakunlandi!',
                    icon: 'success'
                })
                localStorage.setItem('isLogged', true)
            })
            .catch(err => {
                Swal.fire({
                    title: "Ma'lumotlar notog'ri kiritildi!",
                    icon:'error'
                })
            })
            .finally(() => onClose(false))
        } else {
            axios.post(`${URL}/api/register`, data)
            .then(res => {
                Swal.fire({
                    title: 'Muvaffaqiyatli yakunlandi!',
                    icon: 'success'
                })
            })
            .catch(err => {
                Swal.fire({
                    title: "Ma'lumotlar notog'ri kiritildi!",
                    icon:'error'
                })
            })
            .finally(() => onClose(false))
        }
    }
    
  return (
    <div className='login-container'>
        <div className="login-header">
            <h1>{type === 'login' ? 'Kirish' : `Ro'yhatdan o'tish`}</h1>
        </div>
        <div className="login-navigation">
            <div 
                className={`${type === 'login' && 'login-nav__item-active'} login-nav__item`}
                onClick={() => setType('login')}    
            >
                Kirish
            </div>
            <div 
                className={`${type === 'register' && 'login-nav__item-active'} login-nav__item`}
                onClick={() => setType('register')}
            >
                Ro'yhatdan o'tish
            </div>
        </div>
        {/* FORM */}
        <form className='form' onSubmit={handleSubmit}>

        {
            type === "login" ? (
                    <>
                        <label className='form-label'>
                            <span>Emailni kiriting</span>
                            <input 
                                type="email" 
                                value={loginUser.email} 
                                onChange={e => setLoginUser({...loginUser, email: e.target.value})}  
                                className="form-control"
                                placeholder='example@example.com'
                                required
                                
                            />
                        </label>
                        <label className='form-label'>
                            <span>Parolni kiriting</span>
                            <input 
                                type="password" 
                                value={loginUser.password} 
                                onChange={e => setLoginUser({...loginUser, password: e.target.value})}  
                                className="form-control"
                                placeholder='12345678'
                                required
                            />
                        </label>
                        <button type="submit" className='btn btn-primary block'>Kirish</button>
                    </>
                ) : (
                    <>
                        <label className='form-label'>
                            <span>Ismingizni kiriting</span>
                            <input 
                                type="text" 
                                value={registerUser.name} 
                                onChange={e => setRegisterUser({...registerUser, name: e.target.value})}  
                                className="form-control"
                            />
                        </label>
                        <label className='form-label'>
                            <span>Emailni kiriting</span>
                            <input 
                                type="text" 
                                value={registerUser.email} 
                                onChange={e => setRegisterUser({...registerUser, email: e.target.value})}  
                                className="form-control"
                            />
                        </label>
                        <label className='form-label'>
                            <span>Parolni kiriting</span>
                            <input 
                                type="password" 
                                value={registerUser.password} 
                                onChange={e => setRegisterUser({...registerUser, password: e.target.value})}  
                                className="form-control"
                                placeholder='123456789'
                            />
                        </label>
                        <button type="submit" className='btn btn-primary block'>Ro'yhatdan o'tish</button>
                    </>
                    )
                }
        </form>
    </div>
  )
}

export default Login