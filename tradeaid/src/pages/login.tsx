import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../login_page.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type AuthStep = "phone" | "otp" | "verifying";

interface AuthError {
  type: "phone" | "otp" | "server" | null;
  message: string;
}

export default function LoginPage() {
  // Auth State
  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError>({ type: null, message: "" });
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // Timer for resend OTP
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Format phone number
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 7)
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    setError({ type: null, message: "" });
  };

  // Request OTP
  const handleRequestOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ type: null, message: "" });

    // Validate phone
    if (phone.length < 10) {
      setError({ type: "phone", message: "Please enter a valid phone number" });
      return;
    }

    setLoading(true);

    try {
      // Call backend to request OTP
      const response = await fetch(
        "https://shantelle-arsino-fosteringly.ngrok-free.dev/request-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone_number: `+${phone}` }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to request OTP");
      }

      // Move to OTP step
      setStep("otp");
      setResendTimer(60);
      setCanResend(false);
    } catch (err) {
      setError({
        type: "server",
        message: err instanceof Error ? err.message : "Failed to request OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ type: null, message: "" });

    if (otp.length !== 6) {
      setError({ type: "otp", message: "OTP must be 6 digits" });
      return;
    }

    setVerifyingOtp(true);
    setStep("verifying"); // Show verifying UI

    try {
      const response = await fetch(
        "https://shantelle-arsino-fosteringly.ngrok-free.dev/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: `+${phone}`,
            otp_code: otp,
          }),
        },
      );

      const data = await response.json();

      // Check if verification failed
      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP");
      }

      // Only proceed if we got a successful response
      if (data.valid && data.message) {
        // Store token and user data
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Wait 1.5 seconds to show success animation, then redirect
        setTimeout(() => {}, 1500);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      // If verification fails, go back to OTP input
      setError({
        type: "otp",
        message: err instanceof Error ? err.message : "Failed to verify OTP",
      });
      setStep("otp"); // Go back to OTP step
      setOtp(""); // Clear the OTP input
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setError({ type: null, message: "" });
    setLoading(true);

    try {
      const response = await fetch(
        "https://shantelle-arsino-fosteringly.ngrok-free.dev/request-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone_number: `+${phone}` }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setResendTimer(60);
      setCanResend(false);
      setOtp(""); // Clear previous OTP
    } catch (err) {
      setError({
        type: "server",
        message: err instanceof Error ? err.message : "Failed to resend OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  // Timer for resend
  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Go back to phone step
  const handleBackToPhone = () => {
    setStep("phone");
    setOtp("");
    setError({ type: null, message: "" });
    setResendTimer(0);
  };

  return (
    <div className="login-page">
      {/* Background decorations */}
      <div className="login-bg-decoration login-blob-1"></div>
      <div className="login-bg-decoration login-blob-2"></div>

      <div className="login-container">
        {/* Left side - Branding */}
        <div className="login-left">
          <div className="login-brand">
            <span className="login-icon">⚡</span>
            <h1>TradeAid AI</h1>
          </div>

          <div className="login-content">
            <h2>Manage Your Inventory</h2>
            <h3>With Ease</h3>
            <p>
              Track sales, manage inventory, and reorder stock by simply
              chatting on WhatsApp.
            </p>

            <div className="login-features">
              <div className="feature">
                <span className="feature-icon">📱</span>
                <span className="feature-text">WhatsApp Integration</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🤖</span>
                <span className="feature-text">AI-Powered</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <span className="feature-text">Instant Insights</span>
              </div>
            </div>
          </div>

          <div className="login-footer-left">
            <p className="login-trust">
              <span className="trust-badge">✓</span>
              Trusted by 500+ retailers
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="login-right">
          <div className="login-form-wrapper">
            {/* Phone Step */}
            {step !== "verifying" && (
              <>
                <div className="login-header">
                  <h2 className="login-title">
                    {step === "phone" ? "Get Started" : "Verify OTP"}
                  </h2>
                  <p className="login-subtitle">
                    {step === "phone"
                      ? "Enter your phone number to continue"
                      : "Enter the 6-digit code sent to your WhatsApp"}
                  </p>
                </div>

                {step === "phone" ? (
                  <form onSubmit={handleRequestOtp} className="login-form">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>

                      <PhoneInput
                        international
                        defaultCountry="GB" // since you're in UK (change if needed)
                        value={phone}
                        onChange={(value) => {
                          setPhone(value || "");
                          setError({ type: null, message: "" });
                        }}
                        className={`phone-input ${error.type === "phone" ? "error" : ""}`}
                        disabled={loading}
                      />
                      {error.type === "phone" && (
                        <p className="error-message">{error.message}</p>
                      )}
                      <p className="form-hint">
                        We'll send you a code via WhatsApp to verify your
                        number.
                      </p>
                    </div>

                    {error.type === "server" && (
                      <div className="alert alert-error">
                        <span className="alert-icon">⚠️</span>
                        <span>{error.message}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="login-button"
                      disabled={loading || phone.replace(/\D/g, "").length < 10}
                    >
                      {loading ? (
                        <>
                          <span className="spinner"></span>
                          Sending code...
                        </>
                      ) : (
                        <>
                          <span className="button-text">Continue</span>
                          <span className="button-arrow">→</span>
                        </>
                      )}
                    </button>

                    <div className="login-divider">
                      <span>or continue with</span>
                    </div>

                    <button
                      type="button"
                      className="login-button-secondary"
                      disabled={loading}
                    >
                      <span>📧</span>
                      Email (Coming Soon)
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="login-form">
                    <div className="form-group">
                      <label htmlFor="otp" className="form-label">
                        Verification Code
                      </label>
                      <input
                        id="otp"
                        type="text"
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => {
                          const cleaned = e.target.value.replace(/\D/g, "");
                          setOtp(cleaned.slice(0, 6));
                          setError({ type: null, message: "" });
                        }}
                        className={`otp-input ${
                          error.type === "otp" ? "error" : ""
                        }`}
                        maxLength={6}
                        disabled={verifyingOtp}
                      />
                      {error.type === "otp" && (
                        <p className="error-message">{error.message}</p>
                      )}
                      <p className="form-hint">
                        Check your WhatsApp messages for the code
                      </p>
                    </div>

                    {error.type === "server" && (
                      <div className="alert alert-error">
                        <span className="alert-icon">⚠️</span>
                        <span>{error.message}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="login-button"
                      disabled={verifyingOtp || otp.length !== 6}
                    >
                      {verifyingOtp ? (
                        <>
                          <span className="spinner"></span>
                          Verifying...
                        </>
                      ) : (
                        <>
                          <span className="button-text">Verify Code</span>
                          <span className="button-arrow">→</span>
                        </>
                      )}
                    </button>

                    <div className="otp-resend-section">
                      <p className="resend-text">Didn't receive the code?</p>
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="resend-button"
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Resend Code"}
                        </button>
                      ) : (
                        <p className="resend-timer">
                          Resend in {resendTimer} seconds
                        </p>
                      )}
                    </div>
                  </form>
                )}

                <div className="login-footer">
                  {step === "otp" && (
                    <button
                      type="button"
                      className="back-button"
                      onClick={handleBackToPhone}
                      disabled={verifyingOtp}
                    >
                      ← Back
                    </button>
                  )}
                  <p className="login-terms">
                    By signing in, you agree to our{" "}
                    <a href="#terms">Terms of Service</a> and{" "}
                    <a href="#privacy">Privacy Policy</a>
                  </p>
                </div>
              </>
            )}

            {/* Verifying Step */}
            {step === "verifying" && (
              <div className="verifying-state">
                <div className="verifying-animation">
                  <div className="checkmark">✓</div>
                </div>
                <h2 className="verifying-title">Verified!</h2>
                <p className="verifying-text">Setting up your account...</p>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
