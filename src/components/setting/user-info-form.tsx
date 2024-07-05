"use client";
import { ChangePassword, UpdateInfo } from "@/src/actions/user";
import { ChooseAvatarButton } from "@/src/components/setting/choose-avatar-button";
import DistrictInput from "@/src/components/setting/district-input";
import ProvinceInput from "@/src/components/setting/province-input";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { UserToUpdate } from "@/src/convertor/userConvertor";
import { User } from "@/src/models/User";
import {
  cn,
  deleteImage,
  deleteImages,
  isValidPhoneNumberInput,
  uploadImage,
} from "@/src/utils/func";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import LoadingCircle from "../icons/custom-with-css/LoadingCircle/loading_circle";
import {
  showDefaultToast,
  showErrorToast,
  showSuccessToast,
} from "../ui/toast";
import { UploadImage } from "@/src/actions/image-upload";
import { de } from "date-fns/locale";

export type UserSettingFormData = {
  name: string;
  phonenumber?: string;
  houseNumber?: string;
  street?: string;
  district?: string;
  province?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

const schema: ZodType<UserSettingFormData> = z
  .object({
    name: z.string().min(2, "Username must be at least 2 characters"),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .optional(),
    confirmPassword: z.string().optional(),
    email: z.string().email().optional(),
    phonenumber: z
      .string()
      .min(10, "Phone number must have 10 characters")
      .optional(),
    houseNumber: z.string().optional(),
    street: z.string().optional(),
    district: z.string().optional(),
    province: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const splitAddress = (address: string) => {
  if (address === null || address === undefined)
    return {
      houseNumber: undefined,
      street: undefined,
      district: undefined,
      province: undefined,
    };
  const [houseNumber, street, district, province] = address.split(", ");
  return { houseNumber, street, district, province };
};

interface Props {
  thisUser: User;
}
export default function UserInfoForm({ thisUser }: Props) {
  const [fieldErrors, setFieldErrors] = useState<any>();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [oldFileUrls, setOldFileUrls] = useState<string[]>([]);

  const form = useForm<UserSettingFormData>({
    resolver: zodResolver(schema),
  });
  const { register, watch } = form;

  const setInitialValues = (user: User) => {
    if (!user) return;
    setFileUrl(thisUser.profileImage);
    setIsLoadingAvatar(false);

    form.setValue("name", thisUser.name);
    if (thisUser.phoneNumber)
      form.setValue("phonenumber", thisUser.phoneNumber);
    form.setValue("email", thisUser.email);

    const address = thisUser.address;
    if (address !== null) {
      const { houseNumber, street, district, province } = splitAddress(address);
      form.setValue("province", province);
      form.setValue("district", district);
      form.setValue("houseNumber", houseNumber);
      form.setValue("street", street);
    }
    resetPasswordFields();
  };

  const resetPasswordFields = () => {
    form.setValue("currentPassword", undefined);
    form.setValue("newPassword", undefined);
    form.setValue("confirmPassword", undefined);
  };

  useEffect(() => {
    setInitialValues(thisUser);
  }, [thisUser]);

  const isFormValuesChange = useMemo(() => {
    if (!thisUser) return false;
    const { name, email, phoneNumber, address } = thisUser;
    const { houseNumber, street, district, province } = splitAddress(address);
    return (
      fileUrl !== thisUser.profileImage ||
      name !== watch("name") ||
      email !== watch("email") ||
      phoneNumber !== watch("phonenumber") ||
      houseNumber !== watch("houseNumber") ||
      street !== watch("street") ||
      district !== watch("district") ||
      province !== watch("province") ||
      watch("currentPassword") ||
      watch("newPassword") ||
      watch("confirmPassword")
    );
  }, [thisUser, watch, form.getValues()]);

  const clientAction = async (data: FormData) => {
    //this is to prevent sending request when no changes
    if (!isFormValuesChange) {
      setInitialValues(thisUser); // for remove autofill
      resetPasswordFields(); // for remove autofill

      showDefaultToast("No changes to save");
      return;
    }
    const toValidate: any = {};
    const keys = data.keys();
    let canUpdatePassword = true;
    //create request object
    for (let key of keys) {
      if (
        key === "currentPassword" ||
        key === "newPassword" ||
        key === "confirmPassword"
      ) {
        if (data.get(key) === "") {
          canUpdatePassword = false;
          continue;
        }
      }
      toValidate[key] = data.get(key);
    }

    // validate request object
    const validation = schema.safeParse(toValidate);
    if (!validation.success) {
      setFieldErrors(validation.error.formErrors.fieldErrors);
      return;
    } else setFieldErrors({});

    const currentPassword = data.get("currentPassword");
    const newPassword = data.get("newPassword");

    const changePassFormData = new FormData();
    if (currentPassword && newPassword) {
      changePassFormData.append("oldPassword", new Blob([currentPassword]));
      changePassFormData.append("newPassword", new Blob([newPassword]));
    }

    //prepare user data to update
    const userToUpdate = UserToUpdate(thisUser, toValidate, fileUrl || "");
    const updatedUserFormData = new FormData();
    updatedUserFormData.append(
      "data",
      new Blob([JSON.stringify(userToUpdate)], { type: "application/json" })
    );

    setIsSaving(true);
    const [userRes, passRes, deleteRes] = await Promise.all([
      UpdateInfo(updatedUserFormData),
      canUpdatePassword ? ChangePassword(changePassFormData) : null,
      oldFileUrls.length > 0 ? deleteImages(oldFileUrls) : null,
    ]).finally(() => setIsSaving(false));
    if (deleteRes?.errors) {
      deleteRes.errors.forEach((error: string) => showErrorToast(error));
    }
    if (passRes && passRes.error) {
      showErrorToast(passRes.error);
    } else if (userRes.error) {
      showErrorToast(userRes.error);
    } else {
      showSuccessToast("Updated successfully!");
      resetPasswordFields();
    }
  };

  const handleProvinceChange = async (provinceName: string) => {
    form.setValue("province", provinceName);
    form.setValue("district", "");
  };
  const handleDistrictChange = (districtName: string) => {
    form.setValue("district", districtName);
  };

  const handleImageChanged = async (newFileUrl: File | null) => {
    if (newFileUrl) {
      if (fileUrl) setOldFileUrls([...oldFileUrls, fileUrl]);

      setIsLoadingAvatar(true);

      const res = await uploadImage(newFileUrl);

      if (res.error) {
        showErrorToast(res.error);
        setIsLoadingAvatar(false);
        return;
      }
      if (res.message) {
        setFileUrl(res.data.url);
        setIsLoadingAvatar(false);
      }
    } else setFileUrl(null);
  };
  return (
    <FormProvider {...form}>
      <form
        className="w-full h-full flex flex-col items-center justify-between"
        action={clientAction}
      >
        <main className="w-full flex flex-col items-center p-1 pl-3 overflow-x-hidden default-scrollbar dark:white-scrollbar">
          <h4 className="w-full font-bold text-lg mb-2">Your profile</h4>

          <section className="w-full flex flex-row items-stretch gap-8 rounded-md border-2 border-borderColor pt-4 py-6 px-6">
            <div className="w-[120px]">
              <ChooseAvatarButton
                onImageChanged={handleImageChanged}
                fileUrl={fileUrl}
                isLoading={isLoadingAvatar}
              />
            </div>
            <div className="w-full flex flex-row gap-4">
              <div className="w-1/2 flex flex-col gap-4">
                <Input
                  id="username"
                  label="Name"
                  className="text-secondary-word"
                  errorMessages={fieldErrors?.name ? fieldErrors.name[0] : ""}
                  {...register("name")}
                />
                <Input
                  id="email"
                  label="Email"
                  placeholder="demo@gmail.com"
                  className="text-secondary-word"
                  errorMessages={fieldErrors?.email ? fieldErrors.email[0] : ""}
                  {...register("email")}
                  disabled
                />
              </div>
              <div className="w-1/2">
                <Input
                  id="phonenumber"
                  label="Phonenumber"
                  className="text-secondary-word"
                  type="tel"
                  maxLength={10}
                  value={watch("phonenumber")}
                  errorMessages={
                    fieldErrors?.phonenumber ? fieldErrors.phonenumber[0] : ""
                  }
                  {...register("phonenumber", {
                    onChange(e) {
                      if (!isValidPhoneNumberInput(e.target.value)) return;
                      form.setValue("phonenumber", e.target.value);
                    },
                  })}
                />
              </div>
            </div>
          </section>

          <section className="w-full flex flex-row justify-between gap-4 mt-4">
            <div className="w-1/2 flex flex-col gap-2">
              <h4 className="w-full font-bold text-lg">Your address</h4>
              <div className="w-full flex flex-col gap-4 rounded-md border-2 border-borderColor py-6 px-8">
                <ProvinceInput
                  value={watch("province")}
                  onProvinceChange={handleProvinceChange}
                />
                <DistrictInput
                  value={watch("district")}
                  province={watch("province")}
                  onDistrictChange={handleDistrictChange}
                />

                <Input
                  id="street"
                  label="Street"
                  className="text-secondary-word"
                  errorMessages={
                    fieldErrors?.street ? fieldErrors.street[0] : ""
                  }
                  value={watch("street")}
                  {...register("street")}
                />
                <Input
                  id="house-number"
                  label="House number"
                  className="text-secondary-word"
                  errorMessages={
                    fieldErrors?.houseNumber ? fieldErrors.houseNumber[0] : ""
                  }
                  value={watch("houseNumber")}
                  {...register("houseNumber")}
                />
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <h4 className="w-full font-bold text-lg">Change your password</h4>
              <div className="w-full h-full flex flex-col gap-4 rounded-md border-2 border-borderColor py-6 px-8">
                <Input
                  id="current-password"
                  label="Current password"
                  className="text-secondary-word"
                  errorMessages={
                    fieldErrors?.currentPassword
                      ? fieldErrors.currentPassword[0]
                      : ""
                  }
                  type="password"
                  value={watch("currentPassword")}
                  {...register("currentPassword")}
                />
                <Input
                  id="new-password"
                  label="New password"
                  className="text-secondary-word"
                  errorMessages={
                    fieldErrors?.newPassword ? fieldErrors.newPassword[0] : ""
                  }
                  type="password"
                  value={watch("newPassword")}
                  {...register("newPassword")}
                />
                <Input
                  id="confirm-password"
                  label="Confirm password"
                  className="text-secondary-word"
                  errorMessages={
                    fieldErrors?.confirmPassword
                      ? fieldErrors.confirmPassword[0]
                      : ""
                  }
                  type="password"
                  value={watch("confirmPassword")}
                  {...register("confirmPassword")}
                />
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-row items-center self-end gap-2 pr-3">
          <Button
            type="button"
            className={cn(
              "w-[100px] self-end text-sm font-extrabold text-white bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
            )}
            onClick={() => {
              setInitialValues(thisUser);
              resetPasswordFields();
            }}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-[100px] text-sm font-extrabold text-white bg-primary hover:bg-primary/80"
            iconAfter={isSaving ? <LoadingCircle /> : null}
            disabled={isSaving}
          >
            {isSaving ? "" : "Save"}
          </Button>
        </footer>
      </form>
    </FormProvider>
  );
}
