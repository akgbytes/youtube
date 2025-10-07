"use client";

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
  const [data] = trpc.categories.getAll.useSuspenseQuery();
  return (
    <div>
      {data.map((category) => (
        <p key={category.name}>{category.name}</p>
      ))}
    </div>
  );
};

export default CategoriesSection;
