import { AddCart } from "@/src/actions/cart";
import { ChangeStateFavouriteFood } from "@/src/actions/food";
import { Cart } from "@/src/models/Cart";
import { Food, FoodSize } from "@/src/models/Food";
import { User } from "@/src/models/User";
import { cn, displayNumber } from "@/src/utils/func";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ClassValue } from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDotButton } from "../carousel/carousel_dot_button";
import ImageCarousel from "../carousel/image_carousel";
import LoadingCircle from "../icons/custom-with-css/LoadingCircle/loading_circle";
import { SolidHeartIcon } from "../icons/solid";
import { Button } from "../ui/button";
import { NumberInput } from "../ui/number-input";
import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from "../ui/toast";
import { CommentSection } from "./comment-section";
import { FoodProperty } from "./food-property";
import FoodRating from "./food-rating";

export const FoodDetail = ({
  isOpen,
  onOpenChange,
  food,
  isFavorite = false,
  user,
  className,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  food: Food;
  isFavorite?: boolean;
  user: User;
  className?: ClassValue;
}) => {
  const { data: session } = useSession();
  const [emblaRef, emplaApi] = useEmblaCarousel({
    loop: false,
    watchDrag: false,
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emplaApi);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState<FoodSize>(food.foodSizes[0]);
  const [selectedFoodQuantity, setSelectedFoodQuantity] = useState(1);

  useEffect(() => {
    setSelectedSize(food.foodSizes[0]);
    setSelectedFoodQuantity(1);
  }, [food]);

  const handleAddToCart = async (food: Food) => {
    if (!selectedSize) return;
    if (!session) {
      showErrorToast("Please login to add to cart");
      return;
    }
    const newCartItem: Cart = {
      id: -1,
      quantity: selectedFoodQuantity,
      price: selectedFoodQuantity * selectedSize.price,
      food: food,
      foodSize: selectedSize,
      note: "",
    };
    const res = await AddCart(newCartItem);
    if (res.error) {
      showErrorToast(res.error);
    }
    if (res.message) {
      showSuccessToast(res.message);
      onOpenChange(!isOpen);
    }
  };
  const handleFoodSizeChange = (foodSize: FoodSize) => {
    if (selectedSize !== foodSize) setSelectedSize(foodSize);
  };
  const handleFavoriteFoodIdsChange = async (id: number) => {
    if (!session) {
      showDefaultToast("Please login to add your favourite food");
      return;
    }
    const res = await ChangeStateFavouriteFood(id);
    if (res.error) {
      showErrorToast(res.error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => onOpenChange(!isOpen)}
      className={cn(
        "z-50 text-primary-word rounded-lg overflow-hidden",
        "dark:text-dark-primary-word dark:bg-dark-secondart-bg",
        className
      )}
      hideCloseButton
      size="5xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <div
              className="w-full h-[65vh] overflow-hidden rounded-md"
              ref={emblaRef}
            >
              <div className="w-full h-full flex items-start">
                <div
                  className="flex-[0_0_100%] overflow-y-scroll scrollbar scrollbar-hide h-[60vh] pt-2"
                  draggable={false}
                >
                  <ModalHeader className="flex flex-row gap-2 font-sans">
                    <div className="w-1/3 lg:h-48 max-lg:h-40 max-sm:h-28">
                      <ImageCarousel images={food.images} dragable />
                    </div>
                    <div className="w-2/3 flex flex-col gap-1">
                      <div className="w-full flex flex-col items-start">
                        <div className="w-full flex flex-row items-center justify-between">
                          <div className="flex flex-row items-center gap-2">
                            <span>{food.name}</span>
                            <Button
                              className={cn(
                                "rounded-full ease-linear duration-100 bg-transparent dark:hover:bg-transparent hover:bg-transparent hover:opacity-60",
                                !isFavorite && "opacity-50"
                              )}
                              iconBefore={<SolidHeartIcon color="pink" />}
                              onClick={() => {
                                handleFavoriteFoodIdsChange(food.id);
                              }}
                            />
                          </div>

                          <div
                            className={cn(
                              "flex gap-1 font-semibold text-sm",
                              food.rating === 0 && "hidden"
                            )}
                          >
                            <span>{food.rating}</span>
                            <FoodRating rating={food.rating} />
                          </div>
                        </div>
                        <div className="w-full flex flex-row items-center justify-between">
                          <p className="text-xl font-normal">
                            {displayNumber(selectedSize.price, "$")}
                          </p>
                          <div className="w-min font-sans">
                            <NumberInput
                              className="outline-0 text-primary-word"
                              value={selectedFoodQuantity}
                              onDecrease={() =>
                                setSelectedFoodQuantity(
                                  selectedFoodQuantity <= 1
                                    ? 1
                                    : selectedFoodQuantity - 1
                                )
                              }
                              onIncrease={() =>
                                setSelectedFoodQuantity(
                                  selectedFoodQuantity + 1
                                )
                              }
                              onChange={(e) =>
                                setSelectedFoodQuantity(
                                  Number.parseInt(e.target.value)
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row gap-2 items-center">
                        {food.foodSizes.map((size) => {
                          return (
                            <FoodProperty
                              key={size.name}
                              isSelected={selectedSize === size}
                              name={size.name}
                              onClick={() => handleFoodSizeChange(size)}
                            />
                          );
                        })}
                      </div>
                      <div className="font-normal text-base">
                        {selectedSize.note}
                      </div>
                      <div className="flex items-center">
                        <FoodRating
                          rating={food.rating}
                          className={cn(
                            "mt-2 hidden",
                            food.rating > 0 && "visible"
                          )}
                        />
                        <span className="font-normal">
                          {food.totalSold + " sold"}
                        </span>
                      </div>
                    </div>
                  </ModalHeader>

                  <ModalBody className="font-sans">
                    <span className="font-semibold">Desciption</span>
                    <textarea className="resize-none bg-transparent w-full h-[500px] default-scrollbar dark:white-scrollbar">
                      {food.description}
                    </textarea>
                  </ModalBody>
                </div>
                <div className="flex-[0_0_100%] h-full scrollbar font-sans pt-4">
                  <CommentSection
                    foodId={food.id}
                    hasPurchased={food.purchased}
                    user={user}
                  />
                </div>
              </div>
            </div>

            <ModalFooter className="relative w-full flex flex-row items-center font-sans">
              <div className="absolute left-1/2 -translate-x-1/2 w-fit h-fit flex flex-row items-center justify-center rounded-2xl overflow-hidden border-2 border-black dark:border-white">
                <Tab
                  selectedIndex={selectedIndex}
                  index={0}
                  setSelectedIndex={(index) => onDotButtonClick(index)}
                  content="Info"
                />
                <Tab
                  selectedIndex={selectedIndex}
                  index={1}
                  setSelectedIndex={(index) => onDotButtonClick(index)}
                  content="Review"
                />
              </div>
              <Button
                iconAfter={
                  isLoading ? (
                    <LoadingCircle />
                  ) : (
                    <ShoppingCart className="w-4 h-4" />
                  )
                }
                className={cn(
                  "w-min justify-self-end gap-2 font-sans text-nowrap text-primary-word bg-transparent hover:text-primary hover:bg-transparent ease-linear duration-100",
                  "dark:text-dark-primary-word dark:hover:text-primary dark:hover:bg-transparent"
                )}
                onClick={() => {
                  setIsLoading(true);
                  handleAddToCart(food).finally(() => setIsLoading(false));
                }}
              >
                {!isLoading && "Add to cart"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const Tab = ({
  className,
  content,
  selectedIndex,
  index,
  setSelectedIndex,
  onClick,
}: {
  className?: ClassValue;
  content: string;
  selectedIndex: number;
  index: number;
  setSelectedIndex: (index: number) => void;
  onClick?: () => void;
}) => {
  const defaultTabStyle =
    "text-white bg-black dark:bg-white hover:text-primary dark:text-black dark:hover:text-primary";
  const selectedTabStyle =
    "text-primary-word bg-white hover:text-primary-word dark:bg-dark-secondary-bg dark:text-dark-primary-word";

  return (
    <span
      className={cn(
        "min-w-[100px] px-4 ease-linear duration-200 cursor-pointer text-center",
        selectedIndex === index ? selectedTabStyle : defaultTabStyle,
        className
      )}
      onClick={() => {
        setSelectedIndex(index);
        if (onClick) onClick();
      }}
    >
      {content}
    </span>
  );
};
