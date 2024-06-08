import Image from "next/image";
import empty_image from "@/public/images/empty_item.png";

export const EmptyItem = () => {
  return (
    <div className="h-full flex flex-col items-center gap-10 mt-10">
      <Image
        width={300}
        height={200}
        src={empty_image}
        alt="empty item image"
      />
      <span className="text-secondaryWord text-xl">
        Shopping more to find your favorite food
      </span>
    </div>
  );
};
