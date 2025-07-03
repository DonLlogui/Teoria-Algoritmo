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
                <div style="font-family: 'Franklin Gothic', sans-serif; color: #333;">
                    <h2>¡Hola, ${nombre}!</h2>
                    <p>Gracias por registrarte en <strong>VitalFit</strong>. Estamos felices de tenerte a bordo. 💪</p>
                    <p>¡Empieza hoy tu camino hacia un estilo de vida más saludable!</p>
                    <hr>
                    <footer style="font-size: 12px; color: #888;">© 2025 VitalFit. Todos los derechos son reservados.</footer>
                </div>
            `
        });

        console.log('📨 Correo enviado con ID:', info.messageId);
    } catch (error) {
        console.error('❌ Error al enviar el correo:', error.message);
    }
};

const enviarCorreoEdicionPerfil = async (destinatario, nombre) => {
    try {
        const info = await transporter.sendMail({
            from: '"VitalFit" <no-reply@vitalfit.com>',
            to: destinatario,
            subject: '¡Perfil actualizado correctamente en VitalFit!',
            html: `
                <div style="font-family: 'Franklin Gothic', sans-serif; color: #333;">
                    <h2>¡Hola, ${nombre}!</h2>
                    <p>Te informamos que tu perfil ha sido actualizado correctamente en VitalFit.</p>
                    <p>Si no realizaste esta modificación, contáctanos de inmediato.</p>
                    <p>Este es un mensaje automático, por favor no respondas.</p>
                    <hr>
                    <footer style="font-size: 12px; color: #888;">© 2025 VitalFit. Todos los derechos son reservados.</footer>
                </div>
            `
        });
        console.log('📨 Correo enviado con ID:', info.messageId);
    } catch (error) {
        console.error('❌ Error al enviar el correo:', error.message);
    }
}

const enviarCorreoInactivarCuenta = async (destinatario, nombre) => {
    try {
        const info = await transporter.sendMail({
            from: '"VitalFit" <no-reply@vitalfit.com>',
            to: destinatario,
            subject: '¡Su cuenta ha sido desactivada en VitalFit!',
            html: `
                <div style="font-family: 'Franklin Gothic', sans-serif; color: #333;">
                    <h2>¡Hola, ${nombre}!</h2>
                    <p>Te notificamos que tu cuenta ha sido desactivada en VitalFit.</p>
                    <p>Si no realizaste esta acción o deseas reactivar tu cuenta, por favor contáctanos.</p>
                    <p>Este es un mensaje automático, por favor no respondas.</p>
                    <hr>
                    <footer style="font-size: 12px; color: #888;">© 2025 VitalFit. Todos los derechos son reservados.</footer>
                </div>
            `
        });
        console.log('📨 Correo enviado con ID:', info.messageId);
    } catch (error) {
        console.error('❌ Error al enviar el correo:', error.message);
    }
}

module.exports = { enviarCorreoBienvenida, enviarCorreoEdicionPerfil, enviarCorreoInactivarCuenta };
