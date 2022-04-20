var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();
var nodemailer = require('nodemailer');
const Mail = require('nodemailer/lib/mailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/'), async (req, res, next) => {

  var Nombre = req.body.Nombre;
  var Telefono = req.body.Telefono;
  var Mail = req.body.mail;
  var Curriculum = req.body.Curriculum;

  console.log(req.body)

  var obj = {
    to: 'gftardini8@gmail.com',
    subject: 'CONTACTO WEB',
    html: Nombre + " se contactó a través de la web y quiere mas información al correo : " + Mail + 
     ". <br> Tambien nos deja su número de contacto : " + Telefono + ". <br> Su CV es: " + Curriculum
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
    })
  var info = await transport.sendMail(obj);

  res.render('contacto',{
    message: 'mensaje enviado correctamente'
  })


}