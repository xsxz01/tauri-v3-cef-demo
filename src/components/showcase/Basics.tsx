import {
  Bell,
  ChevronDown,
  Download,
  Github,
  Loader2,
  Mail,
  Plus,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Section, Demo } from './Section'

export function Basics() {
  return (
    <Section
      id="basics"
      title="基础组件"
      description="按钮、徽章、卡片、头像——每个设计系统的基石，语义化变体开箱即用"
    >
      <Demo label="Button · 变体" hint="default / secondary / destructive / outline / ghost / link">
        <Button>默认</Button>
        <Button variant="secondary">次要</Button>
        <Button variant="destructive">
          <Trash2 className="h-4 w-4" /> 危险
        </Button>
        <Button variant="outline">描边</Button>
        <Button variant="ghost">幽灵</Button>
        <Button variant="link">链接</Button>
      </Demo>

      <Demo label="Button · 尺寸与状态" hint="icon / sm / lg / 加载中 / 禁用">
        <Button size="icon" aria-label="添加">
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="sm">小按钮</Button>
        <Button size="lg">大按钮</Button>
        <Button disabled>
          <Loader2 className="h-4 w-4 animate-spin" /> 加载中
        </Button>
        <Button variant="outline" disabled>
          禁用
        </Button>
      </Demo>

      <Demo label="Badge · 语义化状态" hint="AI 生成界面的高频元素：状态、标签、计数">
        <Badge>默认</Badge>
        <Badge variant="secondary">次要</Badge>
        <Badge variant="destructive">错误</Badge>
        <Badge variant="outline">描边</Badge>
        <Badge className="gap-1">
          <Bell className="h-3 w-3" /> 新消息 3
        </Badge>
      </Demo>

      <Demo label="Card · 组合式结构" className="md:col-span-2 xl:col-span-1">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base">组件即组合</CardTitle>
            <CardDescription>Header / Content / Footer 自由拼装</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            shadcn/ui 的组件不是黑盒，代码完全归你所有，可随意改造。
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">
              <Download className="h-3.5 w-3.5" /> 确认
            </Button>
            <Button size="sm" variant="outline">
              取消
            </Button>
          </CardFooter>
        </Card>
      </Demo>

      <Demo label="Avatar · 回退语义">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-rose-600 text-white">K</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>
            <Github className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Demo>

      <Demo label="Separator + Kbd" hint="排版细节组件">
        <div className="w-full space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>快捷键提示</span>
            <Separator orientation="vertical" className="h-4" />
            <KbdGroup>
              <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd>
            </KbdGroup>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>按下</span>
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>
                <ChevronDown className="h-3 w-3" />
              </Kbd>
            </KbdGroup>
          </div>
        </div>
      </Demo>

      <Demo label="为什么适合 AI" hint="组件源码 100% 属于项目">
        <div className="w-full rounded-lg bg-muted p-4 text-sm leading-relaxed text-muted-foreground">
          没有 npm 黑盒组件层——AI 可以直接阅读、修改、组合
          <span className="text-foreground font-medium"> src/components/ui </span>
          下的源码，生成代码即最终代码。
        </div>
      </Demo>
    </Section>
  )
}
