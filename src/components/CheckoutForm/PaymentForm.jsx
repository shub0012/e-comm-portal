import React from 'react'
import { Typography, Button, Divider } from "@material-ui/core";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({ checkoutToken, backStep, shippingData, onCaptureCheckout, nextStep }) => {
    //console.log(checkoutToken,shippingData)
    const totalPay = shippingData.shippingCountry !== "IN" ? checkoutToken.live.subtotal.raw + checkoutToken.live.shipping.available_options[1].price.raw : checkoutToken.live.subtotal.formatted_with_symbol

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault()

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })

        if(error){
            alert(error.data.error.message)
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email,
                },
                shipping: {
                    name: 'Primary',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry,
                },
                fulfillment: {
                    shipping_method: shippingData.shippingOption
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    },
                },
            }
            onCaptureCheckout(checkoutToken.id, orderData)

            nextStep()
        }

    }

    return (
        <>
            <Review checkoutToken={checkoutToken} shippingData={shippingData} />
            <Divider />
            <Typography 
                variant="h6" 
                gutterBottom 
                style={{ margin: '20px 0'}}
            >
                Payment Option
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay { totalPay }
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
