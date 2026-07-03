import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Send } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import LeftMarketingPanel from "../components/auth/LeftMarketingPanel";
import RightAuthCard from "../components/auth/RightAuthCard";
import GradientText from "../components/auth/GradientText";
import SocialAuthButton from "../components/auth/SocialAuthButton";
import InfoPanel from "../components/auth/InfoPanel";
import FormField from "../form/FormField";
import GradientButton from "../form/GradientButton";
import Divider from "../form/Divider";
import PadlockIllustration from "../components/auth/illustrations/PadlockIllustration";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/forgotPasswordSchema";
import { useForgotPasswordMutation } from "../hooks/useForgotPasswordMutation";

const ForgotPasswordPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const mutation = useForgotPasswordMutation(setError);

  const onSubmit = (data: ForgotPasswordFormValues) => {
    mutation.mutate({ email: data.email });
  };

  return (
    <AuthLayout
      leftPanel={
        <LeftMarketingPanel
          title={
            <>
              <GradientText className="italic">Reset</GradientText> Your
              Password
            </>
          }
          subtitle="No worries! Enter your email address and we'll send you a link to reset your password."
          illustration={<PadlockIllustration />}
        />
      }
      rightCard={
        <RightAuthCard
          icon={Lock}
          title={
            <>
              <GradientText>Forgot</GradientText> Password?
            </>
          }
          subtitle={
            <p className="max-w-xs mx-auto">
              Enter your registered email address and we&apos;ll send you a link
              to reset your password.
            </p>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-4">
              <FormField
                {...register("email")}
                type="email"
                icon={Mail}
                placeholder="Email Address"
                error={errors.email?.message}
                autoComplete="email"
              />

              <GradientButton loading={mutation.isPending}>
                Send Reset Link
              </GradientButton>
            </div>

            <Divider text="or" />

            <div className="space-y-3">
              <SocialAuthButton provider="google" />
              <SocialAuthButton provider="apple" />
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Remember your password?{" "}
              <Link to="/sign-in" className="auth-link">

                Sign In
              </Link>
            </p>
          </form>
        </RightAuthCard>
      }
      bottomPanel={
        mutation.isSuccess ? (
          <InfoPanel
            icon={Send}
            title="Check Your Inbox"
            description="We've sent a password reset link to your email. Please check your inbox and spam folder."
          />
        ) : undefined
      }
    />
  );
};

export default ForgotPasswordPage;