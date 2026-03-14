"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs/legacy";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import TextScramble from "../../../components/TextScramble";
import { useTranslations } from "next-intl";

export default function SignInPage() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const t = useTranslations("LoginPage");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [factorType, setFactorType] = useState<"first" | "second">("first");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || isLoading) return;
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else if (result.status === "needs_first_factor") {
        const emailCodeFactor = result.supportedFirstFactors?.find(
          (f: any) => f.strategy === "email_code"
        ) as any;

        if (emailCodeFactor) {
          await signIn.prepareFirstFactor({
            strategy: "email_code",
            emailAddressId: emailCodeFactor.emailAddressId,
          });
          setFactorType("first");
          setVerifying(true);
          setError(t('verificationCodeSent'));
        } else {
          setError(t('emailVerificationNotAvailable'));
        }
      } else if (result.status === "needs_second_factor") {
        const emailCodeFactor = result.supportedSecondFactors?.find(
          (f: any) => f.strategy === "email_code"
        ) as any;

        if (emailCodeFactor) {
          await signIn.prepareSecondFactor({ strategy: "email_code" });
          setFactorType("second");
          setVerifying(true);
          setError(t('mfaCodeSent'));
        } else {
          setError(t('mfaRequiredNoEmail'));
        }
      } else if (result.status === "needs_new_password") {
        setError(t('passwordResetRequired'));
      } else {
        setError(t('loginVerificationRequired', { status: result.status ?? 'unknown' }));
      }
    } catch (err: any) {
      if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError(t('wrongPassword'));
      } else if (err.errors?.[0]?.code === "form_identifier_not_found") {
        setError(t('accountNotFound'));
      } else {
        setError(err.errors?.[0]?.longMessage || t('invalidCredentials'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || isLoading) return;
    setIsLoading(true);
    setError("");

    try {
      const result =
        factorType === "first"
          ? await signIn.attemptFirstFactor({ strategy: "email_code", code })
          : await signIn.attemptSecondFactor({ strategy: "email_code", code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        setError(t('moreStepsRequired', { status: result.status ?? 'unknown' }));
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || t('invalidCode'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex font-sans overflow-hidden bg-black text-white">
      {/* ─── LEFT: FORM ─── */}
      <div className="w-full lg:w-1/2 p-6 lg:p-16 flex flex-col justify-center relative z-20">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:24px_24px] -z-10" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md mx-auto w-full"
        >
          {/* Back */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-[0.2em] transition-colors group"
            >
              <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
              {t('home')}
            </Link>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-3 leading-[0.95]">
              {verifying ? (
                <>
                  {t('verify')}
                  <br />
                  <span className="text-gray-500">{t('code')}</span>
                </>
              ) : (
                <>
                  <TextScramble text={t('sign')} delay={200} speed={35} />
                  <br />
                  <span className="text-gray-500">
                    <TextScramble text={t('in')} delay={400} speed={35} />
                  </span>
                </>
              )}
            </h1>
            <p className="text-gray-500 font-light text-sm leading-relaxed max-w-sm">
              {verifying
                ? t('enter6DigitCode')
                : t('accessDashboard')}
            </p>
            <div className="w-12 h-px bg-white/20 mt-6" />
          </div>

          {!verifying ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailAddress')}
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-white/40 py-5 pl-14 pr-6 text-sm font-light text-white placeholder:text-gray-600 transition-all outline-none tracking-wider"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('password')}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-white/40 py-5 pl-14 pr-6 text-sm font-light text-white placeholder:text-gray-600 transition-all outline-none tracking-wider"
                    required
                  />
                </div>
                <div className="text-right pr-2">
                  <Link
                    href="#"
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors"
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-400 text-[11px] font-bold uppercase tracking-wider bg-red-900/20 p-4 border border-red-500/20 text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-200 text-black font-bold text-[11px] uppercase tracking-[0.2em] py-5 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4 group"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    {t('signIn')}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div id="clerk-captcha" />
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-5">
              <div className="relative group">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="000000"
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-white/40 py-5 px-6 text-lg font-light text-white placeholder:text-gray-600 transition-all outline-none tracking-[0.5em] text-center"
                  required
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-400 text-[11px] font-bold uppercase tracking-wider bg-red-900/20 p-4 border border-red-500/20 text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-200 text-black font-bold text-[11px] uppercase tracking-[0.2em] py-5 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    {t('verifyCode')}
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setVerifying(false);
                  setError("");
                  setCode("");
                }}
                className="w-full text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors text-center"
              >
                {t('backToLogin')}
              </button>
            </form>
          )}

          {!verifying && (
            <div className="mt-8 text-center">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
                {t('newHere')}
                <Link href="/register" className="text-white ml-2 hover:opacity-60 transition-opacity">
                  {t('signUp')}
                </Link>
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* ─── RIGHT: VISUAL ─── */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-[#050505] border-l border-white/5 overflow-hidden">
        {/* Animated circles */}
        <div className="absolute inset-0 w-full h-full">
          <motion.div
            animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-white/[0.03] rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, -25, 0] }}
            transition={{ duration: 18, repeat: Infinity }}
            className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px]"
          />
        </div>

        {/* Big text */}
        <div className="relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.04, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="text-[20vw] font-bold tracking-[0.1em] select-none leading-none"
          >
            BL
            <br />
            ND
          </motion.h2>
        </div>
      </div>
    </div>
  );
}