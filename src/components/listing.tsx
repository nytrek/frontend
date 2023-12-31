import * as Card from "@/components/ui/card";
import { Prompt } from "@/pages/[category]/[city]/[address]";
import { categories } from "@/storage";
import type { Listing as ListingType } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon as HeartIconOutline,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { Carousel } from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DoorOpenIcon, MapPinIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const translation = {
  en: {
    rooms: "room/s",
  },
  sv: {
    rooms: "rum",
  },
};

export const Listing: React.FC<{ listing: ListingType }> = ({ listing }) => {
  const { user } = useUser();
  const { locale } = useRouter();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/listings/likes/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.id,
          }),
        },
      );
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { error } = await response.json();
          throw new Error(
            error.message ? error.message : "Unable to perform like operation",
          );
        } else {
          throw new Error("Unable to perform like operation");
        }
      }
      return (await response.json()) as boolean;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listing"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["popular"],
      });
      queryClient.invalidateQueries({
        queryKey: ["recent"],
      });
      queryClient.invalidateQueries({
        queryKey: ["suggestions"],
      });
    },
  });
  return (
    <>
      <Prompt open={open} setOpen={setOpen} />
      <div className="group">
        <Card.Content className="z-20 h-auto justify-between">
          <Badge>{listing.area} m²</Badge>
          <Badge>{listing.price} kr</Badge>
        </Card.Content>
        <Card.Content className="bottom-28 top-auto z-20 ml-auto h-auto w-fit justify-end p-0">
          <Button
            className="flex h-auto w-auto bg-transparent ring-0 hover:bg-transparent"
            intent="secondary"
            onClick={() =>
              user
                ? toast.promise(mutateAsync(listing._id), {
                    loading: "Laddar...",
                    success: (data) =>
                      data
                        ? "Din like har registrerats"
                        : "Din like har tagits bort från annonsen",
                    error: (err) => err.message,
                  })
                : setOpen(true)
            }
          >
            <Badge className="rounded-full py-2">
              {user?.id && listing.likes.includes(user?.id) ? (
                <HeartIconSolid className="h-6 w-6" />
              ) : (
                <HeartIconOutline className="h-6 w-6" />
              )}
            </Badge>
          </Button>
        </Card.Content>
        {listing.images.length ? (
          <>
            <Carousel
              className="z-10 rounded-lg"
              loop={true}
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 transition duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                  {new Array(length >= 5 ? 5 : length).fill("").map((_, i) => (
                    <button
                      className={`h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex % 5 === i
                          ? "w-8 bg-white"
                          : "w-4 bg-white/50"
                      }`}
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      type="button"
                    />
                  ))}
                </div>
              )}
              nextArrow={({ loop, handleNext, lastIndex }) => (
                <button
                  className="!absolute right-4 top-2/4 z-50 grid h-12 max-h-[48px] w-12 max-w-[48px] -translate-y-2/4 select-none place-items-center rounded-full text-white transition-all duration-300 hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:opacity-0 lg:group-hover:opacity-100"
                  disabled={!loop && lastIndex}
                  onClick={handleNext}
                >
                  <ChevronRightIcon className="ml-1 h-7 w-7" strokeWidth={3} />
                </button>
              )}
              prevArrow={({ loop, handlePrev, firstIndex }) => {
                return (
                  <button
                    className="!absolute left-4 top-2/4 z-50 grid h-12 max-h-[48px] w-12 max-w-[48px] -translate-y-2/4 select-none place-items-center rounded-full text-white transition-all duration-300 hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:opacity-0 lg:group-hover:opacity-100"
                    disabled={!loop && firstIndex}
                    onClick={handlePrev}
                  >
                    <ChevronLeftIcon
                      className="-ml-1 h-7 w-7"
                      strokeWidth={3}
                    />
                  </button>
                );
              }}
            >
              {listing.images.map((image) => (
                <div className="relative h-full min-h-[18rem]" key={image}>
                  <Card.Img overlay={true} src={image} />
                  <Card.A
                    aria-label="annons"
                    href={`/${locale}/${categories.find(
                      (item) => item.name_formatted === listing.type_formatted,
                    )?.[locale as keyof typeof translation]["href"]}/${
                      listing.city_formatted
                    }/${listing.address_formatted}-${listing._id}`}
                  />
                </div>
              ))}
            </Carousel>
          </>
        ) : (
          <div className="relative min-h-[18rem]">
            <Card.Img overlay={true} src="/thumbnail.png" />
            <Card.A
              aria-label="annons"
              href={`/${locale}/${categories.find(
                (item) => item.name_formatted === listing.type_formatted,
              )?.[locale as keyof typeof translation]["href"]}/${
                listing.city_formatted
              }/${listing.address_formatted}-${listing._id}`}
            />
          </div>
        )}
      </div>
      <div className="relative mt-4 space-y-3">
        <div className="flex items-center space-x-1.5 text-gray-600">
          <MapPinIcon className="h-5 w-5" />
          <span className="truncate text-sm leading-6">
            {listing.address[0].toUpperCase() + listing.address.slice(1)}
          </span>
          ,
          <span className="text-sm leading-6">
            {listing.city[0].toUpperCase() + listing.city.slice(1)}
          </span>
        </div>
        <div className="flex items-center gap-x-1.5 text-gray-600">
          <DoorOpenIcon className="h-5 w-5" />
          <span className="text-sm leading-6">
            {listing.room}{" "}
            {translation[locale as keyof typeof translation]["rooms"]}
          </span>
        </div>
        <div className="flex items-center gap-x-1.5 text-gray-600">
          <Squares2X2Icon className="h-5 w-5" />
          <span className="text-sm leading-6">
            {
              categories.find(
                (item) => item.name_formatted === listing.type_formatted,
              )?.[locale as keyof typeof translation]["name"]
            }
          </span>
        </div>
      </div>
    </>
  );
};
