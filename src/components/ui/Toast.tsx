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

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
  }>;
}

interface ToastProps extends ToastData {
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  actions,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - 100 / (duration / 50);
          if (newProgress <= 0) {
            handleClose();
            return 0;
          }
          return newProgress;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircleIcon,
          iconColor: "text-green-400",
          bgColor: "from-green-500/10 to-emerald-500/10",
          borderColor: "border-green-500/30",
          progressColor: "bg-green-500",
        };
      case "error":
        return {
          icon: XCircleIcon,
          iconColor: "text-red-400",
          bgColor: "from-red-500/10 to-rose-500/10",
          borderColor: "border-red-500/30",
          progressColor: "bg-red-500",
        };
      case "warning":
        return {
          icon: ExclamationTriangleIcon,
          iconColor: "text-yellow-400",
          bgColor: "from-yellow-500/10 to-amber-500/10",
          borderColor: "border-yellow-500/30",
          progressColor: "bg-yellow-500",
        };
      case "info":
        return {
          icon: InformationCircleIcon,
          iconColor: "text-blue-400",
          bgColor: "from-blue-500/10 to-indigo-500/10",
          borderColor: "border-blue-500/30",
          progressColor: "bg-blue-500",
        };
    }
  };

  const config = getToastConfig();
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`relative bg-gradient-to-r ${config.bgColor} border ${config.borderColor} rounded-lg p-4 shadow-lg backdrop-blur-sm max-w-sm w-full`}
        >
          {/* Progress bar */}
          {duration > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-lg overflow-hidden">
              <motion.div
                className={`h-full ${config.progressColor}`}
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
          )}

          <div className="flex items-start gap-3">
            <Icon
              className={`w-6 h-6 ${config.iconColor} flex-shrink-0 mt-0.5`}
            />

            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold text-sm">{title}</h4>
              {message && (
                <p className="text-white/70 text-sm mt-1 leading-relaxed">
                  {message}
                </p>
              )}

              {actions && actions.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        action.onClick();
                        handleClose();
                      }}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                        action.variant === "primary"
                          ? "bg-white/20 hover:bg-white/30 text-white"
                          : "bg-transparent hover:bg-white/10 text-white/70 hover:text-white"
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleClose}
              className="text-white/60 hover:text-white transition-colors flex-shrink-0"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast Container Component
interface ToastContainerProps {
  toasts: ToastData[];
  onRemoveToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemoveToast,
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onRemoveToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Toast Hook
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (toast: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const success = (
    title: string,
    message?: string,
    options?: Partial<ToastData>
  ) => {
    addToast({ type: "success", title, message, ...options });
  };

  const error = (
    title: string,
    message?: string,
    options?: Partial<ToastData>
  ) => {
    addToast({ type: "error", title, message, ...options });
  };

  const warning = (
    title: string,
    message?: string,
    options?: Partial<ToastData>
  ) => {
    addToast({ type: "warning", title, message, ...options });
  };

  const info = (
    title: string,
    message?: string,
    options?: Partial<ToastData>
  ) => {
    addToast({ type: "info", title, message, ...options });
  };

  return {
    toasts,
    removeToast,
    success,
    error,
    warning,
    info,
    ToastContainer: () => (
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    ),
  };
};
