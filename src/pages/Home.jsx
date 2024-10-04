import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../componets/ProductItem';
import { Input, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useDebounce from '../hook/useDebounce';

function Home() {
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState(""); // setSeaarchValue -> setSearchValue
  const searchWaitingValue = useDebounce(searchValue, 800);

  function handleProductsSearchd(e) {
    setSearchValue(e.target.value); // Qidiruv qiymatini yangilash
  }

  // Select change
  const [categoryData, setCategoryData] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const onChange = (value) => {
    setIsLoading(true);
    setTimeout(() => setCategoryId(value), 1000);
  };

  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/categories").then(res => {
      setCategoryData(res.data.map(item => ({
        value: item.id,
        label: item.name,
      })));
    });
  }, []);

  // Qidiruv va kategoriya o'zgarganda mahsulotlarni olish
  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://api.escuelajs.co/api/v1/products/`, {
      params: {
        title: searchWaitingValue,
        categoryId: categoryId,
        offset: 1,
        limit: 20,
      }
    }).then(res => {
      setProduct(res.data);
      setIsLoading(false);
    });
  }, [searchWaitingValue, categoryId]);

  return (
    <>
      <div className='p-10'>
        <div className='mb-5 space-x-4'>
          <Input
            onChange={handleProductsSearchd} 
            allowClear
            className='w-[350px]'
            size='large'
            placeholder='Search products'
          />
          <Select
            className='w-[300px]'
            size='large'
            showSearch
            placeholder="Choose category"
            optionFilterProp="label"
            onChange={onChange}
            options={categoryData}
          />
        </div>
        <ul className='flex justify-between flex-wrap gap-5 '>
          {isLoading ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : products.map(item => <ProductItem key={item.id} item={item} />)}
        </ul>
      </div>
    </>
  );
}

export default Home;
