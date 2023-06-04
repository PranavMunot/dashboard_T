import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "react-query";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { v4 as uuidv4 } from "uuid";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

async function getCountryData() {
  return await fetch("https://disease.sh/v3/covid-19/countries", {
    method: "GET",
  }).then((res) => {
    return res.json();
  });
}

function Map() {
  const { data } = useQuery<any>({
    queryKey: ["countryData"],
    queryFn: getCountryData,
  });

  return (
    <div className={"w-full h-[500px] "}>
      <MapContainer
        className={"w-full h-full "}
        zoom={3}
        center={[51.505, -0.09]}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        {data &&
          data.map((value: any) => {
            return (
              <Marker
                key={uuidv4()}
                position={[value.countryInfo.lat, value.countryInfo.long]}
              >
                <Popup>
                  <div className="flex flex-row items-center">
                    <img
                      className="w-[2rem] h-[1.5rem]"
                      alt={"flag"}
                      src={value.countryInfo.flag}
                    />
                    <h5 className="pl-2 text-lg">{value.country}</h5>
                  </div>
                  <div className="flex mt-4  divide-x-2">
                    <span className="flex flex-col pr-2 pl-1 mb-0">
                      <span className="text-xs">Active</span>
                      <span className="text-yellow-500 text-base">
                        <b>{value.active}</b>
                      </span>
                    </span>
                    <span className="flex flex-col pr-2 pl-1 mb-0">
                      <span className="text-xs">Recovered</span>
                      <span className="text-green-900 text-base">
                        <b> {value.recovered}</b>
                      </span>
                    </span>
                    <span className="flex flex-col pr-2 pl-1">
                      <span className="text-xs">Death</span>
                      <span className="text-red-900 text-base">
                        <b>{value.deaths}</b>
                      </span>
                    </span>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}

export default Map;
