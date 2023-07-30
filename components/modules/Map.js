import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

function LocationMarker({ position, setPosition }) {
  const map = useMapEvent("click", (e) => {
    setPosition(e.latlng);
    map.flyTo(e.latlng, map.getZoom());
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

const Map = ({ position, setPosition, showMarker, arrayMarker }) => {
  return (
    <MapContainer
      center={[10.56986, -61.26526]}
      zoom={9}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      className="z-10 h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {arrayMarker &&
        arrayMarker?.map((item, index) => (
          <Marker position={item} key={index}></Marker>
        ))}
      {showMarker ? (
        <Marker position={position}></Marker>
      ) : arrayMarker === undefined ? (
        <LocationMarker position={position} setPosition={setPosition} />
      ) : null}
    </MapContainer>
  );
};

export default Map;
