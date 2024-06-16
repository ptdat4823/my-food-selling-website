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
  onProvinceChange?: (province: string) => void;
}
const ProvinceInput = async ({
  errorMessage = "",
  value = "",
  onProvinceChange,
}: Props) => {
  const provinceNames = await AddressService.getAllProvinces().then((res) =>
    res.map((province) => province.name)
  );
  return (
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
            <div className="text-primaryWord bg-transparent">
              {provinceName}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProvinceInput;
