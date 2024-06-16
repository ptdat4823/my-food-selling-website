import { ChooseAvatarButton } from "@/src/components/setting/choose-avatar-button";
import DistrictInput from "@/src/components/setting/district-input";
import ProvinceInput from "@/src/components/setting/province-input";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import AddressService from "@/src/services/addressService";
import UserService from "@/src/services/userService";
import { isValidPhoneNumberInput } from "@/src/utils/func";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";

export type UserSettingFormData = {
  name: string;
  phonenumber?: string;
  houseNumber?: string;
  street?: string;
  district?: string;
  province?: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

const schema: ZodType<UserSettingFormData> = z
  .object({
    name: z.string().min(2, "Username must be at least 2 characters"),
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .optional(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .optional(),
    confirmPassword: z.string().optional(),
    email: z.string().email(),
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

export default async function UserSettingPage() {
  const provinces = await AddressService.getAllProvinces();
  const thisUser = await UserService.getProfile();

  //   const [provincesData, setProvincesData] = useState<
  //     { idProvince: string; name: string }[]
  //   >([]);
  //   const [provinceNameList, setProvinceNameList] = useState<string[]>([]);
  //   const [districtNameList, setDistrictNameList] = useState<string[]>([]);
  //   const [isSaving, setIsSaving] = useState(false);
  //   const [chosenImage, setChosenImage] = useState<File | null>(null);
  //   const [chosenImageUrl, setChosenImageUrl] = useState<string | null>(null);

  const form = useForm<UserSettingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: undefined,
      phonenumber: undefined,
      houseNumber: undefined,
      street: undefined,
      district: undefined,
      province: undefined,
      email: undefined,
      currentPassword: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = form;

  const setInitialValues = () => {
    if (!thisUser) return;
    // setChosenImageUrl(thisUser.profileImage);
    form.setValue("name", thisUser.name);
    form.setValue(
      "phonenumber",
      thisUser.phoneNumber ? thisUser.phoneNumber : undefined
    );
    form.setValue("email", thisUser.email);

    const address = thisUser.address;
    if (address !== null) {
      const { houseNumber, street, district, province } = splitAddress(address);
      if (province) handleProvinceChange(province);
      form.setValue("province", province);
      form.setValue("houseNumber", houseNumber);
      form.setValue("street", street);
      form.setValue("district", district);
    }
  };

  const resetPasswordFields = () => {
    form.setValue("currentPassword", undefined);
    form.setValue("newPassword", undefined);
    form.setValue("confirmPassword", undefined);
  };

  //   const isFormValuesChange = useMemo(() => {
  //     if (!thisUser) return false;
  //     const { name, email, phoneNumber, address } = thisUser;
  //     const { houseNumber, street, district, province } = splitAddress(address);
  //     return (
  //       chosenImage !== null ||
  //       name !== watch("name") ||
  //       email !== watch("email") ||
  //       phoneNumber !== watch("phonenumber") ||
  //       houseNumber !== watch("houseNumber") ||
  //       street !== watch("street") ||
  //       district !== watch("district") ||
  //       province !== watch("province") ||
  //       watch("currentPassword") ||
  //       watch("newPassword") ||
  //       watch("confirmPassword")
  //     );
  //   }, [thisUser, form.getValues()]);

  const handleFormSubmit = async (data: UserSettingFormData) => {
    if (!thisUser) return;
    // if (!isFormValuesChange) {
    //   showDefaultToast("No changes to save");
    //   return;
    // }

    // const dataForm: any = new FormData();
    // const updatedProfile = UserToUpdate(
    //   thisUser,
    //   data,
    //   chosenImageUrl ? chosenImageUrl : ""
    // );
    // dataForm.append(
    //   "data",
    //   new Blob([JSON.stringify(updatedProfile)], {
    //     type: "application/json",
    //   })
    // );
    // dataForm.append("files", chosenImage);

    // setIsSaving(true);
    // Update password
    // if (data.currentPassword && data.newPassword && data.confirmPassword) {
    //   const changePassFormData = new FormData();
    //   changePassFormData.append("oldPassword", data.currentPassword ?? "");
    //   changePassFormData.append("newPassword", data.newPassword ?? "");

    //   await UserService.changePassword(changePassFormData)
    //     .then(() => {
    //       resetField("currentPassword");
    //       resetField("newPassword");
    //       resetField("confirmPassword");
    //     })
    //     .catch((e) => showErrorToast("Wrong password"));
    // }

    // await UserService.updateProfile(dataForm)
    //   .then(() => {
    //     dispatch(setProfile(updatedProfile));
    //     showSuccessToast("Updated successfully");
    //     resetPasswordFields();
    //   })
    //   .catch((e) => showErrorToast(e.message))
    //   .finally(() => {
    //     setIsSaving(false);
    //   });
  };

  const handleProvinceChange = async (provinceName: string) => {
    form.setValue("province", provinceName);
    form.setValue("district", "");
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="min-h-screen h-screen w-full font-sans p-8 text-primaryWord bg-[#fff2e8]">
        <div className="w-full h-full p-6 flex flex-row gap-10 rounded-md bg-white shadow-primaryShadow">
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="w-full flex flex-col items-center p-1 pl-3 overflow-y-scroll">
              <p className="w-full font-bold text-lg mb-2">Your profile</p>

              <div className="w-full flex flex-row items-stretch gap-8 rounded-md border-2 border-borderColor py-4 px-6">
                <div className="w-[120px]">
                  <ChooseAvatarButton />
                </div>
                <div className="w-full flex flex-row gap-4">
                  <div className="w-1/2 flex flex-col gap-4">
                    <Input
                      id="username"
                      label="Name"
                      labelColor="text-secondaryWord"
                      className="text-secondaryWord"
                      errorMessages={errors.name ? errors.name.message : ""}
                      {...register("name")}
                    />
                    <Input
                      id="email"
                      label="Email"
                      placeholder="demo@gmail.com"
                      labelColor="text-secondaryWord"
                      className="text-secondaryWord"
                      errorMessages={errors.email ? errors.email.message : ""}
                      {...register("email")}
                      disabled
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      id="phonenumber"
                      label="Phonenumber"
                      labelColor="text-secondaryWord"
                      className="text-secondaryWord"
                      type="tel"
                      maxLength={10}
                      value={watch("phonenumber")}
                      onChange={(e) => {
                        if (!isValidPhoneNumberInput(e.target.value)) return;

                        form.setValue("phonenumber", e.target.value);
                      }}
                      errorMessages={
                        errors.phonenumber ? errors.phonenumber.message : ""
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-row justify-between gap-4 mt-4">
                <div className="w-1/2 flex flex-col gap-2">
                  <p className="w-full font-bold text-lg">Your address</p>
                  <div className="w-full flex flex-col gap-4 rounded-md border-2 border-borderColor py-6 px-8">
                    <ProvinceInput
                      value={watch("province")}
                      onProvinceChange={handleProvinceChange}
                    />
                    <DistrictInput
                      value={watch("district")}
                      province={watch("province")}
                    />

                    <Input
                      id="street"
                      label="Street"
                      labelColor="text-secondaryWord"
                      className="text-secondaryWord"
                      errorMessages={errors.street ? errors.street.message : ""}
                      value={watch("street")}
                      {...register("street")}
                    />
                    <Input
                      id="house-number"
                      label="House number"
                      labelColor="text-secondaryWord"
                      className="text-secondaryWord"
                      errorMessages={
                        errors.houseNumber ? errors.houseNumber.message : ""
                      }
                      value={watch("houseNumber")}
                      {...register("houseNumber")}
                    />
                  </div>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                  <p className="w-full font-bold text-lg">
                    Change your password
                  </p>
                  <div className="w-full h-full flex flex-col gap-4 rounded-md border-2 border-borderColor py-6 px-8">
                    <Input
                      id="current-password"
                      label="Current password"
                      labelColor="text-secondaryWord"
                      className="text-secondaryWord"
                      errorMessages={
                        errors.currentPassword
                          ? errors.currentPassword.message
                          : ""
                      }
                      type="password"
                      value={watch("currentPassword") ?? ""}
                      onChange={(e) => {
                        const password = e.target.value;
                        if (password === "")
                          form.setValue("currentPassword", undefined);
                        else form.setValue("currentPassword", e.target.value);
                      }}
                    />
                    <Input
                      id="new-password"
                      label="New password"
                      labelColor="text-secondaryWord"
                      className="text-secondaryWord"
                      errorMessages={
                        errors.newPassword ? errors.newPassword.message : ""
                      }
                      type="password"
                      value={watch("newPassword") ?? ""}
                      onChange={(e) => {
                        const newPassword = e.target.value;
                        if (newPassword === "")
                          form.setValue("newPassword", undefined);
                        else form.setValue("newPassword", e.target.value);
                      }}
                    />
                    <Input
                      id="confirm-password"
                      label="Confirm password"
                      labelColor="text-secondaryWord"
                      className="text-secondaryWord"
                      errorMessages={
                        errors.confirmPassword
                          ? errors.confirmPassword.message
                          : ""
                      }
                      type="password"
                      value={watch("confirmPassword") ?? ""}
                      onChange={(e) => {
                        const confirmPassword = e.target.value;
                        if (confirmPassword === "")
                          form.setValue("confirmPassword", undefined);
                        else form.setValue("confirmPassword", e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center self-end gap-2 pr-3">
              <Button
                type="button"
                className="w-[100px] self-end text-sm font-extrabold text-white bg-gray-400 hover:bg-gray-300/80 disabled:bg-gray-300/60"
                onClick={() => {
                  if (thisUser) setInitialValues();
                  resetPasswordFields();
                }}
                // disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-[100px] text-sm font-extrabold text-white bg-primary hover:bg-primary/80"
                // iconAfter={isSaving ? <LoadingIcon /> : null}
                // disabled={isSaving}
                onClick={() => {
                  console.log(form.getValues());
                }}
              >
                {/* {isSaving ? "" : "Save"} */}
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
