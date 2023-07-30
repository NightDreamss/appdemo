import { Bars3Icon } from "@heroicons/react/24/outline";
import { Menu } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import OrderForm from "./Form";
const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

const OrdersList = ({ customer, setFormData, formData }) => {
  const [selected, setSelected] = useState();
  const [orders, setOrders] = useState([]);
  const [disable, setDisable] = useState(false);
  const [position, setPosition] = useState(null);
  const [geo, setGeo] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      await axios.get(`/api/orders/${customer?.id}`).then((data) => {
        setOrders(data?.data);
      });
    };
    if (customer?.id) fetchOrders();
  }, [customer?.id]);

  const form = useForm({
    initialValues: {
      total: selected?.total ? selected?.total : "",
      products: selected?.products ? selected?.products : "",
    },
  });

  const setComplete = async (order) => {
    try {
      notifications.show({
        id: "update",
        loading: true,
        title: "Processing",
        message: "Completing Order",
        color: "green",
        autoClose: false,
        withCloseButton: false,
      });
      await axios
        .patch(`/api/orders/${order?.id}`, {
          status: 1,
          total: order?.total,
          products: order?.products,
          geo: order?.address,
          position: { lat: order?.lat, lng: order?.lng },
        })
        .then((data) => {
          notifications.update({
            id: "update",
            title: "Success",
            message: "Order Completed!",
            color: "green",
            autoClose: 3000,
          });
          const updateOrder = orders?.map((old) => {
            if (old?.id === data?.data?.id) {
              return {
                ...data?.data,
              };
            }
            return old;
          });
          setOrders(updateOrder);
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

  const deleteOrder = async (id) => {
    try {
      notifications.show({
        id: "delete",
        loading: true,
        title: "Processing",
        message: "Deleting Order",
        color: "green",
        autoClose: false,
        withCloseButton: false,
      });
      await axios.delete(`/api/orders/${id}`).then(() => {
        notifications.update({
          id: "delete",
          title: "Success",
          message: "Product Order!",
          color: "green",
          autoClose: 3000,
        });
        const updateOrder = orders?.filter((old) => {
          if (old?.id !== id) {
            return old;
          }
        });
        setOrders(updateOrder);
        const updateCustomer = formData?.map((old) => {
          if (old?.id === customer?.id) {
            return {
              ...old,
              orders: old?.orders - 1,
            };
          }
          return old;
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
        id: "update",
        loading: true,
        title: "Processing",
        message: "Updating Customer Order",
        color: "green",
        autoClose: false,
        withCloseButton: false,
      });
      await axios
        .patch(`/api/orders/${selected?.id}`, {
          status: selected?.status,
          total,
          products,
          geo,
          position,
        })
        .then((data) => {
          notifications.update({
            id: "update",
            title: "Success",
            message: "Customer Order Updated!",
            color: "green",
            autoClose: 3000,
          });

          const updateOrder = orders?.map((old) => {
            if (old?.id === selected?.id) {
              return {
                ...data?.data,
              };
            }
            return old;
          });
          setOrders(updateOrder);
          setSelected();
          setDisable(false);
        });
    } catch (error) {
      setDisable(false);
      notifications.show({
        id: "update",
        title: "Error",
        message: "An error occurred please try again.",
        color: "red",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {orders?.length > 0 ? (
        <ul role="list" className="grid gap-6">
          {orders.map((order, index) => {
            const productData = order?.products?.map((item) =>
              JSON.parse(item)
            );
            const formatProduct = productData?.map((item) =>
              JSON.stringify({
                id: item?.id,
                name: item?.name,
                price: item?.price,
              })
            );
            return (
              <>
                {selected?.id === order?.id ? (
                  <div
                    key={index}
                    className="col-span-1 p-4 relative flex flex-col divide-y divide-gray-200 rounded-lg bg-gray-200 shadow-lg"
                  >
                    <OrderForm
                      form={form}
                      onSubmit={onSubmit}
                      disable={disable}
                      position={position}
                      setPosition={setPosition}
                      geo={geo}
                      setGeo={setGeo}
                      setSelected={setSelected}
                    />
                  </div>
                ) : (
                  <li
                    key={index}
                    className="col-span-1 relative flex flex-col divide-y divide-gray-200 rounded-lg bg-gray-200 shadow-lg"
                  >
                    <div className="flex flex-1 flex-col p-4 space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-left font-semibold tracking-wider">
                            Status
                          </p>
                          <p className="font-medium inline-block bg-blue-500 px-4 rounded-lg shadow-lg text-white">
                            {order.status === 1 ? "Delivered" : "Not Delivered"}
                          </p>
                        </div>

                        <div className="ml-auto">
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
                              {order?.status === 0 ? (
                                <Menu.Item onClick={() => setComplete(order)}>
                                  <div>Complete</div>
                                </Menu.Item>
                              ) : null}

                              {order?.status === 0 ? (
                                <Menu.Item
                                  onClick={() => {
                                    setSelected(order);
                                    form.setFieldValue(
                                      "products",
                                      formatProduct
                                    );
                                    form.setFieldValue("total", order?.total);
                                    setPosition({
                                      lat: order?.lat,
                                      lng: order?.lng,
                                    });
                                  }}
                                >
                                  <div>Edit</div>
                                </Menu.Item>
                              ) : null}

                              <Menu.Item
                                onClick={() => {
                                  deleteOrder(order?.id);
                                }}
                              >
                                <div>Delete</div>
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-left font-semibold tracking-wider">
                          Total
                        </p>
                        <p className="font-semibold inline-block tracking-wider bg-gray-500 text-white px-4 rounded-lg">
                          ${order?.total}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-left font-semibold tracking-wider">
                          Products Ordered
                        </p>
                        <div className="grid gap-4">
                          {order?.products?.map((item, index) => {
                            const format = JSON.parse(item);
                            return (
                              <div
                                key={index}
                                className="bg-gray-100 px-4 py-1 rounded-lg shadow-lg"
                              >
                                <p>{format?.name}</p>
                                <p>${format?.price}</p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="relative h-60 w-full mt-4 rounded-lg overflow-hidden">
                          <div>
                            <p className="text-sm text-left font-semibold tracking-wider">
                              Address
                            </p>
                            <h1>{order?.address}</h1>
                          </div>
                          <Map
                            position={{ lat: order?.lat, lng: order?.lng }}
                            showMarker
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              </>
            );
          })}
        </ul>
      ) : (
        <div>
          <h1 className="text-xl font-semibold">
            You have not added any orders yet!
          </h1>

          {/* <button
            onClick={() => {
              setSelected(order);
              open();
            }}
            className="text-blue-500 underline"
          >
            Add Order
          </button> */}
        </div>
      )}
    </>
  );
};

export default OrdersList;
