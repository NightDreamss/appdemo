import { NumberInput, Select, TextInput } from "@mantine/core";
import { flowers } from "@/libs/const";
import Image from "next/image";
import { addProductSchema } from "@/libs/schema";
import { useForm, zodResolver } from "@mantine/form";

const ProductForm = ({ disable, onSubmit, selected }) => {
  const form = useForm({
    validate: zodResolver(addProductSchema),
    initialValues: {
      name: selected?.name ? selected?.name : "",
      price: selected?.price ? parseInt(selected?.price) : "",
      image: selected?.image ? selected?.image : "",
      desc: selected?.desc ? selected?.desc : "",
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
              label="Product Name"
              size="sm"
              disabled={disable}
              required
              placeholder="Your product's name"
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
            <Select
              label="Choose your flower"
              placeholder="Pick a flower"
              searchable
              disabled={disable}
              nothingFound="No options"
              data={flowers}
              {...form.getInputProps("image")}
            />
          </div>
          <div>
            <TextInput
              label="Product Description"
              size="sm"
              disabled={disable}
              required
              placeholder="Your product's description"
              {...form.getInputProps("desc")}
              classNames={{
                root: "w-full relative",
                wrapper: "relative",
                input: `bg-white ring-0 w-full text-sm text-gray-900 rounded-lg border px-3 py-2.5 shadow-sm focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700 placeholder:text-gray-400 relative ${
                  form?.errors?.desc ? "border-red-500" : "border-gray-300"
                }`,
              }}
            />
            {form?.errors?.desc && (
              <span className="block font-Poppin text-xs text-red-500 md:text-sm">
                {form?.errors?.desc}
              </span>
            )}
          </div>
          <div>
            <label className="font-semibold text-sm">
              Price
              <span className="mr-1 text-red-500"> *</span>
            </label>
            <NumberInput
              required
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : "$ "
              }
              placeholder="Your product's price"
              {...form.getInputProps("price")}
              disabled={disable}
            />

            {form?.errors?.price && (
              <span className="block font-Poppin text-xs text-red-500 md:text-sm">
                {form?.errors?.price}
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
      {form?.values?.name ||
      form?.values?.image ||
      form?.values?.desc ||
      form?.values?.price ? (
        <div className="p-4 lg:block hidden shadow-lg rounded-lg bg-white overflow-hidden max-w-sm mx-auto text-center">
          {form?.values?.image && (
            <Image
              src={form?.values?.image}
              height={400}
              width={400}
              className="w-80 h-80 bg-cover rounded-lg mx-auto"
              alt="flower"
            />
          )}

          <h1 className="text-2xl truncate font-semibold">
            {form?.values?.name}
          </h1>

          <p className="line-clamp-2 truncate">{form?.values?.desc}</p>

          {form?.values?.price && (
            <p className="text-lg font-semibold tracking-wider bg-gray-500 text-white px-4 py-1 mt-2 rounded-lg inline-block">
              ${form?.values?.price}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ProductForm;
