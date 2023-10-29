import prisma from "@/app/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path, { join } from "path";
import { writeFile } from "fs/promises";
import { v4 } from "uuid";
const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}
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
  const path = join("/", "/uploads", `${imageName}.${extension}`);
  await writeFile(path, buffer);
  console.log(`open ${path}`);
  return NextResponse.json(path);
}
