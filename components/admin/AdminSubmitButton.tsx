"use client";

import { useFormStatus } from "react-dom";
import { ImagePlus, Plus, Save, Trash2, type LucideIcon } from "lucide-react";

const icons = {
  imagePlus: ImagePlus,
  plus: Plus,
  save: Save,
  trash: Trash2,
} satisfies Record<string, LucideIcon>;

type AdminSubmitButtonProps = {
  label: string;
  pendingLabel?: string;
  iconName?: keyof typeof icons;
  variant?: "primary" | "danger" | "secondary";
  className?: string;
};

export default function AdminSubmitButton({
  label,
  pendingLabel = "กำลังบันทึก",
  iconName,
  variant = "primary",
  className = "",
}: AdminSubmitButtonProps) {
  const { pending } = useFormStatus();
  const Icon = iconName ? icons[iconName] : null;
  const colors = {
    primary: "bg-blue-800 text-white hover:bg-blue-900",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-800",
  };

  return (
    <button
      type="submit"
      disabled={pending}
      className={`soft-button inline-flex h-11 max-w-max shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-black leading-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 ${colors[variant]} ${className}`}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {pending ? pendingLabel : label}
    </button>
  );
}
