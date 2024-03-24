"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
// components && ui
import { CiLogin } from "react-icons/ci";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.refresh();
    }

    if (error) {
      if (error.message === "Invalid login credentials") {
        setError("Incorrect email or password");
      }
      console.log(error.message);
    }
  };

  return (
    <div className="login-signup-container">
      <h3 className="text-3xl pl-4 my-4 border-l-2 border-l-customGreenDark text-[#ffffff] font-bold">
        Login
      </h3>
      <div>
        <p className="error">{error}</p>
        <form
          className="flex flex-col gap-6 items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              placeholder="your email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="p-5 text-lg bg-customInputBg"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="p-5 text-lg bg-customInputBg"
            />
          </div>

          <Button
            className="border-2 border-customGreenDark text-center font-semibold text-xl text-customTextDark p-7 rounded-2xl tracking-widest hover:border-customGreenLight hover:bg-customHoverBtn hover:text-white transition-all duration-300"
            variant="outline"
            type="submit"
          >
            Login
            <CiLogin className="text-4xl ml-2d" />
          </Button>
        </form>
      </div>
      <p className="mt-6 px-2 border-l-2 border-customGreenDark">
        or create account
        <Link href="/signup" className="text-customPurple font-bold">
          <span>{""} HERE</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
