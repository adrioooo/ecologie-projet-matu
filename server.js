const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure SendGrid with your API Key
sgMail.setApiKey('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'); // Replace with your SendGrid API Key

// Endpoint to send an email
app.post('/api/send-email', (req, res) => {
  const { itemName, expirationDate, userEmail } = req.body;

  if (!itemName || !expirationDate || !userEmail) {
    return res.status(400).send({ message: 'Missing required fields.' });
  }

  const msg = {
    to: userEmail,
    from: 'emf.bur@gmail.com', // Replace with a verified email address on SendGrid
    subject: `Rappel: ${itemName} va bientôt périmer!`,
    text: `Hello,

Petit rappel pour vous annoncer que votre produit "${itemName}" va expirer le ${expirationDate}. Assurez-vous de l'utiliser avant cette date pour éviter le gaspillage.

Merci !`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent successfully.');
      res.status(200).send({ message: 'Email sent successfully!' });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).send({ message: 'Failed to send email.', error });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
