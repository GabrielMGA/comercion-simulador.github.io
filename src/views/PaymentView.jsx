import { useEffect, useState } from "react";
import { authRequets } from "../api/transaction";

import productLogo from '../assets/img/phone.jpg'

const cartInfo = {
    amount: 10000,
    currency: 840,
    items: [
        {
            description: "Converse Shoes",
            quantity: 2,
            amount: 5000,
            sku: "SG999999",
            type: "SPORTING_GOODS"
        }
    ],
    billing_address: {
        alias_name: "Name",
        country: 484,
        state: "Puebla",
        zip_code: "73310",
        address: "Av. siempre viva.",
        floor_apartment: "No. 3",
        city: "City address"
    },
    customer: {
        phone: {
            cc: "001",
            number: "3123334455"
        },
        email: "example@mail.com"
    }
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const PaymentView = () => {
    const [orderId, setOrderId] = useState('')
    const [response, setResponse] = useState({})
    const [request, setRequest] = useState(cartInfo)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const uuid = uuidv4().replace(/-/g, '');
        setOrderId(uuid);
        setRequest({
            order_id: uuid,
            ...request,
            success_url: `${location.origin}/success`,
            cancel_url: `${location.origin}/cancel`
        })
    }, [])

    const handleClick = () => {
        setLoading(true)
        authRequets(request)
            .then(response => {
                if (response?.status === 200) {
                    setLoading(false)
                    setResponse(response.data)
                    if (response.data?.redirection_url) {
                        console.log('redirecting payment page');
                        setTimeout(() => {
                            window.location.replace(response.data.redirection_url);
                        }, 5000)
                    }
                    return;
                }

                // TODO: do something with the error
                console.log("::: error => ", response.error);
                setResponse(response?.error)
            })
            .catch(() => {
                setLoading(false)
            })
            .finally(_ => {
                // TODO: hide loading here
                setLoading(false)
            });
    };


    return (
        <>
            <main className="page">
                <section className="shopping-cart dark">
                    <div className="container">
                        <div className="block-heading">
                            <h1>El pentagono</h1>
                            <b>Order id: </b>{orderId}
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="col-md-12 col-lg-8">
                                    <div className="items">
                                        <div className="product">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <img className="img-fluid mx-auto d-block image" src={productLogo} />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="info">
                                                        <div className="row">
                                                            <div className="col-md-5 product-name">
                                                                <div className="product-name">
                                                                    <a href="#">Lorem Ipsum dolor</a>
                                                                    <div className="product-info">
                                                                        <div>Display: <span className="value">5 inch</span></div>
                                                                        <div>RAM: <span className="value">4GB</span></div>
                                                                        <div>Memory: <span className="value">32GB</span></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 quantity">
                                                                <label htmlFor="quantity">Quantity:</label>
                                                                <input id="quantity" type="number" className="form-control quantity-input" />
                                                            </div>
                                                            <div className="col-md-3 price">
                                                                <span>$120</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-4">
                                    <div className="summary">
                                        <h3>Summary</h3>
                                        <div className="summary-item"><span className="text">Subtotal</span><span className="price">$360</span></div>
                                        <div className="summary-item"><span className="text">Discount</span><span className="price">$0</span></div>
                                        <div className="summary-item"><span className="text">Shipping</span><span className="price">$0</span></div>
                                        <div className="summary-item"><span className="text">Total</span><span className="price">$360</span></div>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-lg btn-block"
                                            onClick={handleClick}
                                            disabled={loading}>
                                            {
                                                loading &&
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            }
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <pre id="json">
                                        {JSON.stringify(request, null, 2)}
                                    </pre>
                                </div>
                                <div className="col-md-6">
                                    <pre id="json">
                                        {JSON.stringify(response, null, 2)}
                                    </pre>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input type="text" />
                                    <br />
                                    <small className="text-danger">validacion no exitosa</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PaymentView;
