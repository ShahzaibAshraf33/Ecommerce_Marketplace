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
      name: `${data.firstName.trim()} ${data.lastName.trim()}`,
      email: data.email,
      phoneNumber: data.phone,
      password: data.password,
    });
  };

  return (
    <AuthLayout
      leftPanel={
        <LeftMarketingPanel
          title={
            <>
              <GradientText className="italic">Join</GradientText> <GradientText>Zylo Market.</GradientText>
            </>
          }
          subtitle="Create your account and explore millions of premium products across all categories."
          illustration={<ShoppingBagsIllustration />}
        />
      }
      rightCard={
        <RightAuthCard
          className="max-w-2xl"
          title={
            <>
              <GradientText>Create Your</GradientText> Account
            </>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>


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

              <div className="grid grid-cols-2 gap-3">
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
              </div>

              <div className="grid grid-cols-2 gap-3">
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
              </div>

              <Checkbox
                {...register("agreeToTerms")}
                label={
                  <>
                    I agree to the{" "}
                    <Link
                      to="#"
                      className="text-[#D8B06A] hover:text-[#F3D8A0] underline font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="#"
                      className="text-[#D8B06A] hover:text-[#F3D8A0] underline font-medium"
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

            <Divider text="or continue with" />

            <div className="grid grid-cols-2 gap-3 mt-6 mb-6">
              <SocialAuthButton provider="google" />
              <SocialAuthButton provider="apple" />
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              Already have an account?{" "}
              <Link to="/sign-in" className="auth-link">
                Sign In
              </Link>
            </p>
          </form>
        </RightAuthCard>
      }
    />
  );
};

export default SignUpPage;