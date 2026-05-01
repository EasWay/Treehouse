"use client"

import React, { useId, useEffect, useState } from "react"
import { cn } from "../../lib/utils"

export interface MorphingVideoTextProps {
  src: string
  texts: string[]
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  fontSize?: string
}

export function MorphingVideoText({
  src,
  texts,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  fontSize = "12vw",
}: MorphingVideoTextProps) {
  const clipId = useId()
  const [index, setIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length)
        setIsFading(false)
      }, 500) // Half of the transition time
    }, 3000)
    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center bg-transparent", className)}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <clipPath id={clipId}>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={fontSize}
              fontWeight="900"
              fontFamily="serif"
              className={cn(
                "uppercase tracking-tighter transition-all duration-1000 ease-in-out",
                isFading ? "opacity-0 blur-md" : "opacity-100 blur-0"
              )}
            >
              {texts[index]}
            </text>
          </clipPath>
        </defs>
        
        <foreignObject
          x="0"
          y="0"
          width="100%"
          height="100%"
          clipPath={`url(#${clipId})`}
        >
          <div className="w-full h-full overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay={autoPlay}
              muted={muted}
              loop={loop}
              playsInline
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        </foreignObject>
      </svg>
      
      {/* Fallback for SEO */}
      <span className="sr-only">{texts.join(", ")}</span>
    </div>
  )
}
