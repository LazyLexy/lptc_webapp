"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Bold, Heading2, ImageIcon, Italic, LinkIcon, List, ListOrdered, Quote, Undo2 } from "lucide-react";

type RichTextEditorProps = {
  name: string;
  defaultValue?: string;
};

export default function RichTextEditor({ name, defaultValue = "" }: RichTextEditorProps) {
  const [html, setHtml] = useState(defaultValue);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: "rounded-2xl" } }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "font-bold text-blue-800 underline underline-offset-4" },
      }),
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class:
          "min-h-72 min-w-0 rounded-b-2xl border border-t-0 border-slate-200 bg-white px-4 py-4 text-sm leading-7 outline-none prose-headings:font-black",
      },
    },
    onUpdate({ editor: currentEditor }) {
      setHtml(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (defaultValue && current !== defaultValue) {
      editor.commands.setContent(defaultValue, { emitUpdate: false });
    }
  }, [defaultValue, editor]);

  function setLink() {
    const previousUrl = editor?.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", previousUrl ?? "");
    if (!editor || url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function addImage() {
    const url = window.prompt("URL รูปภาพ");
    if (editor && url) editor.chain().focus().setImage({ src: url }).run();
  }

  const toolbar = [
    { label: "ตัวหนา", icon: Bold, action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive("bold") },
    { label: "ตัวเอียง", icon: Italic, action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive("italic") },
    { label: "หัวข้อ", icon: Heading2, action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive("heading", { level: 2 }) },
    { label: "รายการ", icon: List, action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive("bulletList") },
    { label: "ลำดับเลข", icon: ListOrdered, action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive("orderedList") },
    { label: "อ้างอิง", icon: Quote, action: () => editor?.chain().focus().toggleBlockquote().run(), active: editor?.isActive("blockquote") },
    { label: "ลิงก์", icon: LinkIcon, action: setLink, active: editor?.isActive("link") },
    { label: "รูป", icon: ImageIcon, action: addImage, active: false },
    { label: "ย้อนกลับ", icon: Undo2, action: () => editor?.chain().focus().undo().run(), active: false },
  ];

  return (
    <div className="grid min-w-0 gap-2">
      <input type="hidden" name={name} value={html} />
      <div className="flex min-w-0 flex-wrap gap-2 rounded-t-2xl border border-slate-200 bg-slate-50 p-2">
        {toolbar.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              title={item.label}
              aria-label={item.label}
              className={`inline-flex h-9 cursor-pointer items-center justify-center rounded-xl px-3 text-xs font-black transition ${
                item.active ? "bg-blue-800 text-white" : "bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-800"
              }`}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
