import { useState } from 'react'
import './index.css'
import { useFFmpeg } from './hooks/useFFmpeg'
import ImageUploader from './components/ImageUploader'
import AudioUploader from './components/AudioUploader'
import VideoGenerator from './components/VideoGenerator'
import { CoffeeIcon, ImageIcon, MusicIcon, ClapperboardIcon, ArrowRightIcon, ArrowLeftIcon, CheckIcon } from './components/Icons'

type Step = 0 | 1 | 2

const STEPS = [
  { label: 'Image', icon: <ImageIcon /> },
  { label: 'Audio', icon: <MusicIcon /> },
  { label: 'Create', icon: <ClapperboardIcon /> },
]

function App() {
  const [step, setStep] = useState<Step>(0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)

  const { status, progress, videoUrl, error, generateVideo, reset } = useFFmpeg()

  const handleImageSelected = (file: File, previewUrl: string) => {
    setImageFile(file)
    setImagePreviewUrl(previewUrl)
  }

  const handleAudioSelected = (file: File) => {
    setAudioFile(file)
  }

  const handleGenerate = async () => {
    if (!imageFile || !audioFile) return
    await generateVideo(imageFile, audioFile)
  }

  const handleReset = () => {
    reset()
    setImageFile(null)
    setImagePreviewUrl(null)
    setAudioFile(null)
    setStep(0)
  }

  const goToStep = (s: Step) => {
    // Only allow going to steps that are unlocked
    if (s === 0) setStep(0)
    if (s === 1 && imageFile) setStep(1)
    if (s === 2 && imageFile && audioFile) setStep(2)
  }

  const canProceedStep0 = !!imageFile
  const canProceedStep1 = !!audioFile

  return (
    <>
      {/* Animated background */}
      <div className="bg-canvas">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      <div className="app-wrapper">
        {/* Header */}
        <header className="site-header">
          <div className="logo-row">
            <span className="logo-icon"><CoffeeIcon /></span>
            <h1 className="logo-text">LoFi Studio</h1>
          </div>
          <p className="site-tagline">Turn any image + music into a lofi-style video — no editing skills needed.</p>
        </header>

        {/* Step Indicator */}
        <nav className="step-indicator" aria-label="Progress">
          {STEPS.map((s, i) => {
            const state = step === i ? 'active' : step > i ? 'completed' : ''
            return (
              <div key={i} style={{ display: 'contents' }}>
                <div
                  className={`step-dot-group ${state}`}
                  onClick={() => goToStep(i as Step)}
                  title={s.label}
                >
                  <div className="step-dot">
                    {step > i ? <CheckIcon /> : s.icon}
                  </div>
                  <span className="step-label">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`step-connector ${step > i ? 'filled' : ''}`} />
                )}
              </div>
            )
          })}
        </nav>

        {/* ——————————————————————————————————
            Step 0: Upload Image
        —————————————————————————————————— */}
        {step === 0 && (
          <div className="glass-card">
            <h2 className="card-title">Upload your image</h2>
            <p className="card-subtitle">
              Choose a 16:9 image (1280×720, 1920×1080, etc.) that will be the background of your video.
            </p>
            <ImageUploader
              onImageSelected={handleImageSelected}
              previewUrl={imagePreviewUrl}
            />
            <div className="btn-row btn-row-right">
              <button
                className="btn btn-primary"
                disabled={!canProceedStep0}
                onClick={() => setStep(1)}
              >
                Next: Add Audio <ArrowRightIcon />
              </button>
            </div>
          </div>
        )}

        {/* ——————————————————————————————————
            Step 1: Upload Audio
        —————————————————————————————————— */}
        {step === 1 && (
          <div className="glass-card">
            <h2 className="card-title">Add your music</h2>
            <p className="card-subtitle">
              Upload an MP3 file. The duration of the audio will set the length of your video.
            </p>
            <AudioUploader
              onAudioSelected={handleAudioSelected}
              audioFile={audioFile}
            />
            <div className="btn-row btn-row-between">
              <button className="btn btn-ghost" onClick={() => setStep(0)}>
                <ArrowLeftIcon /> Back
              </button>
              <button
                className="btn btn-primary"
                disabled={!canProceedStep1}
                onClick={() => setStep(2)}
              >
                Next: Generate <ArrowRightIcon />
              </button>
            </div>
          </div>
        )}

        {/* ——————————————————————————————————
            Step 2: Generate & Download
        —————————————————————————————————— */}
        {step === 2 && (
          <div className="glass-card">
            <h2 className="card-title">Generate your video</h2>
            <p className="card-subtitle">
              Everything is processed right here in your browser — completely private, no uploads to any server.
            </p>
            <VideoGenerator
              status={status}
              progress={progress}
              error={error}
              imageFile={imageFile}
              imagePreviewUrl={imagePreviewUrl}
              audioFile={audioFile}
              videoUrl={videoUrl}
              onGenerate={handleGenerate}
              onReset={handleReset}
            />
            {status === 'idle' && (
              <div className="btn-row" style={{ marginTop: '1rem' }}>
                <button className="btn btn-ghost" onClick={() => setStep(1)}>
                  <ArrowLeftIcon /> Back
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="site-footer">
          Built with 🧡&nbsp;&nbsp;•&nbsp;&nbsp;Powered by FFmpeg.wasm&nbsp;&nbsp;•&nbsp;&nbsp;100% client-side
        </footer>
      </div>
    </>
  )
}

export default App
