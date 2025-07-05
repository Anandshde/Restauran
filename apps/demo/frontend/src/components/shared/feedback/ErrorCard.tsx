import { cn } from "@/lib/utils";
import { MotionWrapper } from "@/components/animations/MotionWrapper";
import { Button } from "@/components/ui/button";
import { AlertCircle, XCircle, WifiOff, ServerCrash } from "lucide-react";
import { type ReactNode } from "react";

type ErrorType = "general" | "network" | "server" | "notFound";

interface ErrorCardProps {
  type?: ErrorType;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
  className?: string;
}

const errorConfig = {
  general: {
    icon: AlertCircle,
    defaultTitle: "Алдаа гарлаа",
    defaultDescription: "Тодорхойгүй алдаа гарлаа",
    actionLabel: "Дахин оролдох",
    className: "border-red-200 bg-red-50",
    iconClass: "text-red-500",
  },
  network: {
    icon: WifiOff,
    defaultTitle: "Сүлжээний алдаа",
    defaultDescription: "Интернэт холболтоо шалгана уу",
    actionLabel: "Дахин оролдох",
    className: "border-orange-200 bg-orange-50",
    iconClass: "text-orange-500",
  },
  server: {
    icon: ServerCrash,
    defaultTitle: "Серверийн алдаа",
    defaultDescription: "Серверт холбогдоход алдаа гарлаа",
    actionLabel: "Дахин оролдох",
    className: "border-red-200 bg-red-50",
    iconClass: "text-red-500",
  },
  notFound: {
    icon: XCircle,
    defaultTitle: "Олдсонгүй",
    defaultDescription: "Хуудас олдсонгүй",
    actionLabel: "Буцах",
    className: "border-gray-200 bg-gray-50",
    iconClass: "text-gray-500",
  },
} as const;

export function ErrorCard({
  type = "general",
  title,
  description,
  action,
  children,
  className,
}: ErrorCardProps) {
  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <MotionWrapper
      animation="fadeIn"
      transition="normal"
      className={cn(
        "w-full rounded-xl border p-6",
        config.className,
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        <MotionWrapper animation="scale" transition="bounce" className="mb-4">
          <Icon
            className={cn("h-12 w-12", config.iconClass)}
            aria-hidden="true"
          />
        </MotionWrapper>

        <MotionWrapper
          animation="slideUp"
          transition="normal"
          className="space-y-2"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {title || config.defaultTitle}
          </h3>

          {(description || config.defaultDescription) && (
            <p className="text-gray-500 max-w-sm">
              {description || config.defaultDescription}
            </p>
          )}

          {children}

          {(action || config.actionLabel) && (
            <div className="mt-6">
              <Button
                onClick={action?.onClick}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {action?.label || config.actionLabel}
              </Button>
            </div>
          )}
        </MotionWrapper>
      </div>
    </MotionWrapper>
  );
}

// Usage examples:
// // Network error
// <ErrorCard
//   type="network"
//   action={{
//     label: "Дахин ачаалах",
//     onClick: () => window.location.reload(),
//   }}
// />
//
// // Server error with custom message
// <ErrorCard
//   type="server"
//   description="Серверт хандахад алдаа гарлаа. Та түр хүлээгээд дахин оролдоно уу."
//   action={{
//     label: "Дахин оролдох",
//     onClick: () => refetch(),
//   }}
// />
//
// // Not found error with custom content
// <ErrorCard type="notFound">
//   <div className="mt-4 text-sm text-gray-500">
//     Хуудас устгагдсан эсвэл шилжүүлэгдсэн байж болно.
//   </div>
// </ErrorCard>
//
// // General error with minimal content
// <ErrorCard
//   title="Захиалга амжилтгүй"
//   description="Таны захиалгыг боловсруулахад алдаа гарлаа"
// />
