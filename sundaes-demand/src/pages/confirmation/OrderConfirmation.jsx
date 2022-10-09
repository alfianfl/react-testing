import {useEffect, useState} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {useOrderDetails} from "../../contexts/OrderDetails"

function OrderConfirmation({setOrderPhase}) {
    const [, , resetOrder] = useOrderDetails();
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {
        //in real app we would get order details from context
        //and send with post

        axios.post('http://localhost:3030/order')
        .then((res) => {
            setOrderNumber(res.data.orderNumber)
        }).catch(err => {
            console.log(err);
        })
    },[]);

const handleClick = () => {
    //clear the order detail
    resetOrder();

    //set back to order page
    setOrderPhase('inProgress')
}

    if(orderNumber){
        return (
            <div style={{textAlign :"center"}}>
                <h1>Thank You!</h1>
                <p>Your order number is {orderNumber}</p>
                <p style={{fontSize: '25%'}}>
                    as per our terms and conditions, nothing will happen now
                </p>
                <Button onClick={handleClick}>Create new order</Button>
            </div>
        )
    } else {
        return <div>Loading</div>
    }
}

export default OrderConfirmation