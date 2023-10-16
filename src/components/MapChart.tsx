import React from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import { locations, servers } from "@/services/servers";

const geoUrl = "/geodata/countries-110m.json";

type Marker = {
  name: string;
  coordinates: [number, number];
};

const markers: Marker[] = locations.map((l) => {
  let locationServers = servers.filter((s) => s.location === l.name);
  let serverNames = locationServers.map((s) => s.shortName);
  let name = serverNames.length ? `${l.name}: ${serverNames.join()}` : l.name;

  return { name, coordinates: l.coordinates };
});

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
        <Marker key={name} coordinates={coordinates}>
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
