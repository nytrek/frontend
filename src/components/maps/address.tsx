import { Icon, type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  type MapContainerProps,
} from "react-leaflet";

const marker = new Icon({
  iconUrl: "/home.svg",
  iconSize: [60, 60],
  iconAnchor: [30, 60],
});

export const Map: React.FC<MapContainerProps> = (props) => {
  return (
    <MapContainer {...props}>
      <TileLayer
        accessToken={process.env.NEXT_PUBLIC_LOCATION_IQ_TOKEN}
        attribution='&copy; <a href="https://locationiq.com/?ref=maps" rel="nofollow">LocationIQ</a> &copy; <a href="https://www.openstreetmap.org/copyright" rel="nofollow">OpenStreetMap</a> contributors'
        url="https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.vector?key={accessToken}"
      />
      <Marker icon={marker} position={props.center as LatLngExpression} />
    </MapContainer>
  );
};
