"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Loader2, Play } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const isDemo = process.env.NEXT_PUBLIC_APP_MODE === "demo";

  // In demo mode, redirect to dashboard or show demo login
  useEffect(() => {
    if (isDemo) {
      // Auto-redirect to dashboard in demo mode after 2 seconds
      const timer = setTimeout(() => {
        router.push("/dashboard/menu");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isDemo, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.token);
        router.push("/dashboard/menu");
      } else {
        const data = await response.json();
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show demo message in demo mode
  if (isDemo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6 text-center"
        >
          <div className="text-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              🎭 Demo Mode
            </h2>
            <p className="mt-2 text-gray-600">
              No admin login required in demo mode
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Play className="h-5 w-5" />
              <span className="font-medium">Redirecting to dashboard...</span>
            </div>
            <div className="mt-2 text-sm text-blue-500">
              You'll be redirected automatically in 2 seconds
            </div>
          </div>

          <Button
            onClick={() => router.push("/dashboard/menu")}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Go to Dashboard Now
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Admin Login</h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="pl-10"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </motion.form>
    </div>
  );
}
