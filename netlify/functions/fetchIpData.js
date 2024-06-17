const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const apiKey = process.env.ipAddress_api;
    const userId1 = process.env.emailJS_uid_1;
    const userId2 = process.env.emailJS_uid_2;

    const response = await fetch(`https://api.ipdata.co/?api-key=${apiKey}`, {
        headers: {
            'Accept': 'application/json'
        }
    });

    const data = await response.json();
    return {
        statusCode: 200,
        body: JSON.stringify({
            ...data,
            userId1,
            userId2
        })
    };
};