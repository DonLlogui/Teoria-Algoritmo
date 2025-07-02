const nodemailer = require('nodemailer');
require('dotenv').config(); // Importar variables del .env

// Crear el transporte SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

// Verificar conexión (opcional pero recomendado)
transporter.verify(function (error) {
  if (error) {
    console.error('❌ Error al conectar con Mailtrap:', error.message);
  } else {
    console.log('✅ Conexión SMTP con Mailtrap verificada');
  }
});

// Función para enviar correo
const enviarCorreoBienvenida = async (destinatario, nombre) => {
  try {
    const info = await transporter.sendMail({
      from: '"VitalFit" <no-reply@vitalfit.com>',
      to: destinatario,
      subject: '¡Bienvenido a VitalFit!',
      html: `
        <h2>Hola ${nombre},</h2>
        <p>Gracias por registrarte en <strong>VitalFit</strong>. Estamos felices de tenerte a bordo. 💪</p>
        <p>¡Empieza hoy tu camino hacia un estilo de vida más saludable!</p>
      `
    });

    console.log('📨 Correo enviado con ID:', info.messageId);
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error.message);
  }
};

module.exports = { enviarCorreoBienvenida };
