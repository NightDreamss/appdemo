import { TextInput } from "@mantine/core";
import { addCustomerSchema } from "@/libs/schema";
import { useForm, zodResolver } from "@mantine/form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const CustomerForm = ({ disable, onSubmit, selected }) => {
  const form = useForm({
    validate: zodResolver(addCustomerSchema),
    initialValues: {
      name: selected?.name ? selected?.name : "",
      email: selected?.email ? selected?.email : "",
      phone: selected?.phone ? selected?.phone : "",
    },
  });

  const checkKeyDown = (e) => {
    const keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        onKeyDown={(e) => checkKeyDown(e)}
      >
        <div className="space-y-4">
          <div>
            <TextInput
              label="Customer Name"
              size="sm"
              disabled={disable}
              required
              placeholder="Your customer's name"
              {...form.getInputProps("name")}
              classNames={{
                root: "w-full relative",
                wrapper: "relative",
                input: `bg-white ring-0 w-full text-sm text-gray-900 rounded-lg border px-3 py-2.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 placeholder:text-gray-400 relative ${
                  form?.errors?.name ? "border-red-500" : "border-gray-300"
                }`,
              }}
            />
            {form?.errors?.name && (
              <span className="block font-Poppin text-xs text-red-500 md:text-sm">
                {form?.errors?.name}
              </span>
            )}
          </div>
          <div>
            <TextInput
              label="Customer Email"
              size="sm"
              disabled={disable}
              required
              placeholder="Your customer's email"
              {...form.getInputProps("email")}
              classNames={{
                root: "w-full relative",
                wrapper: "relative",
                input: `bg-white ring-0 w-full text-sm text-gray-900 rounded-lg border px-3 py-2.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 placeholder:text-gray-400 relative ${
                  form?.errors?.email ? "border-red-500" : "border-gray-300"
                }`,
              }}
            />
            {form?.errors?.email && (
              <span className="block font-Poppin text-xs text-red-500 md:text-sm">
                {form?.errors?.email}
              </span>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Phone Number <span className="mr-1 text-red-500">*</span>
            </label>
            <div
              className={`${
                form?.errors?.phone ? "border-red-500" : "border-gray-300"
              } shadow-base relative z-20 rounded-lg border bg-white px-3 py-1 focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700`}
            >
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
            <button
              type="submit"
              className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      {form?.values?.name || form?.values?.email || form?.values?.phone ? (
        <div className="p-4 lg:inline-block relative hidden shadow-lg rounded-lg h-40 bg-white overflow-hidden max-w-sm m-auto text-center">
          <h1 className="text-2xl truncate font-semibold">
            {form?.values?.name}
          </h1>
          <p className="line-clamp-2 truncate">{form?.values?.email}</p>
          <p className="line-clamp-2 truncate">{form?.values?.phone}</p>
        </div>
      ) : null}
    </div>
  );
};

export default CustomerForm;
