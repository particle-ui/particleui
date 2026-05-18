"use client"

import * as React from "react"
import { useDropzone, type Accept, type FileRejection } from "react-dropzone"
import { cn } from "@/lib/utils"

export interface UploadedFile {
  file: File
  preview?: string
  progress?: number
  error?: string
}

interface FileUploaderProps {
  accept?: Record<string, string[]>
  maxSize?: number
  maxFiles?: number
  onUpload?: (files: File[]) => void | Promise<void>
  className?: string
  disabled?: boolean
}

interface FileListProps {
  files: UploadedFile[]
  onRemove: (index: number) => void
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatError(code: string, maxSize?: number): string {
  if (code === "file-too-large") return `File exceeds ${maxSize ? formatBytes(maxSize) : "size limit"}`
  if (code === "file-invalid-type") return "File type not accepted"
  if (code === "too-many-files") return "Too many files"
  return "Upload failed"
}

function UploadIcon() {
  return (
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)]">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 13V4M10 4L6.5 7.5M10 4L13.5 7.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--color-text-3)]"
        />
        <path
          d="M4 14.5C4 15.88 5.12 17 6.5 17H13.5C14.88 17 16 15.88 16 14.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-[var(--color-text-3)]"
        />
      </svg>
    </div>
  )
}

function FileIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-[var(--color-text-4)]"
    >
      <path
        d="M9 1H3.5A1.5 1.5 0 002 2.5v11A1.5 1.5 0 003.5 15h9A1.5 1.5 0 0014 13.5V6L9 1z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M9 1v5h5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function RemoveIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 3l8 8M11 3l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-3)]">
      <div
        className="h-full rounded-full transition-all duration-100"
        style={{
          width: `${value}%`,
          backgroundColor: "oklch(96% 0.01 80)",
        }}
      />
    </div>
  )
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null

  return (
    <ul className="mt-4 space-y-2">
      {files.map((uf, i) => (
        <li
          key={`${uf.file.name}-${i}`}
          className={cn(
            "flex items-center gap-3 rounded-lg border px-3 py-2.5",
            "bg-[var(--color-surface-1)] border-[var(--color-border)]",
            uf.error && "border-[oklch(65%_0.2_25)]"
          )}
        >
          {uf.preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={uf.preview}
              alt={uf.file.name}
              className="h-8 w-8 shrink-0 rounded object-cover"
            />
          ) : (
            <FileIcon />
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm text-[var(--color-text-1)]">
                {uf.file.name}
              </span>
              <span className="shrink-0 text-xs text-[var(--color-text-4)]">
                {formatBytes(uf.file.size)}
              </span>
            </div>

            {uf.error ? (
              <p className="mt-0.5 text-xs" style={{ color: "oklch(65% 0.2 25)" }}>
                {uf.error}
              </p>
            ) : uf.progress !== undefined && uf.progress < 100 ? (
              <ProgressBar value={uf.progress} />
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => onRemove(i)}
            aria-label={`Remove ${uf.file.name}`}
            className={cn(
              "shrink-0 rounded p-1 text-[var(--color-text-4)]",
              "hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)]",
              "transition-colors duration-150 focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            )}
          >
            <RemoveIcon />
          </button>
        </li>
      ))}
    </ul>
  )
}

export function FileUploader({
  accept,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 10,
  onUpload,
  className,
  disabled = false,
}: FileUploaderProps) {
  const [files, setFiles] = React.useState<UploadedFile[]>([])
  const [rejected, setRejected] = React.useState<{ name: string; error: string }[]>([])

  const animateProgress = React.useCallback((index: number) => {
    const start = performance.now()
    const duration = 1500

    function tick() {
      const elapsed = performance.now() - start
      const progress = Math.min((elapsed / duration) * 100, 100)

      setFiles((prev) =>
        prev.map((f, i) => (i === index ? { ...f, progress } : f))
      )

      if (progress < 100) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [])

  const onDrop = React.useCallback(
    (accepted: File[], rejectedFiles: FileRejection[]) => {
      const newRejected = rejectedFiles.map((r) => ({
        name: r.file.name,
        error: formatError(r.errors[0]?.code ?? "", maxSize),
      }))
      setRejected(newRejected)

      if (accepted.length === 0) return

      const startIndex = files.length
      const newUploaded: UploadedFile[] = accepted.map((file) => ({
        file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
        progress: 0,
      }))

      setFiles((prev) => [...prev, ...newUploaded])
      onUpload?.(accepted)

      newUploaded.forEach((_, i) => {
        setTimeout(() => animateProgress(startIndex + i), i * 100)
      })
    },
    [files.length, maxSize, onUpload, animateProgress]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: accept as Accept | undefined,
    maxSize,
    maxFiles,
    disabled,
  })

  const removeFile = React.useCallback((index: number) => {
    setFiles((prev) => {
      const next = [...prev]
      const removed = next.splice(index, 1)[0]
      if (removed?.preview) URL.revokeObjectURL(removed.preview)
      return next
    })
  }, [])

  React.useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview)
      })
    }
  }, [])

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center",
          "border-[var(--color-border)] bg-[var(--color-surface-1)]",
          "transition-colors duration-200",
          isDragActive && !isDragReject && [
            "border-[var(--color-accent)] bg-[oklch(96%_0.01_80_/_0.05)]",
            "animate-pulse",
          ],
          isDragReject && "border-[oklch(65%_0.2_25)] bg-[oklch(65%_0.2_25_/_0.05)]",
          disabled && "cursor-not-allowed opacity-50",
          !disabled && "hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)]"
        )}
      >
        <input {...getInputProps()} />

        <UploadIcon />

        <p className="text-sm font-medium text-[var(--color-text-1)]">
          {isDragActive && !isDragReject
            ? "Drop files here"
            : isDragReject
            ? "File type not accepted"
            : "Drop files here or click to browse"}
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-4)]">
          {accept
            ? `Accepted: ${Object.values(accept).flat().join(", ")} · `
            : ""}
          Max {formatBytes(maxSize)} · Up to {maxFiles} file{maxFiles !== 1 ? "s" : ""}
        </p>
      </div>

      {rejected.length > 0 && (
        <ul className="mt-3 space-y-1">
          {rejected.map((r, i) => (
            <li key={i} className="flex items-center gap-2 text-xs" style={{ color: "oklch(65% 0.2 25)" }}>
              <span className="font-medium truncate">{r.name}</span>
              <span>—</span>
              <span>{r.error}</span>
            </li>
          ))}
        </ul>
      )}

      <FileList files={files} onRemove={removeFile} />
    </div>
  )
}
