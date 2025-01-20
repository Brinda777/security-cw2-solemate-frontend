import React, { useEffect, useState } from 'react'
import './Popular.css'
import { getPopularProductsApi } from '../../apis/Api'
import Item from '../Item/Item'

const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([])

  useEffect(() => {
    getPopularProductsApi().then((res) => {
      
      setPopularProducts(res.data.products)

    }).catch((error) => {
      console.log(error)
    })
  }, [])

  console.log(popularProducts)
  return (
    <div className='popular'>
      <h1>POPULAR PRODUCTS</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.slice(0,8).map((item,i)=>{
          return <Item key={i} id={item._id} name={item.title} image={item.imageUrl} price={item.price} description={item.description} category={item.category} />
        })}
      </div>
    </div>
  )
}

export default Popular
