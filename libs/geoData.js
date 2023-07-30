import axios from "axios";

export const fetchLocation = async (position, setGeo) => {
  await axios
    .get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position?.lat}&lon=${position?.lng}`
    )
    .then((data) => {
      const geoLocation = `${
        data?.data?.address?.road ? data?.data?.address?.road + ", " : ""
      }${
        data?.data?.address?.village ? data?.data?.address?.village + ", " : ""
      }${
        data?.data?.address?.suburb ? data?.data?.address?.suburb + ", " : ""
      }${
        data?.data?.address?.state_district
          ? data?.data?.address?.state_district + ", "
          : ""
      }${data?.data?.address?.town ? data?.data?.address?.town + ", " : ""}${
        data?.data?.address?.city ? data?.data?.address?.city + ", " : ""
      }${data?.data?.address?.state ? data?.data?.address?.state + ", " : ""}${
        data?.data?.address?.country_code
          ? data?.data?.address?.country_code.toUpperCase()
          : ""
      }`;

      setGeo(geoLocation);
    });
};
