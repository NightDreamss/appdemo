import MainLayout from "@/components/layouts/MainLayout";
import TitleBar from "@/components/modules/TitleBar";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
import ProductForm from "@/components/modules/Products/Form";
import { Modal } from "@mantine/core";
import ListData from "@/components/modules/Products/ListData";

const Products = () => {
  const { data: session } = useSession();
  const [disable, setDisable] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      await axios.get(`/api/products/${session?.user?.id}`).then((data) => {
        setFormData(data?.data);
      });
    };
    if (session?.user?.id) fetchFlowers();
  }, [session?.user?.id]);

  const onSubmit = async (data) => {
    const { name, price, desc, image } = data;
    try {
      setDisable(true);
      notifications.show({
        id: "edit",
        loading: true,
        title: "Processing",
        message: "Editing Product",
        color: "green",
        autoClose: false,
        withCloseButton: false,
      });
      await axios
        .patch(`/api/products/${selected?.id}`, {
          userID: session?.user?.id,
          name,
          price,
          desc,
          image,
        })
        .then((data) => {
          notifications.update({
            id: "edit",
            title: "Success",
            message: "Product Edited!",
            color: "green",
            autoClose: 3000,
          });
          const updateFlowers = formData?.map((old) => {
            if (old?.id === data?.data?.id) {
              return {
                ...data?.data,
              };
            }
            return old;
          });
          setFormData(updateFlowers);
          close();
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
    <MainLayout>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-4 lg:px-6">
          <TitleBar title="List of Product" />
          <ListData
            formData={formData}
            setFormData={setFormData}
            open={open}
            setSelected={setSelected}
          />
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title={`Edit - ${selected?.name}`}
        centered
        size="calc(100vw - 3rem)"
      >
        <ProductForm
          onSubmit={onSubmit}
          disable={disable}
          selected={selected}
        />
      </Modal>
    </MainLayout>
  );
};

export default Products;
