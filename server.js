const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = 3000; // Port utilisé par le serveur

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure SendGrid avec la clé en dur
sgMail.setApiKey('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'); 

// Endpoint pour envoyer un email
app.post('/api/send-email', (req, res) => {
  const { itemName, expirationDate, userEmail } = req.body;

  if (!itemName || !expirationDate || !userEmail) {
    return res.status(400).send({ message: 'Missing required fields.' });
  }

  const msg = {
    to: userEmail,
    from: 'emf.bur@gmail.com', // Remplace par un email vérifié sur SendGrid
    subject: `Rappel: ${itemName} va bientôt périmer!`,
    text: `Hello,

Petit rappel pour vous annoncer que votre produit "${itemName}" va expirer le ${expirationDate}. Assurez-vous de l'utiliser avant cette date pour éviter le gaspillage.

Merci !`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email envoyé avec succès.');
      res.status(200).send({ message: 'Email envoyé avec succès !' });
    })
    .catch((error) => {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
      res.status(500).send({ message: 'Échec de l\'envoi de l\'email.', error });
    });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur actif sur http://localhost:${PORT}`);
});
