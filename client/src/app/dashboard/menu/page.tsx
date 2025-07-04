"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FoodDialog } from "@/components/dashboard/FoodDialog";
import { useFoods } from "@/hooks/useFoods";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { HighlightText } from "@/components/ui/highlight-text";
import { mn } from "@/constants/mn";
import { cn, formatPrice } from "@/lib/utils";
import { useTranslations } from "@/hooks/useTranslations";
import type { ColumnDef } from "@/components/ui/data-table/types";
import type { Food } from "@/types";

const categoryColors = {
  main: "bg-blue-100 text-blue-800 border-blue-200",
  side: "bg-green-100 text-green-800 border-green-200",
  dessert: "bg-pink-100 text-pink-800 border-pink-200",
  drink: "bg-purple-100 text-purple-800 border-purple-200",
} as const;

export default function MenuPage() {
  const t = useTranslations();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const { data: foods, isLoading, error, mutate } = useFoods();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleEdit = (food: Food) => {
    setEditingFood(food);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(mn.menu.delete.confirm)) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/food/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        mutate();
      }
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  const columns: ColumnDef<Food>[] = [
    {
      id: "name",
      header: t.name,
      cell: (row) => row.name,
      sortable: true,
      mobile: true,
      sortingFn: (a, b) =>
        a.name && b.name ? a.name.localeCompare(b.name) : 0,
    },
    {
      id: "category",
      header: t.category,
      cell: (row) => (
        <Badge variant="secondary" className="capitalize">
          {row.category}
        </Badge>
      ),
      sortable: true,
      sortingFn: (a, b) =>
        a.category && b.category ? a.category.localeCompare(b.category) : 0,
    },
    {
      id: "price",
      header: t.price,
      cell: (row) => formatPrice(row.price),
      sortable: true,
      mobile: true,
      sortingFn: (a, b) => (a.price && b.price ? a.price - b.price : 0),
    },
    {
      id: "status",
      header: t.status,
      cell: (row) => (
        <Badge
          variant={row.status === "active" ? "success" : "secondary"}
          className="capitalize"
        >
          {row.status === "active" ? t.active : t.inactive}
        </Badge>
      ),
      sortable: true,
      sortingFn: (a, b) =>
        a.status && b.status ? a.status.localeCompare(b.status) : 0,
    },
  ];

  const filteredData = (foods || [])?.filter((food: Food) => {
    const matchesSearch = searchQuery
      ? food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = category ? food.category === category : true;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = Array.from(
    new Set((foods || []).map((food: Food) => food.category))
  ).map((category) => ({
    label: category,
    value: category,
  }));

  if (error)
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-semibold text-gray-900">
          {mn.menu.error.title}
        </h3>
        <p className="text-gray-500">{mn.menu.error.description}</p>
      </div>
    );

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{mn.menu.title}</h1>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" /> {mn.menu.addNew}
        </Button>
      </div>

      <DataTable
        data={filteredData || []}
        columns={columns}
        searchable
        searchPlaceholder={t.search}
        categoryFilter={{
          options: categories,
          placeholder: t.filter,
        }}
        onSearch={setSearchQuery}
        onCategoryChange={setCategory}
        isLoading={isLoading}
        emptyState={t.noData}
        pagination={{
          pageCount: Math.ceil((filteredData?.length || 0) / pageSize),
          initialPageSize: pageSize,
          pageSizeOptions: [10, 20, 50],
          onPageChange: ({ pageIndex, pageSize }) => {
            setPageIndex(pageIndex);
            setPageSize(pageSize);
          },
          mode: "pagination", // or "infinite"
        }}
        sorting={{
          maxSortColumns: 2,
          initialSort: [{ id: "name", direction: "asc" }],
        }}
        enableExport
        exportFileName="menu"
        enableKeyboardShortcuts
        ariaLabel={t.menuTable}
        ariaDescription={t.menuTableDescription}
      />

      <FoodDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        food={editingFood}
        onClose={() => {
          setEditingFood(null);
          setIsDialogOpen(false);
          mutate();
        }}
      />
    </div>
  );
}
