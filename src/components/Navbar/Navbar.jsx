import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'

import useStyles from './styles'

const Navbar = ({ totalItems }) => {
    const iconUrl = "https://img.icons8.com/bubbles/50/000000/shopify.png"
    const classes = useStyles()
    const location = useLocation()

    return (
        <>
          <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                    <img src={iconUrl}  alt="ShubKart" height="40px" className={classes.image} />
                    ShuBKart
                </Typography>
                <div className={classes.grow} />
                {location.pathname === "/" && (
                <div className={classes.button} >
                <IconButton component={Link} to="/cart" aria-label="Show cart Item" color="inherit">
                  <Badge badgeContent={totalItems} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </div>)}
            </Toolbar>
          </AppBar>   
        </>
    )
}

export default Navbar
