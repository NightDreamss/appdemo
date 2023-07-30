import { Bars3Icon } from "@heroicons/react/24/outline";
import { Menu } from "@mantine/core";
import Link from "next/link";

const TitleBar = ({ title }) => {
  return (
    <div className="flex justify-between w-full">
      <h1 className="lg:text-2xl text-lg font-semibold py-4">{title}</h1>
      <Menu
        shadow="md"
        width={200}
        withArrow
        classNames={{
          dropdown: "px-4",
          item: "bg-gray-100 my-2 hover:bg-gray-200 p-0",
          itemLabel: "w-full h-full flex",
        }}
      >
        <Menu.Target>
          <button className="text-sm flex-shrink-0 flex font-semibold leading-6 bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1 rounded-lg text-white my-auto">
            Management
            <Bars3Icon className="ml-2 h-5 my-auto w-5" />
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item>
            <Link href="/dashboard" className="px-4 py-3 w-full h-full">
              Dashboard
            </Link>
          </Menu.Item>

          <Menu.Label>Products</Menu.Label>
          <Menu.Item>
            <Link href="/products" className="px-4 py-3 w-full h-full">
              Products
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/products/add" className="px-4 py-3 w-full h-full">
              Add Product
            </Link>
          </Menu.Item>
          <Menu.Divider />

          <Menu.Label>Customer</Menu.Label>
          <Menu.Item>
            <Link href="/customers" className="px-4 py-3 w-full h-full">
              Customers
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/customers/add" className="px-4 py-3 w-full h-full">
              Add Customer
            </Link>
          </Menu.Item>
          <Menu.Divider />
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default TitleBar;
