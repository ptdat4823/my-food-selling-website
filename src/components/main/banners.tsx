import React from "react";

const Banners = () => {
  return (
    <div className="grid grid-cols-6 lg:grid-rows-2 max-lg:grid-rows-3 mt-12 rounded-lg gap-1">
      <img
        src="https://cf.shopee.vn/file/vn-50009109-93074cd7272fcd06fc514ef80e8aa20f_xxhdpi"
        alt="banner 1"
        className="lg:col-span-4 max-lg:col-span-6 row-span-2 h-full object-cover rounded-md"
      />
      <img
        src="https://cf.shopee.vn/file/vn-50009109-ed6696a2bea64ffee99377b73c44d5e8_xhdpi"
        alt="banner 2"
        className="lg:col-span-2 max-lg:col-span-3 max-lg:row-span-1 max-lg:row-start-3 rounded-md"
      />
      <img
        src="https://cf.shopee.vn/file/vn-50009109-c5335039e1b1aab390cc29f3446908fc_xhdpi"
        alt="banner 2"
        className="lg:col-span-2 max-lg:col-span-3 max-lg:row-span-1 max-lg:row-start-3 rounded-md"
      />
    </div>
  );
};

export default Banners;
