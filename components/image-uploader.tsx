"use client";

import { uploadFile } from "@/actions/fileUpload";
import { PlusCircleIcon, Trash } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = () => {
  const [state, setState] = useState("ready");
  const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onDrop = useCallback((acceptedFiles: FileList) => {
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (typeof file === "undefined") return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "image_upload");
    formData.append("folder", "image_upload");

    const results = uploadFile(formData).then((res) => res);

    console.log(results);

    alert("uploading");
  }

  return (
    <div
      {...getRootProps()}
      className="border aspect-video flex cursor-pointer items-center justify-center p-2 rounded-lg bg-slate-300 h-52 relative transition-all duration-300"
      style={{
        backgroundImage: `url(${preview})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <input {...getInputProps()} className="" />
      {preview ? (
        <div
          className="absolute top-1 right-1 text-red-600 bg-white/70 rounded-full p-1"
          onClick={() => setPreview(null)}
        >
          <Trash />
        </div>
      ) : (
        <></>
      )}
      {preview ? <></> : <PlusCircleIcon className="h-16 w-16 text-gray-600" />}
      <div className="absolute px-5 py-3 bottom-0 w-full bg-gradient-to-t from-black to-black/10 rounded-b-md h-1/3">
        {isDragActive ? (
          <p className="  text-gray-100 text-center">Drop the files here ...</p>
        ) : (
          <>
            <p className=" text-gray-100 text-center text-sm">
              Drag 'n' your photo here,
              <br /> or click to select files
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
