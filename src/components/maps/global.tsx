import { useCoordinates } from "@/hooks/useCoordinates";
import type { Listing } from "@/utils/types";
import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  type MapContainerProps,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

export const marker = new Icon({
  iconUrl: "/home.svg",
  iconSize: [0, 0],
});

export const Map: React.FC<MapContainerProps & { listing: Listing | null }> = (
  props,
) => {
  const coordinates = useCoordinates();
  const markers = useMemo(() => {
    return coordinates.data?.map((item) => (
      <Marker
        icon={marker}
        key={item._id}
        position={{
          lat: item.lat,
          lng: item.lng,
        }}
      >
        <Tooltip
          direction="top"
          interactive
          offset={[20, 0]}
          opacity={1}
          permanent
        >
          <span className="text-base font-medium">{item.price} kr</span>
        </Tooltip>
      </Marker>
    ));
  }, [coordinates.data]);
  const createCustomClusterIcon = (cluster: any) => {
    return new (divIcon as any)({
      html: `<div class="flex items-center justify-center w-full h-full">${cluster.getChildCount()}</div>`,
      iconSize: point(40, 40),
      className:
        "rounded-full w-10 h-10 flex items-center justify-center bg-secondary/80 border-4 border-secondary text-white",
    });
  };
  if (coordinates.isLoading) return <></>;
  return (
    <>
      <MapContainer {...props}>
        <TileLayer
          accessToken={process.env.NEXT_PUBLIC_LOCATION_IQ_TOKEN}
          attribution='&copy; <a href="https://locationiq.com/?ref=maps" rel="nofollow">LocationIQ</a> &copy; <a href="https://www.openstreetmap.org/copyright" rel="nofollow">OpenStreetMap</a> contributors'
          url="https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.vector?key={accessToken}&lang=sv"
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers}
        </MarkerClusterGroup>
        {props.listing && (
          <Marker
            icon={marker}
            position={{
              lat: props.listing.lat,
              lng: props.listing.lng,
            }}
          >
            <Tooltip direction="top" offset={[20, 0]} opacity={1} permanent>
              <span className="text-base font-medium">
                {props.listing.price} kr
              </span>
            </Tooltip>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};
