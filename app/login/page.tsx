import LoginForm from "./login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <LoginForm />
    </div>
  );
}
