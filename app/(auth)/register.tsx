import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constant";
import { SingupFormValidation } from "@/libs/validations";
import { useSignUp } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import Modal from "react-native-modal";
import { z } from "zod";

const RegisterScreen = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
    email: "",
  });
  const router = useRouter();

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
      const signUpResult = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      setVerification((prev) => ({
        ...prev,
        email: signUpResult.emailAddress ?? "",
      }));

      console.log({ signUpResult }, "<---signUpResult");

      // Send user an email with verification code
      const emailResult = await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      console.log({ emailResult }, "<---emailResult");

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification((prev) => ({
        ...prev,
        state: "pending",
      }));
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2), "<---errorHandleSignup");
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      console.log({ signUpAttempt }, "<---signUpAttemptInVerifyPress");

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });

        setVerification((prev) => ({
          ...prev,
          state: "success",
        }));
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification((prev) => ({
          ...prev,
          error: "Failed to verify email",
          state: "failed",
        }));

        console.error(JSON.stringify(signUpAttempt, null, 2), "<---onVerifyPress");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2), "<---errorOnVerifyPress");
      setVerification((prev) => ({
        ...prev,
        error: err.errors[0].logMessage,
        state: "failed",
      }));
    }
  };

  console.log({ verification }, "<---verification");

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

        {/* Modal Verify Email */}
        <Modal isVisible={verification.state === "pending"} onModalHide={() => setVerification({ ...verification, state: "success" })}>
          <View className="bg-white gap-5 px-7 py-9 rounded-2xl min-h-[300px]">
            {/* Title */}
            <View className="gap-2">
              <Text className="text-2xl font-JakartaExtraBold text-center">Verification</Text>
              <Text className="text-gray-400 font-Jakarta text-center">We have sent a verification code to {verification.email}.</Text>
            </View>

            {/* Input Code */}
            <InputField
              label="Code"
              placeholder="Enter verification code"
              iconLeft={icons.lock}
              keyboardType="numeric"
              control={control}
              name="verificationCode"
              value={verification.code}
              onChangeText={(code) => setVerification({ ...verification, code })}
            />

            {/* Error Message */}
            {verification.error && <Text className="text-red-500 text-sm mt-1">{verification.error}</Text>}

            {/* Button Verify */}
            <CustomButton title="Verify Email" onPress={onVerifyPress} isLoading={isSubmitting} className="bg-success-500" />
          </View>
        </Modal>

        {/* Modal Notify Verified */}
        <Modal isVisible={verification.state === "success"}>
          <View className="bg-white gap-5 px-7 py-9 rounded-2xl min-h-[300px]">
            {/* Image Check */}
            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />

            <Text className="text-3xl font-JakartaBold text-center">Verified</Text>

            <Text className="text-base text-gray-400 font-Jakarta text-center">You have successfully verified your account.</Text>

            <CustomButton title="Browse Home" onPress={() => router.replace("/(root)/(tabs)/home")} />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
