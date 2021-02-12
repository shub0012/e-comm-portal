import React, { useState, useEffect } from 'react'
import { commerce } from "./lib/commerce";
import { Products, Navbar } from './components'

const App = () => {
    const [prodcut, setProdcut] = useState([])

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProdcut(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div>
            <Navbar />
            <Products />
        </div>
    )
}

export default App
