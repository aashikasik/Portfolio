const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Replace with your email and app password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'asikasat777@gmail.com',
        pass: 'YOUR_APP_PASSWORD' // Use Gmail App Password, not your real password
    }
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: email,
            to: 'asikasat777@gmail.com',
            subject: `Portfolio Contact from ${name}`,
            text: message,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong><br>${message}</p>`
        });
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));