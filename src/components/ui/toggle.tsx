import { cn } from "@/utils/cn";
import { Switch } from "@headlessui/react";

const Body: React.FC<{
  className?: string;
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ className, enabled, setEnabled }) => {
  return (
    <Switch
      checked={enabled}
      className={cn(
        enabled ? "bg-primary" : "bg-gray-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className,
      )}
      onChange={setEnabled}
    >
      <span
        aria-hidden="true"
        className={cn(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        )}
      />
    </Switch>
  );
};

const Label: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Switch.Label
      as="span"
      className={cn("ml-3 text-sm", className)}
      {...props}
    >
      {children}
    </Switch.Label>
  );
};

const Wrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <Switch.Group
      as="div"
      className={cn("flex items-center", className)}
      {...props}
    ></Switch.Group>
  );
};

export { Body, Label, Wrapper };
