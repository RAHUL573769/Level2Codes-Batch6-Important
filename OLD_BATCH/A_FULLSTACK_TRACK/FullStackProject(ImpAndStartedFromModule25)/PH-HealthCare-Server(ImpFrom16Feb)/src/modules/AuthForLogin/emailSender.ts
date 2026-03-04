// import config from "../../config";

// import nodemailer from "nodemailer";

// // Create a transporter using Ethereal test credentials.
// // For production, replace with your actual SMTP server details.
// const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // Use true for port 465, false for port 587
//     auth: {
//         user: config.emailSenders.email,
//         pass: config.emailSenders.APP_PASSWORD
//     },
// });

// // Send an email using async/await
// (async () => {
//     const info = await transporter.sendMail({
//         from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
//         to: "bar@example.com, baz@example.com",
//         subject: "Hello ✔",
//         text: "Hello world?", // Plain-text version of the message
//         html: "<b>Hello world?</b>", // HTML version of the message
//     });

//     console.log("Message sent:", info.messageId);
// })();



// const emailSender = () => {
//     try {

//     } catch (error) {
//         nex
//     }
// }


import config from "../../config";
import nodemailer from "nodemailer";

const emailSender = async (
    email: string,
    html: string
) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: config.emailSenders.email,
            pass: config.emailSenders.APP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: '"PH Health Care" <fahimfiroz.ph@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Reset Password Link", // Subject line
        //text: "Hello world?", // plain text body
        html, // html body
    });

    //console.log("Message sent: %s", info.messageId);
}
export default emailSender;