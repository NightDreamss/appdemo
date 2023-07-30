import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSession } from "next-auth/react";
import { Bar } from "react-chartjs-2";
import useSWR from "swr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Products Ordered Overall",
    },
  },
};

const BarGraph = ({ orders, data }) => {
  const labels = data?.map((item) => item.name);

  const formatData = orders?.map((item) =>
    item?.products?.map((e) => JSON.parse(e))
  );

  const countFlowers = (orders, products) => {
    const occurrences = products.reduce((result, obj) => {
      const { id, name } = obj;
      const count = orders.reduce((count, subArray) => {
        return (
          count +
          subArray.reduce((subCount, subObj) => {
            if (subObj.id === id) {
              return subCount + 1;
            }
            return subCount;
          }, 0)
        );
      }, 0);
      result[name] = count;
      return result;
    }, {});

    return occurrences;
  };
  const count = formatData && data ? countFlowers(formatData, data) : [];

  const dataBar = {
    labels,
    datasets: [
      {
        label: "Orders Placed",
        data: count,
        backgroundColor: "rgba(55, 41, 208, 0.5)",
      },
    ],
  };
  return (
    <div className="w-full lg:col-span-2 bg-white rounded-lg p-6 shadow-lg">
      <Bar options={optionsBar} data={dataBar} />
    </div>
  );
};

export default BarGraph;
