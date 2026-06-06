"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import * as faceapi from "face-api.js";
import { Camera, ShieldCheck } from "lucide-react";

export default function FaceRegistration() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState("ยังไม่ได้เปิดกล้อง");
  const [isReady, setIsReady] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function setup() {
      try {
        setStatus("กำลังโหลดโมเดลใบหน้า");
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        ]);
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsReady(true);
        setStatus("พร้อมลงทะเบียนใบหน้า");
      } catch {
        setStatus("ไม่สามารถเปิดกล้องหรือโหลดโมเดลใบหน้าได้");
      }
    }

    setup();
    return () => stream?.getTracks().forEach((track) => track.stop());
  }, []);

  function registerFace() {
    startTransition(async () => {
      if (!videoRef.current) return;
      setStatus("กำลังตรวจจับใบหน้า");
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        setStatus("ไม่พบใบหน้า กรุณาหันหน้าเข้ากล้องและลองใหม่");
        return;
      }

      const response = await fetch("/api/students/face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descriptor: Array.from(detection.descriptor) }),
      });

      setStatus(response.ok ? "บันทึกข้อมูลใบหน้าเรียบร้อยแล้ว" : "บันทึกข้อมูลใบหน้าไม่สำเร็จ");
    });
  }

  return (
    <div className="soft-panel p-5">
      <div className="flex items-center gap-3">
        <Camera className="h-6 w-6 text-blue-800" />
        <h2 className="text-xl font-black">ลงทะเบียนใบหน้าเริ่มต้น</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        ระบบจะบันทึก face descriptor ในฐานข้อมูลสำหรับนักศึกษาที่เข้าสู่ระบบอยู่เท่านั้น
      </p>
      <div className="mt-5 overflow-hidden rounded-3xl bg-slate-950">
        <video ref={videoRef} autoPlay muted playsInline className="aspect-video w-full object-cover" />
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold text-slate-600">{status}</p>
        <button
          type="button"
          onClick={registerFace}
          disabled={!isReady || isPending}
          className="soft-button inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-800 px-5 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ShieldCheck className="h-4 w-4" />
          {isPending ? "กำลังบันทึก" : "บันทึกใบหน้า"}
        </button>
      </div>
    </div>
  );
}
