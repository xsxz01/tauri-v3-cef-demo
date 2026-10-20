import { Bold, Calendar, FileText, Home, Inbox, Italic, Underline } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'
import { Section, Demo } from './Section'

export function Navigation() {
  return (
    <Section
      id="navigation"
      title="导航组件"
      description="菜单、面包屑、分页、标签页——桌面级应用的核心导航模式"
    >
      <Demo label="Menubar · 菜单栏" hint="桌面应用的经典布局，快捷键标注" className="md:col-span-2 xl:col-span-3">
        <Menubar className="w-full">
          <MenubarMenu>
            <MenubarTrigger>文件</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                新建窗口 <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                打开… <MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
              <MenubarSub>
                <MenubarSubTrigger>导出为</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>PNG</MenubarItem>
                  <MenubarItem>SVG</MenubarItem>
                  <MenubarItem>PDF</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarCheckboxItem checked>自动保存</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarRadioGroup value="cef">
                <MenubarRadioItem value="cef">CEF 运行时</MenubarRadioItem>
                <MenubarRadioItem value="wry">WRY 运行时</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>编辑</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                撤销 <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                重做 <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>视图</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked>显示侧边栏</MenubarCheckboxItem>
              <MenubarCheckboxItem>全屏</MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Demo>

      <Demo label="Tabs · 标签页" hint="受控切换 + 动画指示器">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="detail">详情</TabsTrigger>
            <TabsTrigger value="log">日志</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-sm text-muted-foreground pt-3">
            引擎：Chromium Embedded Framework 154
          </TabsContent>
          <TabsContent value="detail" className="text-sm text-muted-foreground pt-3">
            后端：Rust · 运行时：tauri-runtime-cef
          </TabsContent>
          <TabsContent value="log" className="text-sm text-muted-foreground pt-3">
            [INFO] IPC 握手成功，耗时 3ms
          </TabsContent>
        </Tabs>
      </Demo>

      <Demo label="Breadcrumb · 面包屑" hint="层级导航 + 下拉省略">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                <Home className="h-3.5 w-3.5" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">组件</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>导航</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Demo>

      <Demo label="Pagination · 分页" hint="大屏表格的标准搭档">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Demo>

      <Demo label="ToggleGroup · 排他切换" hint="富文本工具栏模式">
        <ToggleGroup type="multiple" defaultValue={['bold']}>
          <ToggleGroupItem value="bold" aria-label="加粗">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="斜体">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="下划线">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </Demo>

      <Demo label="导航模式对比" className="md:col-span-2">
        <div className="w-full grid gap-3 sm:grid-cols-3">
          {[
            { icon: FileText, label: 'Menubar', desc: '传统桌面菜单' },
            { icon: Inbox, label: 'Tabs', desc: '文档式切换' },
            { icon: Calendar, label: 'Breadcrumb', desc: '层级定位' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="rounded-lg border p-3 space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Icon className="h-4 w-4 text-muted-foreground" /> {label}
              </div>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <Button variant="link" size="sm" className="px-0">
          查看完整导航组件列表 →
        </Button>
      </Demo>
    </Section>
  )
}
