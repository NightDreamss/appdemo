import MainLayout from "@/components/layouts/MainLayout";
import TitleBar from "@/components/modules/TitleBar";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import "react-phone-input-2/lib/bootstrap.css";
import CustomerForm from "@/components/modules/Customs/Form";
import { useRouter } from "next/router";

const AddCustomer = () => {
  const { data: session } = useSession();
  const [disable, setDisable] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    const { name, email, phone } = data;
    try {
      setDisable(true);
      notifications.show({
        id: "add",
        loading: true,
        title: "Processing",
        message: "Adding Customer",
        color: "green",
        autoClose: false,
        withCloseButton: false,
      });
      await axios
        .post(`/api/customer/${session?.user?.id}`, {
          name,
          email,
          phone,
        })
        .then(() => {
          notifications.update({
            id: "add",
            title: "Success",
            message: "Customer Added!",
            color: "green",
            autoClose: 3000,
          });
          router.push("/customers");
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
          <TitleBar title="Add Customer" />
          <div className="mb-6 -mt-4 font-Poppin text-base text-gray-800">
            <p>Fill out the form to add a customer.</p>
          </div>
          <CustomerForm disable={disable} onSubmit={onSubmit} />
        </div>
      </div>
    </MainLayout>
  );
};

export default AddCustomer;
