const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require('../utils/emailService');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d'
  });
};

// Register User
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email (optional)
    let emailVerificationStatus = 'sent';
    let registrationMessage = 'Registration successful! Welcome to EnglishAI Chat!';
    
    try {
      const emailResult = await sendEmail({
        to: email,
        subject: 'Verify Your Email - EnglishAI Chat',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to EnglishAI Chat!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for joining EnglishAI Chat! Please click the link below to verify your email address:</p>
            <div style="margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/verify-email/${verificationToken}" 
                 style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
                Verify Email Address
              </a>
            </div>
            <p>If you didn't create this account, please ignore this email.</p>
            <p>Best regards,<br>The EnglishAI Chat Team</p>
          </div>
        `
      });
      
      if (emailResult.messageId === 'skipped') {
        console.log('📧 Email verification skipped - email not configured');
        emailVerificationStatus = 'skipped';
        registrationMessage = 'Registration successful! You can start using EnglishAI Chat immediately.';
      } else if (emailResult.error) {
        console.log('⚠️  Email verification failed but registration continued:', emailResult.error);
        emailVerificationStatus = 'failed';
        registrationMessage = 'Registration successful! However, we couldn\'t send the verification email. You can still use all features of EnglishAI Chat.';
      } else {
        console.log('✅ Verification email sent successfully');
        emailVerificationStatus = 'sent';
        registrationMessage = 'Registration successful! Please check your email to verify your account.';
      }
    } catch (emailError) {
      console.log('⚠️  Email sending failed but registration continued:', emailError.message);
      emailVerificationStatus = 'failed';
      registrationMessage = 'Registration successful! However, we couldn\'t send the verification email. You can still use all features of EnglishAI Chat.';
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: registrationMessage,
      emailVerificationStatus,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful! Welcome back!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
};

// Social Authentication Success
const socialAuthSuccess = async (req, res) => {
  try {
    const user = req.user;
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
  } catch (error) {
    console.error('Social auth success error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/auth-error`);
  }
};

// Guest Access
const guestAccess = async (req, res) => {
  try {
    // Create a temporary guest user
    const guestUser = new User({
      name: `Guest_${Date.now()}`,
      email: `guest_${Date.now()}@temp.com`,
      isGuest: true,
      isEmailVerified: true
    });

    await guestUser.save();

    // Generate token
    const token = generateToken(guestUser._id);

    res.status(200).json({
      success: true,
      message: 'Guest access granted! Explore EnglishAI Chat!',
      token,
      user: {
        id: guestUser._id,
        name: guestUser.name,
        email: guestUser.email,
        isGuest: true,
        avatar: guestUser.avatar
      }
    });

  } catch (error) {
    console.error('Guest access error:', error);
    res.status(500).json({
      success: false,
      message: 'Guest access failed. Please try again.'
    });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your email address'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email address'
      });
    }

    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // Send reset email
    try {
      await sendEmail({
        to: email,
        subject: 'Password Reset - EnglishAI Chat',
        html: `
          <h2>Password Reset Request</h2>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}">Reset Password</a>
          <p>This link will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      });

      res.status(200).json({
        success: true,
        message: 'Password reset email sent successfully!'
      });
    } catch (emailError) {
      console.log('Email sending failed:', emailError);
      res.status(500).json({
        success: false,
        message: 'Failed to send reset email. Please try again.'
      });
    }

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset failed. Please try again.'
    });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Find user with valid reset token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Update password
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful! You can now login with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset failed. Please try again.'
    });
  }
};

// Get Current User
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        avatar: user.avatar,
        isGuest: user.isGuest
      }
    });

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user information'
    });
  }
};

module.exports = {
  register,
  login,
  socialAuthSuccess,
  guestAccess,
  forgotPassword,
  resetPassword,
  getCurrentUser
};