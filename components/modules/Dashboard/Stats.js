import {
  CurrencyDollarIcon,
  CursorArrowRaysIcon,
  DocumentCheckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import CountUp from "react-countup";

const Stats = ({ countOrders, countCustomers, orders, complete }) => {
  const countProducts = (e) => {
    const productCount = e.map((element) => element.products.length);
    const totalCount = productCount.reduce((sum, count) => sum + count, 0);
    return totalCount;
  };
  const totalProducts = orders ? countProducts(orders) : 0;

  let count = [];
  count.push(countOrders);
  count.push(countCustomers);
  count.push({ totalProducts: totalProducts });
  count.push(complete);
  const [loading, setLoading] = useState(true);
  const onStart = () => {
    setLoading(true);
  };
  const onEnd = () => {
    setLoading(false);
  };
  const containerProps = {
    "aria-busy": loading,
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 lg:col-span-2">
      <h1 className="font-semibold text-sm">Overall Stats</h1>
      <dl className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {count?.length > 0 ? (
          count.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg bg-gray-200 p-4 shadow-lg sm:px-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  {item?.customerCount >= 0 ? (
                    <UsersIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  ) : item?.ordersCount ? (
                    <CursorArrowRaysIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  ) : item?.totalProducts ? (
                    <CurrencyDollarIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  ) : item?.ordersComplete ? (
                    <DocumentCheckIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {item?.customerCount >= 0
                    ? "Customers"
                    : item?.ordersCount
                    ? "Total Orders"
                    : item?.totalProducts
                    ? "Flowers Sold"
                    : item?.ordersComplete
                    ? "Orders Complete"
                    : null}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  <CountUp
                    start={0}
                    end={
                      item?.customerCount
                        ? item.customerCount
                        : item?.ordersCount
                        ? item?.ordersCount
                        : item?.totalProducts
                        ? item?.totalProducts
                        : item?.ordersComplete
                        ? item?.ordersComplete
                        : null
                    }
                    duration="3"
                    useEasing={true}
                    useGrouping={true}
                    onStart={onStart}
                    onEnd={onEnd}
                    containerProps={containerProps}
                  />
                </p>
              </dd>
            </div>
          ))
        ) : (
          <p>No customers or orders this week</p>
        )}
      </dl>
    </div>
  );
};

export default Stats;
