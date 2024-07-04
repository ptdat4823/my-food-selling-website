"use client";

import { cn } from "@/src/utils/func";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ClassValue } from "clsx";
import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

export type ConfirmDialogType = "warning" | "error" | "success" | "info";

export const ConfirmDialog = ({
  isOpen,
  onOpenChange,
  title = "Warning",
  content = "The shift you're attempting to set has already existed. Would you like to overwrite it?",
  type = "warning",
  onAccept,
  onCancel,
  className,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title?: string;
  content?: string;
  type?: ConfirmDialogType;
  onAccept?: () => void;
  onCancel?: () => void;
  className?: ClassValue;
}) => {
  const answerButton = type === "warning" ? "Yes" : "Ok";
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => onOpenChange(!isOpen)}
      className={cn(
        "h-fit text-primary-word dark:text-dark-primary-word bg-dark-secondary-bg rounded-lg overflow-hidden",
        className
      )}
      size="md"
    >
      <ModalContent className="font-sans">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row gap-2 items-center">
              {type === "warning" && (
                <AlertTriangle className="text-yellow-500" size={16} />
              )}
              {type === "error" && (
                <XCircle className="text-red-500" size={16} />
              )}
              {type === "success" && (
                <CheckCircle className="text-green-500" size={16} />
              )}
              {type === "info" && (
                <AlertCircle className="text-blue-500" size={16} />
              )}

              {title}
            </ModalHeader>
            <ModalBody>{content}</ModalBody>
            <ModalFooter className="flex flex-row justify-end gap-3">
              <Button
                type="button"
                onClick={onAccept}
                className={cn(
                  "w-[100px]",
                  type === "warning"
                    ? "bg-red-500 hover:bg-red-600 dark:hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600 dark:hover:bg-green-600"
                )}
              >
                {answerButton}
              </Button>
              <Button
                type="button"
                onClick={onCancel}
                className="w-[100px] bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-secondary-word"
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export type UseConfirmDialogType = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  title: string;
  content: string;
  type: ConfirmDialogType;
  setConfirmDialog: (
    title: string,
    content: string,
    confirmDialog: ConfirmDialogType
  ) => void;
};

export const useConfirmDialog = (): UseConfirmDialogType => {
  const [isOpen, setIsOpen] = useState(false);
  const setOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<ConfirmDialogType>("warning");
  const setConfirmDialog = (
    title: string,
    content: string,
    confirmDialog: ConfirmDialogType
  ) => {
    setTitle(title);
    setContent(content);
    setType(confirmDialog);
  };
  return { isOpen, setOpen, title, content, type, setConfirmDialog };
};
