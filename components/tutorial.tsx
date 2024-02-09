"use client";

import { CheckIfHittingEndPoint } from "@/actions/fileUpload";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const Tutorial = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  // console.log(preview);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (typeof acceptedFiles[0] === "undefined") return;

    const formData = new FormData();

    formData.append("file", acceptedFiles[0]);

    CheckIfHittingEndPoint(formData).then((res) => {
      console.log(res);
    });

    // console.log(formData);
  }

  return (
    <form>
      <div
        {...getRootProps()}
        className="border-2 border-dashed aspect-video"
        style={{
          backgroundImage: `url(${preview})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default Tutorial;
