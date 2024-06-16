import axios from "axios";
import data from "@/public/province/db.json";

const getAllProvinces = () => {
  return Promise.all(data.province);
};

const findProvinceById = (provinceId: string) => {
  return getAllProvinces().then((res) =>
    res.find((p) => p.idProvince === provinceId)
  );
};

const findProvinceByName = async (provinceName: string) => {
  const res = await getAllProvinces().then((res) =>
    res.find((p) => p.name === provinceName)
  );
  if (res) return res;
  return null;
};

const getDistrictsByProvinceId = (provinceId: string) => {
  return Promise.all(data.district.filter((d) => d.idProvince === provinceId));
};

const getDistrictsByProvinceName = async (provinceName: string) => {
  const province = await findProvinceByName(provinceName);
  if (!province) return;
  return getDistrictsByProvinceId(province.idProvince);
};

const AddressService = {
  getAllProvinces,
  getDistrictsByProvinceId,
  findProvinceById,
  findProvinceByName,
  getDistrictsByProvinceName,
};

export default AddressService;
