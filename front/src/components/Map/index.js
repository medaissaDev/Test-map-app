import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "./Map.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import Markers from "./Markers";
import { getPaths, savePath } from "../../services";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [pathName, setPathName] = useState("");
  const [paths, setPaths] = useState([]);
  const [activePath, setActivePath] = useState();

  const onChangeHandler = (event) => {
    setPathName(event.target.value);
  };

  const whenReady = () => {
    console.log("map is ready");
  };

  const addMarker = (e) => {
    const markersObj = [...markers];
    markersObj.push(e.latlng);
    setMarkers(markersObj);
  };

  const saveMyPath = (_) => {
    savePath(pathName, markers).then((res) => {
      const savedPaths = [...paths];
      savedPaths.push(res.data.data);
      setPaths(savedPaths);
      setActivePath(res.data.data.id);
      setPathName("");
    });
  };

  useEffect(() => {
    getPaths().then((res) => {
      console.log("res", res);
      setPaths(res.data);
    });
  }, []);

  const showPath = (path) => {
    console.log("path", path);
    let locations = [];
    path.locations.forEach((elm) => {
      locations.push(elm.location.coordinates);
    });
    setMarkers(locations);
    setActivePath(path.id);
  };

  const clearPaths = (_) => {
    setMarkers([]);
    setActivePath(null);
  };

  return (
    <>
      <MapContainer
        onClick={addMarker}
        whenReady={whenReady}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <Markers markers={markers} setMarkers={addMarker} />
      </MapContainer>

      {paths.length > 0 && (
        <div className="saved-paths">
          {paths.map((path, idx) => (
            <>
              <button
                key={`path-btn-${idx}`}
                className={`btn-save ${
                  path.id === activePath ? "active-btn" : ""
                }`}
                onClick={() => showPath(path)}
              >
                {path.name}
              </button>
            </>
          ))}
          <button
            key={`path-btn-clear`}
            className={`btn-save clear-btn`}
            onClick={clearPaths}
          >
            X
          </button>
        </div>
      )}

      {markers.length > 1 && (
        <div className="path-input">
          <input
            type="text"
            name="pathName"
            onChange={onChangeHandler}
            value={pathName}
            placeholder="Path name"
          />
          <button
            className="btn-save"
            disabled={pathName === "" || pathName === null}
            onClick={saveMyPath}
          >
            Save path
          </button>
        </div>
      )}
    </>
  );
};

export default Map;
