import Image from "next/image";
import Link from "next/link";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { TextInput } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { loginSchema } from "@/libs/schema";
import { notifications } from "@mantine/notifications";
import { Password } from "@/components/modules/Password";

export default function Login() {
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  if (typeof window === "undefined") return null;
  if (status === "authenticated") {
    router.replace("/dashboard");
  }

  const form = useForm({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    setDisable(true);
    notifications.show({
      id: "login",
      loading: true,
      title: "Login",
      message: "Checking your credentials",
      color: "green",
      autoClose: false,
      withCloseButton: false,
    });
    try {
      signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then(({ ok, error }) => {
        if (ok) {
          setDisable(false);
          notifications.update({
            id: "login",
            title: "Success",
            message: `Sign In Successful`,
            color: "green",
            autoClose: 3000,
          });
          router.push("/dashboard");
        } else if (error) {
          setDisable(false);
          notifications.show({
            id: "login",
            title: "Error",
            message: "Invalid credentials",
            color: "red",
            autoClose: 3000,
          });
        }
      });
    } catch (error) {
      notifications.show({
        id: "login",
        title: "Error",
        message: "An error occurred, please try again later.",
        color: "red",
        autoClose: 3000,
      });
    }
  };
  if (status === "unauthenticated")
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/loginBg.jpg"
            className="h-full w-full object-center"
            alt="Background Image"
            width={3450}
            height={2578}
          />
        </div>
        <div className="absolute inset-0 bg-gray-900/40" />
        <div className="bg-white rounded-lg shadow-lg p-6 left-1/2 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 inline-block w-72 lg:w-96">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Flower Company</span>
              <Image
                priority
                height={60}
                width={200}
                className="mx-auto h-20 w-auto"
                src="/logo.png"
                alt="Flower Logo"
              />
            </Link>
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={form.onSubmit(onSubmit)}>
              <div>
                <TextInput
                  label="Email"
                  size="sm"
                  disabled={disable}
                  placeholder="Your Email"
                  {...form.getInputProps("email")}
                  classNames={{
                    root: "w-full relative",
                    wrapper: "relative",
                    input: `bg-white ring-0 w-full text-sm text-gray-900 my-2 rounded-lg border px-3 py-2.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 placeholder:text-gray-400 relative ${
                      form?.errors?.email ? "border-red-500" : "border-gray-300"
                    }`,
                    label:
                      "absolute -top-2 left-2 -mt-1 inline-block px-1 text-sm font-semibold text-gray-700 z-10 bg-white",
                  }}
                />
                {form?.errors?.email && (
                  <span className="block text-xs text-red-500 md:text-sm">
                    {form?.errors?.email}
                  </span>
                )}
              </div>

              <div>
                <Password disable={disable} form={form} password />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={disable}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <ArrowLeftOnRectangleIcon
                    className="my-auto mr-4 h-6 w-6 flex-shrink-0 text-white"
                    aria-hidden="true"
                  />
                  Sign in
                </button>
              </div>
            </form>
            <div className="relative">
              <div className="my-5 border border-gray-200 w-full" />
              <p className="-mt-8 left-1/2 -translate-x-1/2 absolute bg-white px-3">
                OR
              </p>
            </div>
            <div>
              <Link
                href="/signup"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ArrowRightOnRectangleIcon
                  className="my-auto mr-4 h-6 w-6 flex-shrink-0 text-white"
                  aria-hidden="true"
                />
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}
