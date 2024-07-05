import crypto from "crypto";

export async function UploadImage(formData: FormData) {
  const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  formData.append(
    "upload_preset",
    `${process.env.NEXT_PUBLIC_UPLOAD_PRESET_NAME}`
  );
  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    return {
      error: res.statusText,
    };
  }

  return {
    message: res.statusText,
    data: await res.json(),
  };
}

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export async function DeleteImage(publicId: string) {
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
  if (!apiKey || !apiSecret) {
    return {
      error: "API key or API secret is not found",
    };
  }
  const timestamp = new Date().getTime().toString();
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`;

  const formData = new FormData();
  formData.append("api_key", apiKey);
  formData.append("public_id", publicId);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    return {
      error: res.statusText,
    };
  }

  return {
    message: res.statusText,
  };
}

export async function DeleteImages(listPublicId: string[]) {
  const res = listPublicId.map(async (publicId) => await DeleteImage(publicId));

  const failed = res.filter(async (result) => (await result).error);

  if (failed.length > 0) {
    return {
      errors: failed.map((result) => (result as any).error),
    };
  }

  return {
    message: "Deleted successfully!",
  };
}
