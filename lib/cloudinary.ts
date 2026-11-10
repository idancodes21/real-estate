
import "server-only";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadAgentAvatar(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<{
    url: string;
    publicId: string;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "yariga/agents",
        resource_type: "image",
        transformation: [
          { width: 500, height: 500, crop: "fill", gravity: "face" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    stream.end(buffer);
  });
}

export async function deleteAgentAvatar(publicId: string) {
  await cloudinary.uploader.destroy(publicId);
}
