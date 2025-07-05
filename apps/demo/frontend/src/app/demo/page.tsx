"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Utensils,
  Clock,
  CreditCard,
  Globe,
  ChefHat,
  BarChart,
  QrCode,
  Smartphone,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";

const demoFeatures = [
  {
    icon: QrCode,
    title: "QR код захиалга",
    titleEn: "QR Code Ordering",
    description: "Үйлчлүүлэгч QR код уншуулж шууд захиалга өгнө",
    descriptionEn:
      "Customers scan QR codes to order directly from their phones",
    color: "bg-blue-500",
  },
  {
    icon: ChefHat,
    title: "Гал тогооны дэлгэц",
    titleEn: "Kitchen Display",
    description: "Шинэ захиалга шууд гал тогоонд харагдана",
    descriptionEn: "Real-time order notifications to kitchen staff",
    color: "bg-orange-500",
  },
  {
    icon: BarChart,
    title: "Удирдлагын самбар",
    titleEn: "Admin Dashboard",
    description: "Захиалга, орлого, цэсийг нэг газраас удирдах",
    descriptionEn: "Manage orders, revenue, and menu from one place",
    color: "bg-green-500",
  },
  {
    icon: CreditCard,
    title: "QPay төлбөр",
    titleEn: "QPay Integration",
    description: "Монголын хамгийн том төлбөрийн системтэй холбогдсон",
    descriptionEn: "Integrated with Mongolia's leading payment gateway",
    color: "bg-purple-500",
  },
];

const demoStats = [
  { label: "Захиалга хэмнэгдэх хугацаа", value: "60%", icon: Clock },
  { label: "Үйлчлүүлэгчийн сэтгэл ханамж", value: "95%", icon: Star },
  { label: "Орлого нэмэгдэх", value: "35%", icon: TrendingUp },
  { label: "Ажилчдын ажлын дарамт", value: "-50%", icon: Users },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-800 border-orange-200"
                >
                  🇲🇳 Монголд анхны ухаалаг ресторан систем
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Ресторанаа
                  <span className="text-orange-500 block">Ухаалаг болго</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  QR код захиалга, автомат төлбөр, бодит цагийн мэдээлэл. Танай
                  ресторанд зориулсан бүрэн шийдэл.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/order/demo-table">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
                  >
                    <Smartphone className="mr-2 h-5 w-5" />
                    Демо үзэх
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-4 text-lg"
                  >
                    <BarChart className="mr-2 h-5 w-5" />
                    Удирдлагын самбар
                  </Button>
                </Link>
              </div>

              {/* Demo Stats */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {demoStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-orange-500">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <Image
                  src="/logo.svg"
                  alt="Smart Restaurant System Demo"
                  width={600}
                  height={600}
                  className="w-full max-w-lg mx-auto"
                  priority
                />
              </div>
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 bg-white rounded-full p-4 shadow-lg"
              >
                <QrCode className="h-8 w-8 text-orange-500" />
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-10 bg-white rounded-full p-4 shadow-lg"
              >
                <CreditCard className="h-8 w-8 text-green-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200 to-transparent rounded-full blur-3xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Яагаад манай системийг сонгох ёстой вэ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Дэлхийн стандартад нийцсэн, Монголын зах зээлд тохирсон технологи
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
                  <div
                    className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Flow Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              3 минутын демо
            </h2>
            <p className="text-xl text-gray-600">
              Системийн боломжуудыг шууд үзээрэй
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Үйлчлүүлэгчийн харц",
                description: "QR код уншуулж цэс үзэх, захиалга өгөх",
                action: "Демо захиалга өгөх",
                link: "/order/demo-table",
                color: "bg-blue-500",
              },
              {
                step: "02",
                title: "Гал тогооны дэлгэц",
                description: "Шинэ захиалга хүлээн авах, бэлтгэх",
                action: "Гал тогоо үзэх",
                link: "/kitchen",
                color: "bg-orange-500",
              },
              {
                step: "03",
                title: "Удирдлагын самбар",
                description: "Захиалга удирдах, тайлан үзэх",
                action: "Удирдлага үзэх",
                link: "/dashboard",
                color: "bg-green-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center mb-6`}
                >
                  <span className="text-white font-bold text-lg">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <Link href={item.link}>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800">
                    {item.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Таны ресторанд энэ системийг суулгахад бэлэн үү?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Суулгах: ₮1,999,000 • Сарын төлбөр: ₮199,000
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Суулгах хүсэлт илгээх
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-4 text-lg"
              >
                Дэлгэрэнгүй мэдээлэл
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
