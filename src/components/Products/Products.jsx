import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { URL } from '../../assets/URL'
import loadingIcon from '../../assets/loading.svg'
import Details from '../../Pages/Details/Details'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({}) 

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
            .finally(() => {
                setLoading(false)
            })
        } else {
            axios.get(`${URL}/api/products/guest`)
            .then(res => {
                setProducts(res.data.data)
            })
            .finally(() => setLoading(false))
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
            method: 'DELETE',
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


    // send to order
    const addOrder = (data) => {
        axios.post(`${URL}/api/orders`, data, {
            headers: {
                "Authorization": 'Bearer '+ localStorage.getItem('raytel_token')
            }
        })
        .then(e => {
            Swal.fire({
                title: 'Buyurtmangiz qabul qilindi!',
                icon: 'success'
            })
        })
    }

  return (
    <div className='container'>
        {
            modalIsOpen && (
                <Details {...selectedProduct} onClose={setModalIsOpen} addOrder={addOrder} />
            )
        }
        <div className="hero">
          <img src="https://assets.asaxiy.uz/uploads/banner/desktop/625fe1f1373f3.jpg.webp" alt="" />
        </div>
        <h1 className='heading'>Bosh sahifa</h1>
        {
            loading ? (
                <img src={loadingIcon} className="loading" />
            ) : (
                <div className="products">
            {
                products?.map(item => (
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
                                    {
                                        item?.is_basket ? (
                                            <div className={`basket`}>
                                            <i className='bx bx-basket' ></i>
                                            </div>
                                        ) : (
                                            <div className={`basket active`} onClick={() => addOrder({
                                                product_id: item?.id,
                                                count: 1,
                                                size: item?.size[0],
                                                color: item?.color[0]
                                            })}><i className='bx bx-basket' ></i>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                        <div className="card__image">
                            <img src={item?.images ? item?.images[0] : 'https://roboliristorante.com/wp-content/uploads/2021/10/default.jpg'} alt="" />
                        </div>
                        <div className="card-body">
                            {
                                localStorage.getItem('isLogged') ? (
                                    <h2 className='product__name' onClick={() => {
                                        setSelectedProduct(item)
                                        setModalIsOpen(true)
                                    }}>{item?.name}</h2>
                                ) : (
                                    <h2 className='product__name'>{item?.name}</h2>
                                )
                            }
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

export default Products