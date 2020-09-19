import error_types from "../controllers/error_types";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";



const emailService = {
  sendMail: async (htmlMessage, dataToSend) => {
    try {
      //genero el email
      var transporter = nodemailer.createTransport(smtpTransport({
        host: "mail.rollingcodeschool.com",
        port: 25,
        secure: false,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      }));
      const html = htmlMessage.html;
      let data = {
        from: process.env.USER_EMAIL,
        to: dataToSend,
        subject: htmlMessage.subject,
        html,
      };
      return transporter.sendMail(data);

    } catch (error) {
      throw new error_types.Error504("Error to service");
    }
  }, 
};
export default emailService;
