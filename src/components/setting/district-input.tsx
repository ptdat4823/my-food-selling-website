"use client";
import AddressService from "@/src/services/addressService";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

interface Props {
  errorMessage?: string;
  value?: string;
  onDistrictChange?: (province: string) => void;
  province?: string;
}
const DistrictInput = ({
  errorMessage = "",
  value = "",
  province = "",
  onDistrictChange,
}: Props) => {
  const [districtNames, setDistrictNames] = useState<string[]>([]);
  const { register } = useFormContext();
  useEffect(() => {
    const fetchData = async () => {
      const districts = await AddressService.getDistrictsByProvinceName(
        province
      );
      if (districts)
        setDistrictNames(districts.map((district) => district.name));
    };
    if (province === "") return;
    fetchData();
  }, [province]);
  return (
    <div>
      {/* This input is a trick to active the register action */}
      <Input className="hidden" value={value} {...register("district")} />
      <Dropdown placement="bottom-start" className="font-sans">
        <DropdownTrigger>
          {/* This input inside the dropdown trigger can not active register action */}
          <Input
            id="district"
            label="District"
            className="text-secondary-word text-left cursor-pointer"
            errorMessages={errorMessage}
            value={value}
          />
        </DropdownTrigger>
        <DropdownMenu className="max-h-[300px] !rounded-sm overflow-y-scroll scrollbar-hide dark:bg-dark-secondary-bg">
          {districtNames.map((districtName) => (
            <DropdownItem
              key={districtName}
              onClick={() => {
                if (onDistrictChange) onDistrictChange(districtName);
              }}
            >
              <div className="text-primary-word dark:text-dark-primary-word bg-transparent">
                {districtName}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DistrictInput;
