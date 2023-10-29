import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
export async function GET() {
  const uploadsDir = path.join(process.cwd(), "/public/uploads"); // Adjust the path as needed
  const imageUrls = [];

  const files = fs.readdirSync(uploadsDir);

  for (const file of files) {
    if (fs.statSync(path.join(uploadsDir, file)).isFile()) {
      // Generate image URLs and push them to the array
      imageUrls.push(`/uploads/${file}`);
    }
  }

  return NextResponse.json(imageUrls);
}
