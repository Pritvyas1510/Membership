import { useEffect, useState } from "react";
import "../Components/OtpModal.css";

const OtpModal = ({ open, onClose, onVerify, error }) => {
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setOtp("");
    }
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  const handleVerify = () => {
    if (otp.length !== 6) return;
    onVerify(otp);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className={`bg-white w-80 rounded-2xl p-6 text-center shadow-xl transition
        ${error ? "animate-shake" : ""}`}
      >
        <h2 className="text-lg font-bold mb-2">Verify OTP</h2>
        <p className="text-xs text-gray-500 mb-4">
          Enter the 6-digit OTP sent to your mobile
        </p>

        <input
          type="text"
          value={otp}
          maxLength={6}
          placeholder="••••••"
          className="w-full px-4 py-3 border rounded-xl text-center tracking-widest text-lg focus:ring-2 focus:ring-orange-400 outline-none"
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />

        {error && (
          <p className="text-red-500 text-sm mt-2">Invalid OTP</p>
        )}

        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleVerify}
            disabled={otp.length !== 6}
            className="flex-1 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold disabled:opacity-50"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
