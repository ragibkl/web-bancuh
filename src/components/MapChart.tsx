// import { Tooltip } from "@mui/material";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json";

type Markers = {
  name: string;
  coordinates: [number, number];
}[];

const markers: Markers = [
  { name: "Tokyo: jp-dns1", coordinates: [139.6503, 35.6762] },
  { name: "Singapore: sg-dns1, sg-dns2", coordinates: [103.8198, 1.3521] },
  { name: "France: fr-dns1, fr-dns2", coordinates: [2.2137, 46.2276] },
];

function Tooltip(props: { title: string }) {
  return (
    <div>
      <p>{props.title}</p>
    </div>
  );
}

export default function MapChart() {
  return (
    <ComposableMap projection="geoMercator" width={1000} height={500}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              fill="#fff"
              stroke="#bbb"
              strokeWidth={1}
              key={geo.rsmKey}
              geography={geo}
            />
          ))
        }
      </Geographies>
      {markers.map(({ name, coordinates }) => (
        <Marker coordinates={coordinates}>
          <circle r={5} fill="#000" stroke="#fff" strokeWidth={1} />
          <text
            className="bg-gray-500"
            textAnchor="left"
            y={5}
            x={10}
            style={{ fontFamily: "system-ui", fill: "#000", textShadow: "5 5" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
}
