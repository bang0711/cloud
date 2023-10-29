/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

type Props = {};
// async function getImages() {
//   const res = await fetch("http://localhost:3000/api/getImages");
//   return res.json();
// }
async function HomePage({}: Props) {
  // const images = await getImages();
  return (
    <div>
      <h1>Images</h1>{" "}
      {/* {images.map((image: string) => (
        <Link href={image} key={image}>
          <img src={image} alt="" />
        </Link>
      ))} */}
    </div>
  );
}

export default HomePage;
