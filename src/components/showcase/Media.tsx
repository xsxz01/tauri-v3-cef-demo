import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Section, Demo } from './Section'

const SLIDES = [
  { title: 'Chromium 154', desc: 'CEF 自带的固定版本渲染引擎，全平台行为一致', from: 'from-rose-600', to: 'to-orange-500' },
  { title: 'Rust 后端', desc: '系统级性能与内存安全，桌面应用的最佳后端', from: 'from-zinc-700', to: 'to-zinc-900' },
  { title: 'React 19', desc: '并发渲染与 Server Components 生态', from: 'from-cyan-500', to: 'to-blue-600' },
  { title: 'shadcn/ui', desc: '源码归属项目的组件体系，AI 生成友好', from: 'from-violet-600', to: 'to-fuchsia-600' },
  { title: 'Tailwind CSS', desc: '设计令牌驱动的原子化样式系统', from: 'from-emerald-600', to: 'to-teal-500' },
]

export function Media() {
  return (
    <Section
      id="media"
      title="媒体组件"
      description="轮播、比例容器——内容型界面的展示利器（embla-carousel 驱动）"
    >
      <Demo label="Carousel · 轮播" hint="支持触控滑动、键盘导航、自动循环" className="md:col-span-2 xl:col-span-2">
        <Carousel className="w-full">
          <CarouselContent>
            {SLIDES.map((s, i) => (
              <CarouselItem key={s.title}>
                <Card className="border-0 overflow-hidden">
                  <CardContent className={`h-56 bg-gradient-to-br ${s.from} ${s.to} p-0 relative`}>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/50 to-transparent">
                      <Badge variant="secondary" className="w-fit mb-2 bg-white/20 text-white border-0">
                        {String(i + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                      </Badge>
                      <h3 className="text-xl font-bold text-white">{s.title}</h3>
                      <p className="text-sm text-white/80 mt-1">{s.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3" />
          <CarouselNext className="right-3" />
        </Carousel>
      </Demo>

      <Demo label="AspectRatio · 比例容器" hint="视频、封面图的固定比例方案">
        <div className="w-full grid gap-3">
          <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
            <span className="text-white/90 text-sm font-mono">16 : 9</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center">
              <span className="text-white/90 text-sm font-mono">1 : 1</span>
            </div>
            <div className="aspect-[9/16] rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white/90 text-sm font-mono">9 : 16</span>
            </div>
          </div>
        </div>
      </Demo>
    </Section>
  )
}
