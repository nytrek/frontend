import {
  ArrowsUpDownIcon,
  BuildingOfficeIcon,
  HomeIcon,
  HomeModernIcon,
  Squares2X2Icon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { Car, CatIcon, DoorOpenIcon, RulerIcon, SofaIcon } from "lucide-react";

export const languages = [
  {
    code: "sv",
    locale: "Svenska",
    flag: "https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/se.png",
  },
  {
    code: "en",
    locale: "English",
    flag: "https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/gb-nir.png",
  },
] as const;

export const categories = [
  {
    en: {
      name: "All",
      href: "/rent-housing",
    },
    sv: {
      name: "Alla",
      href: "/hyra-bostad",
    },
    name_formatted: "alla",
    icon: Squares2X2Icon,
  },
  {
    en: {
      name: "Apartment",
      href: "/rent-apartment",
    },
    sv: {
      name: "Lägenhet",
      href: "/hyra-lagenhet",
    },
    name_formatted: "lagenhet",
    icon: BuildingOfficeIcon,
  },
  {
    en: {
      name: "House",
      href: "/rent-house",
    },
    sv: {
      name: "Hus",
      href: "/hyra-hus",
    },
    name_formatted: "hus",
    icon: HomeIcon,
  },
  {
    en: {
      name: "Cabin",
      href: "/rent-cabin",
    },
    sv: {
      name: "Stuga",
      href: "/hyra-stuga",
    },
    name_formatted: "stuga",
    icon: HomeModernIcon,
  },
  {
    en: {
      name: "Room",
      href: "/rent-room",
    },
    sv: {
      name: "Rum",
      href: "/hyra-rum",
    },
    name_formatted: "rum",
    icon: DoorOpenIcon,
  },
] as const;

export const filters = [
  { name: "Senast tillagd", index: "latest" },
  { name: "Pris stigande", index: "cheapest" },
  { name: "Pris fallande", index: "costliest" },
  { name: "Äldst", index: "oldest" },
] as const;

export const areas = [
  15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 125, 150,
  175, 200,
] as const;

export const prices = [
  1000, 3000, 5000, 7000, 10000, 15000, 25000, 50000, 75000, 100000,
] as const;

export const rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20] as const;

export const alternatives = [
  {
    name: "Balkong",
    index: "balcony",
    icon: ViewColumnsIcon,
  },
  {
    name: "Möblerad",
    index: "furnished",
    icon: SofaIcon,
  },
  {
    name: "Djur",
    index: "animal",
    icon: CatIcon,
  },
  {
    name: "Hiss",
    index: "elevator",
    icon: ArrowsUpDownIcon,
  },
  {
    name: "Parkeringsplats",
    index: "parking",
    icon: Car,
  },
] as const;

export const details = [
  {
    name: "Antal rum",
    icon: DoorOpenIcon,
    index: "room",
    detail: (data: string | boolean) => data + " rum",
  },
  {
    name: "Storlek",
    icon: RulerIcon,
    index: "area",
    detail: (data: string | boolean) => data + " m²",
  },
  {
    name: "Bostadstyp",
    icon: HomeIcon,
    index: "type",
    detail: (data: string | boolean) => data,
  },
  {
    name: "Balkong",
    icon: ViewColumnsIcon,
    index: "balcony",
    detail: (data: string | boolean) => (data ? "Finns" : "Fråga hyresvärd"),
  },
  {
    name: "Möblerad",
    icon: SofaIcon,
    index: "furnished",
    detail: (data: string | boolean) => (data ? "Ja" : "Fråga hyresvärd"),
  },
  {
    name: "Djur",
    icon: CatIcon,
    index: "animal",
    detail: (data: string | boolean) => (data ? "Tillåtet" : "Fråga hyresvärd"),
  },
  {
    name: "Hiss",
    icon: ArrowsUpDownIcon,
    index: "elevator",
    detail: (data: string | boolean) => (data ? "Finns" : "Fråga hyresvärd"),
  },
  {
    name: "Parkering",
    icon: Car,
    index: "parking",
    detail: (data: string | boolean) => (data ? "Ingår" : "Fråga hyresvärd"),
  },
] as const;

export const plans = [
  {
    name: "Medlemskap",
    description: "Tillgång till annonser inom hela Sverige",
    price: "19kr",
    originalPrice: "79kr",
  },
] as const;
