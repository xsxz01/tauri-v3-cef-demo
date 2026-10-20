import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChevronsUpDown, CreditCard, TrendingUp } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Section, Demo } from './Section'

const METRICS = [
  { month: '1月', cpu: 42, mem: 61 },
  { month: '2月', cpu: 38, mem: 58 },
  { month: '3月', cpu: 51, mem: 66 },
  { month: '4月', cpu: 47, mem: 63 },
  { month: '5月', cpu: 62, mem: 71 },
  { month: '6月', cpu: 55, mem: 68 },
  { month: '7月', cpu: 71, mem: 76 },
  { month: '8月', cpu: 66, mem: 72 },
]

const DEPENDENCIES = [
  { name: 'tauri', version: '3.0.0-alpha.6', license: 'MIT / Apache-2.0', status: 'alpha' },
  { name: 'tauri-runtime-cef', version: '3.0.0-alpha.6', license: 'MIT / Apache-2.0', status: 'alpha' },
  { name: 'cef (Chromium)', version: '154.0.34', license: 'BSD-3-Clause', status: 'stable' },
  { name: 'react', version: '19.2.0', license: 'MIT', status: 'stable' },
  { name: 'tailwindcss', version: '3.4.19', license: 'MIT', status: 'stable' },
]

export function DataDisplay() {
  const [open, setOpen] = useState(false)

  return (
    <Section
      id="data"
      title="数据展示"
      description="表格、图表、折叠面板——后台与监控界面的核心组件"
    >
      <Demo label="Chart · 面积图" hint="recharts 声明式图表" className="md:col-span-2 xl:col-span-2">
        <Card className="w-full">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">资源占用趋势</CardTitle>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" /> 实时
            </Badge>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={METRICS} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="cpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e11d48" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#e11d48" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" fontSize={11} tickLine={false} />
                <YAxis fontSize={11} tickLine={false} axisLine={false} unit="%" />
                <Tooltip
                  contentStyle={{
                    background: '#18181b',
                    border: '1px solid #3f3f46',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="cpu" stroke="#e11d48" fill="url(#cpu)" strokeWidth={2} />
                <Area type="monotone" dataKey="mem" stroke="#10b981" fill="#10b98122" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Demo>

      <Demo label="Table · 数据表格" className="md:col-span-2 xl:col-span-1" hint="caption + 语义化表头">
        <Table>
          <TableCaption>核心依赖清单</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>依赖</TableHead>
              <TableHead>版本</TableHead>
              <TableHead className="text-right">状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEPENDENCIES.map((d) => (
              <TableRow key={d.name}>
                <TableCell className="font-medium">{d.name}</TableCell>
                <TableCell className="text-muted-foreground">{d.version}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={d.status === 'alpha' ? 'destructive' : 'secondary'}>
                    {d.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Demo>

      <Demo label="Accordion · 手风琴" className="md:col-span-2 xl:col-span-3" hint="一次只展开一项，适合 FAQ / 设置页">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="why-cef">
            <AccordionTrigger>为什么用 CEF 而不是系统 WebView？</AccordionTrigger>
            <AccordionContent>
              CEF 随应用分发固定版本的 Chromium（当前 154），渲染行为全平台一致，不受用户系统上
              WebView2 版本碎片化或 Linux WebKitGTK 差异的影响。代价是安装包体积增大。
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="why-shadcn">
            <AccordionTrigger>为什么选 shadcn/ui 作为组件库？</AccordionTrigger>
            <AccordionContent>
              组件源码直接归属于项目（非 npm 黑盒），AI 生成代码即可直接阅读和修改；
              基于 Radix UI 原语保证了键盘导航与可访问性；与 Tailwind 的设计令牌体系天然融合。
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="status">
            <AccordionTrigger>这个项目可以用于生产环境吗？</AccordionTrigger>
            <AccordionContent>
              暂不建议。Tauri 3.0 与 tauri-runtime-cef 均处于 alpha 阶段，API 可能变更，
              官方建议生产应用继续使用 Tauri 2.x。本项目用于技术预研与评估。
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Demo>

      <Demo label="Collapsible · 自由折叠" hint="可受控，折叠任意内容">
        <Collapsible open={open} onOpenChange={setOpen} className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">@tauri-apps/api 3.0.0-alpha.3</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">切换</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="rounded-md border p-3 text-sm text-muted-foreground">
            Tauri 前端的 IPC、事件、窗口等 API 封装。v3 alpha 版本与运行时模型重构配套。
          </CollapsibleContent>
        </Collapsible>
      </Demo>

      <Demo label="数据组件组合建议">
        <div className="w-full flex items-center gap-3 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          <CreditCard className="h-8 w-8 shrink-0 text-rose-500" />
          <span>
            卡片 + 表格 + 图表是 AI 生成「数据密集型界面」的三件套，描述需求即可获得
            结构完整、风格统一的页面。
          </span>
        </div>
      </Demo>
    </Section>
  )
}
