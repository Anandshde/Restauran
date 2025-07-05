"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_STATS, DEMO_RESTAURANT } from "@/data/demoData";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "MNT",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("MNT", "₮");
};

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  delay = 0,
}: {
  title: string;
  value: string | number;
  change: string;
  icon: any;
  color: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <Badge variant="secondary" className={`${color} text-xs`}>
              {change}
            </Badge>
          </div>
        </div>
        <div
          className={`p-3 rounded-full ${color
            .replace("text-", "bg-")
            .replace("-600", "-100")}`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </Card>
  </motion.div>
);

const TopItemCard = ({
  item,
  index,
}: {
  item: { name: string; count: number; revenue: number };
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
        <span className="text-sm font-bold text-orange-600">#{index + 1}</span>
      </div>
      <div>
        <p className="font-medium text-gray-900">{item.name}</p>
        <p className="text-sm text-gray-500">{item.count} захиалга</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold text-gray-900">{formatPrice(item.revenue)}</p>
    </div>
  </motion.div>
);

export default function DashboardStats() {
  const stats = [
    {
      title: "Өнөөдрийн захиалга",
      value: DEMO_STATS.todayOrders,
      change: "+12%",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Өнөөдрийн орлого",
      value: formatPrice(DEMO_STATS.todayRevenue),
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Хүлээж буй захиалга",
      value: DEMO_STATS.pendingOrders,
      change: "шинэ",
      icon: AlertCircle,
      color: "text-orange-600",
    },
    {
      title: "Дууссан захиалга",
      value: DEMO_STATS.completedOrders,
      change: "+15%",
      icon: CheckCircle,
      color: "text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Restaurant Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{DEMO_RESTAURANT.name}</h1>
            <p className="text-orange-100 text-lg">
              Тавтай морилно уу! •{" "}
              {new Date().toLocaleDateString("mn-MN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-orange-100 text-sm">Дундаж захиалгын дүн</p>
            <p className="text-2xl font-bold">
              {formatPrice(DEMO_STATS.averageOrderValue)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Busy Hours Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold">Завсарлагын цаг</h3>
            </div>
            <div className="space-y-4">
              {DEMO_STATS.busyHours.map((hour, index) => (
                <div key={hour.hour} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600 w-12">
                    {hour.hour}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(hour.orders / 20) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-orange-500 h-2 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">
                    {hour.orders}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Top Items */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-semibold">Хамгийн их захиалагдсан</h3>
            </div>
            <div className="space-y-3">
              {DEMO_STATS.topItems.map((item, index) => (
                <TopItemCard key={item.name} item={item} index={index} />
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Шуурхай үйлдэл</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
              <Users className="h-6 w-6 text-blue-600 mb-2" />
              <p className="font-medium text-blue-900">Шинэ захиалга</p>
              <p className="text-sm text-blue-700">Гараар захиалга нэмэх</p>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
              <Clock className="h-6 w-6 text-green-600 mb-2" />
              <p className="font-medium text-green-900">Ширээ чөлөөлөх</p>
              <p className="text-sm text-green-700">Ширээний төлөв өөрчлөх</p>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
              <BarChart3 className="h-6 w-6 text-orange-600 mb-2" />
              <p className="font-medium text-orange-900">Тайлан үзэх</p>
              <p className="text-sm text-orange-700">Дэлгэрэнгүй тайлан</p>
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
