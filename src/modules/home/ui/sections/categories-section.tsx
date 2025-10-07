"use client";

import FilterCarousel from "@/components/filter-carousel";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface CategoriesSectionProps {
  categoryId?: string;
}

// This component only provides the wrappers — no queries here
const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <ErrorBoundary fallback={<p>Something went wrong loading categories</p>}>
      <Suspense fallback={<p>Loading categories...</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </Suspense>
    </ErrorBoundary>
  );
};

// Actual query lives here — this is what can "throw"
const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const [categories] = trpc.categories.getAll.useSuspenseQuery();

  const data = categories.map(({ name, id }) => ({
    value: id,
    label: name,
  }));

  return (
    <div>
      <FilterCarousel value={categoryId} data={data} />
    </div>
  );
};

export default CategoriesSection;
