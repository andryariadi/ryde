import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constant";
import { SinginFormValidation } from "@/libs/validations";
import { useSignIn } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Image, ScrollView, Text, View } from "react-native";
import { z } from "zod";

const LoginScreen = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  console.log({ signIn, setActive, isLoaded }, "<---LoginScreen");

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<z.infer<typeof SinginFormValidation>>({
    resolver: zodResolver(SinginFormValidation),
    mode: "onChange",
  });

  const handleLogin: SubmitHandler<z.infer<typeof SinginFormValidation>> = async (data) => {
    console.log({ data }, "<---handleLogin");

    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      console.log({ signInAttempt }, "<---signInAttempt");

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="bg-amber-500 flex-1">
      <View className="bg-sky-500 flex-1">
        {/* Image & Title */}
        <View className="bg-rose-500">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-gray-900 font-JakartaSemiBold absolute bottom-5 left-5">Welcome 🖐</Text>
        </View>

        {/* Form */}
        <View className="bg-fuchsia-500 h-[80%] justify-center px-5 gap-5">
          <InputField label="Email" placeholder="Enter email" accessibilityLabel="Enter your email" keyboardType="email-address" returnKeyType="next" iconLeft={icons.email} name="email" control={control} errors={errors.email} />

          <InputField label="Password" placeholder="Enter password" isPassword accessibilityLabel="Enter your password" returnKeyType="done" iconLeft={icons.lock} secureTextEntry name="password" control={control} errors={errors.password} />

          <CustomButton title="Sign In" onPress={handleSubmit(handleLogin)} className="mt-5" isLoading={isSubmitting} />

          {/* OAuth */}
          <OAuth />

          {/* Link to register */}
          <Link href="/register" className="text-lg text-center text-general-200 mt-10">
            Dont have an account? <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
