import { Food } from "@/src/models/Food";
import { Row } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { RefreshCw, Trash } from "lucide-react";
import {
  ConfirmDialog,
  ConfirmDialogType,
  useConfirmDialog,
} from "../ui/confirm-dialog";
import { cn } from "@/src/utils/func";
import ImageCarousel from "../carousel/image_carousel";

export const FoodDetailTab = ({
  row,
  setShowTabs,
  onDeleteFood,
  onUpdateFood,
}: {
  row: Row<Food>;
  onUpdateFood?: () => void;
  setShowTabs: (value: boolean) => any;
  onDeleteFood?: (id: number) => void;
}) => {
  const food = row.original;
  const { isOpen, setOpen, content, title, type, setConfirmDialog } =
    useConfirmDialog();
  return (
    <div className="flex h-fit flex-col gap-4 px-4 py-4">
      <div className="flex flex-row gap-4">
        <div className={cn("w-[250px] max-h-[200px]")}>
          <ImageCarousel images={food.images} />
        </div>
        <div className="flex shrink-[5] grow-[5] flex-row gap-2 text-[0.8rem]">
          <div className="flex flex-1 flex-col">
            <RowInfo label="Food ID:" value={food.id.toString()} />
            <RowInfo label="Food name:" value={food.name} />
            <RowInfo
              label="Status:"
              value={food.status ? "Active" : "Disable"}
            />
            <RowInfo label="Category:" value={food.category.name} />
            <RowInfo label="Tags:" value={food.tags.join(", ")} />
          </div>
          <div className="flex flex-1 flex-col">
            <RowInfo
              label="Description:"
              value={food.description}
              showTextArea
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 justify-end">
        <Button
          className="bg-green-500 gap-2"
          onClick={onUpdateFood}
          iconBefore={<RefreshCw size={16} />}
        >
          Update food
        </Button>
        <Button
          onClick={() => {
            setConfirmDialog(
              "Delete food",
              "Are you sure you want to delete this food?",
              "warning" as ConfirmDialogType
            );
            setOpen(true);
          }}
          className="bg-red-500 gap-2"
          iconBefore={<Trash size={16} />}
        >
          Delete
        </Button>
      </div>
      <ConfirmDialog
        isOpen={isOpen}
        onOpenChange={setOpen}
        title="Delete food"
        content="Are you sure you want to delete this food?"
        onAccept={() => {
          if (!onDeleteFood) return;
          setOpen(false);
          onDeleteFood(food.id);
          setShowTabs(false);
        }}
      />
    </div>
  );
};

const RowInfo = ({
  label,
  value,
  showTextArea = false,
}: {
  label: string;
  value: string;
  showTextArea?: boolean;
}) => {
  return (
    <div
      className={cn(
        "mb-2 font-medium",
        showTextArea ? "" : "flex flex-row border-b"
      )}
    >
      <p className="w-[100px] font-semibold">{label}</p>
      {showTextArea ? (
        <textarea
          readOnly
          disabled
          className={cn("h-[120px] w-full resize-none border-2 p-1")}
          defaultValue={value}
        ></textarea>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
};
