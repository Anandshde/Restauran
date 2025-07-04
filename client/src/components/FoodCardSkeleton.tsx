import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FoodCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-9 w-full" />
      </div>
    </Card>
  );
}

export function FoodCardSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <FoodCardSkeleton key={index} />
      ))}
    </div>
  );
}
