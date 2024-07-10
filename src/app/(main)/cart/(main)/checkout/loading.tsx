import { Separate } from "@/src/components/ui/separate";
import Skeleton from "@/src/components/skeleton/custom/skeleton";
import InputSkeleton from "@/src/components/skeleton/cart/checkout/input-skeleton";
import TextAreaSkeleton from "@/src/components/skeleton/cart/checkout/textarea-skeleton";

const Loading = () => {
  return (
    <div className="h-fit px-2 flex flex-col gap-8">
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="w-6 h-6 self-end" />
        <Separate classname="h-[1.5px]" />
        <InputSkeleton title="Full name" />
        <InputSkeleton title="Address" />
        <InputSkeleton title="Phone number" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Separate classname="h-[1.5px]" />

        <TextAreaSkeleton title="Note" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Separate classname="h-[1.5px]" />
        <div className="font-bold">Payment method</div>
        <div className="w-full flex flex-row flex-wrap items-center justify-start gap-2">
          <Skeleton className="w-60 h-14 rounded-lg" />
          <Skeleton className="w-60 h-14 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
