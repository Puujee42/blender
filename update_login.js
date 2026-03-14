const fs = require('fs');

const path = './app/[locale]/login/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Imports
content = content.replace(
  'import TextScramble from "../../../components/TextScramble";',
  'import TextScramble from "../../../components/TextScramble";\nimport { useTranslations } from "next-intl";'
);

// Hook
content = content.replace(
  'const { isLoaded, signIn, setActive } = useSignIn();',
  'const { isLoaded, signIn, setActive } = useSignIn();\n  const t = useTranslations("LoginPage");'
);

// Errors
content = content.replace(
  'setError("Verification code sent to your email.");',
  'setError(t(\'verificationCodeSent\'));'
);
content = content.replace(
  'setError("Email verification not available for this account.");',
  'setError(t(\'emailVerificationNotAvailable\'));'
);
content = content.replace(
  'setError("MFA code sent to your email.");',
  'setError(t(\'mfaCodeSent\'));'
);
content = content.replace(
  'setError("MFA required, but no email factor found.");',
  'setError(t(\'mfaRequiredNoEmail\'));'
);
content = content.replace(
  'setError("Password reset required.");',
  'setError(t(\'passwordResetRequired\'));'
);
content = content.replace(
  'setError(`Login verification required (Status: ${result.status}).`);',
  'setError(t(\'loginVerificationRequired\', { status: result.status }));'
);
content = content.replace(
  'setError("Wrong password. Try again.");',
  'setError(t(\'wrongPassword\'));'
);
content = content.replace(
  'setError("Account not found.");',
  'setError(t(\'accountNotFound\'));'
);
content = content.replace(
  'setError(err.errors?.[0]?.longMessage || "Invalid credentials.");',
  'setError(err.errors?.[0]?.longMessage || t(\'invalidCredentials\'));'
);
content = content.replace(
  'setError(`Status: ${result.status}. More steps required.`);',
  'setError(t(\'moreStepsRequired\', { status: result.status }));'
);
content = content.replace(
  'setError(err.errors?.[0]?.longMessage || "Invalid code.");',
  'setError(err.errors?.[0]?.longMessage || t(\'invalidCode\'));'
);

// UI text
content = content.replace(
  /Home\n\s*<\/Link>/g,
  '{t(\'home\')}\n            </Link>'
);

content = content.replace(
  /VERIFY\n/g,
  '{t(\'verify\')}\n'
);

content = content.replace(
  /<span className="text-gray-500">CODE<\/span>/g,
  '<span className="text-gray-500">{t(\'code\')}</span>'
);

content = content.replace(
  /<TextScramble text="SIGN" delay=\{200\} speed=\{35\} \/>/g,
  '<TextScramble text={t(\'sign\')} delay={200} speed={35} />'
);

content = content.replace(
  /<TextScramble text="IN" delay=\{400\} speed=\{35\} \/>/g,
  '<TextScramble text={t(\'in\')} delay={400} speed={35} />'
);

content = content.replace(
  /"Enter the 6-digit code sent to your email."/g,
  't(\'enter6DigitCode\')'
);

content = content.replace(
  /"Access your dashboard and manage your bookings."/g,
  't(\'accessDashboard\')'
);

content = content.replace(
  /placeholder="Email Address"/g,
  'placeholder={t(\'emailAddress\')}'
);

content = content.replace(
  /placeholder="Password"/g,
  'placeholder={t(\'password\')}'
);

content = content.replace(
  /Forgot Password\?/g,
  '{t(\'forgotPassword\')}'
);

content = content.replace(
  /Sign In\n/g,
  '{t(\'signIn\')}\n'
);

content = content.replace(
  /Verify Code\n/g,
  '{t(\'verifyCode\')}\n'
);

content = content.replace(
  /Back to Login/g,
  '{t(\'backToLogin\')}'
);

content = content.replace(
  /New here\?/g,
  '{t(\'newHere\')}'
);

content = content.replace(
  /Sign Up\n\s*<\/Link>/g,
  '{t(\'signUp\')}\n                </Link>'
);

fs.writeFileSync(path, content);
console.log('Login page updated');
