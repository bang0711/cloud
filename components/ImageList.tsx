"use client";
import { Image as TImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useState } from "react";
type Props = {
  image: TImage;
};

function ImageList({ image }: Props) {
  const [dataURL, setDataURL] = useState<any>(null);
  useEffect(() => {
    // Convert binary image data to a data URL
    const arrayBuffer = image.data.buffer;
    const blob = new Blob([arrayBuffer], { type: "image/png" }); // Replace "image/jpeg" with the appropriate MIME type
    const url = URL.createObjectURL(blob);
    setDataURL(url);

    // Clean up the URL when the component is unmounted
    return () => URL.revokeObjectURL(url);
  }, [image.data.buffer]);

  return (
    <Link key={image.id} href={`/image/${image.id}`}>
      {" "}
      <Image alt="Image" src={dataURL} width={100} height={100} />
    </Link>
  );
}

export default ImageList;
