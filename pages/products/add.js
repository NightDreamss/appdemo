import MainLayout from "@/components/layouts/MainLayout";
import TitleBar from "@/components/modules/TitleBar";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import ProductForm from "@/components/modules/Products/Form";
import { useRouter } from "next/router";

const AddProduct = () => {
  const { data: session } = useSession();
  const [disable, setDisable] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    const { name, price, desc, image } = data;
    try {
      setDisable(true);
      notifications.show({
        id: "add",
        loading: true,
        title: "Processing",
        message: "Adding Product",
        color: "green",
        autoClose: false,
        withCloseButton: false,
      });
      await axios
        .post(`/api/products/${session?.user?.id}`, {
          name,
          price,
          desc,
          image,
        })
        .then(() => {
          notifications.update({
            id: "add",
            title: "Success",
            message: "Product Added!",
            color: "green",
            autoClose: 3000,
          });
          router.push("/products");
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
          <TitleBar title="Add Product" />
          <div className="mb-6 -mt-4 font-Poppin text-base text-gray-800">
            <p>Fill out the form to add a product.</p>
          </div>
          <ProductForm disable={disable} onSubmit={onSubmit} />
        </div>
      </div>
    </MainLayout>
  );
};

export default AddProduct;
