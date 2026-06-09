"use client";

import { useState } from "react";
import { Download, Eye, FileText, X } from "lucide-react";

import type { DepartmentDocument } from "@/lib/public-content";

export default function DocumentCard({
  document,
  contextLabel,
}: {
  document: DepartmentDocument;
  contextLabel?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasFile = Boolean(document.fileUrl);
  const label = contextLabel ? `${document.title} ${contextLabel}` : document.title;

  return (
    <>
      <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{document.type}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{document.category}</span>
              {document.level ? (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">{document.level}</span>
              ) : null}
            </div>
            <h3 className="mt-3 text-lg font-black leading-7 text-slate-950">{document.title}</h3>
            {document.description ? (
              <p className="mt-2 text-base leading-7 text-slate-700">{document.description}</p>
            ) : null}
            {document.updatedAt ? (
              <p className="mt-2 text-sm font-semibold text-slate-500">อัปเดต {document.updatedAt}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {hasFile ? (
            <>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
              aria-label={`ดูเอกสาร ${label}`}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-blue-800 px-4 text-sm font-bold text-white transition hover:bg-blue-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
              <Eye className="h-4 w-4" />
              ดูเอกสาร
              </button>
              <a
                href={document.fileUrl}
                download
                aria-label={`ดาวน์โหลด ${label}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 text-sm font-bold text-blue-800 transition hover:border-blue-300 hover:bg-blue-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                <Download className="h-4 w-4" />
                ดาวน์โหลด
              </a>
            </>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex min-h-10 items-center rounded-full bg-slate-100 px-4 text-sm font-bold text-slate-500"
            >
              ยังไม่มีไฟล์
            </button>
          )}
        </div>
      </article>

      {hasFile && isOpen ? (
        <div
          className="fixed inset-0 z-[80] bg-slate-950/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`document-modal-${document.id}`}
        >
          <div className="mx-auto flex h-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-950/30">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-4 sm:items-center">
              <div>
                <p className="text-sm font-bold text-blue-800">{document.category}</p>
                <h2 id={`document-modal-${document.id}`} className="text-xl font-black leading-7 text-slate-950">
                  {document.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="ปิดหน้าต่างเอกสาร"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 bg-slate-100">
              <iframe
                src={document.fileUrl}
                title={`ดูเอกสาร ${label}`}
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-600">หาก PDF ไม่แสดง สามารถดาวน์โหลดไฟล์ได้</p>
              <a
                href={document.fileUrl}
                download
                aria-label={`ดาวน์โหลด ${label}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-blue-800 px-4 text-sm font-bold text-white transition hover:bg-blue-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                <Download className="h-4 w-4" />
                ดาวน์โหลด
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
