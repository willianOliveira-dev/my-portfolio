"use client";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { motion, useAnimate } from "motion/react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  status?: "idle" | "loading" | "success" | "error";
}

export const Button = ({ className, children, status = "idle", ...props }: ButtonProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const runAnimations = async () => {
      if (status === "loading") {
        await animate(".check", { width: "0px", scale: 0, display: "none" }, { duration: 0.1 });
        await animate(".error-icon", { width: "0px", scale: 0, display: "none" }, { duration: 0.1 });
        await animate(".loader", { width: "20px", scale: 1, display: "block" }, { duration: 0.2 });
      } else if (status === "success") {
        await animate(".loader", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 });
        await animate(".error-icon", { width: "0px", scale: 0, display: "none" }, { duration: 0.1 });
        await animate(".check", { width: "20px", scale: 1, display: "block" }, { duration: 0.2 });
      } else if (status === "error") {
        await animate(".loader", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 });
        await animate(".check", { width: "0px", scale: 0, display: "none" }, { duration: 0.1 });
        await animate(".error-icon", { width: "20px", scale: 1, display: "block" }, { duration: 0.2 });
      } else if (status === "idle") {
        animate(".loader", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 });
        animate(".check", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 });
        animate(".error-icon", { width: "0px", scale: 0, display: "none" }, { duration: 0.2 });
      }
    };
    if (scope.current) {
      runAnimations();
    }
  }, [status, animate, scope]);

  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    ...buttonProps
  } = props;

  const bgClass =
    status === "success"
      ? "bg-green-600 hover:bg-green-700 ring-green-600 dark:bg-green-700 dark:hover:bg-green-600"
      : status === "error"
      ? "bg-red-600 hover:bg-red-700 ring-red-600 dark:bg-red-700 dark:hover:bg-red-600"
      : "bg-zinc-600 hover:bg-zinc-700 ring-zinc-600 dark:bg-zinc-700 dark:hover:bg-zinc-600";

  return (
    <motion.button
      layout
      layoutId="button"
      ref={scope}
      className={cn(
        "flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 font-medium text-white ring-offset-2 transition duration-200 hover:ring-2 dark:ring-offset-black",
        bgClass,
        className,
      )}
      onClick={onClick}
      {...buttonProps}
    >
      <motion.div layout className="flex items-center gap-2">
        <Loader />
        <CheckIcon />
        <ErrorIcon />
        <motion.span layout>{children}</motion.span>
      </motion.div>
    </motion.button>
  );
};

const Loader = () => {
  return (
    <motion.svg
      animate={{
        rotate: [0, 360],
      }}
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      style={{
        scale: 0.5,
        display: "none",
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        ease: "linear",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

const CheckIcon = () => {
  return (
    <motion.svg
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      style={{
        scale: 0.5,
        display: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};

const ErrorIcon = () => {
  return (
    <motion.svg
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      style={{
        scale: 0.5,
        display: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="error-icon text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
