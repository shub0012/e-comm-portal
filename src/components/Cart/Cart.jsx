import React from 'react'
import { Container, Typography, Button, Grid } from "@material-ui/core";

import useStyles from './styles'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles()

    const EmptyCart = () => (
        <>
        <Typography variant="subtitle1" dangerouslySetInnerHTML={{ __html: "Your Cart is Empty &#128562 !!!" }} />
        <br />
        <Typography component={Link} to="/" variant="subtitle1" dangerouslySetInnerHTML={{ __html: "Start Adding &#128151" }} />
        </>
        
    
    )
    
    const FilledCart = () => (
        <div>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Total: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Proceed to Payment</Button>
                </div>
            </div>
        </div>
    )
    
    if(!cart.line_items){
        return ("Your Cart is loading!! Please Wait :)")
    } 

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography variant="h3" className={classes.title} gutterBottom >Your Shopping Cart</Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
        </Container>
    )
}

export default Cart
