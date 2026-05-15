import React, { useEffect, useRef, useState } from "react";
import { Copy, FolderOpen, Info, X } from "lucide-react";
import { compressImage, getTotalFileSize } from "~/utils";

interface FileInputProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  buttonClassName?: string;
  maxFiles?: number;
}

const FileInput: React.FC<FileInputProps> = ({
  name,
  label,
  required,
  className = "",
  buttonClassName = "",
  maxFiles = 5,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [copied, setCopied] = useState(false);
  const maxTotalSizeMB = 4;
  const totalSize = getTotalFileSize(files);
  const isOverLimit = totalSize > maxTotalSizeMB;

  const text = "contact@weavement.co.kr";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  useEffect(() => {
    if (!inputRef.current) return;

    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    inputRef.current.files = dataTransfer.files;
  }, [files]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + files.length > maxFiles) {
      alert(`최대 ${maxFiles}개 파일까지 업로드 가능합니다.`);
      return;
    }

    const compressed = await Promise.all(
      selectedFiles.map((file) => compressImage(file)),
    );

    setFiles((prev) => [...prev, ...compressed]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`flex flex-col gap-2 pt-10 relative ${className}`}>
      {label && (
        <div className="text-stone-400 flex flex-col">
          <span className="text-lg">{label}</span>
          <div className="flex gap-1 items-center text-sm font-light">
            <Info size={15} />
            <span>이미지확장자 (jpg, png, webp 등)만 가능합니다</span>
          </div>
          <div className="flex gap-1 items-center text-sm font-light">
            <Info size={15} />
            <span>3D, 일러스트 등은</span>
            <div
              onClick={handleCopy}
              className="group relative inline-flex items-center gap-1 underline cursor-pointer"
            >
              <span>{text}</span>
              <Copy size={12} />
              <span
                className="
        absolute top-5 left-1/2 -translate-x-1/2
        whitespace-nowrap rounded bg-white px-2 py-1
        text-xs text-black
        opacity-0 transition-opacity
        group-hover:opacity-100
      "
              >
                {copied ? "복사됨!" : "복사"}
              </span>
            </div>
            <span>로 수신바랍니다</span>
          </div>
        </div>
      )}

      {/* 숨겨진 파일 input */}
      <input
        type="file"
        ref={inputRef}
        name={name}
        id={name}
        className="hidden"
        multiple
        onChange={handleChange}
        required={required && files.length === 0}
        accept="image/*"
      />

      {/* 파일 선택 버튼 */}
      <label
        htmlFor={name}
        className={`self-start flex gap-2 items-center w-auto px-4 py-2 font-medium transition cursor-pointer 
    border border-stone-600 bg-black text-stone-400 hover:bg-stone-800 
    ${buttonClassName}`}
      >
        <span>파일선택</span>
        <FolderOpen size={20} />
      </label>

      {/* 선택된 파일 리스트 */}
      <div className="flex flex-wrap gap-1 mt-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-2 justify-between px-4 py-2 rounded-full border border-stone-600 bg-black text-stone-400"
          >
            <span className="truncate max-w-50">{file.name}</span>
            <span className="text-stone-600 text-sm">
              ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </span>
            <X
              size={20}
              onClick={() => removeFile(index)}
              className="text-red-400 cursor-pointer"
            />
          </div>
        ))}
      </div>
      {/* 총 파일 크기 표시 + 경고 UI */}
      {files.length > 0 && (
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`font-medium ${
              isOverLimit ? "text-red-500" : "text-stone-600"
            }`}
          >
            총 용량: {totalSize} MB / {maxTotalSizeMB} MB
          </span>
          {isOverLimit && (
            <span className="text-red-500 text-sm font-normal">
              ⚠ 총 용량 초과! 일부 파일을 제거해주세요.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FileInput;
