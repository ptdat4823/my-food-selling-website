import React from "react";
import FoodListSkeleton from "./food-list-skeleton";

interface Props {
  title: string;
}
const FoodListSectionSkeleton = ({ title }: Props) => {
  return (
    <div>
      <h3 className="text-4xl font-semibold mb-4 text-primary dark:text-dark-primary-word">
        {title}
      </h3>
      <FoodListSkeleton />
    </div>
  );
};

export default FoodListSectionSkeleton;
