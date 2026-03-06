import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { prisma } from "./prisma";
// import config from "../config";

import nodemailer from "nodemailer";
import config from "../config";
import { prisma } from "./prisma";

/* ----------------------------- */
/* Nodemailer Transporter */
/* ----------------------------- */

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config.APP_GMAIL,
        pass: config.APP_PASSWORD,
    },
});

/* ----------------------------- */
/* Better Auth Config */
/* ----------------------------- */

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    /* ----------------------------- */
    /* Extend User Fields */
    /* ----------------------------- */

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER",
                required: false,
            },

            phone: {
                type: "string",
                required: false,
            },

            status: {
                type: "string",
                required: false,
            },
        },
    },

    /* ----------------------------- */
    /* Email + Password Login */
    /* ----------------------------- */

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        autoSignIn: false,

    },

    /* ----------------------------- */
    /* Email Verification */
    /* ----------------------------- */

    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }) => {
            try {
                console.log("Email verification triggered");
                console.log("User:", user.email);
                console.log("Token:", token);

                const verificationEmail = url;

                const info = await transporter.sendMail({
                    from: `"Your App" <${config.APP_GMAIL}>`,
                    to: user.email,
                    subject: `Hello ${user.name}, Please verify your Email ✔`,
                    text: `Verify your email using this link: ${verificationEmail}`,

                    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Email Verification</title>

<style>
body {
margin:0;
padding:0;
background-color:#f4f6f8;
font-family: Arial, Helvetica, sans-serif;
}

.container {
max-width:600px;
margin:40px auto;
background:#ffffff;
border-radius:8px;
overflow:hidden;
box-shadow:0 4px 10px rgba(0,0,0,0.05);
}

.header {
background:#4f46e5;
color:white;
padding:30px;
text-align:center;
font-size:24px;
font-weight:bold;
}

.content {
padding:40px 30px;
color:#333;
line-height:1.6;
font-size:16px;
}

.button {
display:inline-block;
margin-top:25px;
padding:14px 28px;
background:#4f46e5;
color:#ffffff !important;
text-decoration:none;
border-radius:6px;
font-weight:bold;
}

.footer {
text-align:center;
padding:20px;
font-size:13px;
color:#888;
background:#fafafa;
}

.link {
word-break:break-all;
color:#4f46e5;
}
</style>

</head>

<body>

<div class="container">

<div class="header">
Verify Your Email
</div>

<div class="content">

<p>Hello ${user.name || ""},</p>

<p>
Thank you for signing up. Please confirm your email address by clicking the button below.
</p>

<center>
<a href="${verificationEmail}" class="button">
Verify Email
</a>
</center>

<p style="margin-top:30px;">
If the button doesn't work, copy and paste this link into your browser:
</p>

<p class="link">
${verificationEmail}
</p>

<p>
This link will expire for security reasons.
</p>

<p>
If you did not create an account, you can safely ignore this email.
</p>

</div>

<div class="footer">
© 2026 Your Company. All rights reserved.
</div>

</div>

</body>
</html>
`,
                });

                console.log("Verification email sent:", info.messageId);
            } catch (error) {
                console.error("Email sending failed:", error);
            }
        },
    },

    /* ----------------------------- */
    /* Security */
    /* ----------------------------- */

    trustedOrigins: ["http://localhost:3000"],

    advanced: {
        disableOriginCheck: true,
    },
});