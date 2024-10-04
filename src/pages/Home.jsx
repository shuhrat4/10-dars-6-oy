import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductItem from '../componets/ProductItem';
import { Input, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useDebounce from '../hook/useDebounce';
function Home() {
  const [products, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSeaarchValue] = useState("")
  function handleProductsSearchd(e) {}
  const searchWaitingValue = useDebounce(searchValue, 800)

  //selec change start
  const [categoryData, setCategoryData] = useState([])
  const [categoryId, setCategoryId] = useState(null)
  const onChange = (value) => {
   setIsLoading(true)
   setTimeout(() => setCategoryId(value), 1000);
  };

  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/categories").then(res => {
      setCategoryData(res.data.map(item => {
        const data = {
          value:item.id,
          label:item.name
        }
        return data
      }));
      
    })
  },[])
//seleced end

useEffect(() => {
  axios.get(`https://api.escuelajs.co/api/v1/products/?title=${searchWaitingValue}&offset=1&limit=20`,{
    params:{
      categoryId:categoryId
    }
  }).then(res => {
    setProduct(res.data);
    setIsLoading(false)
  })
},[searchWaitingValue,categoryId ])

  return (
    <>
      <div className='p-10'>
        <div className='mb-5 space-x-4'>
          <Input onChange={handleProductsSearchd} allowClear className='w-[350px]' size='large' placeholder='Search products' />
          <Select
          className='w-[300px]'
          size='large'
            showSearch
            placeholder="Choose cetegory"
            optionFilterProp="label"
            onChange={onChange}
            options={categoryData}
          />
        </div>
        <ul className='flex justify-between flex-wrap gap-5 '>

          {products.map(item => <ProductItem key={item.id} item={item} />)}
        </ul>
      </div>
    </>
  )
}

export default Home