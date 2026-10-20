import { useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Photo } from '@/data/photos'

interface LightboxProps {
  photos: Photo[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null
  const photo = index !== null ? photos[index] : null

  const goPrev = useCallback(() => {
    if (index === null || photos.length === 0) return
    onNavigate((index - 1 + photos.length) % photos.length)
  }, [index, photos.length, onNavigate])

  const goNext = useCallback(() => {
    if (index === null || photos.length === 0) return
    onNavigate((index + 1) % photos.length)
  }, [index, photos.length, onNavigate])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, goPrev, goNext])

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-5xl w-[92vw] p-0 overflow-hidden bg-zinc-950 border-zinc-800">
        {photo && (
          <div className="relative">
            <DialogTitle className="sr-only">{photo.title}</DialogTitle>
            <DialogDescription className="sr-only">{photo.description}</DialogDescription>
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full max-h-[76vh] object-contain bg-black"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 text-white/70 hover:text-white hover:bg-white/10"
              onClick={onClose}
              aria-label="关闭"
            >
              <X className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:bg-white/10"
              onClick={goPrev}
              aria-label="上一张"
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:bg-white/10"
              onClick={goNext}
              aria-label="下一张"
            >
              <ChevronRight className="h-7 w-7" />
            </Button>
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">{photo.title}</h3>
                  <Badge variant="secondary">{photo.category}</Badge>
                </div>
                <p className="text-sm text-zinc-400 mt-1">{photo.description}</p>
              </div>
              <span className="text-sm text-zinc-500 tabular-nums">
                {index !== null ? index + 1 : 0} / {photos.length}
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
