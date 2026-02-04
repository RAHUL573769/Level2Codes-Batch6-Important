"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      console.error("Login failed:", res.error);
      alert("Invalid email or password");
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="my-10 w-[90%] mx-auto">
      <h1 className="text-center text-4xl mb-5 font-bold">
        Login <span className="text-teal-500">Here</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
        <div>
          <Image
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
            width={500}
            height={200}
            alt="login page"
            className="w-full h-auto"
          />
        </div>

        <div className="w-[80%] mx-auto bg-white p-6 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full border border-teal-500 text-teal-500 font-semibold py-2 rounded-md hover:bg-teal-500 hover:text-black"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-teal-500 hover:underline">
              Create an account
            </Link>
          </p>

          <p className="text-center mt-6 text-sm text-gray-500">
            Or Sign Up Using
          </p>

          <div className="flex justify-center gap-4 mt-4">
            <button className="w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 flex items-center justify-center">
              <Image
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                width={30}
                height={30}
                alt="Google"
              />
            </button>

            <button
              onClick={() =>
                signIn("github", {
                  callbackUrl: "http://localhost:3000/dashboard",
                })
              }
              className="w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 flex items-center justify-center"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                width={25}
                height={25}
                alt="GitHub"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
