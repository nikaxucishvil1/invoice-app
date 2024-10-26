"use client";
import MuiInputWithLabel from "@/app/components/__molecules/InputLabel";
import { RegisterValidationSchema } from "@/app/validation/common";
import axios from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import React from "react";

const Signup = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#F8F4F0] p-4">
      <Formik
        validationSchema={RegisterValidationSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            const { email, password } = values;
            const res = await axios.post("http://localhost:3000/auth/signUp", {
              email,
              password,
            });
            console.log(res);
            window.location.href = "/";
          } catch (error) {
            console.log(error);
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
          <Form className="bg-[#FFFF] w-full p-4 flex flex-col items-start justify-center gap-7 rounded-lg">
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
              labelName="Create Password"
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
              Register
            </button>
            <div className="flex items-center justify-center gap-4 w-full">
              <h1 className="text-[#696868] font-[400] text-[14px]">
                Already have an account?
              </h1>
              <Link href={"/"} className="text-[14px] text-[#201F24] font-bold">
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
