import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import LeftMarketingPanel from "../components/auth/LeftMarketingPanel";
import RightAuthCard from "../components/auth/RightAuthCard";
import GradientText from "../components/auth/GradientText";
import SocialAuthButton from "../components/auth/SocialAuthButton";
import SocialIconButton from "../components/auth/SocialIconButton";
import FormField from "../form/FormField";
import PasswordField from "../form/PasswordField";
import Checkbox from "../form/Checkbox";
import GradientButton from "../form/GradientButton";
import Divider from "../form/Divider";
import ShoppingBagsIllustration from "../components/auth/illustrations/ShoppingBagsIllustration";
import {
  signInSchema,
  type SignInFormValues,
  type SignInFormInputValues,
} from "../schemas/signInSchema";
import { useSignInMutation } from "../hooks/useSignInMutation";

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormInputValues>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const mutation = useSignInMutation(setError);

  const onSubmit = (data: SignInFormInputValues) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
      rememberMe: !!data.rememberMe,
    });
  };

  return (
    <AuthLayout
      leftPanel={
        <LeftMarketingPanel
          title={
            <>
              <GradientText>Welcome</GradientText> Back to Marketo.
            </>
          }
          subtitle="Sign in to continue your journey and explore millions of premium products across all categories."
          illustration={<ShoppingBagsIllustration />}
        />
      }
      rightCard={
        <RightAuthCard
          title={
            <>
              <GradientText>Welcome</GradientText> Back
            </>
          }
          subtitle={
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="auth-link">

                Sign Up
              </Link>
            </p>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-3">
              <SocialAuthButton provider="google" />
              <SocialAuthButton provider="apple" />
            </div>

            <Divider text="or sign in with email" />

            <div className="space-y-4">
              <FormField
                {...register("email")}
                type="email"
                icon={Mail}
                placeholder="Email Address"
                error={errors.email?.message}
                autoComplete="email"
              />

              <PasswordField
                {...register("password")}
                placeholder="Password"
                error={errors.password?.message}
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between">
                <Checkbox
                  {...register("rememberMe")}
                  label="Remember Me"
                />
                <Link to="/forgot-password" className="auth-muted-link">

                  Forgot Password?
                </Link>
              </div>

              <GradientButton loading={mutation.isPending}>
                Sign In
              </GradientButton>
            </div>

            <Divider text="or sign in with" />

            <div className="flex justify-center gap-3">
              <SocialIconButton provider="facebook" />
              <SocialIconButton provider="twitter" />
              <SocialIconButton provider="instagram" />
              <SocialIconButton provider="github" />
            </div>
          </form>
        </RightAuthCard>
      }
    />
  );
};

export default SignInPage;