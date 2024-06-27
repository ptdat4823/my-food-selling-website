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
  onProvinceChange?: (province: string) => void;
}
const ProvinceInput = ({
  errorMessage = "",
  value = "",
  onProvinceChange,
}: Props) => {
  const [provinceNames, setProvinceNames] = useState<string[]>([]);
  const { register } = useFormContext();
  useEffect(() => {
    const fetchData = async () => {
      const provinceNames = await AddressService.getAllProvinces().then((res) =>
        res.map((province) => province.name)
      );
      setProvinceNames(provinceNames);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Input className="hidden" value={value} {...register("province")} />
      <Dropdown placement="bottom-start" className="font-sans">
        <DropdownTrigger>
          <Input
            id="province"
            label="Province/City"
            labelColor="text-secondary-word"
            className="text-secondary-word text-left cursor-pointer"
            errorMessages={errorMessage}
            value={value}
          />
        </DropdownTrigger>
        <DropdownMenu className="max-h-[300px] !rounded-sm overflow-y-scroll scrollbar-hide">
          {provinceNames.map((provinceName) => (
            <DropdownItem
              key={provinceName}
              onClick={() => {
                if (onProvinceChange) onProvinceChange(provinceName);
              }}
            >
              <div className="text-primary-word bg-transparent">
                {provinceName}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProvinceInput;
