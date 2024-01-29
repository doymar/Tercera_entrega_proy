import { Router } from "express";
import { transporter } from "../utils/nodemailer.js";
import { __dirname } from '../utils/utils.js';
import { client } from "../utils/twilio.js";
import config from '../config/config.js'

const router = Router();

router.get('/', async (req,res) => {
    const mailOptions = {
        from: 'DoymarEcommers',
        to: 'doymarurbina@gmail.com',
        subject: 'Prueba Ecommers',
        //text: 'Primera prueba mail',
        html: "<h1>Primer h1 de prueba nodemailer</h1>",
        attachments: [{ path: __dirname + "/Ecommers.jpg" }],
    }
    await transporter.sendMail(mailOptions);
    res.send('Email enviado')
});

// twilio
router.get("/twilio/WS", async (req, res) => {
    const options = {
      body: "TWILIO PRUEBA",
      to: "whatsapp:+5491123900507",
      from: config.twilio_whatsapp_number, 
    };
    await client.messages.create(options);
    res.send("TWILIO WS");
});

router.get("/twilio/SMS", async (req, res) => {
    const options = {
      body: "TWILIO PRUEBA",
      to: "+5491123900507",
      from: config.twilio_phone_number, 
    };
    await client.messages.create(options);
    res.send("TWILIO SMS");
});

export default router;
