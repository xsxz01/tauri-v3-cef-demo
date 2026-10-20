import { AlertTriangle, CheckCircle2, Info, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Section, Demo } from './Section'

export function Feedback() {
  return (
    <Section
      id="feedback"
      title="反馈组件"
      description="加载、进度、通知——让应用状态对用户永远透明"
    >
      <Demo label="Alert · 语义化警示" className="md:col-span-2 xl:col-span-3">
        <Alert className="flex-1 min-w-64">
          <Info className="h-4 w-4" />
          <AlertTitle>提示</AlertTitle>
          <AlertDescription>当前运行在 CEF 运行时（Chromium 154）。</AlertDescription>
        </Alert>
        <Alert variant="destructive" className="flex-1 min-w-64">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>警告</AlertTitle>
          <AlertDescription>生产环境请使用 Tauri 2.x 稳定版。</AlertDescription>
        </Alert>
        <Alert className="flex-1 min-w-64 border-emerald-800 [&>svg]:text-emerald-500">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <AlertTitle>成功</AlertTitle>
          <AlertDescription>Rust IPC 握手成功。</AlertDescription>
        </Alert>
      </Demo>

      <Demo label="Sonner · 全局通知" hint="右上角查看 Toast 弹出">
        <Button
          variant="outline"
          onClick={() => toast.success('操作成功', { description: '来自 sonner 的全局通知' })}
        >
          成功通知
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(new Promise((r) => setTimeout(r, 1500)), {
              loading: '正在编译 Rust…',
              success: '编译完成',
              error: '编译失败',
            })
          }
        >
          Promise 通知
        </Button>
        <Button
          variant="destructive"
          onClick={() => toast.error('出错了', { description: '模拟一次失败调用' })}
        >
          错误通知
        </Button>
      </Demo>

      <Demo label="Progress · 进度条">
        <div className="w-full space-y-3">
          <Progress value={33} />
          <Progress value={66} className="[&>div]:bg-emerald-500" />
          <p className="text-xs text-muted-foreground">下载 CEF 二进制中… 66%</p>
        </div>
      </Demo>

      <Demo label="Skeleton · 加载骨架" hint="加载态比转圈更高级">
        <div className="flex items-center gap-3 w-full">
          <Skeleton className="h-11 w-11 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </Demo>

      <Demo label="Spinner · 加载动画">
        <Spinner />
        <Button disabled>
          <Spinner data-icon="inline-start" /> 提交中…
        </Button>
      </Demo>

      <Demo label="AlertDialog · 危险确认" hint="破坏性操作前的二次确认">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4" /> 删除项目
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确认删除？</AlertDialogTitle>
              <AlertDialogDescription>
                该操作将永久删除项目文件，且无法撤销。请确认您已备份重要数据。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction>确认删除</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Demo>
    </Section>
  )
}
