import { filters } from "@/storage";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const consentAtom = atomWithStorage<boolean | null>("consent", null);
export const selectedFilterAtom = atom<(typeof filters)[number]>(filters[0]);
export const activeCategoriesAtom = atom<string[]>([]);
export const activeAlternativesAtom = atom<string[]>([]);
export const priceAtom = atom<{
  gte: number | undefined;
  lte: number | undefined;
}>({
  gte: undefined,
  lte: undefined,
});
export const areaAtom = atom<{
  gte: number | undefined;
  lte: number | undefined;
}>({
  gte: undefined,
  lte: undefined,
});
export const roomAtom = atom<{
  gte: number | undefined;
  lte: number | undefined;
}>({
  gte: undefined,
  lte: undefined,
});
