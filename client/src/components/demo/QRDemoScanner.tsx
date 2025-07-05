"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { QrCode, Smartphone, Camera, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mn } from "@/constants/mn";

interface QRDemoScannerProps {
  onScanComplete?: (tableId: string) => void;
  autoRedirect?: boolean;
}

export default function QRDemoScanner({
  onScanComplete,
  autoRedirect = true,
}: QRDemoScannerProps) {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setScanComplete(false);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanComplete(true);
          setIsScanning(false);

          // Simulate successful scan after a delay
          setTimeout(() => {
            onScanComplete?.("demo-table");
            if (autoRedirect) {
              router.push("/order/demo-table");
            }
          }, 1000);

          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
  };

  const demoTables = [
    {
      id: "demo-table",
      name: "Демо ширээ",
      description: "Демо захиалга туршиж үзэх",
    },
    { id: "table-1", name: "Ширээ 1", description: "4 хүний ширээ" },
    { id: "table-2", name: "Ширээ 2", description: "2 хүний ширээ" },
    { id: "table-3", name: "Ширээ 3", description: "6 хүний ширээ" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            QR Код Уншуулах
          </h1>
          <p className="text-gray-600">Ширээний QR кодыг уншуулж цэс үзээрэй</p>
        </motion.div>

        {/* Scanner Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 text-center">
            <AnimatePresence mode="wait">
              {!isScanning && !scanComplete && (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="w-32 h-32 border-4 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mx-auto">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 mb-4">
                      Камер асааж QR код уншуулна уу
                    </p>
                    <Button
                      onClick={startScan}
                      size="lg"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Smartphone className="mr-2 h-5 w-5" />
                      Уншуулж эхлэх
                    </Button>
                  </div>
                </motion.div>
              )}

              {isScanning && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="relative w-32 h-32 border-4 border-blue-500 rounded-2xl flex items-center justify-center mx-auto overflow-hidden">
                    <QrCode className="h-12 w-12 text-blue-500" />

                    {/* Scanning line animation */}
                    <motion.div
                      initial={{ y: -128 }}
                      animate={{ y: 128 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute w-full h-1 bg-blue-500 shadow-lg"
                    />
                  </div>

                  <div>
                    <p className="text-blue-600 font-medium mb-2">
                      QR код уншиж байна...
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {Math.round(progress)}%
                    </p>
                  </div>
                </motion.div>
              )}

              {scanComplete && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-600 mb-2">
                      Амжилттай!
                    </h3>
                    <p className="text-gray-600">
                      Демо ширээ олдлоо. Цэс рүү шилжиж байна...
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">!</span>
              </div>
              <div>
                <p className="text-orange-800 font-medium text-sm">
                  {mn.demo.demoNotice}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Access Tables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            Эсвэл шууд ширээ сонгох
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {demoTables.map((table, index) => (
              <motion.button
                key={table.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                onClick={() => {
                  onScanComplete?.(table.id);
                  if (autoRedirect) {
                    router.push(`/order/${table.id}`);
                  }
                }}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100">
                    <QrCode className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{table.name}</p>
                    <p className="text-sm text-gray-500">{table.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-2"
        >
          <p className="text-sm text-gray-500">
            Бодит ашиглалтад QR код уншуулах шаардлагатай
          </p>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Демо горим
          </Badge>
        </motion.div>
      </div>
    </div>
  );
}
