import Image from "next/image";
import {
  AtSymbolIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { status } = useSession();
  return (
    <footer className="bg-white font-Poppin" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16">
        <Link
          href={status === "authenticated" ? "/dashboard" : "/"}
          className="-m-1.5 p-1.5 inline-block"
        >
          <Image
            priority
            height={60}
            width={200}
            className="mb-6 h-10 w-10"
            src="/logo.png"
            alt="Flower Logo"
          />
        </Link>

        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <p className="text-base text-gray-500">
              The Caribbean Community &#40;CARICOM&#41; Implementation Agency
              for Crime and Security &#40;IMPACS&#41; was established by the
              Twenty Seventh Meeting of the Conference of Heads of Government in
              July 2006, in Bird Rock, St Kitts and Nevis, as the implementation
              arm of a new Regional Architecture to manage CARICOM&#39;s action
              agenda on crime and security.
            </p>
          </div>
          <div className="col-span-1 mt-6 space-y-4 xl:mt-0">
            <div className="flex space-x-4">
              <PhoneIcon
                className="h-6 w-6 flex-shrink-0 text-blue-800"
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <a
                  data-telegram="telegram"
                  href={`tel:8682933575`}
                  className="text-blue-800 underline"
                >
                  &#40;868&#41; 2933575
                </a>
              </div>
            </div>
            <div className="flex space-x-4">
              <AtSymbolIcon
                className="h-6 w-6 flex-shrink-0 text-blue-800"
                aria-hidden="true"
              />
              <a
                className="text-blue-800 underline"
                href={`mailto:brandonlitren@gmail.com`}
              >
                brandonlitren@gmail.com
              </a>
            </div>
            <div className="flex space-x-4">
              <MapPinIcon
                className="h-6 w-6 flex-shrink-0 text-blue-800"
                aria-hidden="true"
              />
              <p>Some Random Street in Trinidad And Tobago</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a
              href="https://www.facebook.com"
              className="text-gray-400 hover:text-blue-800"
            >
              <span className="sr-only">Facebook</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-blue-800"
            >
              <span className="sr-only">Twitter</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
          <p className="pt-6 text-base text-gray-700 md:order-1 md:pt-0">
            &copy; {new Date().getFullYear()} All rights reserved
            <a
              href="https://brandonlitren.vercel.app/"
              className="ml-1 text-blue-800 underline transition-colors duration-300 hover:text-blue-900"
              rel="noopener noreferrer"
              target="_blank"
            >
              Brandon Litren
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
