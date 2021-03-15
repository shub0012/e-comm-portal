import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from "@material-ui/core";

import { commerce } from '../../../lib/commerce'

import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { Link,useHistory } from 'react-router-dom';

const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const classes = useStyles()
    const history = useHistory()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' } )
                setCheckoutToken(token)
                console.log(token)
            } catch (error) {
                history.pushState('/')
            }
        }

        generateToken()
    }, [cart])

    //move stepper to next step
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    //move stepper to previous step
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        //setting shippping data  to state
        setShippingData(data)

        //moving stepping to next step
        nextStep()
    }
    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm 
            shippingData={shippingData}
            checkoutToken={checkoutToken} 
            nextStep={nextStep} 
            backStep={backStep} 
            onCaptureCheckout={onCaptureCheckout}
          />

    let Confirmation = () => order.customer ? (
        <div>
            <div>
                <Typography variant="h5">Thank you for your Shopping with Us, {order.customer.firstname} </Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order Ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </div>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if(error){
        <div>
            <Typography>{error}</Typography>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </div>
    }

    return (
        <>
            <CssBaseline />
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
