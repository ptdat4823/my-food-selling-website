import { GetAllCategories } from "@/src/actions/category";
import { GetAllFood } from "@/src/actions/food";
import { GetInfo } from "@/src/actions/user";
import { Food, FoodCategory } from "@/src/models/Food";
import { User } from "@/src/models/User";
import { GetStaticProps } from "next";

interface Props {
  foods: Food[];
  categories: FoodCategory[];
  user: User | null;
}
export const getStaticProps: GetStaticProps<Props> = async () => {
  const [foodsResult, categoriesResult, userResults] = await Promise.allSettled(
    [GetAllFood(), GetAllCategories(), GetInfo()]
  );

  const foods =
    foodsResult.status === "fulfilled" ? (foodsResult.value as Food[]) : [];
  const categories =
    categoriesResult.status === "fulfilled"
      ? (categoriesResult.value as FoodCategory[])
      : [];

  const user =
    userResults.status === "fulfilled" ? (userResults.value as User) : null;

  return {
    props: {
      foods,
      categories,
      user,
    },
  };
};
