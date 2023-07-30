import { z } from "zod";
import { questions } from "./const";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
      message: "Invalid email address, please enter a valid email",
    }),
  password: z
    .string()
    .trim()
    .regex(
      /^(?:(?=.{8,})(?=.*[~`! @#$%^&*()_|;"'<:,>.?/+={[}-])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
      {
        message:
          "Password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol",
      }
    )
    .min(1, {
      message: "A password is required",
      invalid_type_error: "A password is required",
    })
    .max(15),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .regex(/^[A-Za-z\s]*$/, {
        message: "Only alphabet characters",
        invalid_type_error: "Only alphabet characters",
      })
      .min(1, {
        message: "You must fill out this field",
        invalid_type_error: "You must fill out this field",
      })
      .max(200, {
        message: "You can not exceed 200 characters",
        invalid_type_error: "You can not exceed 200 characters",
      }),
    email: z
      .string()
      .trim()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
        message: "Invalid email address, please enter a valid email",
      }),
    confirmEmail: z.string(),
    phone: z.string().min(7, {
      message: "Invalid phone number",
      invalid_type_error: "Invalid phone number",
    }),
    question: z
      .string(z.enum(questions))
      .min(1, {
        message: "Please select a question",
      })
      .max(200, {
        message: "Question selected to long",
      }),
    answer: z
      .string()
      .min(2, {
        message: "Please enter a longer answer",
      })
      .max(200, {
        message: "A maximum of 1 category",
      }),
    password: z
      .string()
      .trim()
      .regex(
        /^(?:(?=.{8,})(?=.*[~`! @#$%^&*()_|;"'<:,>.?/+={[}-])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
        {
          message:
            "Password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol",
        }
      )
      .min(1, {
        message: "A password is required",
        invalid_type_error: "A password is required",
      })
      .max(15),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords did not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email did not match",
    path: ["confirmEmail"],
  }); // Field validation schema

export const addProductSchema = z.object({
  name: z
    .string()
    .regex(/^[A-Za-z\s]*$/, {
      message: "Only alphabet characters",
      invalid_type_error: "Only alphabet characters",
    })
    .min(1, {
      message: "You must fill out this field",
      invalid_type_error: "You must fill out this field",
    })
    .max(200, {
      message: "You can not exceed 100 characters",
      invalid_type_error: "You can not exceed 100 characters",
    }),
  price: z
    .number()
    .min(1, {
      message: "Your price can not be blank",
    })
    .max(99999999, {
      message: "Your price can not exceed 99999999",
    }),
  desc: z
    .string()
    .regex(/^[A-Za-z\s]*$/, {
      message: "Only alphabet characters",
      invalid_type_error: "Only alphabet characters",
    })
    .min(1, {
      message: "You must fill out this field",
      invalid_type_error: "You must fill out this field",
    })
    .max(200, {
      message: "You can not exceed 200 characters",
      invalid_type_error: "You can not exceed 200 characters",
    }),
});

export const addCustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[A-Za-z\s]*$/, {
      message: "Only alphabet characters",
      invalid_type_error: "Only alphabet characters",
    })
    .min(1, {
      message: "You must fill out this field",
      invalid_type_error: "You must fill out this field",
    })
    .max(200, {
      message: "You can not exceed 200 characters",
      invalid_type_error: "You can not exceed 200 characters",
    }),
  email: z
    .string()
    .trim()
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
      message: "Invalid email address, please enter a valid email",
    }),
  phone: z.string().min(7, {
    message: "Invalid phone number",
    invalid_type_error: "Invalid phone number",
  }),
});
