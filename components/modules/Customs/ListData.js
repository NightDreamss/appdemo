import { Bars3Icon } from "@heroicons/react/24/outline";
import { Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import OrdersList from "../Orders/ListData";
import { useForm } from "@mantine/form";
const OrderForm = dynamic(() => import("../Orders/Form"), {
  ssr: false,
});

const ListData = ({ formData, setFormData, open, setSelected, selected }) => {
  const [opened, { open: addOrderOpen, close: closeAddOrder }] =
    useDisclosure(false);
  const [ordersOpened, { open: ordersOpen, close: closeOrders }] =
    useDisclosure(false);
  const [customer, setCustomer] = useState(null);
  const [disable, setDisable] = useState(false);
  const [position, setPosition] = useState(null);
  const [geo, setGeo] = useState(null);

  const form = useForm({
    initialValues: {
      total: selected?.total ? selected?.total : "",
      products: selected?.products ? selected?.products : "",
    },
  });

  const deleteProduct = async (id) => {
    try {
      notifications.show({
        id: "delete",
        loading: true,
        title: "Processing",
        message: "Deleting Customer",
        color: "green",
        autoClose: false,
        withCloseButton: false,
      });
      await axios.delete(`/api/customer/${id}`).then(() => {
        notifications.update({
          id: "delete",
          title: "Success",
          message: "Customer Deleted!",
          color: "green",
          autoClose: 3000,
        });
        const updateCustomer = formData?.filter((old) => {
          if (old?.id !== id) {
            return old;
          }
        });
        setFormData(updateCustomer);
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

  const onSubmit = async (data) => {
    const { total, products } = data;
    try {
      setDisable(true);
      notifications.show({
        id: "add",
        loading: true,
        title: "Processing",
        message: "Adding Customer Order",
        color: "green",
        autoClose: false,
        withCloseButton: false,
      });
      await axios
        .post(`/api/orders/${selected?.id}`, {
          status: 0,
          total,
          products,
          geo,
          position,
        })
        .then((data) => {
          notifications.update({
            id: "add",
            title: "Success",
            message: "Customer Order Added!",
            color: "green",
            autoClose: 3000,
          });

          const updateCustomer = formData?.map((old) => {
            if (old?.id === selected?.id) {
              return {
                ...old,
                orders: old?.orders + 1,
              };
            }
            return old;
          });
          form.reset();
          setFormData(updateCustomer);
          closeAddOrder();
          setPosition(null);
          setGeo(null);
          setDisable(false);
        });
    } catch (error) {
      setDisable(false);
      notifications.show({
        id: "add",
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
        <ul role="list" className="space-y-4">
          {formData?.map((customer, index) => (
            <li
              key={index}
              className="relative p-4 flex justify-between divide-gray-200 rounded-lg bg-white text-center shadow-lg"
            >
              <div className="space-y-2 text-left overflow-hidden">
                <p className="truncate">Name: {customer.name}</p>
                <p className="truncate">Email: {customer?.email}</p>
                <p className="truncate">Phone: {customer?.phone}</p>
                <p>Total Orders: {customer?.orders}</p>
                <div className="space-x-4">
                  <button
                    onClick={() => {
                      addOrderOpen();
                      setCustomer(customer);
                      setSelected(customer);
                    }}
                    className="bg-blue-500 px-4 py-1 shadow-lg rounded-lg text-white"
                  >
                    Add Order
                  </button>
                  <button
                    onClick={() => {
                      ordersOpen();
                      setCustomer(customer);
                    }}
                    className="bg-gray-200 px-4 py-1 shadow-lg rounded-lg"
                  >
                    View Orders
                  </button>
                </div>
              </div>
              <div>
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
                        setSelected(customer);
                        open();
                      }}
                    >
                      <div>Edit</div>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        deleteProduct(customer?.id);
                      }}
                    >
                      <div>Delete</div>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h1 className="text-xl font-semibold">
            You have not added any customers yet!
          </h1>

          <Link href="/customers/add" className="text-blue-500 underline">
            Add Customer
          </Link>
        </div>
      )}
      <Modal
        opened={opened}
        onClose={closeAddOrder}
        title={`Add Order - ${customer?.name}`}
        centered
        size="md"
      >
        <OrderForm
          form={form}
          onSubmit={onSubmit}
          disable={disable}
          position={position}
          setPosition={setPosition}
          geo={geo}
          setGeo={setGeo}
        />
      </Modal>
      <Modal
        opened={ordersOpened}
        onClose={closeOrders}
        title={`${customer?.name} Orders`}
        centered
        size="md"
      >
        <OrdersList
          customer={customer}
          setCustomer={setCustomer}
          setFormData={setFormData}
          formData={formData}
        />
      </Modal>
    </>
  );
};

export default ListData;
