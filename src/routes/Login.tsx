import type { ActionFunctionArgs } from "react-router";
import LoginForm from "@/components/pageComponents/login/LoginForm";
import ResetPasswordModal from "@/components/pageComponents/login/ResetPasswordModal";
import PriceAndTimestamp from "@/components/pageComponents/login/PriceAndTimestamp";
import { UserSchema } from "@/lib/schemas";
import { formatZodErrors } from "@/lib/utils";
import OrtexLogo from "@/assets/ortex.png";
import OrtexAltLogo from "@/assets/ortex-alt.png";

export async function loginAction({ request }: ActionFunctionArgs<unknown>) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const result = UserSchema.safeParse({ email, password });

  if (result.error) return formatZodErrors(result.error);

  console.log("Successfully logged in!");
}

export default function Login() {
  return (
    <div className="h-screen relative">
      <PriceAndTimestamp />
      <div className="bg-primary h-full w-1/2 xl:w-2/5 absolute -z-10 max-lg:hidden inset-y-0 left-0" />
      <div className="h-full flex items-center justify-center">
        <main className="lg:w-[calc(100%-300px)] lg:h-[calc(100%-300px)] lg:shadow-[0_0_30px_rgba(0,0,0,0.25)] w-full flex items-center">
          <div className="max-lg:hidden w-[calc(50vw-150px)] xl:w-[calc(40vw-150px)]">
            <img src={OrtexLogo} className="max-w-80 mx-auto px-8" />
          </div>
          <div className="flex justify-center flex-1 px-4 sm:px-8">
            <div className="flex flex-col items-center gap-y-8 max-w-xl w-full">
              <img src={OrtexAltLogo} className="max-w-64 px-8 lg:hidden" />
              <h1 className="text-2xl font-semibold max-lg:hidden">Login</h1>
              <div className="flex flex-col items-center gap-y-5 w-full">
                <LoginForm />
                <ResetPasswordModal />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
