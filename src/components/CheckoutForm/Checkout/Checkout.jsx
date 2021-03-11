import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@material-ui/core";

import { commerce } from '../../../lib/commerce'

import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({ cart }) => {
    const classes = useStyles()
    const [activeStep, setActiveSTep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' } )
                setCheckoutToken(token)
            } catch (error) {
                
            }
        }

        generateToken()
    }, [cart])

    //move stepper to next step
    const nextStep = () => setActiveSTep((prevActiveStep) => prevActiveStep + 1)
    //move stepper to previous step
    const backStep = () => setActiveSTep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        //setting shippping data  to state
        setShippingData(data)

        //moving stepping to next step
        nextStep()
    }
    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} />

    const Confirmation = () => (
        <div>
            order successful
        </div>
    )

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography varient="h4" align="center">Checkout and Payment</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout
