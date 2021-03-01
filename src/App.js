import React, { useState, useEffect } from 'react'
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart } from './components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
    const [prodcuts, setProdcuts] = useState([])
    const [cart, setCart] = useState({})

    //to fetch product list
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProdcuts(data)
    }

    //to fetch cart items
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }
    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    //to handle added to cart functionality
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)

        setCart(item.cart)
    }
    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={prodcuts} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={cart} />
                    </Route>
                </Switch>
            
            </div>
        </Router>
        
    )
}

export default App
