import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { data, status } = useSession();

  return (
    <header className="bg-white mx-auto container">
      <nav
        className="flex items-center justify-between px-4 py-4 lg:px-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 space-x-4">
          <Link
            href={status === "authenticated" ? "/dashboard" : "/"}
            className="-m-1.5 p-1.5"
          >
            <span className="sr-only">Flower Company</span>
            <Image
              priority
              height={60}
              width={200}
              className="h-10 w-auto"
              src="/logo.png"
              alt="Flower Logo"
            />
          </Link>
        </div>
        {status !== "authenticated" ? (
          <div className="hidden lg:flex space-x-4 lg:flex-1 lg:justify-end">
            <Link
              href="/register"
              className="text-sm font-semibold leading-6 bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1 rounded-lg text-white my-auto"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900 my-auto hover:bg-gray-200 bg-gray-100 rounded-lg py-1 px-4"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex space-x-4 lg:flex-1 lg:justify-end">
            <div className="flex">
              <Image
                src={data?.user?.image}
                height={60}
                width={60}
                className="h-10 w-auto rounded-full"
                alt="Profile Picture"
              />
              <p className="ml-2 my-auto capitalize">{data?.user?.name}</p>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-sm font-semibold leading-6 bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1 rounded-lg text-white my-auto"
            >
              Logout <span aria-hidden="true">&larr;</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
