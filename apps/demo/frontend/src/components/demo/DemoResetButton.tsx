"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDemoMode } from "@/hooks/useDemoMode";
import { mn } from "@/constants/mn";

export default function DemoResetButton() {
  const { isDemoMode, resetDemoData } = useDemoMode();
  const [isOpen, setIsOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  if (!isDemoMode) return null;

  const handleReset = async () => {
    setIsResetting(true);

    // Simulate reset process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    resetDemoData();
    setIsResetting(false);
    setResetComplete(true);

    // Auto close after success
    setTimeout(() => {
      setResetComplete(false);
      setIsOpen(false);
      // Refresh the page to show reset data
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-orange-300 text-orange-600 hover:bg-orange-50"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            {mn.dashboard.resetDemo}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              {mn.demo.resetConfirm}
            </DialogTitle>
            <DialogDescription>
              Энэ үйлдэл дараах өгөгдлийг шинэчлэх болно:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Card className="p-4 bg-orange-50 border-orange-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-sm text-orange-800">
                    Цэсний мэдээлэл
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-sm text-orange-800">
                    Захиалгын түүх
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-sm text-orange-800">
                    Ширээний төлөв
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-sm text-orange-800">Тоо баримт</span>
                </div>
              </div>
            </Card>

            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {mn.dashboard.demoMode}
              </Badge>
              <span className="text-sm text-blue-700">
                Бодит өгөгдөлд нөлөөлөхгүй
              </span>
            </div>

            {isResetting && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 mx-auto"
                >
                  <RotateCcw className="h-8 w-8 text-orange-500" />
                </motion.div>
                <p className="text-sm text-gray-600">
                  Демо өгөгдөл шинэчлэж байна...
                </p>
              </motion.div>
            )}

            {resetComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-3"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-sm text-green-600 font-medium">
                  {mn.demo.resetSuccess}
                </p>
              </motion.div>
            )}
          </div>

          {!isResetting && !resetComplete && (
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                {mn.common.cancel}
              </Button>
              <Button
                onClick={handleReset}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {mn.common.reset}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
