import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Send, Edit2, Lock, Shield } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import LeftMarketingPanel from "../components/auth/LeftMarketingPanel";
import RightAuthCard from "../components/auth/RightAuthCard";
import GradientText from "../components/auth/GradientText";
import OtpInput from "../components/auth/OtpInput";
import InfoBanner from "../components/auth/InfoBanner";
import GradientButton from "../form/GradientButton";
import Divider from "../form/Divider";
import EnvelopeIllustration from "../components/auth/illustrations/EnvelopeIllustration";
import { otpSchema, type OtpFormInputValues } from "../schemas/otpSchema";
import { useVerifyOtpMutation, useResendOtpMutation } from "../hooks/useVerifyOtpMutation";
import { useCountdown } from "../hooks/useCountdown";
import { useAppSelector } from "../app/hooks";
import { selectPendingEmail } from "../features/auth/authSelectors";

const VerifyOtpPage: React.FC = () => {
  const pendingEmail = useAppSelector(selectPendingEmail) || "john.doe@example.com";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormInputValues>({
    resolver: zodResolver(otpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      code: ["", "", "", "", "", ""],
    },
  });

  const verifyMutation = useVerifyOtpMutation();
  const resendMutation = useResendOtpMutation();

  const expiryCountdown = useCountdown({
    initialSeconds: 299, // 4:59
    autoStart: true,
  });

  const resendCountdown = useCountdown({
    initialSeconds: 45,
    autoStart: true,
  });

  const onSubmit = (data: OtpFormInputValues) => {
    // After zod transform, data.code is a string (the joined code)
    const code = Array.isArray(data.code) ? data.code.join("") : data.code;
    verifyMutation.mutate({
      email: pendingEmail,
      code: code as string,
    });
  };

  const handleResend = useCallback(() => {
    if (resendCountdown.isComplete) {
      resendMutation.mutate(pendingEmail, {
        onSuccess: () => {
          resendCountdown.reset(45);
          expiryCountdown.reset(299);
        },
      });
    }
  }, [resendCountdown, resendMutation, pendingEmail, expiryCountdown]);

  return (
    <AuthLayout
      leftPanel={
        <LeftMarketingPanel
          title={
            <>
              <GradientText className="italic">Verify</GradientText> Your
              Account
            </>
          }
          subtitle={`Enter the 6-digit code we sent to ${pendingEmail} to reset your password.`}
          illustration={<EnvelopeIllustration />}
        />
      }
      rightCard={
        <RightAuthCard
          icon={Mail}
          title={
            <>
              <GradientText>Enter</GradientText> OTP Code
            </>
          }
          subtitle={
            <p>
              We&apos;ve sent a 6-digit code to{" "}
              <span className="font-semibold text-gray-900 underline">
                {pendingEmail}
              </span>
            </p>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-5">
              <OtpInput
                control={control}
                error={errors.code?.message as string | undefined}
              />

              <p className="text-center text-sm text-gray-500">
                Code will expire in{" "}
                <span
                  className={`font-bold ${
                    expiryCountdown.seconds < 30
                      ? "text-red-600"
                      : "text-gray-900"
                  }`}
                >
                  {expiryCountdown.formattedTime}
                </span>
              </p>

              <GradientButton loading={verifyMutation.isPending}>
                Verify Code
              </GradientButton>
            </div>

            <Divider text="Didn't receive the code?" />

            <div className="space-y-3">
              {/* Resend Code */}
              <button
                type="button"
                onClick={handleResend}
                disabled={!resendCountdown.isComplete || resendMutation.isPending}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200
                  ${
                    resendCountdown.isComplete
                      ? "border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
                      : "border-gray-100 bg-gray-50/50 cursor-not-allowed opacity-60"
                  }
                `}
              >
                <Send size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700 flex-1 text-left">
                  Resend Code
                </span>
                {!resendCountdown.isComplete && (
                  <span className="text-sm text-gray-400 font-mono">
                    {resendCountdown.formattedTime}
                  </span>
                )}
              </button>

              {/* Use different email */}
              <Link
                to="/forgot-password"
                className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-gray-200
                  hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <Edit2 size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Use a different email
                </span>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-400">
              <Lock size={14} />
              <span>This verification helps keep your account secure</span>
            </div>
          </form>
        </RightAuthCard>
      }
      bottomPanel={
        <InfoBanner
          icon={Shield}
          title="Haven't received the code?"
          description="Please check your spam folder or promotions tab. If you still don't see it, you can resend the code."
        />
      }
    />
  );
};

export default VerifyOtpPage;