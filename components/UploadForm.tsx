"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
type Props = {};

function UploadForm({}: Props) {
  const [file, setFile] = useState<File | null>();
  const [imageBase64, setImageBase64] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [extension, setExtension] = useState("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setName(selectedFile.name);
      setExtension(selectedFile.name.split(".").pop() || ""); // Extract the file extension
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set("file", file);
      data.set("name", name);
      data.set("extension", extension);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("something went wrong");
    } catch (error) {
      console.log(error);
    }
    // if (file) {
    //   setIsLoading(true);
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     if (event.target && typeof event.target.result === "string") {
    //       setImageBase64(event.target.result);
    //     }
    //   };
    //   await fetch("/api/upload", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       data: imageBase64,
    //       name: name,
    //       extension: extension,
    //     }),
    //   });
    //   setIsLoading(false);
    //   reader.readAsDataURL(file);
    // }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 shadow-md rounded-lg w-[50%] mx-auto mt-52 flex flex-col gap-3"
    >
      <h1>Upload Image</h1>
      <input type="file" name="" id="" onChange={handleFileChange} />
      {file && (
        <Image
          alt="image"
          src={URL.createObjectURL(file)}
          width={100}
          height={100}
        />
      )}
      <p>{extension}</p>
      <button>{isLoading ? "Loading..." : "Upload"}</button>
    </form>
  );
}

export default UploadForm;
