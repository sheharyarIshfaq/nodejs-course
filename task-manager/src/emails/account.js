const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "sheharyarishfaq@gmail.com",
    subject: "Thanks for joining Task Manager App",
    text: `Welcome to Task Manager App, ${name}. We are glad to partner with you.`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "sheharyarishfaq@gmail.com",
    subject: "Account Deleted!",
    text: `Hi, ${name}. Your account is deleted. Can you tell us the reason for deactivating your account. Kindly give your feedback on how we can improve our services. Thanks`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
