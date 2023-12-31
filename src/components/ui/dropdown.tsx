import { cn } from "@/utils/cn";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const Button: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Menu.Button
      className={cn(
        "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
        className,
      )}
      {...props}
    >
      {children}
    </Menu.Button>
  );
};

const Content: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    position: "top-right" | "top-left" | "bottom-right";
  }
> = ({ children, className, position, ...props }) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className={cn(
          position === "top-right" && "right-0 origin-top-right",
          position === "top-left" && "left-0 origin-top-left",
          position === "bottom-right" &&
            "bottom-10 right-0 origin-bottom-right",
          "absolute z-30 mt-2 min-w-[14rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
        )}
      >
        <div className={cn("py-1", className)} {...props}>
          {children}
        </div>
      </Menu.Items>
    </Transition>
  );
};

const Wrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Menu
      as="div"
      className={cn("relative inline-block text-left", className)}
      {...props}
    >
      {children}
    </Menu>
  );
};

export { Button, Content, Wrapper };
