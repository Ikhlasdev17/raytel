import React, { useState } from 'react'

const Details = ({ id, name = '', images = [], first_price = 0, second_price = 0, description = '', category = {}, size = [], color = [], onClose, addOrder }) => {
    const [selectedImage, setSeletedImage] = useState(images[0])
    const [selectedSize, setSelectedSize] = useState(size[0])
    const [selectedcolor, setselectedcolor] = useState(color[0]);
  return (
    <div className='product__details__overlay'>
        <div className='product_details'>
        <div className="close" onClick={() => onClose(false)}>
            <i className='bx bx-x'></i>
        </div>
        <div className="product__details-images">
            <div className="images__navigation">
                {
                    images?.map((item) => (
                        <img className={`${selectedImage === item && 'active'}`} src={item} alt="IMAGE" onClick={() => setSeletedImage(item)} />
                    ))
                }
            </div>
            <img src={selectedImage} className='selected-image' alt="" />
        </div>
        <div className="product__details-content">
            <h1>{name}</h1>
            <h3 className='first__price'>{first_price}</h3>
            <h2>{second_price}</h2>
            <p>{description}</p>
            <h3>Kategoriya: {category?.name}</h3>
            <span>O'lchamni tanlang</span>
            <select onSelect={(e) => setSelectedSize(e)}>
                {
                    size?.map(x => (
                        <option value={x}>{x}</option>
                    ))
                }
            </select>
            <span>Rangni tanlang</span>
            <select onSelect={(e) => setselectedcolor(e)}>
                {
                    color?.map(x => (
                        <option value={x}>{x}</option>
                    ))
                }
            </select> 
            <button onClick={() => {
                onClose(false)
                addOrder({
                    product_id: id,
                    count: 1,
                    size: selectedSize,
                    color: selectedcolor
                })
            }} className='btn btn-primary'>Buyurtma berish</button>
        </div>
    </div>
    </div>
  )
}

export default Details