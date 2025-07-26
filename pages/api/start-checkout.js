// pages/api/start-checkout.js

export default async function handler(req, res) {
    console.log(req.method);
  if (req.method === 'POST') {
    try {
      const requestData = req.body;

      const makeResponse = await fetch('https://hook.us1.make.com/khkth0r3gis9wznsslctqug864qarnkf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const data = await makeResponse.json();

      res.status(200).json(data);
    } catch (error) {
      console.error('Error calling Make.com:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
