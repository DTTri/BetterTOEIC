import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (to: string, verifiedEmailToken: string, userName: string) => {
  const verificationLink = `http://localhost:5173/verifyEmail/${verifiedEmailToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Welcome to BetterTOEIC - the best choice to study English and to prepare for TOEIC exam, ${userName}!`,
    text: `Click the following link to verify your email: ${verificationLink}. The link will expire in 24 hours.`,
  };

  await transporter.sendMail(mailOptions);
};
const sendForgotPasswordEmail = async (to: string, forgotPasswordToken: string) => {
  const forgotPasswordLink = `http://localhost:5173/reset-password/${forgotPasswordToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Reset your password',
    text: `Click the following link to reset your password: ${forgotPasswordLink}. The link will expire in 24 hours.`,
  };

  await transporter.sendMail(mailOptions);
};

export { sendVerificationEmail, sendForgotPasswordEmail };
