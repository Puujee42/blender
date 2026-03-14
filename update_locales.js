const fs = require('fs');

const enPath = './messages/en.json';
const mnPath = './messages/mn.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const mnData = JSON.parse(fs.readFileSync(mnPath, 'utf8'));

const loginEn = {
  "home": "Home",
  "verify": "VERIFY",
  "code": "CODE",
  "sign": "SIGN",
  "in": "IN",
  "enter6DigitCode": "Enter the 6-digit code sent to your email.",
  "accessDashboard": "Access your dashboard and manage your bookings.",
  "emailAddress": "Email Address",
  "password": "Password",
  "forgotPassword": "Forgot Password?",
  "signIn": "Sign In",
  "verifyCode": "Verify Code",
  "backToLogin": "Back to Login",
  "newHere": "New here?",
  "signUp": "Sign Up",
  "wrongPassword": "Wrong password. Try again.",
  "accountNotFound": "Account not found.",
  "invalidCredentials": "Invalid credentials.",
  "invalidCode": "Invalid code.",
  "verificationCodeSent": "Verification code sent to your email.",
  "emailVerificationNotAvailable": "Email verification not available for this account.",
  "mfaCodeSent": "MFA code sent to your email.",
  "mfaRequiredNoEmail": "MFA required, but no email factor found.",
  "passwordResetRequired": "Password reset required.",
  "loginVerificationRequired": "Login verification required (Status: {status}).",
  "moreStepsRequired": "Status: {status}. More steps required."
};

const registerEn = {
  "home": "Home",
  "verify": "VERIFY",
  "email": "EMAIL",
  "join": "JOIN",
  "theCrew": "THE CREW",
  "enterVerificationCode": "Enter the verification code sent to your email.",
  "createAccountDesc": "Create your account and start booking.",
  "fullName": "Full Name",
  "emailAddress": "Email Address",
  "password": "Password",
  "createAccount": "Create Account",
  "verifyButton": "Verify",
  "resendCode": "Resend Code",
  "alreadyMember": "Already a member?",
  "signIn": "Sign In",
  "missingRequiredFields": "Missing required fields.",
  "registrationIncomplete": "Registration incomplete (Status: {status}).",
  "registrationFailed": "Registration failed.",
  "verificationIncomplete": "Verification incomplete (Status: {status}).",
  "invalidCode": "Invalid code."
};

const loginMn = {
  "home": "Нүүр",
  "verify": "БАТАЛГААЖУУЛАХ",
  "code": "КОД",
  "sign": "НЭВТРЭХ",
  "in": "ХЭСЭГ",
  "enter6DigitCode": "Имэйлээр илгээсэн 6 оронтой кодыг оруулна уу.",
  "accessDashboard": "Хяналтын самбар руу нэвтэрч захиалгаа удирдах.",
  "emailAddress": "Имэйл хаяг",
  "password": "Нууц үг",
  "forgotPassword": "Нууц үг мартсан уу?",
  "signIn": "Нэвтрэх",
  "verifyCode": "Код баталгаажуулах",
  "backToLogin": "Нэвтрэх хэсэг рүү буцах",
  "newHere": "Шинэ хэрэглэгч үү?",
  "signUp": "Бүртгүүлэх",
  "wrongPassword": "Нууц үг буруу байна. Дахин оролдоно уу.",
  "accountNotFound": "Бүртгэл олдсонгүй.",
  "invalidCredentials": "Нэвтрэх мэдээлэл буруу байна.",
  "invalidCode": "Код буруу байна.",
  "verificationCodeSent": "Баталгаажуулах код имэйл рүү илгээгдлээ.",
  "emailVerificationNotAvailable": "Энэ бүртгэлд имэйл баталгаажуулалт боломжгүй байна.",
  "mfaCodeSent": "MFA код имэйл рүү илгээгдлээ.",
  "mfaRequiredNoEmail": "MFA шаардлагатай боловч имэйл олдсонгүй.",
  "passwordResetRequired": "Нууц үг сэргээх шаардлагатай.",
  "loginVerificationRequired": "Нэвтрэх баталгаажуулалт шаардлагатай (Төлөв: {status}).",
  "moreStepsRequired": "Төлөв: {status}. Нэмэлт алхам шаардлагатай."
};

const registerMn = {
  "home": "Нүүр",
  "verify": "БАТАЛГААЖУУЛАХ",
  "email": "ИМЭЙЛ",
  "join": "НЭГДЭХ",
  "theCrew": "БАГТ",
  "enterVerificationCode": "Имэйлээр илгээсэн баталгаажуулах кодыг оруулна уу.",
  "createAccountDesc": "Бүртгэл үүсгээд цаг захиалж эхлээрэй.",
  "fullName": "Бүтэн Нэр",
  "emailAddress": "Имэйл хаяг",
  "password": "Нууц үг",
  "createAccount": "Бүртгэл үүсгэх",
  "verifyButton": "Баталгаажуулах",
  "resendCode": "Код дахин илгээх",
  "alreadyMember": "Бүртгэлтэй юу?",
  "signIn": "Нэвтрэх",
  "missingRequiredFields": "Шаардлагатай талбарууд дутуу байна.",
  "registrationIncomplete": "Бүртгэл дутуу байна (Төлөв: {status}).",
  "registrationFailed": "Бүртгэл амжилтгүй боллоо.",
  "verificationIncomplete": "Баталгаажуулалт дутуу байна (Төлөв: {status}).",
  "invalidCode": "Код буруу байна."
};

enData.LoginPage = loginEn;
enData.RegisterPage = registerEn;
mnData.LoginPage = loginMn;
mnData.RegisterPage = registerMn;

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2) + '\n');
fs.writeFileSync(mnPath, JSON.stringify(mnData, null, 2) + '\n');
console.log('Locales updated successfully');
