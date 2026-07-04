# Backend Authentication System Documentation

## Overview
This is a comprehensive authentication system with email verification, password recovery, and Google OAuth integration.

## Folder Structure

```
Server/
├── features/
│   └── Auth/
│       ├── config/
│       │   └── prisma.js              # Prisma configuration
│       ├── controllers/
│       │   ├── SignupController.js    # Sign up & OTP verification
│       │   ├── loginController.js     # Sign in & token refresh
│       │   ├── otpController.js       # OTP verification
│       │   ├── passwordController.js  # Password reset flow
│       │   └── googleAuthController.js # Google OAuth
│       ├── middleware/
│       │   ├── validate.middleware.js # Zod validation
│       │   └── authMiddleware.js      # JWT verification
│       ├── services/
│       │   ├── signUpservice.js       # User registration
│       │   ├── authService.js         # Login & token management
│       │   ├── otpService.js          # OTP generation & verification
│       │   └── passwordService.js     # Password reset logic
│       ├── utils/
│       │   ├── emailService.js        # Nodemailer integration
│       │   ├── tokenService.js        # JWT token generation
│       │   ├── rateLimiter.js         # Express rate limiting
│       │   └── ApiError.js            # Custom error class
│       ├── validations/
│       │   ├── signupSchema.js        # Sign up validation
│       │   ├── signInSchema.js        # Sign in validation
│       │   ├── otpSchema.js           # OTP validation
│       │   ├── forgotPasswordSchema.js # Forgot password validation
│       │   ├── resetPasswordSchema.js  # Password reset validation
│       │   └── googleAuthSchema.js     # Google OAuth validation
│       └── routes/
│           └── register.js            # All auth routes
├── prisma/
│   └── schema.prisma                  # Database schema
├── .env                               # Environment variables
├── package.json                       # Dependencies
├── app.js                             # Express app
└── server.js                          # Server entry point
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd Server
npm install
```

### 2. Setup Environment Variables
Create a `.env` file in the Server directory:

```env
# Database
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/eCom"

# Server
PORT=5000
NODE_ENV=development

# JWT Tokens
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_min_32_chars
REFRESH_TOKEN_EXPIRE=30d

# Email (Gmail)
SMTP_SERVICE=gmail
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend
FRONTEND_URL=http://localhost:5173

# OTP Configuration
OTP_EXPIRY=10
MAX_OTP_ATTEMPTS=5
FORGOT_PASSWORD_RATE_LIMIT=5
EMAIL_FROM=noreply@yourapp.com
```

### 3. Setup PostgreSQL Database
Ensure PostgreSQL is running and create a database:

```sql
CREATE DATABASE eCom;
```

### 4. Run Prisma Migrations
```bash
npx prisma migrate dev
```

### 5. Start the Server
```bash
npm run dev    # Development with nodemon
npm start      # Production
```

## Authentication Flow

### 1. Sign Up Flow
```
POST /api/auth/signup
├── Validate input (name, email, phone, password)
├── Check if user exists
├── Hash password with bcryptjs
├── Create user in database
├── Generate 6-digit OTP
├── Send OTP via email (Nodemailer)
└── Return user data (without password)

POST /api/auth/verify-email
├── Verify OTP against database
├── Check OTP expiry and attempts
├── Mark email as verified
├── Delete used OTP
└── User can now login

POST /api/auth/resend-otp
├── Find user by email
├── Generate new OTP
├── Delete previous OTPs
└── Send new OTP via email
```

### 2. Sign In Flow
```
POST /api/auth/login
├── Validate email and password
├── Find user by email
├── Check if email is verified
├── Verify password hash
├── Generate JWT access token (7 days)
├── Generate JWT refresh token (30 days)
├── Set tokens in httpOnly cookies
└── Return user data and access token
```

### 3. Password Recovery Flow
```
POST /api/auth/forgot-password (Rate Limited: 5 requests/15 min)
├── Find user by email
├── Generate random token
├── Hash and store token with 1-hour expiry
├── Send reset email with unhashed token
└── Return generic message (security)

POST /api/auth/reset-password
├── Find and verify reset token
├── Check token expiry
├── Hash new password
├── Update user password
├── Delete used token
└── User can login with new password
```

### 4. Google OAuth Flow
```
POST /api/auth/google
├── Verify Google ID token
├── Extract user data (email, name, googleId)
├── Check if user exists
├── If not exists: Create new user with Google data
├── If exists: Link Google ID to existing account
├── Mark email as verified
├── Generate access and refresh tokens
└── Set tokens in cookies and return user data
```

### 5. Token Management
```
POST /api/auth/refresh-token
├── Extract refresh token from cookie
├── Verify refresh token
├── Generate new access token
├── Update cookie with new token
└── Return new access token

POST /api/auth/logout
├── Clear access token cookie
├── Clear refresh token cookie
└── Return success message
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Sign in user
- `POST /api/auth/logout` - Sign out user (requires auth)
- `POST /api/auth/refresh-token` - Refresh access token

### Email Verification
- `POST /api/auth/verify-email` - Verify OTP for email
- `POST /api/auth/resend-otp` - Resend OTP

### Password Recovery
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/verify-reset-token` - Verify reset token
- `POST /api/auth/reset-password` - Reset password with token

### Social Login
- `POST /api/auth/google` - Google OAuth authentication

## Request/Response Examples

### Sign Up
**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "03001234567",
  "password": "SecurePass123@"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully. OTP sent to email",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "emailVerified": false
  }
}
```

### Verify Email
**Request:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "id": 1,
    "email": "john@example.com",
    "emailVerified": true
  }
}
```

### Sign In
**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123@"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "emailVerified": true
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

## Security Features

✅ **Password Security**
- Bcryptjs hashing with salt rounds: 10
- Complex password requirements enforced

✅ **Token Security**
- JWT tokens with expiry times
- Refresh tokens for token rotation
- HttpOnly cookies to prevent XSS
- SameSite: strict for CSRF protection

✅ **Rate Limiting**
- Login attempts: 5 per 15 minutes
- Forgot password: 5 per 15 minutes (per email)
- OTP verification: 5 attempts per 15 minutes

✅ **Email Security**
- OTP expiry: 10 minutes
- Max OTP attempts: 5 before lockout
- Reset token expiry: 1 hour
- Generic error messages (no user enumeration)

✅ **Validation**
- Zod schema validation for all inputs
- Type-safe request/response handling
- Custom error handling

## Database Schema

### User Model
```prisma
model User {
  id                    Int       @id @default(autoincrement())
  name                  String
  email                 String    @unique
  phoneNumber           String    @unique
  password              String?   // Nullable for OAuth users
  emailVerified         Boolean   @default(false)
  googleId              String?   @unique
  profileImage          String?
  lastPasswordChangeAt  DateTime?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  
  otps                  OTP[]
  forgotPasswordTokens  ForgotPasswordToken[]
}
```

### OTP Model
```prisma
model OTP {
  id        Int       @id @default(autoincrement())
  userId    Int
  code      String
  attempts  Int       @default(0)
  expiresAt DateTime
  createdAt DateTime  @default(now())
  
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### ForgotPasswordToken Model
```prisma
model ForgotPasswordToken {
  id        Int       @id @default(autoincrement())
  userId    Int
  token     String    @unique
  expiresAt DateTime
  createdAt DateTime  @default(now())
  
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## Frontend Integration

### 1. Update .env file (Client)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 2. Use Auth Service
```typescript
import authService from "@/api/services/authService";

// Sign up
const signup = await authService.signUp({
  name: "John",
  email: "john@example.com",
  phoneNumber: "03001234567",
  password: "SecurePass123@",
});

// Verify email
const verify = await authService.verifyEmail({
  email: "john@example.com",
  otp: "123456",
});

// Sign in
const login = await authService.signIn({
  email: "john@example.com",
  password: "SecurePass123@",
});

// Google OAuth
const googleResult = await authService.googleAuth(idToken);
```

### 3. Redux Integration (Already Set Up)
Token is automatically stored in Redux and localStorage after login.

## Troubleshooting

### Issue: "Email service error"
**Solution:** Check SMTP credentials in .env
- Enable "Less secure app access" for Gmail
- Use App-specific password for Gmail

### Issue: "OTP not sending"
**Solution:** Verify email configuration
- Check SMTP_EMAIL and SMTP_PASSWORD
- Ensure SMTP port is not blocked
- Check email logs in server console

### Issue: "Database connection failed"
**Solution:** Verify PostgreSQL
- Check DATABASE_URL in .env
- Ensure PostgreSQL service is running
- Run migrations: `npx prisma migrate dev`

### Issue: "Invalid JWT token"
**Solution:** Check token configuration
- Ensure JWT_SECRET is set and has 32+ characters
- Clear browser cookies and try again
- Check token expiry times

## Next Steps

1. ✅ Setup Google OAuth credentials
2. ✅ Configure email service credentials
3. ✅ Deploy to production
4. ✅ Add 2FA (Two-Factor Authentication)
5. ✅ Add email confirmation resend functionality
6. ✅ Add user profile endpoints

## Support

For issues or questions, check:
- Server logs in terminal
- Browser console for frontend errors
- Postman collection for API testing
