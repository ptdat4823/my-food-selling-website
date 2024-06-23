import { Food, FoodSize } from "@/src/models/Food";
import { ClassValue } from "clsx";
import { useDotButton } from "../carousel/carousel_dot_button";
import useEmblaCarousel from "embla-carousel-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { cn, displayNumber } from "@/src/utils/func";
import ImageCarousel from "../carousel/image_carousel";
import { Button } from "../ui/button";
import { HeartIcon, ShoppingCart } from "lucide-react";
import { showDefaultToast } from "../ui/toast";
import { NumberInput } from "../ui/number-input";
import { FoodProperty } from "./food-property";
import FoodRating from "./food-rating";
import FoodTag from "./food-tag";
import { SolidHeartIcon } from "../icons/solid";
import LoadingCircle from "../icons/custom/LoadingCircle/loading_circle";
import { useState } from "react";

export const FoodDetail = ({
  isOpen,
  onOpenChange,
  food,
  foodQuantity,
  onFoodQuantityChange,
  selectedSize,
  onFoodSizeChange,
  isFavorite = false,
  onFavoriteChange,
  onAddToCart,
  className,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  food: Food;
  foodQuantity: number;
  onFoodQuantityChange: (quantity: number) => void;
  selectedSize: FoodSize;
  onFoodSizeChange: (foodSize: FoodSize) => void;
  isFavorite?: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
  onAddToCart?: () => Promise<void>;
  className?: ClassValue;
}) => {
  const [emblaRef, emplaApi] = useEmblaCarousel({
    loop: false,
    watchDrag: false,
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emplaApi);
  const isLogin = false;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => onOpenChange(!isOpen)}
      className={cn(
        "z-50 text-primary-word rounded-lg overflow-hidden",
        className
      )}
      hideCloseButton
      size="5xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <div className="w-full overflow-hidden rounded-md" ref={emblaRef}>
              <div className="w-full flex items-start">
                <div
                  className="flex-[0_0_100%] overflow-y-scroll scrollbar scrollbar-hide h-[60vh] pt-2"
                  draggable={false}
                >
                  <ModalHeader className="flex flex-row gap-2 font-sans">
                    <div className="w-1/3 lg:h-48 max-lg:h-40 max-sm:h-28">
                      <ImageCarousel images={food.images} />
                    </div>
                    <div className="w-2/3 flex flex-col gap-1">
                      <div className="flex flex-col items-start">
                        <div className="flex flex-row items-center gap-2">
                          <span>{food.name}</span>
                          <Button
                            className={cn(
                              "rounded-full ease-linear duration-100 bg-transparent hover:bg-transparent hover:opacity-60",
                              !isFavorite && "opacity-50"
                            )}
                            iconBefore={<SolidHeartIcon color="pink" />}
                            onClick={() => {
                              if (!isLogin) {
                                {
                                  showDefaultToast(
                                    "Please login to add your favourite food"
                                  );
                                  return;
                                }
                              }
                              if (onFavoriteChange)
                                onFavoriteChange(!isFavorite);
                            }}
                          />
                        </div>
                        <div className="w-full flex flex-row items-center justify-between">
                          <p className="text-xl">
                            {displayNumber(selectedSize.price, "$")}
                          </p>
                          <div className="w-min font-sans">
                            <NumberInput
                              className="outline-0 text-primary-word"
                              value={foodQuantity}
                              onDecrease={() =>
                                onFoodQuantityChange(
                                  foodQuantity <= 1 ? 1 : foodQuantity - 1
                                )
                              }
                              onIncrease={() =>
                                onFoodQuantityChange(foodQuantity + 1)
                              }
                              onChange={(e) =>
                                onFoodQuantityChange(
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
                              onClick={() => onFoodSizeChange(size)}
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
                        <div className="flex flex-row gap-1">
                          {food.tags.map((tag) => {
                            return (
                              <FoodTag key={tag} name={tag} theme="dark" />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </ModalHeader>

                  <ModalBody className="font-sans">
                    <span className="font-semibold">Desciption</span>
                    <p>{food.description}</p>
                  </ModalBody>
                </div>
                {/* <div className="flex-[0_0_100%] overflow-y-scroll font-sans pt-4">
                    <CommentSection foodId={food.id} hasPurchased={food.purchased} />
                  </div> */}
              </div>
            </div>

            <ModalFooter className="relative w-full flex flex-row items-center font-sans">
              <div className="absolute left-1/2 -translate-x-1/2 w-fit h-fit flex flex-row items-center justify-center rounded-2xl overflow-hidden border-2 border-black">
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
                className="w-min justify-self-end gap-2 font-sans text-nowrap text-primary-word bg-transparent hover:text-primary hover:bg-transparent ease-linear duration-100"
                onClick={() => {
                  if (onAddToCart) {
                    setIsLoading(true);
                    onAddToCart().finally(() => setIsLoading(false));
                  }
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
  const defaultTabStyle = "text-white bg-black hover:text-primary";
  const selectedTabStyle = "text-primary-word bg-white hover:text-primary-word";

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
