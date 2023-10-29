import prisma from "@/app/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path, { join } from "path";
import { writeFile } from "fs/promises";
import { v4 } from "uuid";
import { promisify } from "util";

export async function POST(req: Request) {
  const body = await req.formData();
  const data: File | null = body.get("file") as unknown as File;
  const name = body.get("name") as string;
  const extension = body.get("extension") as string;
  console.log(name, extension, data);
  if (!data || !name || !extension)
    return NextResponse.json({ message: "Missing required value" });
  const bytes = await data.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const imageName = v4();
  const path = join(
    "/",
    "/Build/Nextjs/my-cloud/public/uploads",
    `${imageName}.${extension}`
  );
  await writeFile(path, buffer);
  console.log(`open ${path}`);
  return NextResponse.json(path);
}

async function generateUniqueFileName(
  directory: any,
  baseName: string,
  extension: string
) {
  let fileName = `${baseName}.${extension}`;
  let count = 1;

  while (true) {
    const filePath = join(directory, fileName);

    try {
      // Check if the file already exists
      await fs.promises.access(filePath);
      // If it exists, generate a new name with an incremented count
      fileName = `${baseName}_${count}.${extension}`;
      count++;
    } catch (error) {
      // The file does not exist, so we can use this name
      return fileName;
    }
  }
}
