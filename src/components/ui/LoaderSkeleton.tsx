import { cn } from "@/lib/utils"

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-white/10", className)}
      {...props}
    />
  )
}

export function NewsCardSkeleton() {
  return (
    <div className="flex flex-col glass rounded-xl overflow-hidden h-[380px]">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <div className="space-y-2 mt-auto">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  )
}

export function FeaturedCardSkeleton() {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] w-full">
      <Skeleton className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-10 md:h-14 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5 mb-6" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  )
}
