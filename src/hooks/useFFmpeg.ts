import { useRef, useState, useCallback } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

export type FFmpegStatus = 'idle' | 'loading' | 'processing' | 'done' | 'error'

export interface UseFFmpegReturn {
  status: FFmpegStatus
  progress: number
  videoUrl: string | null
  error: string | null
  generateVideo: (imageFile: File, audioFile: File) => Promise<void>
  reset: () => void
}

export function useFFmpeg(): UseFFmpegReturn {
  const ffmpegRef = useRef<FFmpeg | null>(null)
  const [status, setStatus] = useState<FFmpegStatus>('idle')
  const [progress, setProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadFFmpeg = useCallback(async (): Promise<FFmpeg> => {
    if (ffmpegRef.current) return ffmpegRef.current

    const ffmpeg = new FFmpeg()
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'

    ffmpeg.on('progress', ({ progress: p }) => {
      setProgress(Math.round(p * 100))
    })

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    })

    ffmpegRef.current = ffmpeg
    return ffmpeg
  }, [])

  const generateVideo = useCallback(async (imageFile: File, audioFile: File) => {
    setError(null)
    setVideoUrl(null)
    setProgress(0)
    setStatus('loading')

    try {
      const ffmpeg = await loadFFmpeg()
      setStatus('processing')
      setProgress(0)

      // Derive extension from filename so FFmpeg can decode any image type
      const ext = imageFile.name.split('.').pop()?.toLowerCase() || 'png'
      const inputName = `image.${ext}`

      // Write input files to FFmpeg virtual FS
      await ffmpeg.writeFile(inputName, await fetchFile(imageFile))
      await ffmpeg.writeFile('audio.mp3', await fetchFile(audioFile))

      // Combine static image + audio into MP4
      await ffmpeg.exec([
        '-loop', '1',
        '-framerate', '2',
        '-i', inputName,
        '-i', 'audio.mp3',
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-tune', 'stillimage',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-pix_fmt', 'yuv420p',
        '-shortest',
        'output.mp4',
      ])

      // Read output and create blob URL
      const data = await ffmpeg.readFile('output.mp4')
      const blob = new Blob([data as Uint8Array<ArrayBuffer>], { type: 'video/mp4' })
      const url = URL.createObjectURL(blob)

      setVideoUrl(url)
      setStatus('done')
      setProgress(100)
    } catch (err) {
      console.error('FFmpeg error:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred during video generation.')
      setStatus('error')
    }
  }, [loadFFmpeg])

  const reset = useCallback(() => {
    setStatus('idle')
    setProgress(0)
    setError(null)
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
      setVideoUrl(null)
    }
  }, [videoUrl])

  return { status, progress, videoUrl, error, generateVideo, reset }
}
