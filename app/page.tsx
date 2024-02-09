import ImageUploader from "@/components/image-uploader";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4 gap-8">
      <h1 className="text-3xl font-bold">Image Uploader</h1>
      <ImageUploader />
    </main>
  );
}
