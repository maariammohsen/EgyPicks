const nodeMailer = require('nodemailer');
const generateEmailContent = require('./emailTemplates');
const htmltotext = require('html-to-text');
class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
  }

  newTransporter() {
    return nodeMailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = generateEmailContent({ firstName: this.firstName });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: this.to,
      subject,
      html,
      text: htmltotext.convert(html),
    };
    await this.newTransporter().sendMail(mailOptions);
  }
}

module.exports = Email;
