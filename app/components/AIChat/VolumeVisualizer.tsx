"use client"

import { useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'

interface VolumeVisualizerProps {
  isRecording: boolean
  stream: MediaStream | null
}

// This is what we want to animate
interface BarState {
  scaleY: number
  opacity: number
  backgroundColor: string
}

export const VolumeVisualizer = ({ isRecording, stream }: VolumeVisualizerProps) => {
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number>()
  const prevVolumesRef = useRef<Array<number[]>>(new Array(9).fill([]))
  const controls = useAnimation()
  
  const SMOOTHING_FACTOR = 0.85
  const VOLUME_MEMORY = 3
  const NUM_BANDS = 9
  const MIN_SCALE = 0.3
  const MAX_SCALE = 1.2
  const MIN_OPACITY = 0.4
  const MAX_OPACITY = 0.8

  // Separate animation values from transition configuration
  const animateBar = async (index: number, values: BarState) => {
    await controls.start(index.toString(), values)
  }

  useEffect(() => {
    if (isRecording && stream) {
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaStreamSource(stream)
      
      analyser.fftSize = 1024
      analyser.smoothingTimeConstant = SMOOTHING_FACTOR
      source.connect(analyser)
      analyserRef.current = analyser

      const frequencyData = new Uint8Array(analyser.frequencyBinCount)
      const bandSize = Math.floor(analyser.frequencyBinCount / NUM_BANDS)
      
      const updateVisualizer = () => {
        if (!isRecording) return

        analyser.getByteFrequencyData(frequencyData)
        
        const bands = Array.from({ length: NUM_BANDS }, (_, i) => {
          const start = i * bandSize
          const end = start + bandSize
          const bandValues = Array.from(frequencyData.slice(start, end))
          return bandValues.reduce((acc, val) => acc + val, 0) / bandSize
        })

        const normalizedBands = bands.map(band => band / 255)

        const smoothedBands = normalizedBands.map((band, index) => {
          const prevVolumes = prevVolumesRef.current[index] || []
          const newVolumes = [...prevVolumes, band].slice(-VOLUME_MEMORY)
          const average = newVolumes.reduce((acc, vol) => acc + vol, 0) / newVolumes.length
          prevVolumesRef.current[index] = newVolumes
          return average
        })

        smoothedBands.forEach((volume, index) => {
          const scale = MIN_SCALE + (volume * (MAX_SCALE - MIN_SCALE))
          const opacity = MIN_OPACITY + (volume * (MAX_OPACITY - MIN_OPACITY))
          const hue = Math.floor(360 * (index / NUM_BANDS))
          
          animateBar(index, {
            scaleY: scale,
            opacity,
            backgroundColor: `hsla(${hue}, 100%, 65%, ${opacity})`
          })
        })

        animationFrameRef.current = requestAnimationFrame(updateVisualizer)
      }

      updateVisualizer()

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        audioContext.close()
      }
    }
  }, [isRecording, stream])

  // Define animation variants
  const variants = {
    initial: (i: number) => ({
      scaleY: MIN_SCALE,
      opacity: MIN_OPACITY,
      backgroundColor: `hsla(${(360 * i) / NUM_BANDS}, 100%, 65%, ${MIN_OPACITY})`
    })
  }

  return (
    <div className="flex gap-0.5 h-6 items-end opacity-90">
      <AnimatePresence>
        {Array.from({ length: NUM_BANDS }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            className="w-0.5 h-full rounded-full visualizer-bar"
            variants={variants}
            initial="initial"
            animate={i.toString()}
            // Transition is separate from animation values
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            style={{
              transformOrigin: 'bottom',
              scale: 1 - (Math.abs(i - Math.floor(NUM_BANDS / 2)) * 0.1)
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
} 