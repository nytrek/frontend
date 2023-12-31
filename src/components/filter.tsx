import * as Checkbox from "@/components/ui/checkbox";
import * as Dropdown from "@/components/ui/dropdown";
import { useCount } from "@/hooks/useCount";
import {
  activeAlternativesAtom,
  activeCategoriesAtom,
  areaAtom,
  priceAtom,
  roomAtom,
  selectedFilterAtom,
} from "@/lib/atoms";
import {
  alternatives,
  areas,
  categories,
  filters,
  prices,
  rooms,
} from "@/storage";
import { cn } from "@/utils/cn";
import { Menu } from "@headlessui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Drawer } from "vaul";
import { P } from "./content";
import { Button } from "./ui/button";
import { Resizable } from "./ui/resizable";
import { Select } from "./ui/select";

const Alternatives: React.FC = () => {
  const [activeAlternatives, setActiveAlternatives] = useAtom(
    activeAlternativesAtom,
  );
  const handleOnChange = (checked: boolean, alternative: string) => {
    if (checked) {
      setActiveAlternatives((items) => [...items, alternative]);
    } else {
      setActiveAlternatives((items) =>
        items.filter((item) => item !== alternative),
      );
    }
  };
  return (
    <div key={activeAlternatives.length}>
      <span className="text-xl font-bold text-gray-900">Alternativ</span>
      <div className="mt-4 flex flex-col space-y-6">
        {alternatives.map((item) => (
          <Checkbox.Wrapper key={item.index}>
            <Checkbox.Input
              defaultChecked={activeAlternatives.includes(item.index)}
              onChange={(e) => handleOnChange(e.target.checked, item.index)}
            />
            <Checkbox.Content className="text-base">
              {item.name}
            </Checkbox.Content>
          </Checkbox.Wrapper>
        ))}
      </div>
    </div>
  );
};

const Categories: React.FC = () => {
  const { locale, locales } = useRouter();
  const [activeCategories, setActiveCategories] = useAtom(activeCategoriesAtom);
  const handleOnChange = (checked: boolean, category: string) => {
    if (checked) {
      setActiveCategories((items) =>
        category === "alla" || items.length === 3
          ? ["alla", "lagenhet", "hus", "stuga", "rum"]
          : [...items, category],
      );
    } else {
      setActiveCategories((items) =>
        category === "alla"
          ? []
          : items.filter((item) => item !== category && item !== "alla"),
      );
    }
  };
  return (
    <div key={activeCategories.length}>
      <span className="text-xl font-bold text-gray-900">Kategorier</span>
      <div className="mt-4 flex flex-col space-y-6">
        {categories.map((item) => (
          <Checkbox.Wrapper key={item.name_formatted}>
            <Checkbox.Input
              defaultChecked={activeCategories.includes(item.name_formatted)}
              onChange={(e) =>
                handleOnChange(e.target.checked, item.name_formatted)
              }
            />
            <Checkbox.Content className="text-base">
              {item[locale as keyof typeof locales]["name"]}
            </Checkbox.Content>
          </Checkbox.Wrapper>
        ))}
      </div>
    </div>
  );
};

const Areas: React.FC = () => {
  const [area, setArea] = useAtom(areaAtom);
  return (
    <form
      className="space-y-8"
      key={Object.values(area).reduce(
        (acc, curr) => (acc ?? 0) + (curr ?? 0),
        0,
      )}
    >
      <span className="text-xl font-bold text-gray-900">Area</span>
      <div className="mt-4 flex flex-col gap-4">
        <Select
          aria-label="area"
          onChange={(e) =>
            setArea({
              gte: e.target.value === "0" ? undefined : Number(e.target.value),
              lte: area.lte,
            })
          }
          value={area.gte ?? undefined}
        >
          <option value={0}>Från</option>
          {areas.map((item) => (
            <option key={item} value={item}>
              {item} m²
            </option>
          ))}
        </Select>
        <Select
          aria-label="area"
          className="rounded-md border border-gray-300"
          onChange={(e) =>
            setArea({
              gte: area.gte,
              lte: e.target.value === "0" ? undefined : Number(e.target.value),
            })
          }
          value={area.lte ?? undefined}
        >
          <option value={0}>Till</option>
          {areas.map((item) => (
            <option key={item} value={item}>
              {item} m²
            </option>
          ))}
        </Select>
      </div>
    </form>
  );
};

const Prices: React.FC = () => {
  const [price, setPrice] = useAtom(priceAtom);
  return (
    <form
      className="space-y-8"
      key={Object.values(price).reduce(
        (acc, curr) => (acc ?? 0) + (curr ?? 0),
        0,
      )}
    >
      <span className="text-xl font-bold text-gray-900">Pris</span>
      <div className="mt-4 flex flex-col gap-4">
        <Select
          aria-label="pris"
          onChange={(e) =>
            setPrice({
              gte: e.target.value === "0" ? undefined : Number(e.target.value),
              lte: price.lte,
            })
          }
          value={price.gte}
        >
          <option value={0}>Från</option>
          {prices.map((item) => (
            <option key={item} value={item}>
              {item} kr
            </option>
          ))}
        </Select>
        <Select
          aria-label="pris"
          onChange={(e) =>
            setPrice({
              gte: price.gte,
              lte: e.target.value === "0" ? undefined : Number(e.target.value),
            })
          }
          value={price.lte}
        >
          <option value={0}>Till</option>
          {prices.map((item) => (
            <option key={item} value={item}>
              {item} kr
            </option>
          ))}
        </Select>
      </div>
    </form>
  );
};

const Rooms: React.FC = () => {
  const [room, setRoom] = useAtom(roomAtom);
  return (
    <form
      className="space-y-8"
      key={Object.values(room).reduce(
        (acc, curr) => (acc ?? 0) + (curr ?? 0),
        0,
      )}
    >
      <span className="text-xl font-bold text-gray-900">Rum</span>
      <div className="mt-4 flex flex-col gap-4">
        <Select
          aria-label="room"
          onChange={(e) =>
            setRoom({
              gte: e.target.value === "0" ? undefined : Number(e.target.value),
              lte: room.lte,
            })
          }
          value={room.gte}
        >
          <option value={0}>Från</option>
          {rooms.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select
          aria-label="room"
          onChange={(e) =>
            setRoom({
              gte: room.gte,
              lte: e.target.value === "0" ? undefined : Number(e.target.value),
            })
          }
          value={room.lte}
        >
          <option value={0}>Till</option>
          {rooms.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>
    </form>
  );
};

export const Filter: React.FC<{
  type_formatted: (typeof categories)[number]["name_formatted"];
}> = ({ type_formatted }) => {
  const { data } = useCount();
  const [area, setArea] = useAtom(areaAtom);
  const [room, setRoom] = useAtom(roomAtom);
  const [price, setPrice] = useAtom(priceAtom);
  const [selectedFilter, setSelectedFilter] = useAtom(selectedFilterAtom);
  const [activeCategories, setActiveCategories] = useAtom(activeCategoriesAtom);
  const [activeAlternatives, setActiveAlternatives] = useAtom(
    activeAlternativesAtom,
  );
  const handleOnChange = (filter: (typeof filters)[number]["name"]) => {
    setSelectedFilter(
      filters.find((item) => item.name === filter) as (typeof filters)[number],
    );
  };
  useEffect(() => {
    if (type_formatted === "alla") {
      setActiveCategories(["alla", "lagenhet", "hus", "stuga", "rum"]);
    } else {
      setActiveCategories([type_formatted]);
    }
  }, [type_formatted, setActiveCategories]);
  return (
    <Resizable>
      <div className="grid gap-y-8">
        <div className="flex gap-6 overflow-x-auto overflow-y-hidden lg:flex-wrap lg:overflow-visible">
          <div className="hidden lg:block">
            <Dropdown.Wrapper>
              <Dropdown.Button
                className={cn(
                  Object.values(price).reduce(
                    (acc, curr) => (acc ?? 0) + (curr ?? 0),
                    0,
                  )
                    ? "border-secondary"
                    : "border-gray-300",
                  "inline-block rounded-2xl border px-6 py-3 text-base font-normal ring-0 transition duration-300",
                )}
              >
                Pris
              </Dropdown.Button>
              <Dropdown.Content className="p-5" position="top-left">
                <Prices />
                <div className="mt-8 flex items-center justify-between">
                  <Button
                    intent="secondary"
                    onClick={() =>
                      setPrice({
                        gte: undefined,
                        lte: undefined,
                      })
                    }
                    type="button"
                  >
                    Rensa
                  </Button>
                  <Menu.Item>
                    <Button
                      className="bg-gray-800 ring-0 hover:bg-gray-900"
                      intent="primary"
                      type="button"
                    >
                      Klar
                    </Button>
                  </Menu.Item>
                </div>
              </Dropdown.Content>
            </Dropdown.Wrapper>
          </div>
          <div className="lg:hidden">
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <button
                  className={cn(
                    Object.values(price).reduce(
                      (acc, curr) => (acc ?? 0) + (curr ?? 0),
                      0,
                    )
                      ? "border-secondary"
                      : "border-gray-300",
                    "inline-block rounded-2xl border px-6 py-3 text-base font-normal ring-0 transition duration-300",
                  )}
                >
                  Pris
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
                <Drawer.Content className="fixed bottom-0 left-0 right-0 z-30 mt-24 flex flex-col rounded-t-[10px] bg-gray-100 lg:mx-auto lg:max-w-md">
                  <div className="flex-1 rounded-t-[10px] bg-white px-4 pb-12 pt-4">
                    <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
                    <Prices />
                    <div className="mt-8 flex items-center justify-between">
                      <Button
                        intent="secondary"
                        onClick={() =>
                          setPrice({
                            gte: undefined,
                            lte: undefined,
                          })
                        }
                        type="button"
                      >
                        Rensa
                      </Button>
                      <Drawer.Close
                        className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ring-inset ring-gray-300 hover:bg-gray-900"
                        type="button"
                      >
                        Klar
                      </Drawer.Close>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
          <div className="hidden lg:block">
            <Dropdown.Wrapper>
              <Dropdown.Button
                className={cn(
                  Object.values(area).reduce(
                    (acc, curr) => (acc ?? 0) + (curr ?? 0),
                    0,
                  )
                    ? "border-secondary"
                    : "border-gray-300",
                  "inline-block rounded-2xl border px-6 py-3 text-base font-normal ring-0 transition duration-300",
                )}
              >
                Area
              </Dropdown.Button>
              <Dropdown.Content className="p-5" position="top-left">
                <Areas />
                <div className="mt-8 flex items-center justify-between">
                  <Button
                    intent="secondary"
                    onClick={() =>
                      setArea({
                        gte: undefined,
                        lte: undefined,
                      })
                    }
                    type="button"
                  >
                    Rensa
                  </Button>
                  <Menu.Item>
                    <Button
                      className="bg-gray-800 ring-0 hover:bg-gray-900"
                      intent="primary"
                      type="button"
                    >
                      Klar
                    </Button>
                  </Menu.Item>
                </div>
              </Dropdown.Content>
            </Dropdown.Wrapper>
          </div>
          <div className="lg:hidden">
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <button
                  className={cn(
                    Object.values(area).reduce(
                      (acc, curr) => (acc ?? 0) + (curr ?? 0),
                      0,
                    )
                      ? "border-secondary"
                      : "border-gray-300",
                    "inline-block rounded-2xl border px-6 py-3 text-base font-normal ring-0 transition duration-300",
                  )}
                >
                  Area
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
                <Drawer.Content className="fixed bottom-0 left-0 right-0 z-30 mt-24 flex flex-col rounded-t-[10px] bg-gray-100 lg:mx-auto lg:max-w-md">
                  <div className="flex-1 rounded-t-[10px] bg-white px-4 pb-12 pt-4">
                    <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
                    <Areas />
                    <div className="mt-8 flex items-center justify-between">
                      <Button
                        intent="secondary"
                        onClick={() =>
                          setArea({
                            gte: undefined,
                            lte: undefined,
                          })
                        }
                        type="button"
                      >
                        Rensa
                      </Button>
                      <Drawer.Close
                        className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ring-inset ring-gray-300 hover:bg-gray-900"
                        type="button"
                      >
                        Klar
                      </Drawer.Close>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
          <div className="hidden lg:block">
            <Dropdown.Wrapper>
              <Dropdown.Button
                className={cn(
                  Object.values(room).reduce(
                    (acc, curr) => (acc ?? 0) + (curr ?? 0),
                    0,
                  )
                    ? "border-secondary"
                    : "border-gray-300",
                  "inline-block rounded-2xl border px-6 py-3 text-base font-normal ring-0 transition duration-300",
                )}
              >
                Rum
              </Dropdown.Button>
              <Dropdown.Content className="p-5" position="top-left">
                <Rooms />
                <div className="mt-8 flex items-center justify-between">
                  <Button
                    intent="secondary"
                    onClick={() =>
                      setRoom({
                        gte: undefined,
                        lte: undefined,
                      })
                    }
                    type="button"
                  >
                    Rensa
                  </Button>
                  <Menu.Item>
                    <Button
                      className="bg-gray-800 ring-0 hover:bg-gray-900"
                      intent="primary"
                      type="button"
                    >
                      Klar
                    </Button>
                  </Menu.Item>
                </div>
              </Dropdown.Content>
            </Dropdown.Wrapper>
          </div>
          <div className="lg:hidden">
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <button
                  className={cn(
                    Object.values(room).reduce(
                      (acc, curr) => (acc ?? 0) + (curr ?? 0),
                      0,
                    )
                      ? "border-secondary"
                      : "border-gray-300",
                    "inline-block rounded-2xl border px-6 py-3 text-base font-normal ring-0 transition duration-300",
                  )}
                >
                  Rum
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
                <Drawer.Content className="fixed bottom-0 left-0 right-0 z-30 mt-24 flex flex-col rounded-t-[10px] bg-gray-100 lg:mx-auto lg:max-w-md">
                  <div className="flex-1 rounded-t-[10px] bg-white px-4 pb-12 pt-4">
                    <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
                    <Rooms />
                    <div className="mt-8 flex items-center justify-between">
                      <Button
                        intent="secondary"
                        onClick={() =>
                          setRoom({
                            gte: undefined,
                            lte: undefined,
                          })
                        }
                        type="button"
                      >
                        Rensa
                      </Button>
                      <Drawer.Close
                        className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ring-inset ring-gray-300 hover:bg-gray-900"
                        type="button"
                      >
                        Klar
                      </Drawer.Close>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
          <div className="hidden lg:block">
            <Dropdown.Wrapper>
              <Dropdown.Button
                className={cn(
                  activeCategories.length
                    ? "border-secondary"
                    : "border-gray-300",
                  "inline-block rounded-2xl border px-6 py-3 text-base font-normal ring-0 transition duration-300",
                )}
              >
                Kategori
              </Dropdown.Button>
              <Dropdown.Content className="p-5" position="top-left">
                <Categories />
                <div className="mt-8 flex items-center justify-between">
                  <Button
                    intent="secondary"
                    onClick={() => setActiveCategories([])}
                    type="button"
                  >
                    Rensa
                  </Button>
                  <Menu.Item>
                    <Button
                      className="bg-gray-800 ring-0 hover:bg-gray-900"
                      intent="primary"
                      type="button"
                    >
                      Klar
                    </Button>
                  </Menu.Item>
                </div>
              </Dropdown.Content>
            </Dropdown.Wrapper>
          </div>
          <div className="lg:hidden">
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <button
                  className={cn(
                    activeCategories.length
                      ? "border-secondary"
                      : "border-gray-300",
                    "inline-block rounded-2xl border px-6 py-3 text-base font-normal ring-0 transition duration-300",
                  )}
                >
                  Kategori
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
                <Drawer.Content className="fixed bottom-0 left-0 right-0 z-30 mt-24 flex flex-col rounded-t-[10px] bg-gray-100 lg:mx-auto lg:max-w-md">
                  <div className="flex-1 rounded-t-[10px] bg-white px-4 pb-12 pt-4">
                    <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
                    <Categories />
                    <div className="mt-8 flex items-center justify-between">
                      <Button
                        intent="secondary"
                        onClick={() => setActiveCategories([])}
                        type="button"
                      >
                        Rensa
                      </Button>
                      <Drawer.Close
                        className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ring-inset ring-gray-300 hover:bg-gray-900"
                        type="button"
                      >
                        Klar
                      </Drawer.Close>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
          <div className="hidden lg:block">
            <Dropdown.Wrapper>
              <Dropdown.Button
                className={cn(
                  activeAlternatives.length
                    ? "border-secondary"
                    : "border-gray-300",
                  "inline-block whitespace-nowrap rounded-2xl border px-6 py-3 text-base font-normal ring-0 transition duration-300",
                )}
              >
                Fler filter
              </Dropdown.Button>
              <Dropdown.Content className="p-5" position="top-left">
                <Alternatives />
                <div className="mt-8 flex items-center justify-between">
                  <Button
                    intent="secondary"
                    onClick={() => setActiveAlternatives([])}
                    type="button"
                  >
                    Rensa
                  </Button>
                  <Menu.Item>
                    <Button
                      className="bg-gray-800 ring-0 hover:bg-gray-900"
                      intent="primary"
                      type="button"
                    >
                      Klar
                    </Button>
                  </Menu.Item>
                </div>
              </Dropdown.Content>
            </Dropdown.Wrapper>
          </div>
          <div className="lg:hidden">
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <button
                  className={cn(
                    activeAlternatives.length
                      ? "border-secondary"
                      : "border-gray-300",
                    "inline-block whitespace-nowrap rounded-2xl border px-6 py-3 text-base font-normal ring-0 transition duration-300",
                  )}
                >
                  Fler filter
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
                <Drawer.Content className="fixed bottom-0 left-0 right-0 z-30 mt-24 flex flex-col rounded-t-[10px] bg-gray-100 lg:mx-auto lg:max-w-md">
                  <div className="flex-1 rounded-t-[10px] bg-white px-4 pb-12 pt-4">
                    <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
                    <Alternatives />
                    <div className="mt-8 flex items-center justify-between">
                      <Button
                        intent="secondary"
                        onClick={() => setActiveAlternatives([])}
                        type="button"
                      >
                        Rensa
                      </Button>
                      <Drawer.Close
                        className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ring-inset ring-gray-300 hover:bg-gray-900"
                        type="button"
                      >
                        Klar
                      </Drawer.Close>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <P data-testid="result">{data} Resultat</P>
          <Select
            aria-label="sortera"
            className="border-0 ring-0"
            onChange={(e) =>
              handleOnChange(e.target.value as (typeof filters)[number]["name"])
            }
            value={selectedFilter.name}
          >
            {filters.map((item) => (
              <option key={item.index}>{item.name}</option>
            ))}
          </Select>
        </div>
      </div>
    </Resizable>
  );
};
