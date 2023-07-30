import { MultiSelect } from "@mantine/core";
const Map = dynamic(() => import("../Map"), {
  ssr: false,
});
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { notifications } from "@mantine/notifications";
import { fetchLocation } from "@/libs/geoData";
import { useSession } from "next-auth/react";
import axios from "axios";

const OrderForm = ({
  form,
  onSubmit,
  disable,
  position,
  setPosition,
  geo,
  setGeo,
  setSelected,
}) => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await axios.get(`/api/products/${session?.user?.id}`).then((data) => {
        setProducts(data?.data);
      });
    };
    if (session?.user?.id) fetchProducts();
  }, [session?.user?.id]);

  useEffect(() => {
    if (position) {
      try {
        fetchLocation(position, setGeo);
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "Unable to get location.",
          color: "red",
        });
      }
    }
  }, [position]);

  const checkKeyDown = (e) => {
    const keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
      <div className="space-y-4">
        <MultiSelect
          data={products?.map((item) => ({
            label: item?.name,
            value: JSON.stringify({
              id: item?.id,
              name: item?.name,
              price: item?.price,
            }),
          }))}
          label="Products"
          placeholder="Select all the products"
          value={form?.values?.products}
          onChange={(value) => {
            let total = 0;
            if (value?.length <= 0) {
              form?.setFieldValue("total", 0);
            }
            for (let i = 0; i < value?.length; i++) {
              const format = JSON.parse(value[i]);
              total = total += parseInt(format?.price);
              form?.setFieldValue("total", total);
            }
            form?.setFieldValue("products", value);
          }}
        />
        <div>
          <label className="text-sm font-semibold">Location</label>
          <p>{geo}</p>
          <div id="map" className="h-80 w-full">
            <Map position={position} setPosition={setPosition} />
          </div>
        </div>

        <div>Total: ${form?.values?.total}</div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={disable}
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
          {setSelected && (
            <button
              onClick={() => setSelected()}
              className="flex justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
