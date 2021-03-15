import React from 'react'
import { Typography, List,ListItem, ListItemText } from "@material-ui/core";

const Review = ({ checkoutToken, shippingData }) => {

    const ShippingCharge = shippingData.shippingCountry !== "IN" ? checkoutToken.live.shipping.available_options[1].price.formatted_with_symbol : checkoutToken.live.shipping.available_options[0].price.formatted_with_symbol 
    
    return (
        <>
            <Typography variant="h6" gutterBottom>Cart Summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product) => (
                    <ListItem style={{padding: '10px 0'}} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{padding: '10px 0'}}>
                    <ListItemText primary="Total" />
                    <Typography style={{fontWeight: 700 }}>
                        {checkoutToken.live.subtotal.formatted_with_symbol }
                    </Typography>
                </ListItem>
                <ListItem style={{padding: '10px 0'}}>
                    <ListItemText primary="Shipping Charge" />
                    <Typography style={{fontWeight: 700 }}>
                        {ShippingCharge }
                    </Typography>
                </ListItem>
            </List>   
        </>
    )
}

export default Review
