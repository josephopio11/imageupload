"use server";

import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function uploadFile(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("upload") as unknown as File;

  if (!file) {
    return { error: "File not seen" };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const currentDate = new Date();
  const year = currentDate.getFullYear() - 25;
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const time = currentDate.getTime();
  const fileName = `${time}-${file.name}`;
  const ext = file.name.split(".").pop();
  const directory = join(
    process.cwd(),
    "public/postPhotos",
    year.toString(),
    month.toString(),
    day.toString()
  );
  try {
    await mkdir(directory, { recursive: true });
  } catch (error) {
    return { error: "Failed to create directories" };
  }
  const path = join(
    process.cwd(),
    "public/postPhotos",
    year.toString(),
    month.toString(),
    day.toString(),
    fileName
  );

  try {
    await writeFile(path, buffer);
    alert(`Open ${path} in your browser to see the photo.`);
    return {
      success: "File uploaded successfully",
      data: path,
    };
  } catch (error) {
    return { error: "Failed to upload file" };
  }
}

export async function CheckIfHittingEndPoint(file: any) {
  console.log("End point reached");
  console.log(file);
  return {
    success: "File uploaded successfully",
    // data: file,
  };
}
