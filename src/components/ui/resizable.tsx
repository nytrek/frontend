import { cn } from "@/utils/cn";
import { motion, type MotionProps } from "framer-motion";
import useMeasure from "react-use-measure";

/**
 * @see https://buildui.com/
 */
export const Resizable: React.FC<
  React.PropsWithChildren<MotionProps & { className?: string }>
> = ({ children, className, ...props }) => {
  const [ref, bounds] = useMeasure();
  return (
    <motion.div
      animate={{
        height: bounds.height > 0 ? bounds.height : undefined,
      }}
      className={cn(className)}
      transition={{ duration: 0.25 }}
      {...props}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};
