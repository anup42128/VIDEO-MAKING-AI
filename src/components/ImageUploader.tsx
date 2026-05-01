import React, { useState, useRef, useCallback } from 'react'
import { LargeDropImageIcon, RefreshIcon, CheckIcon, XIcon } from './Icons'

interface ImageUploaderProps {
  onImageSelected: (file: File, previewUrl: string) => void
  previewUrl: string | null
}

function getImageDimensions(file: File): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => { URL.revokeObjectURL(url); resolve(`${img.width}×${img.height}`) }
    img.onerror = () => { URL.revokeObjectURL(url); resolve('') }
    img.src = url
  })
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, previewUrl }) => {
  const [dragOver, setDragOver] = useState(false)
  const [validation, setValidation] = useState<{ ok: boolean; msg: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setValidation({ ok: false, msg: 'Please upload an image file (PNG, JPG, WebP, etc.).' })
      return
    }
    const dims = await getImageDimensions(file)
    setValidation({ ok: true, msg: `Image ready${dims ? ` — ${dims}` : ''}.` })
    const url = URL.createObjectURL(file)
    onImageSelected(file, url)
  }, [onImageSelected])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      <div
        className={`drop-zone ${dragOver ? 'drag-over' : ''} ${previewUrl ? 'has-file' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !previewUrl && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={onInputChange}
          style={{ display: 'none' }}
        />
        {!previewUrl ? (
          <>
            <LargeDropImageIcon className="drop-icon" />
            <p className="drop-label">Drop your image here</p>
            <p className="drop-hint">or click to browse — PNG, JPG, WebP</p>
          </>
        ) : (
          <div className="image-preview-container" style={{ margin: 0 }}>
            <img src={previewUrl} alt="Preview" />
          </div>
        )}
      </div>

      {previewUrl && (
        <p className="change-hint" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }} onClick={() => inputRef.current?.click()}>
          <RefreshIcon /> Click to change image
        </p>
      )}

      {validation && (
        <div className={`validation-msg ${validation.ok ? 'ok' : 'err'}`}>
          {validation.ok ? <CheckIcon /> : <XIcon />} {validation.msg}
        </div>
      )}
    </div>
  )
}

export default ImageUploader
