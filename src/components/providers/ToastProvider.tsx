"use client";

import React, { createContext, useContext } from "react";
import { ToastContainer, useToast } from "@/components/ui/Toast";
import type { Toast } from "@/components/ui/Toast";

interface ToastContextType {
  success: (
    title: string,
    message?: string,
    options?: Partial<Toast>
  ) => string;
  error: (title: string, message?: string, options?: Partial<Toast>) => string;
  warning: (
    title: string,
    message?: string,
    options?: Partial<Toast>
  ) => string;
  info: (title: string, message?: string, options?: Partial<Toast>) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
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
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </ToastContext.Provider>
  );
};
