import MainLayout from "@/components/layouts/MainLayout";
import MapHistory from "@/components/modules/Dashboard/MapHistory";
import Stats from "@/components/modules/Dashboard/Stats";
import Timeline from "@/components/modules/Dashboard/Timeline";
import TitleBar from "@/components/modules/TitleBar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import BarGraph from "@/components/modules/Dashboard/BarGraph";

const Dashboard = () => {
  const { data: session } = useSession();
  const [arrayMarker, setArrayMarker] = useState(null);

  const fetcherMarker = (url) =>
    axios.get(url).then((res) => {
      const newMarkers = res?.data?.map((item) => ({
        lat: item?.lat,
        lng: item?.lng,
      }));
      setArrayMarker(newMarkers);
      return res.data;
    });

  const fetcherDefault = (url) => axios.get(url).then((res) => res.data[0]);
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data } = useSWR(
    `/api/dashboard/${session?.user?.id}`,
    fetcherMarker,
    {
      refreshInterval: 1000,
    }
  );

  const { data: countOrders } = useSWR(
    `/api/dashboard/orders`,
    fetcherDefault,
    {
      refreshInterval: 1000,
    }
  );

  const { data: countCustomers } = useSWR(
    `/api/dashboard/customers/${session?.user?.id}`,
    fetcherDefault,
    {
      refreshInterval: 1000,
    }
  );

  const { data: products } = useSWR(
    `/api/products/${session?.user?.id}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const { data: complete } = useSWR(
    `/api/dashboard/completedOrder`,
    fetcherDefault,
    {
      refreshInterval: 1000,
    }
  );

  const { data: orders } = useSWR(`/api/dashboard/bargraph`, fetcher, {
    refreshInterval: 1000,
  });

  return (
    <MainLayout>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-4 lg:px-6">
          <TitleBar title="Dashboard" />
          <div className="grid lg:grid-cols-4 gap-6">
            <BarGraph data={products} orders={orders} />
            <Stats
              countCustomers={countCustomers}
              countOrders={countOrders}
              orders={orders}
              complete={complete}
            />
            <Timeline data={data} />
            <MapHistory arrayMarker={arrayMarker} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
