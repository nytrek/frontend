import { cn } from "@/utils/cn";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Resizable } from "./ui/resizable";

export const Modal: React.FC<
  React.PropsWithChildren<{
    className?: string;
    open: boolean;
    position: "top" | "center" | "bottom";
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }>
> = ({ children, className, open, position, setOpen }) => {
  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className={cn(
              position === "top"
                ? "items-start"
                : position === "center"
                  ? "items-center"
                  : "items-end",
              "flex min-h-full justify-center p-4 text-center",
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel
                className={cn(
                  "relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all",
                  className,
                )}
              >
                <Resizable>{children}</Resizable>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
