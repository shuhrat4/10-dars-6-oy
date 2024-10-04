import { EllipsisOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

function ProductItem({ item }) {
    return (
        // <li className='w-[250px] p-5 rounded-xl bg-white shadow-md'>
        //     <img className='rounded-md' src={item.images[0]} alt="" width={200} height={300}/>
        //     <h2> Title:<b>{item.title}</b></h2>
        //     <p className='line-clamp-3'>{item.description}</p>
        //     <strong>{item.price}</strong>
        //     <p>Category <b>{item.category.name}</b></p>

        // </li>
        <li>
            <Card
                style={{
                    width: 300,
                }}
                cover={
                    <img
                        alt="example"
                        src={item.images[0]}
                    />
                }
                actions={[
                    <EllipsisOutlined  className='!scale-[1.5]' key='ellipsis' />,
                    <HeartOutlined className='!scale-[1.5]' key='ellipsis'/>,
                    <ShoppingCartOutlined className='!scale-[1.5]' key='ellipsis'/>
                ]}
            >
                <Meta
                    avatar={<Avatar src={item.category.image}/>}
                    title={item.title}
                    description={<p className='line-clamp-3' >{item.description}</p> }
                />
            </Card>
        </li>
    )
}

export default ProductItem