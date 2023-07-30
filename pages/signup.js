import { useForm, zodResolver } from "@mantine/form";
import axios from "axios";
import { useState } from "react";
import { Select, TextInput } from "@mantine/core";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signupSchema } from "@/libs/schema";
import Image from "next/image";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import { questions } from "@/libs/const";
import { Password } from "@/components/modules/Password";
import "react-phone-input-2/lib/bootstrap.css";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Signup = () => {
  const [disable, setDisable] = useState(false);
  const [errorRes, setErrorRes] = useState();
  const router = useRouter();
  const { status } = useSession();
  if (typeof window === "undefined") return null;
  if (status === "authenticated") {
    router.replace("/dashboard");
  }

  const form = useForm({
    validate: zodResolver(signupSchema),
    initialValues: {
      name: "",
      email: "",
      confirmEmail: "",
      question: "",
      answer: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });
  const checkKeyDown = (e) => {
    const keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode === 13) {
      e.preventDefault();
    }
  };
  const onSubmit = async (data) => {
    const { name, email, phone, question, answer, password } = data;

    try {
      setDisable(true);
      notifications.show({
        id: "signup",
        loading: true,
        title: "Processing",
        message: "Creating Account",
        color: "green",
        autoClose: false,
        withCloseButton: false,
      });
      await axios
        .post(`/api/signup`, {
          name,
          email,
          phone,
          question,
          answer,
          password,
        })
        .then((data) => {
          if (data?.data?.affectedRows) {
            notifications.update({
              id: "signup",
              title: "Success",
              message: `Account Created!`,
              color: "green",
              autoClose: 3000,
            });
            router.push("/login");
          } else {
            notifications.update({
              id: "signup",
              title: "Error",
              message: data?.data.includes("Duplicate entry")
                ? "This email address is already in use."
                : data?.data,
              color: "red",
              autoClose: 3000,
            });
            if (data?.data.includes("Duplicate entry")) {
              setErrorRes("This email address is already in use.");
            } else {
              setErrorRes(data?.data);
            }
          }
          setDisable(false);
        });
    } catch (error) {
      setDisable(false);
      notifications.update({
        id: "signup",
        title: "Error",
        message: "Unable to create account, please try again later",
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
        <div className="bg-white rounded-lg shadow-lg p-6 relative my-12 left-1/2 -translate-x-1/2 inline-block w-72 lg:w-96">
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
            <form
              className="space-y-6"
              onSubmit={form.onSubmit(onSubmit)}
              onKeyDown={(e) => checkKeyDown(e)}
            >
              <div>
                <TextInput
                  label="Full Name"
                  size="sm"
                  disabled={disable}
                  placeholder="Your Name"
                  {...form.getInputProps("name")}
                  classNames={{
                    root: "w-full relative",
                    wrapper: "relative",
                    input: `bg-white ring-0 w-full text-sm text-gray-900 my-2 rounded-lg border px-3 py-2.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 placeholder:text-gray-400 relative ${
                      form?.errors?.name ? "border-red-500" : "border-gray-300"
                    }`,
                    label:
                      "absolute -top-2 left-2 -mt-1 inline-block px-1 text-sm font-semibold text-gray-700 z-10 bg-white",
                  }}
                />
                {form?.errors?.name && (
                  <span className="block text-xs text-red-500 md:text-sm">
                    {form?.errors?.name}
                  </span>
                )}
              </div>

              <div>
                <TextInput
                  label="Email"
                  size="sm"
                  disabled={disable}
                  placeholder="Your Email Address"
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
                <TextInput
                  label="Confirm Email"
                  size="sm"
                  disabled={disable}
                  placeholder="Your Email Address"
                  {...form.getInputProps("confirmEmail")}
                  classNames={{
                    root: "w-full relative",
                    wrapper: "relative",
                    input: `bg-white ring-0 w-full text-sm text-gray-900 my-2 rounded-lg border px-3 py-2.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 placeholder:text-gray-400 relative ${
                      form?.errors?.confirmEmail
                        ? "border-red-500"
                        : "border-gray-300"
                    }`,
                    label:
                      "absolute -top-2 left-2 -mt-1 inline-block px-1 text-sm font-semibold text-gray-700 z-10 bg-white",
                  }}
                />
                {form?.errors?.confirmEmail && (
                  <span className="block text-xs text-red-500 md:text-sm">
                    {form?.errors?.confirmEmail}
                  </span>
                )}
              </div>
              <div>
                <div
                  className={`${
                    form?.errors?.phone ? "border-red-500" : "border-gray-300"
                  } shadow-base relative z-20 rounded-lg border px-3 py-1 focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700`}
                >
                  <label className="absolute -top-2.5 left-2 -mt-1 inline-block bg-white px-1 text-sm font-semibold text-gray-700">
                    Phone Number{" "}
                    <span className="mr-1 text-sm font-bold text-red-500">
                      *
                    </span>
                  </label>

                  <PhoneInput
                    onChange={(event) => form.setFieldValue("phone", event)}
                    defaultMask="............"
                    value={form?.values?.phone}
                    enableTerritories={true}
                    disabled={disable}
                    dropdownClass="z-20 focus:outline-none focus:ring-none ring-none disabled:cursor-not-allowed text-gray-900 bg-white border-transparent hover:border-transparent focus:border-transparent shadow-none hover:shadow-none transition duration-300 tracking-wide"
                    inputClass="block w-full border-0 bg-white py-0.5 text-gray-800 placeholder-gray-500 text-sm focus:outline-none disabled:cursor-not-allowed focus:ring-0 tracking-wide"
                  />
                </div>
                {form?.errors?.phone && (
                  <span className="mt-1 block text-sm tracking-wide text-red-500">
                    {form?.errors?.phone}
                  </span>
                )}
              </div>

              <div>
                <Select
                  required
                  styles={() => ({
                    item: {
                      // applies styles to selected item
                      "&[data-selected]": {
                        "&, &:hover": {
                          backgroundColor: "#e4e4e7",
                        },
                      },
                      "&[data-hovered]": {
                        backgroundColor: "#e4e4e7",
                      },
                    },
                  })}
                  label="Security Question"
                  {...form.getInputProps("question")}
                  data={questions}
                  size="sm"
                  placeholder="Select An Option"
                  zIndex={2001}
                  disabled={disable}
                  classNames={{
                    root: "relative rounded-lg border shadow-base focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 border-zinc-300 ",
                    label:
                      "absolute -top-2 left-2 -mt-1 inline-block px-1 text-sm font-semibold text-gray-700 z-10 bg-white",
                    input:
                      "w-full text-zinc-900 text-sm md:text-base bg-white border-none focus-within:border-none focus-within:ring-0 rounded-full placeholder:text-zinc-400",
                    dropdown: "bg-white rounded-xl p-2 border-zinc-200",
                    item: "text-black flex rounded-xl px-3 my-1 py-2 hover:bg-zinc-200",
                    icon: "text-white fill-white",
                    withIcon: "text-white fill-white",
                    error: "hidden",
                  }}
                />

                {form?.errors?.question && (
                  <span className="block text-xs text-red-500 md:text-sm">
                    {form?.errors?.question}
                  </span>
                )}
              </div>

              {form?.values?.question && (
                <div className="w-full">
                  <TextInput
                    label="Security Answer"
                    size="sm"
                    required
                    disabled={disable}
                    placeholder={form?.values?.question}
                    {...form.getInputProps("answer")}
                    classNames={{
                      root: "w-full relative",
                      wrapper: "relative",
                      error: "hidden",
                      input: `bg-white autofill:bg-white ring-0 w-full text-sm text-gray-900 rounded-lg border px-3 py-2.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 placeholder:text-gray-400 relative ${
                        form?.errors?.answer
                          ? "border-red-500"
                          : "border-gray-300"
                      }`,
                      label:
                        "absolute -top-2 left-2 -mt-1 inline-block px-1 text-sm font-semibold text-gray-700 z-10 bg-white",
                    }}
                  />
                  {form?.errors?.answer && (
                    <span className="block text-xs text-red-500 md:text-sm">
                      {form?.errors?.answer}
                    </span>
                  )}
                </div>
              )}

              <Password disable={disable} form={form} password />
              <div>
                <TextInput
                  label="Confirm Password"
                  size="sm"
                  disabled={disable}
                  placeholder="Confirm Your Password"
                  {...form.getInputProps("confirmPassword")}
                  classNames={{
                    root: "w-full relative",
                    wrapper: "relative",
                    input: `bg-white ring-0 w-full text-sm text-gray-900 my-2 rounded-lg border px-3 py-2.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 placeholder:text-gray-400 relative ${
                      form?.errors?.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`,
                    label:
                      "absolute -top-2 left-2 -mt-1 inline-block px-1 text-sm font-semibold text-gray-700 z-10 bg-white",
                  }}
                />
                {form?.errors?.confirmPassword && (
                  <span className="block text-xs text-red-500 md:text-sm">
                    {form?.errors?.confirmPassword}
                  </span>
                )}
              </div>
              {errorRes && (
                <p className="text-center text-red-500 text-sm">{errorRes}</p>
              )}
              <div>
                <button
                  type="submit"
                  disabled={disable}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <ArrowRightOnRectangleIcon
                    className="my-auto mr-4 h-6 w-6 flex-shrink-0 text-white"
                    aria-hidden="true"
                  />
                  Sign up
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
                href="/login"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ArrowLeftOnRectangleIcon
                  className="my-auto mr-4 h-6 w-6 flex-shrink-0 text-white"
                  aria-hidden="true"
                />
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Signup;
