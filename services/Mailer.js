const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

sgMail.setApiKey(keys.sendGridKey);

class Mailer {
  constructor({ subject, recipients }, htmlContent) {
    this.recipients = recipients.map(({ email }) => email.trim());
    this.isMultiple = true;

    if (this.recipients.length === 1) {
      this.recipients = this.recipients[0];
      this.isMultiple = false;
    }

    this.emails = {
      to: this.recipients,
      from: 'pauljasonhan@gmail.com',
      subject: subject,
      html: htmlContent,

      tracking_settings: {
        click_tracking: {
          enable: true,
          enable_text: true,
        },
      },

      isMultiple: this.isMultiple,
    };
  }

  async send() {
    try {
      if (!this.recipients.length) {
        return null;
      }

      return await sgMail.send(this.emails);
    } catch (err) {
      console.log(err);
    } finally {
      return null;
    }
  }
}

module.exports = Mailer;
