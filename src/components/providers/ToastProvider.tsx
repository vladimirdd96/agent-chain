"use client";

import React, { createContext, useContext } from "react";
import { useToast } from "@/components/ui/Toast";
import type { ToastData } from "@/components/ui/Toast";

interface ToastContextType {
  success: (
    title: string,
    message?: string,
    options?: Partial<ToastData>
  ) => void;
  error: (
    title: string,
    message?: string,
    options?: Partial<ToastData>
  ) => void;
  warning: (
    title: string,
    message?: string,
    options?: Partial<ToastData>
  ) => void;
  info: (title: string, message?: string, options?: Partial<ToastData>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToasts = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToasts must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = useToast();

  return (
    <ToastContext.Provider
      value={{
        success: toast.success,
        error: toast.error,
        warning: toast.warning,
        info: toast.info,
        removeToast: toast.removeToast,
      }}
    >
      {children}
      <toast.ToastContainer />
    </ToastContext.Provider>
  );
};
