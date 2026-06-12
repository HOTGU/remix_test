import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const returnCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${year}년${month}월${day}일${hour}시${minutes}분`;
};

const resize = async ({
  buffer,
  width,
}: {
  buffer: Buffer;
  width?: number;
}) => {
  const sharpImage = await sharp(buffer)
    .resize({ width })
    .webp({ quality: 85 })
    .toBuffer();
  return Buffer.from(sharpImage);
};

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS!,
    secretAccessKey: process.env.AWS_S3_SECRET!,
  },
});

export async function uploadFileToS3({
  folderName,
  file,
  resizeWidth,
}: {
  folderName: string;
  file: File;
  resizeWidth?: number;
}) {
  const bytes = await file.arrayBuffer();

  let buffer = Buffer.from(bytes);

  const fileName = `CONTACT/${
    process.env.NODE_ENV
  }/${folderName}/${returnCurrentDate()}__${file.name}`;

  if (resizeWidth) {
    buffer = await resize({ buffer, width: resizeWidth });
  }

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
}
