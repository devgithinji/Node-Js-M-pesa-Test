const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();

const cors = require('cors')
const axios = require("axios");
const moment = require("moment")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.get('/', (req, res) => {
    res.json({msg: 'hello dennis'})
})

app.use(async (req, res, next) => {
    const secret = process.env.MPESA_CONSUMER_SECRET
    const consumer = process.env.MPESA_CONSUMER_KEY

    const token = new Buffer.from(`${consumer}:${secret}`).toString("base64")

    try {
        const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: {
                Authorization: `Basic ${token}`
            }
        })
        req.body.access_token = response.data.access_token
        next()
    } catch (e) {
        console.log(e)
    }
})


const getTimeStamp = () => {
    return moment().format('YYYYMMDDHHmmss')
}


app.post('/stk', async (req, res) => {
    const {phone, amount, access_token} = req.body;
    const formattedPhoneNumber = `254${phone.substring(1)}`


    const shortCode = process.env.MPESA_PAYBILL;
    const passKey = process.env.MPESA_PASSKEY;
    const timestamp = getTimeStamp();
    const password = new Buffer.from(shortCode + passKey + timestamp).toString("base64")

    try {
        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
            "BusinessShortCode": shortCode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline", //till CustomerBuyGoodsOnline
            "Amount": amount,
            "PartyA": formattedPhoneNumber,
            "PartyB": shortCode,
            "PhoneNumber": formattedPhoneNumber,
            "CallBackURL": "https://be2b-197-183-219-71.eu.ngrok.io/stk_callback",
            "AccountReference": formattedPhoneNumber,
            "TransactionDesc": "Test"
        }, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        console.log(response)
        res.status(200).json(response.data)

    } catch (e) {
        console.log(e)
        res.status(400).json(e.message)
    }
})

app.post('/stk_callback', (req, res) => {
    console.log('-------STK------')
    console.log(req.body)
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`app running on port ${port}`)
})