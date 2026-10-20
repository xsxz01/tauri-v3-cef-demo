import { Check, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Calendar } from '@/components/ui/calendar'
import { Section, Demo } from './Section'

export function Forms() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Section
      id="forms"
      title="表单组件"
      description="输入、选择、校验的全套控件，Radix UI 原语保证可访问性（a11y）"
    >
      <Demo label="Input · 输入框" hint="支持前后缀与图标组合">
        <div className="w-full space-y-3">
          <Input placeholder="请输入用户名" />
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="请输入密码"
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword((v) => !v)}
              aria-label="切换密码可见性"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </Demo>

      <Demo label="Textarea" hint="自适应备注输入">
        <Textarea placeholder="写点什么…（Ctrl + Enter 提交）" className="w-full min-h-24" />
      </Demo>

      <Demo label="Select · 下拉选择" hint="分组、滚动、键盘导航">
        <Select defaultValue="tauri">
          <SelectTrigger className="w-56">
            <SelectValue placeholder="选择框架" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>桌面端</SelectLabel>
              <SelectItem value="tauri">Tauri</SelectItem>
              <SelectItem value="electron">Electron</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>渲染引擎</SelectLabel>
              <SelectItem value="cef">CEF (Chromium)</SelectItem>
              <SelectItem value="wry">WRY (系统 WebView)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Demo>

      <Demo label="Checkbox · 多选" hint="受控 +  indeterminate 支持">
        <div className="w-full space-y-2">
          {['Rust 后端', 'React 前端', 'shadcn/ui 组件'].map((item, i) => (
            <div key={item} className="flex items-center gap-2">
              <Checkbox id={`cb-${i}`} defaultChecked={i < 2} />
              <Label htmlFor={`cb-${i}`}>{item}</Label>
            </div>
          ))}
        </div>
      </Demo>

      <Demo label="RadioGroup · 单选" hint="键盘方向键可切换">
        <RadioGroup defaultValue="cef" className="w-full">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cef" id="r-cef" />
            <Label htmlFor="r-cef">CEF 运行时（Chromium 154）</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="wry" id="r-wry" />
            <Label htmlFor="r-wry">WRY 运行时（系统 WebView）</Label>
          </div>
        </RadioGroup>
      </Demo>

      <Demo label="Switch + Slider" hint="开关与滑块的原生手感">
        <div className="w-full space-y-5">
          <div className="flex items-center justify-between">
            <Label htmlFor="airplane">启用硬件加速</Label>
            <Switch id="airplane" defaultChecked />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <Label>窗口透明度</Label>
              <span className="text-muted-foreground tabular-nums">72%</span>
            </div>
            <Slider defaultValue={[72]} max={100} step={1} />
          </div>
        </div>
      </Demo>

      <Demo label="Calendar · 日历" className="md:col-span-2 xl:col-span-1">
        <div className="mx-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </Demo>

      <Demo label="Form 模式建议" hint="配合 react-hook-form + zod" className="md:col-span-2">
        <div className="w-full rounded-lg bg-muted p-4 text-sm leading-relaxed text-muted-foreground">
          项目已内置 <span className="text-foreground font-medium">react-hook-form</span> 与{' '}
          <span className="text-foreground font-medium">zod</span>——AI
          生成表单时只需描述 schema，校验逻辑、错误提示、焦点管理全自动产出。这是
          AI 生成代码正确率最高的组合之一。
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Check className="h-3.5 w-3.5" /> 类型安全校验
        </Button>
      </Demo>
    </Section>
  )
}
