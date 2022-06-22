import React from 'react'
import axios from 'axios'
import { URL } from '../../assets/URL'
const Categories = () => {
    const [categories, setCategories] = React.useState([])
    const [show, setShow] = React.useState(false)

    React.useEffect(() => {
        axios.get(`${URL}/api/categories`)
        .then(res => {
            setCategories(res.data)
        })
    }, [])
  return (
    <div className='categories__list'>
        <div className="container">
            <div className="category__btn" onClick={() => setShow(!show)}>
                <i class='bx bx-grid-alt' ></i>
                <span>Kategoriyalar</span>
            </div>
                {/* CATEGORIES UL */}
                {
                    show && (
                        <ul className="categories">
                    {
                        categories?.map((item) => (
                            <li key={item.id} onClick={() => setShow(!show)}>{item.name}</li>
                        ))
                    }
                </ul>
                    )
                }
        </div>


        
    </div>
  )
}

export default Categories