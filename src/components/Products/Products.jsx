import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../../assets/URL'

const Products = () => {
    const [products, setProducts] = useState([])

    // FETCHING PRODUCTS
    useEffect(() => {
        axios.get(`${URL}/api/products/guest`)
        .then(res => {
            setProducts(res.data.data)
        })
    }, [])

  return (
    <div className='container'>
        <div className="products">
            {
                products?.map(item => (
                    <div className='product__card' key={item?.id}>
                        <div className="favourite">
                            {
                                item?.is_favorite ? (
                                    <i class='active bx bxs-star'></i>
                                ) : (
                                    <i class='bx bx-star' ></i>
                                )
                            }
                        </div>
                        <div className="basket">
                        <i class='bx bx-basket' ></i>
                        </div>
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
                            <button className='btn btn-primary card-btn'>Sotib olish</button>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Products