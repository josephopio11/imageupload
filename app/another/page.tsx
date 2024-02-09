import ImageUploader from "@/components/image-uploader";
import Tutorial from "@/components/tutorial";
import { Uploader } from "uploader";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4 gap-8">
      <h1 className="text-3xl font-bold">Another Image Uploader</h1>
      {/* <ImageUploader /> */}
      {/* <form action=""></form> */}
      <Tutorial />
    </main>
  );
}
