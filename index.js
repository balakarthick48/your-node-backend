// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/api/newsletter', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Cazpian" <${process.env.EMAIL}>`,
//       to: "balakarthick261096@gmail.com",
//       subject: 'Thanks for subscribing to our newsletter!',
//       html: `<h3>Hi there!</h3><p>Thank you for subscribing to our newsletter. We'll keep you updated.</p><p>- Team Cazpian</p>`,
//     });

//     res.status(200).send({ message: 'Acknowledgment email sent.' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send({ error: 'Email not sent' });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");
const cors = require("cors"); // Import CORS
require('dotenv').config();

const app = express();
const PORT = 5000;

const upload = multer({ dest: "uploads/" }); // Temporary folder for uploaded files

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

app.post("/send-email", upload.single("file"), async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Replace with your email
        pass: process.env.PASSWORD, // Replace with your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: "info@elevartechnology.com", // Replace with recipient email
      subject: "Contact Details",
      text: "Please find the attached Excel file with the contact details.",
      attachments: [
        {
          filename: "ContactDetails.xlsx",
          path: req.file.path, // Path to the uploaded file
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    // Delete the file after sending
    fs.unlinkSync(req.file.path);

    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

/////--------------

app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Elevar" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Thanks for subscribing to our newsletter!',
      html: `<h3>Hi there!</h3><p>Thank you for subscribing to our newsletter. We'll keep you updated.</p><p>- Team Elevar</p>`,
    });

    res.status(200).send({ message: 'Acknowledgment email sent.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ error: 'Email not sent' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.listen(5000, () => {
  console.log("Server is running on https://elevartechnology.com:5000");
});