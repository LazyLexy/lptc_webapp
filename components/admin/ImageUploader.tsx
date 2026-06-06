"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

type ImageUploaderProps = {
  name: string;
  label: string;
  defaultValue?: string | null;
  folder?: string;
};

export default function ImageUploader({
  name,
  label,
  defaultValue,
  folder = "admin",
}: ImageUploaderProps) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setIsUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.set("file", file);
    formData.set("folder", folder);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { url?: string; message?: string };

      if (!response.ok || !data.url) {
        setMessage(data.message ?? "อัปโหลดรูปไม่สำเร็จ");
        return;
      }

      setUrl(data.url);
      setMessage("อัปโหลดรูปเรียบร้อยแล้ว");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="grid min-w-0 gap-3">
      <input type="hidden" name={name} value={url} />
      <label className="text-sm font-bold text-slate-700">{label}</label>
      <div className="grid min-w-0 gap-3 sm:grid-cols-[128px_minmax(0,1fr)]">
        <div className="relative aspect-[4/3] w-full max-w-40 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          {url ? (
            <Image src={url} alt={label} fill unoptimized sizes="160px" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              <ImagePlus className="h-8 w-8" />
            </div>
          )}
        </div>
        <div className="grid min-w-0 content-start gap-3">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
            }}
            className="min-h-11 min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
          />
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="min-h-11 min-w-0 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
            placeholder="หรือวาง URL รูปภาพ"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={isUploading}
              className="soft-button inline-flex h-10 max-w-max shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-blue-800 px-4 text-xs font-black text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 disabled:opacity-60"
            >
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
              {isUploading ? "กำลังอัปโหลด" : "เลือกรูป"}
            </button>
            {url ? (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="soft-button inline-flex h-10 max-w-max shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 px-4 text-xs font-black text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
              >
                <X className="h-4 w-4" />
                ล้างรูป
              </button>
            ) : null}
          </div>
          {message ? <p className="text-xs font-bold text-blue-800">{message}</p> : null}
        </div>
      </div>
    </div>
  );
}
