import React, { useState, useRef, useCallback } from 'react'
import { LargeDropAudioIcon, MusicIcon, RefreshIcon, XIcon } from './Icons'

interface AudioUploaderProps {
  onAudioSelected: (file: File) => void
  audioFile: File | null
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const audio = new Audio()
    const url = URL.createObjectURL(file)
    audio.addEventListener('loadedmetadata', () => {
      URL.revokeObjectURL(url)
      resolve(audio.duration)
    })
    audio.addEventListener('error', () => { URL.revokeObjectURL(url); resolve(0) })
    audio.src = url
  })
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onAudioSelected, audioFile }) => {
  const [dragOver, setDragOver] = useState(false)
  const [duration, setDuration] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.includes('audio') && !file.name.endsWith('.mp3')) {
      setError('Please upload an audio file (MP3).')
      return
    }
    setError(null)
    const dur = await getAudioDuration(file)
    setDuration(dur)
    onAudioSelected(file)
  }, [onAudioSelected])

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
      {!audioFile ? (
        <div
          className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="audio/mp3,audio/mpeg,audio/*"
            onChange={onInputChange}
            style={{ display: 'none' }}
          />
          <LargeDropAudioIcon className="drop-icon" />
          <p className="drop-label">Drop your MP3 here</p>
          <p className="drop-hint">or click to browse — MP3 recommended</p>
        </div>
      ) : (
        <div className="audio-file-display">
          <div className="audio-icon-wrap"><MusicIcon /></div>
          <div className="audio-meta">
            <p className="audio-name">{audioFile.name}</p>
            <p className="audio-duration">
              {duration != null ? `Duration: ${formatDuration(duration)}` : 'Loading…'}
            </p>
          </div>
          <div className="waveform">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="wave-bar" />
            ))}
          </div>
        </div>
      )}

      {audioFile && (
        <p
          className="change-hint"
          style={{ cursor: 'pointer', marginTop: '0.6rem' }}
          onClick={() => inputRef.current?.click()}
        >
          <RefreshIcon /> Click to change audio
          <input
            ref={inputRef}
            type="file"
            accept="audio/mp3,audio/mpeg,audio/*"
            onChange={onInputChange}
            style={{ display: 'none' }}
          />
        </p>
      )}

      {error && (
        <div className="validation-msg err" style={{ marginTop: '0.9rem' }}>
          <XIcon /> {error}
        </div>
      )}
    </div>
  )
}

export default AudioUploader
