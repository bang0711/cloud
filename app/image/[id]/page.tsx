import React from "react";

type Props = {
  params: {
    id: string;
  };
};
async function getImages() {
  const res = await fetch("http://localhost:3000/api/getImages");
  return res.json();
}
async function ImagePage({ params: { id } }: Props) {
  return <div>ImagePage</div>;
}

export default ImagePage;
