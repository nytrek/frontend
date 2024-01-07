import { Map as MapAddress } from "@/components/maps/address";
import { useCoordinates } from "@/hooks/useCoordinates";
import { useListing } from "@/hooks/useListing";
import { H1 } from "@/pages";
import { categories, details } from "@/storage";
import type { Listing as ListingType } from "@/utils/types";
import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  type MapContainerProps,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Drawer } from "vaul";
import { H3, P } from "../content";

export const marker = new Icon({
  iconUrl: "/home.svg",
  iconSize: [0, 0],
});

export const Map: React.FC<
  MapContainerProps & { listing: ListingType | null }
> = (props) => {
  const { locale, locales } = useRouter();
  const coordinates = useCoordinates();
  const [open, setOpen] = useState(false);
  const [listingId, setListingId] = useState<string | null>(null);
  const { data } = useListing(listingId);
  const center = useMemo(() => {
    return {
      lat: data?.lat ?? 63.128161,
      lng: data?.lng ?? 18.643501,
    };
  }, [data]);
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
          eventHandlers={{
            click() {
              setOpen(true);
              setListingId(item._id);
            },
          }}
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
      <Drawer.Root onOpenChange={setOpen} open={open}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-40 mt-24 flex max-h-96 flex-col rounded-t-[10px] bg-gray-100 outline-none">
            <div className="flex-1 overflow-y-auto rounded-t-[10px] bg-white px-4 pb-12 pt-4">
              <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
              {!!data && (
                <div className="grid gap-10">
                  <div className="flex flex-col gap-y-4">
                    <div>
                      <H1 className="text-2xl lg:text-2xl">
                        {data.address[0].toUpperCase() + data.address.slice(1)},{" "}
                        {data.city[0].toUpperCase() + data.city.slice(1)}
                      </H1>
                      <P className="lg:text-lg">{data.price} kr</P>
                    </div>
                    <a
                      className="inline-flex max-w-fit flex-shrink-0 rounded-md bg-secondary px-3.5 py-3 text-base font-semibold text-white shadow-sm ring-0 ring-inset ring-gray-300 hover:bg-secondary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      href={`/${locale}/${categories.find(
                        (item) => item.name_formatted === data.type_formatted,
                      )?.[locale as keyof typeof locales]["href"]}/${
                        data.city_formatted
                      }/${data.address_formatted}-${data._id}`}
                    >
                      Kontakta
                    </a>
                  </div>
                  <div className="grid gap-y-6">
                    <MapAddress
                      center={center}
                      className="relative z-0 h-96 w-full rounded-lg"
                      zoom={14}
                    />
                    <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-5">
                      {details.map((item) => (
                        <div
                          className="flex flex-col gap-y-1.5"
                          key={item.index}
                        >
                          <H3 className="text-sm lg:text-sm">{item.name}</H3>
                          <div className="flex items-center gap-x-1.5">
                            <item.icon className="h-5 w-5 sm:hidden" />
                            <P className="whitespace-nowrap text-sm lg:text-sm">
                              {item.detail(
                                data[item.index as keyof ListingType] as
                                  | string
                                  | boolean,
                              )}
                            </P>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
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
