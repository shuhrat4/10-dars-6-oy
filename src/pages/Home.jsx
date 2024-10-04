import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductItem from '../componets/ProductItem';
import { Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
function Home() {
  const [products, setProduct] = useState([])
  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/products?offset=1&limit=20").then(res => {
      setProduct(res.data);

    })
  }, [])

  return (
    <>
    <div className='p-10'>
    <div className='mb-5'>
      <Input allowClear className='w-[350px]' size='large' placeholder='Search products'/>
    </div>
      <ul className='flex justify-between flex-wrap gap-5 '>
        {products.map(item => <ProductItem key={item.id} item={item} />)}
      </ul>
      <LoadingOutlined  className='text-blue-900' style={{fontSize:'60px'}}/>
      </div>
    </>
  )
}

export default Home