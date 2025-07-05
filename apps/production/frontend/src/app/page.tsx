"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Utensils,
  Clock,
  CreditCard,
  Globe,
  ChefHat,
  BarChart,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "QR Code Table Ordering",
    description:
      "Let customers scan QR codes to view menu and place orders directly from their phones",
  },
  {
    icon: ChefHat,
    title: "Real-time Kitchen Display",
    description:
      "Instantly notify kitchen staff of new orders and track preparation status",
  },
  {
    icon: BarChart,
    title: "Admin Dashboard",
    description:
      "Manage menu items, track orders, and view sales reports all in one place",
  },
  {
    icon: CreditCard,
    title: "QPay Integration",
    description:
      "Accept digital payments securely through Mongolia's leading payment gateway",
  },
  {
    icon: Clock,
    title: "Order Management",
    description:
      "Track order status, manage tables, and ensure smooth service flow",
  },
  {
    icon: Utensils,
    title: "Menu Management",
    description:
      "Easily update menu items, prices, and categories with image uploads",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Modern Restaurant{" "}
              <span className="text-orange-500">Management System</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Streamline your restaurant operations with our comprehensive
              digital solution. From QR code ordering to kitchen display system
              - we've got you covered.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600"
                asChild
              >
                <Link href="/admin/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-200 hover:bg-orange-50"
                asChild
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 relative"
          >
            <Image
              src="/logo.svg"
              alt="Restaurant System"
              width={500}
              height={500}
              className="w-full max-w-xl mx-auto"
              priority
            />
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] rounded-full bg-gradient-to-br from-orange-100/30 to-transparent"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] rounded-full bg-gradient-to-tr from-teal-100/30 to-transparent"
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything You Need to Run Your Restaurant
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our comprehensive system helps you manage every aspect of your
              restaurant operations efficiently
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative p-6 bg-white rounded-xl border hover:border-orange-200 transition-colors group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-orange-50 text-orange-500 group-hover:bg-orange-100 transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute right-full translate-y-1/4 translate-x-1/4 transform lg:translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="pattern-1"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-orange-100"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width={404} height={784} fill="url(#pattern-1)" />
          </svg>
          <svg
            className="absolute left-full -translate-y-3/4 -translate-x-1/4 transform lg:-translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="pattern-2"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-teal-100"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width={404} height={784} fill="url(#pattern-2)" />
          </svg>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Ready to Transform Your Restaurant?
          </h2>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-orange-600 hover:bg-gray-100"
            asChild
          >
            <Link href="/admin/login">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] rounded-full bg-white"
          />
        </div>
      </section>
    </div>
  );
}
