"use client";

import { Form, Formik } from "formik";
import { LoginValidationSchema } from "./validation/common";
import MuiInputWithLabel from "./components/__molecules/InputLabel";
import Link from "next/link";
import axios from "axios";
import Cookie from "js-cookie";
import { useState } from "react";

export default function Home() {
  const initialValues = {
    email: "",
    password: "",
  };
  const [axiosErr, setAxiosErr] = useState("");
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#F8F4F0] p-4">
      <Formik
        validationSchema={LoginValidationSchema}
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          try {
            setAxiosErr("")
            const data = await axios.post(
              "http://localhost:3000/auth/signIn",
              values
            );
            const token = data.data.accessToken;
            if (token) {
              Cookie.set("userToken", token, { expires: 7 });
              resetForm();
              window.location.href = "pages/main";
            }
          } catch (error: any) {
            const axiosError = error.response.data.message;
            setAxiosErr(axiosError);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form className="bg-[#FFFF] w-full p-4 flex flex-col items-start justify-center gap-7 rounded-lg md:w-[60%] lg:w-[30%]">
            <h1 className="text-[#201F24] font-[900] text-[32px]">Login</h1>
            <MuiInputWithLabel
              labelName="Email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.email}
              touched={touched.email}
              inputType="text"
            />
            <MuiInputWithLabel
              labelName="Password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.password}
              touched={touched.password}
              inputType="password"
              change={true}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-4 bg-[#201F24] rounded-lg text-[#FFFF] font-bold"
            >
              Login
            </button>
            {axiosErr.length !== 0 && (
              <p className="text-[#FF3939] text-[16px] font-[400] w-full text-center">
                {axiosErr}
              </p>
            )}
            <div className="flex items-center justify-center gap-4 w-full">
              <h1 className="text-[#696868] font-[400] text-[14px]">
                Need to create an account?
              </h1>
              <Link
                href={"pages/signup"}
                className="text-[14px] text-[#201F24] font-bold"
              >
                Sign Up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
