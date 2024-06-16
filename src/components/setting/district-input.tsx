"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Input } from "../ui/input";
import AddressService from "@/src/services/addressService";

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
    <Dropdown placement="bottom-start" className="font-sans">
      <DropdownTrigger>
        <Input
          id="district"
          label="District"
          labelColor="text-secondary-word"
          className="text-secondary-word text-left cursor-pointer"
          errorMessages={errorMessage}
          value={value}
        />
      </DropdownTrigger>
      <DropdownMenu className="max-h-[300px] !rounded-sm overflow-y-scroll scrollbar-hide">
        {districtNames.map((districtName) => (
          <DropdownItem
            key={districtName}
            onClick={() => {
              if (onDistrictChange) onDistrictChange(districtName);
            }}
          >
            <div className="text-primaryWord bg-transparent">
              {districtName}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DistrictInput;
