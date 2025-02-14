import { SignIn } from "@clerk/nextjs";

export default function AuthForm() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn redirectUrl="/dashboard" />
    </div>
  );
}