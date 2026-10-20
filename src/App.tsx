import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import {
  Component,
  Database,
  Layers,
  LayoutGrid,
  MousePointerClick,
  Navigation as NavigationIcon,
  Play,
  Terminal,
  ThumbsUp,
} from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Basics } from '@/components/showcase/Basics'
import { Forms } from '@/components/showcase/Forms'
import { Feedback } from '@/components/showcase/Feedback'
import { Navigation } from '@/components/showcase/Navigation'
import { DataDisplay } from '@/components/showcase/DataDisplay'
import { Overlay } from '@/components/showcase/Overlay'
import { Media } from '@/components/showcase/Media'

const NAV = [
  { id: 'basics', label: '基础组件', icon: LayoutGrid },
  { id: 'forms', label: '表单组件', icon: ThumbsUp },
  { id: 'feedback', label: '反馈组件', icon: ThumbsUp },
  { id: 'navigation', label: '导航组件', icon: NavigationIcon },
  { id: 'data', label: '数据展示', icon: Database },
  { id: 'overlay', label: '浮层组件', icon: MousePointerClick },
  { id: 'media', label: '媒体组件', icon: Play },
]

function useEngineInfo() {
  const [engine, setEngine] = useState('检测中…')
  useEffect(() => {
    const m = navigator.userAgent.match(/Chrome\/([\d.]+)/)
    setEngine(m ? `Chromium ${m[1].split('.')[0]}` : '未知引擎')
  }, [])
  return engine
}

export default function App() {
  const [dark] = useState(true)
  const [active, setActive] = useState('basics')
  const [greet, setGreet] = useState<string | null>(null)
  const [greetLoading, setGreetLoading] = useState(false)
  const engine = useEngineInfo()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  // Scroll-spy: highlight current section in sidebar
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const callRust = async () => {
    setGreetLoading(true)
    try {
      setGreet(await invoke<string>('greet', { name: 'Kimi' }))
    } catch (e) {
      setGreet(`IPC 不可用（浏览器预览模式）：${String(e)}`)
    } finally {
      setGreetLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b sticky top-0 z-40 backdrop-blur bg-background/85">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-rose-600 flex items-center justify-center">
              <Component className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">shadcn/ui 组件展厅</h1>
              <p className="text-xs text-muted-foreground">
                运行于 Tauri v3 + CEF 的 AI 时代组件库演示
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-emerald-800 text-emerald-500 gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
              {engine}
            </Badge>
            <Button variant="outline" size="sm" onClick={callRust} disabled={greetLoading}>
              <Terminal className="h-4 w-4 mr-1.5" />
              {greetLoading ? '调用中…' : '测试 Rust IPC'}
            </Button>
          </div>
        </div>
        {greet && (
          <div className="max-w-7xl mx-auto px-6 pb-3 -mt-1">
            <p className="text-xs text-emerald-500 font-mono">{greet}</p>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <nav className="sticky top-28 space-y-1">
            <p className="text-xs font-medium text-muted-foreground mb-2 px-3">组件分类</p>
            {NAV.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                  active === id
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
            <Separator className="my-3" />
            <div className="rounded-lg border p-3 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-medium">
                <Layers className="h-3.5 w-3.5 text-rose-500" /> 40+ 组件
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Radix UI 原语 · Tailwind 样式 · 源码完全归属项目
              </p>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 space-y-16">
          <Basics />
          <Forms />
          <Feedback />
          <Navigation />
          <DataDisplay />
          <Overlay />
          <Media />
          <footer className="border-t pt-6 pb-4">
            <p className="text-center text-xs text-muted-foreground">
              Powered by Tauri v3 (alpha) · Chromium Embedded Framework · shadcn/ui · React 19
            </p>
          </footer>
        </main>
      </div>

      <Toaster theme="dark" position="top-right" richColors />
    </div>
  )
}
