const nodeMailer = require('nodemailer');
const emailTemplates = require('./emailTemplates');
const htmltotext = require('html-to-text');
class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.Fname;
    this.url = url;
  }

  newTransporter() {
    return nodeMailer.createTransport({
      host: process.env.EMAIL_HOST, // smtp = simple mailing transfer protocal
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: this.to,
      subject,
      html: template,
      text: htmltotext.convert(template),
    };
    await this.newTransporter().sendMail(mailOptions);
  }
  async welcomeMail(subject) {
    const html = emailTemplates.welcomeEmailTemplate({
      firstName: this.firstName,
    });
    await this.send(html, subject);
  }
  async resetMail(code, subject) {
    const html = emailTemplates.resetEmailTemplate({
      firstName: this.firstName,
      code,
    });
    await this.send(html, subject);
  }
}

module.exports = Email;
