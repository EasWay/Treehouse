"use client"

import React, { ElementType, ReactNode, useId } from "react"
import { cn } from "../../lib/utils"

export interface VideoTextProps {
  src: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  preload?: "auto" | "metadata" | "none"
  children: ReactNode
  fontSize?: string | number
  fontWeight?: string | number
  fontFamily?: string
  as?: ElementType
}

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = "15vw",
  fontWeight = 900,
  fontFamily = "serif",
  as: Component = "div",
}: VideoTextProps) {
  const clipId = useId()
  const content = React.Children.toArray(children).join("")

  return (
    <Component className={cn(`relative w-full h-full flex items-center justify-center`, className)}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <clipPath id={clipId}>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontFamily={fontFamily}
              className="uppercase tracking-tighter"
            >
              {content}
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
              preload={preload}
              playsInline
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        </foreignObject>
      </svg>
      
      {/* Fallback for SEO and accessibility */}
      <span className="sr-only">{content}</span>
    </Component>
  )
}

