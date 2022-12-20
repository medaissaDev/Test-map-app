import { useEffect, useState } from "react";
import { Marker, useMapEvents, useMap } from "react-leaflet";

//this is to locate your position on the map
const LocationMarker = (props) => {
  const map = useMap();
  const [position, setPosition] = useState(null);
  useMapEvents({
    locationfound(e) {
      if (e) {
        map.flyTo(e.latlng, map.getZoom());
      }
    },
  });
  useEffect(() => {
    map.locate();
  }, []);
  return position === null ? null : (
    <Marker
      position={position}
      eventHandlers={{
        click: (e) => {
          map.flyTo(e.latlng, 14);
        },
      }}
    ></Marker>
  );
};

export default LocationMarker;
