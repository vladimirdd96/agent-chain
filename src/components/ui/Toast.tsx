import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(toast.id), 300);
      }, toast.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.id, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
      case "error":
        return <XCircleIcon className="w-5 h-5 text-red-400" />;
      case "warning":
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />;
      case "info":
        return <InformationCircleIcon className="w-5 h-5 text-blue-400" />;
    }
  };

  const getColors = () => {
    switch (toast.type) {
      case "success":
        return "border-green-500/30 bg-green-500/10";
      case "error":
        return "border-red-500/30 bg-red-500/10";
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/10";
      case "info":
        return "border-blue-500/30 bg-blue-500/10";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 100,
        scale: isVisible ? 1 : 0.95,
      }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative max-w-sm w-full ${getColors()} backdrop-blur-md border rounded-xl p-4 shadow-lg`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white mb-1">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-sm text-white/70 leading-relaxed">
              {toast.message}
            </p>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(toast.id), 300);
          }}
          className="flex-shrink-0 p-1 text-white/50 hover:text-white/80 transition-colors"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const clearAll = () => {
    setToasts([]);
  };

  // Convenience methods
  const success = (
    title: string,
    message?: string,
    options?: Partial<Toast>
  ) => {
    return addToast({ type: "success", title, message, ...options });
  };

  const error = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({ type: "error", title, message, ...options });
  };

  const warning = (
    title: string,
    message?: string,
    options?: Partial<Toast>
  ) => {
    return addToast({ type: "warning", title, message, ...options });
  };

  const info = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({ type: "info", title, message, ...options });
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
    info,
  };
};
