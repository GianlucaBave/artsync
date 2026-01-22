'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Artist } from '@/types'

interface CommissionWizardProps {
  artist: Artist
  onClose: () => void
}

type Step = 1 | 2 | 3

export default function CommissionWizard({ artist, onClose }: CommissionWizardProps) {
  const [step, setStep] = useState<number>(1)
  const [description, setDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [conceptImage, setConceptImage] = useState<string | null>(null)
  const [imageMethod, setImageMethod] = useState<'generate' | 'upload' | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  // Canvas State
  const [canvasSize, setCanvasSize] = useState<string>('')
  const [canvasDepth, setCanvasDepth] = useState<'standard' | 'gallery'>('standard')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const SIZES = [
    { label: 'Small', options: ['8" x 10"', '12" x 12"'] },
    { label: 'Medium', options: ['16" x 20"', '18" x 24"'] },
    { label: 'Large', options: ['24" x 36"', '30" x 40"'] },
  ]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleGeneratePreview = async () => {
    setIsGenerating(true)
    setImageMethod('generate')
    // Simulate AI generation with 2 second delay
    setTimeout(() => {
      // Use a placeholder that simulates AI generation in artist's style
      const styleKeywords = artist.style.join('+').toLowerCase().replace(/\s+/g, '+')
      setConceptImage(`https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop&q=80`)
      setIsGenerating(false)
    }, 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
        setConceptImage(reader.result as string)
        setImageMethod('upload')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setConceptImage(null)
    setUploadedImage(null)
    setImageMethod(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSendRequest = () => {
    // In a real app, this would send the request to the backend
    alert(`Request sent to ${artist.name}! The artist will receive your commission.`)
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const canProceedStep1 = conceptImage !== null
  const canProceedStep2 = canvasSize !== ''
  const canProceedStep3 = description.trim().length > 0

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-black hover:bg-neutral-50 text-xl sm:text-2xl shrink-0 z-20"
        >
          ×
        </button>
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-neutral-200 px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center z-10 shrink-0">
          <div className="min-w-0 pr-12">
            <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-1">Commission</p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-black truncate">Commission Request</h2>
            <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-neutral-500 uppercase mt-1 truncate">
              Artist: {artist.name}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        {/* Progress Steps */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-neutral-200">
          <div className="flex items-center justify-between w-full">
            {[1, 2, 3].map((s, idx) => (
              <div key={s} className="flex items-center w-full last:w-auto">
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${step >= s
                      ? 'bg-black text-white'
                      : 'bg-neutral-200 text-neutral-600'
                      }`}
                  >
                    {s}
                  </div>
                  <span className="text-[10px] mt-2 font-semibold tracking-widest text-neutral-500 uppercase absolute top-8 whitespace-nowrap">
                    {s === 1 ? 'Concept' : s === 2 ? 'Specs' : 'Details'}
                  </span>
                </div>
                {s < 3 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-colors duration-200 ${step > s ? 'bg-black' : 'bg-neutral-200'
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Spacer for labels */}
          <div className="h-6"></div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Step 1: Concept Generation/Upload */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black tracking-tight text-black mb-2">
                  Create a Concept in {artist.name}'s Style
                </h3>
                <p className="text-sm text-neutral-600">
                  Generate an image with AI or upload a photo you've already created
                </p>
              </div>

              {/* Artist Style Examples */}
              <div>
                <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
                  Artist Style
                </p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {artist.portfolio.slice(0, 3).map((artwork) => (
                    <div key={artwork.id} className="relative aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden">
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {artist.style.map(s => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-semibold tracking-widest uppercase"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-2">
                  Describe your idea (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: A cyberpunk cat in neon rain, futuristic city background..."
                  rows={4}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              {/* Generate AI Concept */}
              <div className="border border-neutral-200 rounded-sm p-4">
                <h4 className="text-sm font-bold text-black mb-3">Generate with AI</h4>
                <p className="text-xs text-neutral-600 mb-4">
                  AI will create a concept in {artist.name}'s style
                </p>
                <button
                  onClick={handleGeneratePreview}
                  disabled={isGenerating}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'Generating...' : 'Generate Concept with AI'}
                </button>
              </div>

              {/* Or Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-neutral-500 font-semibold tracking-widest">or</span>
                </div>
              </div>

              {/* Upload Image */}
              <div className="border border-neutral-200 rounded-sm p-4">
                <h4 className="text-sm font-bold text-black mb-3">Upload a Photo</h4>
                <p className="text-xs text-neutral-600 mb-4">
                  Already generated an image? Upload it here
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="btn-secondary w-full text-center cursor-pointer inline-block"
                >
                  Choose File
                </label>
              </div>

              {/* Preview Generated/Uploaded Image */}
              {conceptImage && (
                <div className="space-y-4 border-t border-neutral-200 pt-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-black">
                      {imageMethod === 'generate' ? 'Generated Concept' : 'Uploaded Image'}
                    </h4>
                    <button
                      onClick={handleRemoveImage}
                      className="text-xs text-neutral-500 hover:text-black uppercase tracking-widest"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="relative aspect-video bg-neutral-100 rounded-sm overflow-hidden border border-neutral-200">
                    <Image
                      src={conceptImage}
                      alt="Concept"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4 border-t border-neutral-200">
                <button onClick={onClose} className="btn-secondary">
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Canvas Specifications */}
          {step === 2 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-black tracking-tight text-black mb-2">Canvas Specifications</h3>
                <p className="text-sm text-neutral-600">
                  Select the dimensions and depth for your commissioned artwork.
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-4">
                  1. Format & Size
                </p>
                <div className="space-y-4">
                  {SIZES.map((category) => (
                    <div key={category.label}>
                      <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2 block">
                        {category.label}
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {category.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => setCanvasSize(option)}
                            className={`px-4 py-3 text-sm font-medium border rounded-sm transition-all duration-200 ${canvasSize === option
                              ? 'border-black bg-black text-white shadow-md'
                              : 'border-neutral-200 hover:border-black/30 text-neutral-700 hover:bg-neutral-50'
                              }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Depth Selection */}
              <div>
                <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-4">
                  2. Canvas Depth
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Standard Option */}
                  <button
                    onClick={() => setCanvasDepth('standard')}
                    className={`relative p-4 border rounded-sm text-left transition-all duration-200 flex items-start gap-4 group ${canvasDepth === 'standard'
                      ? 'border-black bg-neutral-50 ring-1 ring-black/5'
                      : 'border-neutral-200 hover:border-black/30'
                      }`}
                  >
                    <div className="w-12 h-12 shrink-0 bg-white border border-neutral-300 shadow-sm flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-neutral-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-sm mb-1">Standard (0.75")</h4>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        Classic profile. Ideal for custom framing. Sits closer to the wall for a sleek look.
                      </p>
                    </div>
                    {canvasDepth === 'standard' && (
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-black" />
                    )}
                  </button>

                  {/* Gallery Wrap Option */}
                  <button
                    onClick={() => setCanvasDepth('gallery')}
                    className={`relative p-4 border rounded-sm text-left transition-all duration-200 flex items-start gap-4 group ${canvasDepth === 'gallery'
                      ? 'border-black bg-neutral-50 ring-1 ring-black/5'
                      : 'border-neutral-200 hover:border-black/30'
                      }`}
                  >
                    <div className="w-12 h-12 shrink-0 bg-white border border-neutral-300 shadow-md flex items-center justify-center relative">
                      <div className="w-8 h-8 border-2 border-black absolute -top-1 -right-1" />
                      <div className="w-8 h-8 border border-neutral-300 bg-neutral-100 absolute bottom-1 left-1" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-sm mb-1">Gallery Wrap (1.5")</h4>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        Museum quality. Paint wraps around thick edges. Ready to hang without a frame.
                      </p>
                    </div>
                    {canvasDepth === 'gallery' && (
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-black" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-8 border-t border-neutral-200">
                <button onClick={() => setStep(1)} className="btn-secondary">
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Request Details & Summary */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-black tracking-tight text-black">Final Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Concept Summary */}
                {conceptImage && (
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-2">
                      Concept
                    </p>
                    <div className="relative aspect-video bg-neutral-100 rounded-sm overflow-hidden border border-neutral-200">
                      <Image
                        src={conceptImage}
                        alt="Concept"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                )}

                {/* Specs Summary */}
                <div className="bg-neutral-50 p-4 rounded-sm border border-neutral-200 space-y-4">
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-1">
                      Start Commission for
                    </p>
                    <p className="font-bold text-lg text-black">{artist.name}</p>
                  </div>
                  <div className="h-px bg-neutral-200" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-1">
                      Canvas Size
                    </p>
                    <p className="font-medium text-black">{canvasSize}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-1">
                      Depth Profile
                    </p>
                    <p className="font-medium text-black">
                      {canvasDepth === 'standard' ? 'Standard (0.75")' : 'Gallery Wrap (1.5")'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-2">
                  Commission Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you want to commission, preferred size, budget, deadlines..."
                  rows={4}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/10"
                />
                <p className="text-xs text-neutral-500 mt-2">
                  * Required field. Provide as much detail as possible to help the artist.
                </p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-4">
                <p className="text-xs text-neutral-600">
                  <strong>How it works:</strong> The artist will receive your request with these specifications and can accept or decline it.
                  Once accepted, you can discuss final details and proceed with the commission.
                </p>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-neutral-200">
                <button onClick={() => setStep(2)} className="btn-secondary">
                  Back
                </button>
                <button
                  onClick={handleSendRequest}
                  disabled={!canProceedStep3}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
