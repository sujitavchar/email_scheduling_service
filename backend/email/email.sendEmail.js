import nodemailer from "nodemailer";

let transporter;

async function initEthereal() {
  if (transporter) return transporter;

  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  console.log("Ethereal account ready");
  return transporter;
}

async function sendEtherealEmail(email) {
  const transport = await initEthereal();

  const info = await transport.sendMail({
    from: `"${email.name}"`,
    to: email.to_email,
    subject: email.subject,
    text: email.body,
  });

  console.log("Email sent:", info.messageId);
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}

export { sendEtherealEmail };
