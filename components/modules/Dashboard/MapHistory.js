import dynamic from "next/dynamic";
const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

const MapHistory = ({ arrayMarker }) => {
  return (
    <div className="lg:col-span-3 bg-white rounded-lg shadow-lg p-4">
      <h2 className="font-semibold text-sm">Delivery Locations This Week</h2>
      <div className="w-full h-96">
        <Map arrayMarker={arrayMarker} />
      </div>
    </div>
  );
};

export default MapHistory;
