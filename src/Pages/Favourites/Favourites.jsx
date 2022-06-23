import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { URL } from '../../assets/URL'
import loadingIcon from '../../assets/loading.svg'

const Favourites = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    // FETCHING PRODUCTS
    useEffect(() => {
        setLoading(true)
        if (localStorage.getItem('isLogged')){
            axios.get(`${URL}/api/products`, {
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem('raytel_token')
                }
            })
            .then(res => {
                setProducts(res.data.data)
            })
            .finally(() => setLoading(false))
        } else {
            axios.get(`${URL}/api/products/guest`)
            .then(res => {
                setProducts(res.data.data)
            })
            .finally(() => setLoading(false))
        }
    }, [])

    // VALIDATE LOGIN
    useEffect(() => {
        if (!localStorage.getItem('isLogged')) {
            navigate("/", { replace: true })
        }
    }, [])

    // ADD FAVOURITE
    const addFavourite = (id) => {
        fetch(`${URL}/api/favorite/${id}`, {
            method: 'POST',
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('raytel_token')
            }
        })
        .then(res => {
            Swal.fire({
                title: "Mahsulot sevimlilarga qo'shildi!",
                icon: 'success'
            })
            const newProducts = [...products];
            const index = newProducts.findIndex(item => item.id === id);
            newProducts[index].is_favorite = true
            setProducts(newProducts)
        })
    }

    // DELETE FAVOURITE
    const deleteFavourite = (id) => {
        fetch(`${URL}/api/favorite/${id}`, {
            method: 'POST',
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('raytel_token')
            }
        })
        .then(res => {
            Swal.fire({
                title: "Mahsulot sevimlilardan o'chirildi!",
                icon: 'info'
            })
            const newProducts = [...products];
            const index = newProducts.findIndex(item => item.id === id);
            newProducts[index].is_favorite = false
            setProducts(newProducts)
        })
    }

  return (
    <div className='container'>
        <h1 className="heading">Sevimlilarim</h1>
        {
            loading ? (
                <img src={loadingIcon} className="loading" />
            ) : (
            <div className="products">
                {
                    products?.filter((item) => item.is_favorite === true)?.map(item => (
                        <div className='product__card' key={item?.id}>
                            {
                                localStorage.getItem('isLogged') && (
                                    <>
                                        <div className="favourite" >
                                            {
                                                item?.is_favorite ? (
                                                    <i className='active bx bxs-star' onClick={() => deleteFavourite(item?.id)}></i>
                                                ) : (
                                                    <i className='bx bx-star' onClick={() => addFavourite(item?.id)} ></i>
                                                )
                                            }
                                        </div>
                                        <div className="basket">
                                            <i className='bx bx-basket' ></i>
                                        </div>
                                    </>
                                )
                            }
                            <div className="card__image">
                                <img src={item?.images ? item?.images[0] : 'https://roboliristorante.com/wp-content/uploads/2021/10/default.jpg'} alt="" />
                            </div>
                            <div className="card-body">
                                <h2 className='product__name'>{item?.name}</h2>
                                <div className="card-flex">
                                <div className="card-flex-right">
                                <h4 className='first__price'>{item?.first_price} SUM</h4>
                                <h3 className='second_price'>{item?.second_price} SUM</h3>
                                </div>
                                <h3 className='category__name'>{item?.category?.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            )
        }
    </div>
  )
}

export default Favourites