import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";

const Timeline = ({ data }) => {
  return (
    <ul
      role="list"
      className="bg-white shadow-lg rounded-lg p-4 overflow-y-auto h-96"
    >
      <h1 className="text-sm font-semibold">
        Orders To Be Completed This Week
      </h1>
      {data?.length > 0 ? (
        data?.map((event, index) => (
          <li
            key={index}
            className="bg-gray-200 rounded-lg shadow-lg px-4 py-2 my-4"
          >
            <div className="relative pb-8">
              <div className="relative flex space-x-3">
                <div className="my-auto">
                  <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-indigo-500">
                    <CheckBadgeIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4">
                  <div>
                    <div className="my-auto">
                      <p className="text-sm text-gray-500">{event.name}</p>
                      <p className="font-medium inline-block text-gray-900">
                        ${event.total}
                      </p>
                    </div>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={dayjs(event.created).format("DD/MM/YY")}>
                      {dayjs(event.created).format("DD/MM/YY")}
                    </time>
                  </div>
                </div>
              </div>
              <div>
                {event.products?.map((item, index) => {
                  const format = JSON.parse(item);
                  return (
                    <div
                      key={index}
                      className="bg-white my-2 rounded-lg shadow-lg px-4"
                    >
                      <p className="text-sm">{format.name}</p>
                    </div>
                  );
                })}
              </div>
              <div>{event.address}</div>
            </div>
          </li>
        ))
      ) : (
        <h1>No orders this week</h1>
      )}
    </ul>
  );
};

export default Timeline;
