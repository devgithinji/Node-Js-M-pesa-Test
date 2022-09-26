// //authorization
//
// let unirest = require('unirest');
// let req = unirest('GET', 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')
//     .headers({ 'Authorization': 'Bearer cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ==' })
//     .send()
//     .end(res => {
//         if (res.error) throw new Error(res.error);
//         console.log(res.raw_body);
//     });
// //response
//
// {
//     "access_token": "WM7dEppeEoAGR2SSlrI34HlOgc7Y",
//     "expires_in": "3599"
// }
//
// //stk siumilation
//
// let unirest = require('unirest');
// let req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
//     .headers({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer 54jPWYbSNB3GGE6ddgbvaFLQCYA2'
//     })
//     .send(JSON.stringify({
//         "BusinessShortCode": 174379,
//         "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjIwOTI2MTIxNDU4",
//         "Timestamp": "20220926121458",
//         "TransactionType": "CustomerPayBillOnline",
//         "Amount": 1,
//         "PartyA": 254708374149,
//         "PartyB": 174379,
//         "PhoneNumber": 254708374149,
//         "CallBackURL": "https://mydomain.com/path",
//         "AccountReference": "CompanyXLTD",
//         "TransactionDesc": "Payment of X"
//     }))
//     .end(res => {
//         if (res.error) throw new Error(res.error);
//         console.log(res.raw_body);
//     });
//
// //response
//
// {
//     "MerchantRequestID": "41345-31069607-1",
//     "CheckoutRequestID": "ws_CO_26092022121458175708374149",
//     "ResponseCode": "0",
//     "ResponseDescription": "Success. Request accepted for processing",
//     "CustomerMessage": "Success. Request accepted for processing"
// }