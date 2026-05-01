import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

export interface DockProps {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child as React.ReactElement<any>, {
            mouseX,
            magnification,
            distance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(
          "mx-auto w-max h-14 p-2 flex items-center gap-2 rounded-2xl border border-[#B6915E]/30 bg-[#1E3328]/80 supports-backdrop-blur:bg-[#1E3328]/60 backdrop-blur-md shadow-2xl",
          className
        )}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

export const DockSeparator = ({ className }: { className?: string }) => (
  <div className={cn("w-[1px] h-8 bg-[#B6915E]/20 mx-2", className)} />
);
DockSeparator.displayName = "DockSeparator";

export interface DockIconProps {
  magnification?: number;
  distance?: number;
  mouseX?: any;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  label?: string;
}

export const DockIcon = ({
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  onClick,
  label,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [32, magnification, 32],
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div className="relative group flex flex-col items-center">
      {label && (
        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-3 py-1 bg-[#141414] border border-[#B6915E]/30 text-[#F5F1EA] text-[10px] uppercase tracking-widest rounded-md whitespace-nowrap z-50">
          {label}
        </div>
      )}
      <motion.div
        ref={ref}
        style={{ width, height: width }}
        onClick={onClick}
        className={cn(
          "flex cursor-pointer items-center justify-center rounded-full text-[#B6915E] hover:text-[#B6915E] hover:bg-[#B6915E]/20 transition-colors",
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};

DockIcon.displayName = "DockIcon";


