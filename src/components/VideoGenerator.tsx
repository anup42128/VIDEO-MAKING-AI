import React from 'react'
import type { FFmpegStatus } from '../hooks/useFFmpeg'
import { ImageIcon, MusicIcon, SparklesIcon, DownloadIcon, RefreshIcon, AlertIcon } from './Icons'

interface VideoGeneratorProps {
  status: FFmpegStatus
  progress: number
  error: string | null
  imageFile: File | null
  imagePreviewUrl: string | null
  audioFile: File | null
  videoUrl: string | null
  onGenerate: () => void
  onReset: () => void
}

const VideoGenerator: React.FC<VideoGeneratorProps> = ({
  status,
  progress,
  error,
  imageFile,
  imagePreviewUrl,
  audioFile,
  videoUrl,
  onGenerate,
  onReset,
}) => {
  const isProcessing = status === 'loading' || status === 'processing'
  const isDone = status === 'done'

  const statusLabel =
    status === 'loading' ? 'Loading FFmpeg engine…' :
    status === 'processing' ? 'Rendering your video…' :
    status === 'done' ? 'Video ready!' : ''

  return (
    <div>
      {/* Summary of uploads */}
      {imagePreviewUrl && audioFile && !isDone && (
        <div className="summary-row">
          <img className="summary-thumb" src={imagePreviewUrl} alt="Selected" />
          <div className="summary-info">
            <div className="summary-item">
              <span><ImageIcon /></span>
              <span><strong>{imageFile?.name}</strong></span>
            </div>
            <div className="summary-item">
              <span><MusicIcon /></span>
              <span><strong>{audioFile.name}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Generate button */}
      {!isProcessing && !isDone && (
        <button
          className="btn btn-primary"
          style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}
          onClick={onGenerate}
          disabled={!imageFile || !audioFile}
        >
          <SparklesIcon /> Generate Video
        </button>
      )}

      {/* Processing UI */}
      {isProcessing && (
        <div className="progress-section">
          <div className="progress-label">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="status-row">
            <div className="spinner" />
            <span>{statusLabel}</span>
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-faint)', lineHeight: 1.5 }}>
            This may take 20–90 seconds depending on your audio length and device speed. Stay on this tab.
          </p>
        </div>
      )}

      {/* Video result */}
      {isDone && videoUrl && (
        <>
          <div className="success-banner">
            <SparklesIcon /> Your lofi video is ready!
          </div>
          <div className="video-preview-wrap">
            <video controls src={videoUrl} />
          </div>
          <div className="btn-row btn-row-between" style={{ marginTop: '1.25rem' }}>
            <a
              className="btn btn-download"
              href={videoUrl}
              download="lofi-video.mp4"
            >
              <DownloadIcon /> Download MP4
            </a>
            <button className="btn btn-ghost" onClick={onReset}>
              <RefreshIcon /> Start Over
            </button>
          </div>
        </>
      )}

      {/* Error */}
      {error && (
        <div className="error-banner">
          <AlertIcon /> {error}
          <div style={{ marginTop: '0.75rem' }}>
            <button className="btn btn-ghost" onClick={onReset} style={{ fontSize: '0.82rem', padding: '0.4rem 0.9rem' }}>
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoGenerator
