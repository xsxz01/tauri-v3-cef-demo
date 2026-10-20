import { useEffect, useMemo, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { Images, Search, Sparkles, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CATEGORIES, PHOTOS, type Photo } from '@/data/photos'
import { Lightbox } from '@/components/gallery/Lightbox'
import { cn } from '@/lib/utils'

function useEngineInfo() {
  const [engine, setEngine] = useState<string>('检测中…')
  useEffect(() => {
    const ua = navigator.userAgent
    const chrome = ua.match(/Chrome\/([\d.]+)/)
    const isCef = /CEF/.test(ua) || !('webview2' in window)
    if (chrome) {
      setEngine(`Chromium ${chrome[1].split('.')[0]}`)
    } else {
      setEngine('未知引擎')
    }
    void isCef
  }, [])
  return engine
}

export default function App() {
  const [dark, setDark] = useState(true)
  const [category, setCategory] = useState<string>('全部')
  const [query, setQuery] = useState('')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [greet, setGreet] = useState<string | null>(null)
  const [greetLoading, setGreetLoading] = useState(false)
  const engine = useEngineInfo()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const filtered = useMemo(() => {
    return PHOTOS.filter((p) => {
      const matchCategory = category === '全部' || p.category === category
      const q = query.trim()
      const matchQuery =
        q === '' || p.title.includes(q) || p.description.includes(q) || p.category.includes(q)
      return matchCategory && matchQuery
    })
  }, [category, query])

  const openLightbox = (photo: Photo) => {
    const idx = filtered.findIndex((p) => p.id === photo.id)
    if (idx >= 0) setLightboxIndex(idx)
  }

  const callRust = async () => {
    setGreetLoading(true)
    try {
      const msg = await invoke<string>('greet', { name: 'Kimi' })
      setGreet(msg)
    } catch (e) {
      setGreet(`IPC 不可用（浏览器预览模式）：${String(e)}`)
    } finally {
      setGreetLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800/80 sticky top-0 z-10 backdrop-blur bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-rose-600 flex items-center justify-center">
              <Images className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">光影画廊</h1>
              <p className="text-xs text-zinc-500">Tauri v3 · CEF Runtime Demo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-emerald-800 text-emerald-400 gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
              {engine}
            </Badge>
            <Button variant="outline" size="sm" onClick={callRust} disabled={greetLoading}>
              <Terminal className="h-4 w-4 mr-1.5" />
              {greetLoading ? '调用中…' : '测试 Rust IPC'}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setDark((d) => !d)}>
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {greet && (
          <div className="max-w-7xl mx-auto px-6 pb-3 -mt-1">
            <p className="text-xs text-emerald-400 font-mono">{greet}</p>
          </div>
        )}
      </header>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList>
            {CATEGORIES.map((c) => (
              <TabsTrigger key={c} value={c}>
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="relative sm:w-72 sm:ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索作品标题或描述…"
            className="pl-9 bg-zinc-900 border-zinc-800"
          />
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-zinc-500">
            <Images className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p>没有匹配的作品，换个关键词试试</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((photo) => (
              <button
                key={photo.id}
                onClick={() => openLightbox(photo)}
                className={cn(
                  'group relative overflow-hidden rounded-xl border border-zinc-800/80',
                  'aspect-[4/5] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500'
                )}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{photo.title}</h3>
                    <Badge variant="secondary" className="bg-white/15 text-white border-0">
                      {photo.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1 line-clamp-1">{photo.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-800/80 py-6">
        <p className="text-center text-xs text-zinc-600">
          Powered by Tauri v3 (alpha) · Chromium Embedded Framework · 图片由程序化生成
        </p>
      </footer>

      <Lightbox
        photos={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  )
}
