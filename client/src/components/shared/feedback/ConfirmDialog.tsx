import { cn } from "@/lib/utils";
import { MotionWrapper } from "@/components/animations/MotionWrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, AlertCircle, HelpCircle, Trash2 } from "lucide-react";
import { type ReactNode } from "react";

type DialogType = "danger" | "warning" | "info" | "delete";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: DialogType;
  title?: string;
  description?: string | ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  loading?: boolean;
  className?: string;
}

const dialogConfig = {
  danger: {
    icon: AlertCircle,
    iconClass: "text-red-500",
    confirmClass: "bg-red-500 hover:bg-red-600",
    defaultTitle: "Анхааруулга",
    defaultDescription: "Та энэ үйлдлийг хийхдээ итгэлтэй байна уу?",
    defaultConfirmLabel: "Үргэлжлүүлэх",
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-yellow-500",
    confirmClass: "bg-yellow-500 hover:bg-yellow-600",
    defaultTitle: "Анхаар",
    defaultDescription: "Энэ үйлдлийг хийхдээ итгэлтэй байна уу?",
    defaultConfirmLabel: "Үргэлжлүүлэх",
  },
  info: {
    icon: HelpCircle,
    iconClass: "text-blue-500",
    confirmClass: "bg-blue-500 hover:bg-blue-600",
    defaultTitle: "Баталгаажуулах",
    defaultDescription: "Та энэ үйлдлийг хийхийг хүсэж байна уу?",
    defaultConfirmLabel: "Тийм",
  },
  delete: {
    icon: Trash2,
    iconClass: "text-red-500",
    confirmClass: "bg-red-500 hover:bg-red-600",
    defaultTitle: "Устгах",
    defaultDescription: "Энэ өгөгдлийг устгахдаа итгэлтэй байна уу?",
    defaultConfirmLabel: "Устгах",
  },
} as const;

export function ConfirmDialog({
  open,
  onOpenChange,
  type = "info",
  title,
  description,
  confirmLabel,
  cancelLabel = "Цуцлах",
  onConfirm,
  onCancel,
  loading = false,
  className,
}: ConfirmDialogProps) {
  const config = dialogConfig[type];
  const Icon = config.icon;

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <DialogHeader>
          <MotionWrapper
            animation="scale"
            transition="bounce"
            className="mx-auto mb-4"
          >
            <div className="mx-auto rounded-full bg-gray-100 p-3 w-fit">
              <Icon
                className={cn("h-6 w-6", config.iconClass)}
                aria-hidden="true"
              />
            </div>
          </MotionWrapper>

          <DialogTitle className="text-center text-lg font-semibold">
            {title || config.defaultTitle}
          </DialogTitle>

          {description && (
            <DialogDescription className="text-center">
              {description || config.defaultDescription}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="flex-row justify-center gap-2 sm:gap-3">
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            onClick={handleConfirm}
            className={cn(config.confirmClass)}
            disabled={loading}
          >
            {confirmLabel || config.defaultConfirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Usage examples:
// // Delete confirmation
// <ConfirmDialog
//   type="delete"
//   open={isOpen}
//   onOpenChange={setIsOpen}
//   title="Хоол устгах"
//   description="Та энэ хоолыг устгахдаа итгэлтэй байна уу?"
//   onConfirm={handleDelete}
//   loading={isDeleting}
// />
//
// // Warning dialog
// <ConfirmDialog
//   type="warning"
//   open={isOpen}
//   onOpenChange={setIsOpen}
//   title="Захиалга цуцлах"
//   description="Та захиалгаа цуцлахдаа итгэлтэй байна уу?"
//   confirmLabel="Цуцлах"
//   onConfirm={handleCancel}
// />
//
// // Info dialog with custom content
// <ConfirmDialog
//   type="info"
//   open={isOpen}
//   onOpenChange={setIsOpen}
//   title="Төлбөр шилжүүлэх"
//   description={
//     <div className="text-center">
//       <p>Та дараах дүнг шилжүүлэхдээ итгэлтэй байна уу?</p>
//       <p className="text-lg font-bold text-orange-500 mt-2">
//         ₮{amount.toLocaleString()}
//       </p>
//     </div>
//   }
//   confirmLabel="Шилжүүлэх"
//   onConfirm={handleTransfer}
// />
