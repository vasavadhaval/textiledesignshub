import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Check,
  RotateCcw,
  Sparkles,
  Cpu,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MACHINE_OPTIONS } from '../data/mockData';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, showToast } = useApp();

  // Mode: 'identifier' | 'password' | 'otp' | 'register' | 'forgot' | 'reset-sent'
  const [authStep, setAuthStep] = useState<
    'identifier' | 'password' | 'otp' | 'register' | 'forgot' | 'reset-sent'
  >('identifier');

  // Identifier type
  const [identifierType, setIdentifierType] = useState<'mobile' | 'email'>('mobile');
  const [countryCode, setCountryCode] = useState('+91');
  const [identifierValue, setIdentifierValue] = useState('');
  
  // Password flow
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP flow (mock OTP: '1234')
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(45);

  // Registration step
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState<'buyer' | 'seller'>('buyer');
  const [regMachines, setRegMachines] = useState<string[]>(['Multi-head Embroidery']);
  const [errorMsg, setErrorMsg] = useState('');

  // Resend timer countdown
  useEffect(() => {
    let interval: any;
    if (authStep === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [authStep, resendTimer]);

  const handleIdentifierContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!identifierValue.trim()) {
      setErrorMsg('Please enter a valid mobile number or email.');
      return;
    }

    // If mobile or test email, show OTP or Password flow
    if (identifierType === 'mobile') {
      setAuthStep('otp');
      setResendTimer(45);
      showToast('OTP Dispatched', 'Test OTP is 1234', 'info');
    } else {
      setAuthStep('password');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!password) {
      setErrorMsg('Please enter your account password.');
      return;
    }
    login(identifierValue);
    navigate('/explore');
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-advance focus to next field
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    const code = otp.join('');
    if (code === '1234') {
      login(identifierType === 'mobile' ? `${countryCode} ${identifierValue}` : identifierValue);
      navigate('/explore');
    } else {
      setErrorMsg('Invalid OTP. Use mock code: 1234');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!regName.trim()) {
      setErrorMsg('Please provide your name or enterprise studio title.');
      return;
    }
    login(identifierValue || 'manufacturer@textiledesign.in', regName);
    showToast('Registration Complete', 'Your machine preferences are saved.', 'success');
    navigate(regRole === 'seller' ? '/studio' : '/explore');
  };

  const toggleRegMachine = (m: string) => {
    setRegMachines((prev) =>
      prev.includes(m) ? prev.filter((item) => item !== m) : [...prev, m]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xl max-w-md w-full p-8 animate-in fade-in duration-200">
        
        {/* Brand header */}
        <div className="text-center space-y-1.5 mb-8">
          <div className="w-12 h-12 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-serif text-xl font-bold mx-auto ring-1 ring-stone-900/10 mb-3">
            T
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            {authStep === 'register'
              ? 'Create Designer / Mill Account'
              : authStep === 'forgot'
              ? 'Reset Account Password'
              : 'Sign in to Textile Design Hub'}
          </h1>
          <p className="text-xs text-stone-500">
            Access verified machine embroidery designs & creator royalties
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
            {errorMsg}
          </div>
        )}

        {/* SCREEN 1: Identifier-first entry */}
        {authStep === 'identifier' && (
          <form onSubmit={handleIdentifierContinue} className="space-y-5">
            {/* Identifier selector (Mobile vs Email) */}
            <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setIdentifierType('mobile');
                  setIdentifierValue('');
                }}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  identifierType === 'mobile'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                Mobile Number
              </button>
              <button
                type="button"
                onClick={() => {
                  setIdentifierType('email');
                  setIdentifierValue('');
                }}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  identifierType === 'email'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </button>
            </div>

            {/* Input field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                {identifierType === 'mobile' ? 'Mobile Phone Number' : 'Work Email Address'}
              </label>

              {identifierType === 'mobile' ? (
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-24 text-xs font-mono bg-stone-50 border border-stone-300 rounded-xl px-2 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+880">🇧🇩 +880</option>
                  </select>
                  <input
                    type="tel"
                    autoFocus
                    value={identifierValue}
                    onChange={(e) => setIdentifierValue(e.target.value)}
                    placeholder="98250 12345"
                    className="flex-1 text-xs font-mono bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700 focus:bg-white"
                  />
                </div>
              ) : (
                <input
                  type="email"
                  autoFocus
                  value={identifierValue}
                  onChange={(e) => setIdentifierValue(e.target.value)}
                  placeholder="designer@suratembroidery.in"
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700 focus:bg-white"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setAuthStep('register')}
                className="text-xs text-amber-900 hover:underline font-semibold"
              >
                New here? Create mill or digitizer account
              </button>
            </div>
          </form>
        )}

        {/* SCREEN 2A: Password Flow */}
        {authStep === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
              <span className="truncate">{identifierValue}</span>
              <button
                type="button"
                onClick={() => setAuthStep('identifier')}
                className="text-amber-900 font-semibold hover:underline"
              >
                Change
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-700">Account Password</label>
                <button
                  type="button"
                  onClick={() => setAuthStep('forgot')}
                  className="text-xs text-amber-900 hover:underline"
                >
                  Forgot?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl pl-3 pr-10 py-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-stone-300 text-amber-900"
              />
              <span>Keep me signed in on this workstation</span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs shadow-sm transition-colors"
            >
              Sign In to Dashboard
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setAuthStep('otp');
                  setResendTimer(45);
                  showToast('OTP Dispatched', 'Test OTP is 1234', 'info');
                }}
                className="text-xs text-stone-500 hover:text-stone-900"
              >
                Or sign in using one-time verification code (OTP)
              </button>
            </div>
          </form>
        )}

        {/* SCREEN 2B: OTP Verification Flow (Mock OTP: 1234) */}
        {authStep === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
              <span>Code sent to: {countryCode} {identifierValue || '98250 12345'}</span>
              <button
                type="button"
                onClick={() => setAuthStep('identifier')}
                className="text-amber-900 font-semibold hover:underline"
              >
                Edit
              </button>
            </div>

            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/60 text-xs text-amber-900 flex items-center justify-between">
              <span>Mock testing OTP:</span>
              <span className="font-mono font-bold text-sm tracking-widest bg-white px-2 py-0.5 rounded shadow-xs">
                1234
              </span>
            </div>

            {/* 4 OTP Input Boxes */}
            <div className="flex justify-center gap-3 py-2">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-14 text-center font-mono text-xl font-bold bg-stone-50 border-2 border-stone-300 rounded-xl focus:border-amber-800 focus:outline-none focus:bg-white transition-colors"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500">
              {resendTimer > 0 ? (
                <span>Resend available in <strong className="font-mono">{resendTimer}s</strong></span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setResendTimer(45);
                    showToast('OTP Resent', 'Test OTP remains 1234', 'info');
                  }}
                  className="text-amber-900 font-semibold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs shadow-sm transition-colors"
            >
              Verify OTP & Sign In
            </button>
          </form>
        )}

        {/* SCREEN 3: Registration with Machine Preferences */}
        {authStep === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">Your Full Name / Mill Title</label>
              <input
                type="text"
                autoFocus
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Surat Craft Digitizing / Rajesh Patel"
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700 focus:bg-white"
              />
            </div>

            {/* Account Role */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">Primary Intent</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setRegRole('buyer')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    regRole === 'buyer'
                      ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  Buyer / Manufacturer
                </button>
                <button
                  type="button"
                  onClick={() => setRegRole('seller')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    regRole === 'seller'
                      ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  Digitizer / Studio
                </button>
              </div>
            </div>

            {/* Machine Preferences Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Primary Machine Types You Run / Digitize For:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {MACHINE_OPTIONS.map((m) => {
                  const selected = regMachines.includes(m);
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggleRegMachine(m)}
                      className={`text-left text-[11px] p-2 rounded-lg border transition-colors flex items-center justify-between ${
                        selected
                          ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
                          : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}
                    >
                      <span className="truncate">{m}</span>
                      {selected && <Check className="w-3 h-3 text-amber-800 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs shadow-sm transition-colors"
            >
              Complete Registration
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setAuthStep('identifier')}
                className="text-xs text-stone-500 hover:text-stone-900"
              >
                Already registered? Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* SCREEN 4: Forgot Password */}
        {authStep === 'forgot' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAuthStep('reset-sent');
            }}
            className="space-y-5"
          >
            <p className="text-xs text-stone-600 leading-relaxed">
              Enter your registered mobile or email to receive a password reset link or SMS code.
            </p>

            <input
              type="text"
              autoFocus
              value={identifierValue}
              onChange={(e) => setIdentifierValue(e.target.value)}
              placeholder="e.g. 9825012345 or info@suratembroidery.in"
              className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
            />

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs"
            >
              Send Reset Instructions
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setAuthStep('identifier')}
                className="text-xs text-stone-500 hover:text-stone-900"
              >
                Cancel and return
              </button>
            </div>
          </form>
        )}

        {/* SCREEN 5: Reset Sent Confirmation */}
        {authStep === 'reset-sent' && (
          <div className="space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Reset Link Sent
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              We have dispatched instructions to your identifier. Use test OTP <strong>1234</strong> to verify and set a new password.
            </p>
            <button
              onClick={() => setAuthStep('identifier')}
              className="w-full py-2.5 bg-stone-900 text-white font-semibold rounded-xl text-xs"
            >
              Return to Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
