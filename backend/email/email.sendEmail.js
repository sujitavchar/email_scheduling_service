import nodemailer from "nodemailer";

async function sendEtherealEmail(email) {
  try {
    const testAccount= await nodemailer.createTestAccount();
    const transporter= nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: email.sender_id,
      to: email.to_email,
      subject: email.subject,
      text: email.body,
    });

    console.log("Email sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));



  } catch (err) {
    console.error("Failed to send email:", email.id, err.message);
    throw err;
  }
}

export {sendEtherealEmail};
