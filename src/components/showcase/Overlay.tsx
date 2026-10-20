import { useEffect, useState } from 'react'
import { Calculator, Calendar, Copy, CreditCard, Loader2, Search, Settings, User } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Section, Demo } from './Section'

function CommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Button variant="outline" className="gap-2" onClick={() => setOpen(true)}>
        <Search className="h-4 w-4" /> 打开命令面板
        <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
          ⌘K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="输入命令或搜索组件…" />
        <CommandList>
          <CommandEmpty>没有找到结果。</CommandEmpty>
          <CommandGroup heading="建议">
            <CommandItem onSelect={() => { setOpen(false); toast.info('打开设置') }}>
              <Settings className="h-4 w-4" /> 设置 <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { setOpen(false); toast.info('打开个人资料') }}>
              <User className="h-4 w-4" /> 个人资料 <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { setOpen(false); toast.info('打开日历') }}>
              <Calendar className="h-4 w-4" /> 日历 <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export function Overlay() {
  return (
    <Section
      id="overlay"
      title="浮层组件"
      description="对话框、抽屉、命令面板——桌面应用的层次美学，全部支持 Esc 关闭与焦点陷阱"
    >
      <Demo label="Dialog · 模态对话框" hint="居中模态，焦点自动管理">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">编辑资料</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>编辑资料</DialogTitle>
              <DialogDescription>修改后点击保存，变更立即生效。</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="name">用户名</Label>
                <Input id="name" defaultValue="Kimi" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">简介</Label>
                <Input id="bio" placeholder="介绍一下自己…" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => toast.success('资料已保存')}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Demo>

      <Demo label="Sheet / Drawer · 侧边浮层" hint="右侧面板与底部抽屉">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">右侧面板</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>通知中心</SheetTitle>
              <SheetDescription>这里汇集应用内的全部通知。</SheetDescription>
            </SheetHeader>
            <div className="space-y-3 py-6 text-sm text-muted-foreground">
              <p>· CEF 运行时初始化完成</p>
              <p>· Rust IPC 握手成功</p>
              <p>· 组件展厅已加载 8 个分类</p>
            </div>
          </SheetContent>
        </Sheet>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">底部抽屉</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>确认操作</DrawerTitle>
              <DrawerDescription>抽屉在移动端体验最佳，桌面端也可作为轻量确认层。</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={() => toast.success('已确认')}>确认</Button>
              <DrawerClose asChild>
                <Button variant="outline">取消</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Demo>

      <Demo label="Command · 命令面板" hint="按 ⌘K / Ctrl+K 唤起，AI 工具类应用标配" className="md:col-span-2">
        <CommandPalette />
        <Button variant="secondary" onClick={() => toast('已复制', { description: 'Command 组件由 cmdk 驱动' })}>
          <Copy className="h-4 w-4 mr-1.5" /> 关于命令面板
        </Button>
      </Demo>

      <Demo label="DropdownMenu · 右键菜单" hint="支持子菜单、复选、单选、快捷键">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">我的账户</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>xsxz01@example.com</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="h-4 w-4" /> 个人资料
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="h-4 w-4" /> 订阅
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4" /> 设置
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Demo>

      <Demo label="Popover / Tooltip / HoverCard" hint="三级提示体系：点击 / 悬停 / 富信息">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="提示">
                <Calculator className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>轻量提示（Tooltip）</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">点击弹层</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Popover</h4>
              <p className="text-sm text-muted-foreground">
                可承载表单、筛选器等交互内容，点击外部关闭。
              </p>
            </div>
          </PopoverContent>
        </Popover>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="px-0">
              悬停查看作者
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">shadcn</h4>
                <p className="text-xs text-muted-foreground">
                  以可复制源码方式分发组件的设计系统，AI 时代最流行的 UI 方案。
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Demo>

      <Demo label="加载与并发反馈" hint="Promise Toast 展示异步任务生命周期">
        <Button
          onClick={() =>
            toast.promise(new Promise((r) => setTimeout(r, 2000)), {
              loading: (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> 正在执行…
                </span>
              ),
              success: '任务完成',
              error: '任务失败',
            })
          }
        >
          模拟 2 秒任务
        </Button>
      </Demo>
    </Section>
  )
}
