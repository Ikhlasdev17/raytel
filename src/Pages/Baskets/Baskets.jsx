import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { URL } from '../../assets/URL'
import loadingIcon from '../../assets/loading.svg'
import moment from 'moment'

const Baskets = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [basketData, setBasketData] = useState({})

    // FETCHING PRODUCTS
    useEffect(() => {
        setLoading(true) 
            axios.get(`${URL}/api/orders`, {
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem('raytel_token')
                }
            })
            .then(res => {
                setProducts(res.data.orders)
                setBasketData(res.data)
                console.log(res.data)
            })
            .finally(() => setLoading(false)) 
    }, [])

    // VALIDATE LOGIN
    useEffect(() => {
        if (!localStorage.getItem('isLogged')) {
            navigate("/", { replace: true })
        }
    }, [])
 
    // delete basket
    const deleteFromBasket = () => {
        axios.delete(`${URL}`)
    }

  return (
    <div className='container'>
        <h1 className="heading">Savatcham</h1>
        <div className='basket'>
        {
            loading ? (
                <img src={loadingIcon} className="loading" />
                ) : (
                    <div className="products_basket">
                {
                    products?.map(item => (
                        <div className='product__card product__card-basket' key={item?.product_id}> 

                            <div className="card-body">
                                <img src="https://assets.asaxiy.uz/product/main_image/desktop//62adc2c5971c1.jpg" alt="" />
                                <div>
                                <h2 className='second_price'>{item?.prodcut_name}</h2>
                                <h3 className='product__name'>{item?.price} SUM</h3>
                                </div>
                                <div className="card-flex">
                                <div className="card-flex-right">
                                </div>
                                <div style={{textAlign: 'right'}}>
                                <h3 className='category__name'>{item?.color}</h3>
                                <h3>Soni: {item?.count}</h3>
                                <h3>O'lchami: {item?.size}</h3>
                                </div>

                                {/* <button className='btn btn-primary'>O'chirish</button> */}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            )
        }

        <div className="basket__info">
            <h2>{basketData?.price?.toLocaleString()} SUM</h2>
            <h3>{moment(basketData?.ordered_at).format('hh:mm:ss, DD MMM, YYYY')}</h3>
        </div>
        </div>
    </div>
  )
}

export default Baskets