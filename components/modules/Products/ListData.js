import { Bars3Icon } from "@heroicons/react/24/outline";
import { Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ListData = ({ formData, setFormData, open, setSelected }) => {
  const deleteProduct = async (id) => {
    try {
      notifications.show({
        id: "delete",
        loading: true,
        title: "Processing",
        message: "Deleting Product",
        color: "green",
        autoClose: false,
        withCloseButton: false,
      });
      await axios.delete(`/api/products/${id}`).then(() => {
        notifications.update({
          id: "delete",
          title: "Success",
          message: "Product Deleted!",
          color: "green",
          autoClose: 3000,
        });
        const updateFlowers = formData?.filter((old) => {
          if (old?.id !== id) {
            return old;
          }
        });
        setFormData(updateFlowers);
      });
    } catch (error) {
      notifications.show({
        id: "delete",
        title: "Error",
        message: "An error occurred please try again.",
        color: "red",
        autoClose: 3000,
      });
    }
  };
  return (
    <>
      {formData?.length > 0 ? (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {formData.map((flower, index) => (
            <li
              key={index}
              className="col-span-1 relative flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-lg"
            >
              <div className="absolute top-4 right-4">
                <Menu
                  shadow="md"
                  width={200}
                  withArrow
                  classNames={{
                    dropdown: "px-4",
                    item: "bg-gray-100 hover:bg-gray-200 my-2",
                  }}
                >
                  <Menu.Target>
                    <div className="text-sm cursor-pointer flex-shrink-0 font-semibold leading-6 bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded-lg text-white my-auto">
                      <Bars3Icon className="h-5 my-auto w-5" />
                    </div>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => {
                        setSelected(flower);
                        open();
                      }}
                    >
                      <div>Edit</div>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        deleteProduct(flower?.id);
                      }}
                    >
                      <div>Delete</div>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <Image
                  className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                  src={flower?.image}
                  height={400}
                  width={400}
                  alt="flower"
                />
                <h3 className="mt-6 text-sm font-medium text-gray-900">
                  {flower.name}
                </h3>
                <p className="line-clamp-2 truncate">{flower?.desc}</p>

                <p className="text-lg font-semibold tracking-wider bg-gray-500 text-white px-4 py-1 mt-2 rounded-lg inline-block">
                  ${flower?.price}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h1 className="text-xl font-semibold">
            You have not added any products yet!
          </h1>

          <Link href="/products/add" className="text-blue-500 underline">
            Add Product
          </Link>
        </div>
      )}
    </>
  );
};

export default ListData;
