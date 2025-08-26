const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️  Email credentials not configured. Email sending will be skipped.');
    return null;
  }

  // For development, you can use a service like Gmail or a testing service like Ethereal
  return nodemailer.createTransport({
    service: 'gmail', // or use SMTP settings
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email function
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    
    // If no transporter (email not configured), skip sending
    if (!transporter) {
      console.log('📧 Email sending skipped - no email configuration');
      return { messageId: 'skipped', info: 'Email credentials not configured' };
    }
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@englishaichat.com',
      to,
      subject,
      html,
      text
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    // Don't throw error to prevent registration failure
    return { error: error.message, messageId: 'failed' };
  }
};

// Send welcome email
const sendWelcomeEmail = async (user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Welcome to EnglishAI Chat!</h2>
      <p>Hi ${user.name},</p>
      <p>Thank you for joining EnglishAI Chat! We're excited to help you on your English learning journey.</p>
      <p>Get started by exploring our AI-powered conversation features and personalized learning tools.</p>
      <div style="margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL}/dashboard" 
           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
          Start Learning
        </a>
      </div>
      <p>Best regards,<br>The EnglishAI Chat Team</p>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: 'Welcome to EnglishAI Chat!',
    html
  });
};

// Send password reset email
const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>Hi ${user.name},</p>
      <p>You requested a password reset for your EnglishAI Chat account.</p>
      <p>Click the button below to reset your password:</p>
      <div style="margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
      </div>
      <p>This link will expire in 10 minutes.</p>
      <p>If you didn't request this password reset, please ignore this email.</p>
      <p>Best regards,<br>The EnglishAI Chat Team</p>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: 'Password Reset - EnglishAI Chat',
    html
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail
};