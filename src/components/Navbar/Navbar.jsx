import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'

import useStyles from './styles'

const Navbar = ({ totalItems }) => {
    const iconUrl = "https://img.icons8.com/bubbles/50/000000/shopify.png"
    const classes = useStyles()
    return (
        <>
          <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography variant="h6" className={classes.title} color="inherit">
                    <img src={iconUrl}  alt="ShubKart" height="40px" className={classes.image} />
                    ShuBKart
                </Typography>
                <div className={classes.grow} />
                <div className={classes.button} >
                  <IconButton aria-label="Show cart Item" color="inherit">
                    <Badge badgeContent={totalItems} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </div>
            </Toolbar>
          </AppBar>   
        </>
    )
}

export default Navbar
