"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupSchema } from "../app/schemas/SignupSchema";
import { useFormik } from "formik";
import Link from "next/link";

// components & ui
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";

import { Button } from "./ui/button";

// custom styles
const checkboxStylesPossitive = "ml-auto text-[24px] text-customGreenDark";
const checkboxStylesFaded = "ml-auto text-[24px] text-[#00000047]";

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (values, actions) => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
        data: {
          displayName: values.displayName,
        },
      },
    });

    if (error) {
      setError(error.message);
      console.log(error.message);
    }

    if (!error) {
      actions.resetForm();
      router.refresh();
      router.push("/dashboard");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit,
  });

  console.log(formik.errors.email);

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col">
      <h3 className="text-2xl pl-4 my-4 border-l-2 border-l-customGreenDark text-[#ffffff] font-bold">
        Signup
      </h3>
      <p className="error">{error}</p>
      <div className="flex flex-col gap-2">
        <div>
          <div className="flex w-full pb-2 justify-center pt-2">
            <Label className="self-end" htmlFor="email">
              email
            </Label>

            <RiCheckboxCircleLine
              className={
                formik.errors.email || formik.values.email == ""
                  ? checkboxStylesFaded
                  : checkboxStylesPossitive
              }
            />
          </div>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="your email address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            value={formik.values.email}
            className="p-3 text-lg bg-customInputBg "
          />

          <p className="error">{formik.errors.email}</p>
        </div>
        <div>
          <div className="flex w-full pb-2 justify-center pt-2">
            <Label className="self-end" htmlFor="displayName">
              Display name
            </Label>

            <RiCheckboxCircleLine
              className={
                formik.errors.displayName || formik.values.displayName == ""
                  ? checkboxStylesFaded
                  : checkboxStylesPossitive
              }
            />
          </div>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            placeholder="display name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            value={formik.values.displayName}
            className="p-3 text-lg bg-customInputBg"
          />
          <p className="error">{formik.errors.displayName}</p>
        </div>
        <div>
          <div className="flex w-full pb-2 justify-center pt-2">
            <Label className="self-end text-stone-50" htmlFor="password">
              password
            </Label>

            <RiCheckboxCircleLine
              className={
                formik.errors.password || formik.values.password == ""
                  ? checkboxStylesFaded
                  : checkboxStylesPossitive
              }
            />
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            value={formik.values.password}
            className="p-3 text-lg bg-customInputBg"
          />
          <p className="error">{formik.errors.password}</p>
        </div>
        <div>
          <div className="flex w-full pb-2 justify-center pt-2">
            <Label className="self-end" htmlFor="confirmPassword">
              Confirm Password
            </Label>

            <RiCheckboxCircleLine
              className={
                formik.errors.confirmPassword ||
                formik.values.confirmPassword == ""
                  ? checkboxStylesFaded
                  : checkboxStylesPossitive
              }
            />
          </div>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            value={formik.values.confirmPassword}
            className="p-3 text-lg bg-customInputBg"
          />
          <p className="error">{formik.errors.confirmPassword}</p>
        </div>

        <Button
          disabled={formik.isSubmitting}
          type="submit"
          className="border-2 border-customGreenDark text-customTextDark text-center font-semibold text-xl p-7 rounded-2xl tracking-widest hover:bg-customHoverBtn hover:text-white hover:border-customGreenLight transition-all duration-300 w-[140px] mx-auto mt-4"
          variant="outline"
        >
          Signup
          <div>
            <IoCreateOutline className="text-3xl ml-2" />
          </div>
        </Button>
      </div>
      <p className="mt-6 px-2 border-l-2 border-customGreenDark">
        already have account?
        <Link href="/login" className="text-customPurple font-bold">
          <span>{""} LOGIN HERE</span>
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
