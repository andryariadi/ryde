import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constant";
import { SingupFormValidation } from "@/libs/validations";
import { useSignUp } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Image, ScrollView, Text, View } from "react-native";
import { z } from "zod";

const RegisterScreen = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState<boolean>(false);
  const [code, setCode] = useState("");

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<z.infer<typeof SingupFormValidation>>({
    resolver: zodResolver(SingupFormValidation),
    mode: "onChange",
  });

  const handleSignup: SubmitHandler<z.infer<typeof SingupFormValidation>> = async (data) => {
    console.log({ data }, "<---handleSignup");

    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        // router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2), "<---onVerifyPress");
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center p-5">
        <Text className="text-2xl font-bold mb-4">Verify Email</Text>
        <InputField label="Verification Code" placeholder="Enter verification code" control={control} name="verificationCode" value={code} onChangeText={setCode} />
        <CustomButton title="Verify Email" onPress={onVerifyPress} isLoading={isSubmitting} />
      </View>
    );
  }

  return (
    <ScrollView className="bg-amber-500 flex-1">
      <View className="bg-sky-500 flex-1">
        {/* Image & Title */}
        <View className="bg-rose-500">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-gray-900 font-JakartaSemiBold absolute bottom-5 left-5">Create Your Account</Text>
        </View>

        {/* Form */}
        <View className="bg-fuchsia-500 h-[85%] justify-center px-5 gap-5">
          <InputField label="Name" placeholder="Enter name" accessibilityLabel="Enter your name" returnKeyType="next" iconLeft={icons.person} name="username" control={control} errors={errors.username} />

          <InputField label="Email" placeholder="Enter email" accessibilityLabel="Enter your email" keyboardType="email-address" returnKeyType="next" iconLeft={icons.email} name="email" control={control} errors={errors.email} />

          <InputField label="Password" placeholder="Enter password" isPassword accessibilityLabel="Enter your password" returnKeyType="done" iconLeft={icons.lock} secureTextEntry name="password" control={control} errors={errors.password} />

          <CustomButton title="Sign Up" onPress={handleSubmit(handleSignup)} className="mt-5" isLoading={isSubmitting} />

          {/* OAuth */}
          <OAuth />

          {/* Link to login */}
          <Link href="/login" className="text-lg text-center text-general-200 mt-10">
            Already have an account? <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
