import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput, { isValidPhoneNumber, type Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ArrowLeft, ArrowRight, Check, LockKeyhole, MessageCircle, RefreshCw, ShieldCheck, Sparkles, Zap } from "lucide-react";
import "../login_page.css";

type RegistrationStep = "phone" | "otp" | "success";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://shantelle-arsino-fosteringly.ngrok-free.dev").replace(/\/$/, "");

async function readResponse(response: Response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<RegistrationStep>("phone");
  const [phone, setPhone] = useState<Value>();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!seconds) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  const requestOtp = async (event?: React.FormEvent) => {
    event?.preventDefault();
    setTouched(true);
    setError("");
    if (!phone || !isValidPhoneNumber(phone)) return;
    setLoading(true);
    try {
      await readResponse(await fetch(`${API_BASE_URL}/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phone }),
      }));
      setStep("otp");
      setSeconds(60);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "We couldn’t send your code.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (otp.length !== 6 || !phone) return;
    setLoading(true);
    try {
      const data = await readResponse(await fetch(`${API_BASE_URL}/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phone, otp_code: otp }),
      }));
      if (data.valid === false) throw new Error(data.message || "That code is not valid.");
      setStep("success");
    } catch (verificationError) {
      setError(verificationError instanceof Error ? verificationError.message : "We couldn’t verify your code.");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  return <main className="login-screen">
    <section className="login-story"><button className="back-home" onClick={() => navigate("/")}><ArrowLeft size={16}/> Back to home</button><div className="login-brand"><span><Zap size={20} fill="currentColor"/></span>TradeAid</div><div className="story-copy"><span className="story-kicker"><Sparkles size={14}/> YOUR BUSINESS BRAIN</span><h1>Your business starts with one conversation.</h1><p>Register your WhatsApp number and TradeAid will message you directly when your business assistant is ready.</p><div className="story-proof"><span><Check size={16}/><b>Register with any international number</b></span><span><Check size={16}/><b>Verify securely through a one-time code</b></span><span><Check size={16}/><b>Continue your journey inside WhatsApp</b></span></div></div><p className="security-note"><LockKeyhole size={14}/> Your number and business data stay private.</p></section>
    <section className="login-action">
      {step === "phone" && <form onSubmit={requestOtp}><div className="whatsapp-icon"><MessageCircle size={25}/></div><p className="form-kicker">CREATE YOUR WORKSPACE</p><h2>Start with WhatsApp</h2><p className="form-intro">Enter the number you want TradeAid to communicate with.</p><label htmlFor="whatsapp-phone">WhatsApp phone number</label><div className="phone-field"><PhoneInput id="whatsapp-phone" value={phone} onChange={(value) => {setPhone(value);setError("");}} onBlur={() => setTouched(true)} placeholder="Choose a country and enter your number" countrySelectProps={{"aria-label":"Select country"}} autoComplete="tel" autoFocus/></div>{touched && (!phone || !isValidPhoneNumber(phone)) && <p className="phone-error" role="alert">Select your country and enter a valid WhatsApp number.</p>}{error && <p className="form-error" role="alert">{error}</p>}<button className="continue-button" disabled={!phone || !isValidPhoneNumber(phone) || loading}>{loading?"Sending your code…":<>Send verification code <ArrowRight size={17}/></>}</button><p className="terms">By registering, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p></form>}
      {step === "otp" && <form onSubmit={verifyOtp}><button type="button" className="form-back" onClick={() => {setStep("phone");setOtp("");setError("");}}><ArrowLeft size={15}/> Change number</button><div className="whatsapp-icon"><ShieldCheck size={25}/></div><p className="form-kicker">VERIFY YOUR NUMBER</p><h2>Check your messages</h2><p className="form-intro">Enter the 6-digit code sent to <strong>{phone}</strong>.</p><label htmlFor="otp-code">Verification code</label><input id="otp-code" className="otp-field" value={otp} onChange={(event)=>{setOtp(event.target.value.replace(/\D/g,"").slice(0,6));setError("");}} placeholder="000000" inputMode="numeric" autoComplete="one-time-code" autoFocus/>{error&&<p className="form-error" role="alert">{error}</p>}<button className="continue-button" disabled={otp.length!==6||loading}>{loading?"Verifying…":<>Complete registration <ArrowRight size={17}/></>}</button><div className="resend-row"><span>Didn’t receive it?</span><button type="button" disabled={seconds>0||loading} onClick={()=>requestOtp()}><RefreshCw size={13}/>{seconds>0?`Resend in ${seconds}s`:"Resend code"}</button></div></form>}
      {step === "success" && <div className="registration-success"><div className="success-mark"><Check size={30}/></div><p className="form-kicker">REGISTRATION COMPLETE</p><h2>Meet TradeAid on WhatsApp</h2><p>Your business assistant will message <strong>{phone}</strong> directly. Continue there to finish setting up your business.</p><div className="next-step"><MessageCircle size={19}/><div><b>What happens next?</b><span>TradeAid will send your dashboard link in WhatsApp whenever you ask to view it.</span></div></div><button className="continue-button" onClick={()=>navigate("/")}>Return to home <ArrowRight size={17}/></button></div>}
      {step !== "success" && <div className="login-help">Already registered? <span>Ask the TradeAid bot for your dashboard link.</span></div>}
    </section>
  </main>;
}
