import React from 'react'
import {Grid} from '@material-ui/core'

import Product from './Product/Product'
import ProductsCarousel from './ProductsCarousel'
import useStyles from './styles'

// const products = [
//     {id:1, name:'Nike Shoes', description:'Nike Running Shoes', price: '$200', image:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9094123f-f624-4f32-9df8-9093bcc4c0ee/flyby-mid-basketball-shoe-Q2Gp58.jpg'},
//     {id:2, name:'Dell Laptop', description:'Dell Gaming Laptop', price:'$1500', image:'https://i.dell.com/sites/csimages/Video_Imagery/all/laptops-g-series-g7-17-7700-gaming-notebook-thumbnail-1280x720.jpg'},
// ]
const Products = ({ products, onAddToCart }) => {
    const classes = useStyles()
    return (
        <main className={classes.content}>
        <div className={classes.toolbar} />
            <ProductsCarousel products={products} onAddToCart={onAddToCart} />
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products
