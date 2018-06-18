import * as sendgridTransport from 'nodemailer-sendgrid-transport';

export = {
  transport: sendgridTransport({
    auth: {
      api_key: 'key',
    },
  }),
  defaults: {
    from: '"nest-mailer" <noreply@unizonn.com>',
  },
  templateDir: './src/common/email-templates',
};