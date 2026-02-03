import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerMember } from "../../Redux/slice/registerslice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./Components/registerSchema";
import OtpModal from "./Components/OtpModal";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const phoneValue = watch("phone");
  const isPhoneValid = phoneValue?.length === 10;

  const sendOtp = () => {
    if (!isPhoneValid) return;
    setOtpOpen(true);
    setOtpError(false);
    toast.success(t("otpSent"));
  };

  const verifyOtp = (otp) => {
    if (otp === "123456") {
      setOtpVerified(true);
      setOtpOpen(false);
      setOtpError(false);
      toast.success(t("otpVerified"));
    } else {
      setOtpError(true);
      toast.error(t("otpInvalid"));
    }
  };

  const onSubmit = (data) => {
    if (!otpVerified) {
      toast.error(t("verifyMobile"));
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    if (photo) formData.append("photo", photo);

    dispatch(registerMember(formData));
    toast.success(t("registerSuccess"));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-white flex items-start justify-center px-4 text-black">
      <div className="max-w-7xl w-full grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col bg-orange-500 text-white p-8">
          <h2 className="text-3xl font-bold mb-3">
            Monark Foundation Membership
          </h2>

          <p className="text-sm mb-4">
            Join us to create social impact and support meaningful initiatives
            across communities.
          </p>

          {/* IMAGE takes remaining space */}
          <div className="flex-1 overflow-hidden rounded-xl mb-6">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
              alt="Community"
              className="w-full h-full object-cover"
            />
          </div>

          {/* BUTTONS at bottom */}
          <div className="flex justify-center gap-4">
            <button className="bg-blue-700 text-white rounded-xl px-4 py-2 hover:bg-gray-200 hover:text-black transition">
              Learn More
            </button>
            <button className="bg-blue-700 text-white rounded-xl px-4 py-2 hover:bg-gray-200 hover:text-black transition">
              View Stories
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {/* Language Switch */}
          <div className="flex justify-end gap-2 mb-4">
            {["en", "hi", "gu"].map((lng) => (
              <button
                key={lng}
                onClick={() => i18n.changeLanguage(lng)}
                className="px-3 py-1 text-xs rounded-full border hover:bg-orange-500 hover:text-white transition"
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          <h1 className="text-2xl mb-5 font-bold text-orange-600">
            {t("title")}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label={t("name")} error={errors.name?.message}>
              <input
                {...register("name")}
                className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Enter Your Name"
              />
            </Input>

            {/* PHONE */}
            <div>
              <label className="text-sm font-medium">{t("phone")}</label>
              <div className="flex gap-2 mt-1">
                <input
                  {...register("phone")}
                  maxLength={10}
                  inputMode="numeric"
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/\D/g, ""))
                  }
                  className="flex-1 px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="10-digit mobile number"
                />

                {!otpVerified ? (
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={!isPhoneValid}
                    className={`px-4 py-1.5 rounded-xl text-sm transition ${
                      isPhoneValid
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {t("verify")}
                  </button>
                ) : (
                  <CheckCircle className="text-green-500 mt-2" />
                )}
              </div>

              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>

            <Input label={t("email")} error={errors.email?.message}>
              <input
                {...register("email")}
                className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Enter Your Email"
              />
            </Input>

            <Input label={t("gender")} error={errors.gender?.message}>
              <select
                {...register("gender")}
                className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
              >
                <option value="">{t("select")}</option>
                <option value="male">{t("male")}</option>
                <option value="female">{t("female")}</option>
              </select>
            </Input>

            <div className="grid grid-cols-2 gap-4">
              <Input label={t("city")} error={errors.city?.message}>
                <input
                  {...register("city")}
                  className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="City"
                />
              </Input>

              <Input label={t("Landmark")} error={errors.region?.message}>
                <input
                  {...register("region")}
                  className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="Landmark"
                />
              </Input>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("interestedInHead")} />
              {t("interestedInHead")}
            </label>

            {/* PHOTO */}
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="photoUpload"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="photoUpload"
                className="cursor-pointer px-5 py-2 rounded-xl bg-blue-800 text-white text-sm font-medium hover:bg-orange-600 transition shadow-md"
              >
                Upload Photo
              </label>
              {photo && (
                <span className="text-sm text-gray-600 truncate max-w-[160px]">
                  {photo.name}
                </span>
              )}
            </div>

            <button className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition">
              {t("submit")}
            </button>

            {/* EDIT DETAILS – SECONDARY ACTION */}
            <button
              type="button"
              onClick={() => navigate("/editdetails")}
              className="w-full mt-3 flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition"
            >
              <span className="h-px flex-1 bg-gray-300"></span>
              Edit Details
              <span className="h-px flex-1 bg-gray-300"></span>
            </button>
          </form>
        </div>
      </div>

      <OtpModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerify={verifyOtp}
        error={otpError}
      />
    </section>
  );
};

const Input = ({ label, error, children }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <div className="mt-1">{children}</div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default Register;
