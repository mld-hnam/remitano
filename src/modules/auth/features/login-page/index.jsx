import React from "react";

import AuthLayout from "@/layouts/auth";
import SignInForm from "@/modules/auth/components/SignInForm";

export default function Login() {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}
