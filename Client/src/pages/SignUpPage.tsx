import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User, Phone } from "lucide-react";
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
import { signUpSchema, type SignUpFormValues } from "../schemas/signUpSchema";
import { useSignUpMutation } from "../hooks/useSignUpMutation";

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const mutation = useSignUpMutation(setError);

  const onSubmit = (data: SignUpFormValues) => {
    mutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
      agreeToTerms: data.agreeToTerms,
    });
  };

  return (
    <AuthLayout
      leftPanel={
        <LeftMarketingPanel
          title={
            <>
              <GradientText className="italic">Join</GradientText> Marketo.
            </>
          }
          subtitle="Create your account and explore millions of premium products across all categories."
          illustration={<ShoppingBagsIllustration />}
        />
      }
      rightCard={
        <RightAuthCard
          title={
            <>
              <GradientText>Create Your</GradientText> Account
            </>
          }
          subtitle={
            <p>
              Already have an account?{" "}
              <Link to="/sign-in" className="auth-link">

                Sign In
              </Link>
            </p>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-3">
              <SocialAuthButton provider="google" />
              <SocialAuthButton provider="apple" />
            </div>

            <Divider text="or sign up with email" />

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  {...register("firstName")}
                  icon={User}
                  placeholder="First Name"
                  error={errors.firstName?.message}
                  autoComplete="given-name"
                />
                <FormField
                  {...register("lastName")}
                  icon={User}
                  placeholder="Last Name"
                  error={errors.lastName?.message}
                  autoComplete="family-name"
                />
              </div>

              <FormField
                {...register("email")}
                type="email"
                icon={Mail}
                placeholder="Email Address"
                error={errors.email?.message}
                autoComplete="email"
              />

              <FormField
                {...register("phone")}
                type="tel"
                icon={Phone}
                placeholder="Phone Number"
                error={errors.phone?.message}
                autoComplete="tel"
              />

              <PasswordField
                {...register("password")}
                placeholder="Password"
                error={errors.password?.message}
                autoComplete="new-password"
              />

              <PasswordField
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                error={errors.confirmPassword?.message}
                autoComplete="new-password"
              />

              <Checkbox
                {...register("agreeToTerms")}
                label={
                  <>
                    I agree to the{" "}
                    <Link
                      to="#"
                      className="text-violet-600 hover:text-violet-700 underline font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="#"
                      className="text-violet-600 hover:text-violet-700 underline font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Privacy Policy
                    </Link>
                  </>
                }
                error={errors.agreeToTerms?.message}
              />

              <GradientButton loading={mutation.isPending}>
                Create Account
              </GradientButton>
            </div>

            <Divider text="or sign up with" />

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

export default SignUpPage;