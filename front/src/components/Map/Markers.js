import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import React, { useEffect } from "react";

const Markers = (props) => {
  console.log("markers props", props.markers);

  const map = useMapEvents({
    click(e) {
      props.setMarkers(e);
    },
  });

  useEffect(() => {
    if (!map) return;
    let routingControl;

    if (props.markers.length > 1) {
      let wayPoints = [];
      props.markers.map((position) => {
        wayPoints.push(L.latLng(position.lat, position.lng));
      });
      routingControl = L.Routing.control({
        waypoints: wayPoints,
        routeWhileDragging: true,
      }).addTo(map);
    }

    return () => {
      if (routingControl) map.removeControl(routingControl);
    };
  }, [map, props.markers]);

  return (
    <>
      {props.markers.map((position, idx) => (
        <Marker
          key={`marker-${idx}`}
          position={position}
          eventHandlers={{
            click: (e) => {
              map.flyTo(e.latlng, 14);
            },
          }}
        ></Marker>
      ))}
    </>
  );
};

export default Markers;
