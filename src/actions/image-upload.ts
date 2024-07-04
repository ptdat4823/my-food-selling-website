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
