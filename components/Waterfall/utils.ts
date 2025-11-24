export class AsyncTaskQueue {
    private tasks: (() => Promise<void>)[] = []; // 待执行任务队列
    private isRunning: boolean = false; // 队列运行状态
    private activeCount: number = 0; // 当前执行中的任务数
    private concurrency: number; // 最大并发数

    /**
     * 创建任务队列实例
     * @param concurrency 最大并发任务数 (默认为1)
     */
    constructor(concurrency: number = 1) {
        if (concurrency < 1) throw new Error('Concurrency must be at least 1');
        this.concurrency = concurrency;
    }

    /**
     * 添加任务到队列
     * @param task 返回Promise的异步任务函数
     * @returns 包含任务完成状态的Promise
     */
    enqueue<T>(task: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            // 包装原始任务，添加完成处理逻辑
            const wrappedTask = async () => {
                try {
                    const result = await task();
                    resolve(result);
                } catch (error) {
                    reject(error);
                } finally {
                    this.activeCount--;
                    this.processNext();
                }
            };

            this.tasks.push(wrappedTask);
            this.processQueue();
        });
    }

    // 启动队列处理（如果条件允许）
    private processQueue(): void {
        if (this.isRunning) return;

        this.isRunning = true;
        this.processNext();
    }

    // 处理下一个任务
    private processNext(): void {
        // 当队列为空且无活动任务时停止
        if (this.tasks.length === 0 && this.activeCount === 0) {
            this.isRunning = false;
            return;
        }

        // 在并发限制下启动新任务
        while (this.activeCount < this.concurrency && this.tasks.length > 0) {
            const task = this.tasks.shift()!;
            this.activeCount++;
            task().catch(error => {
                console.error('Task execution error:', error);
            });
        }
    }

    /**
     * 获取队列状态
     * @returns 包含等待任务数和活动任务数的对象
     */
    getStatus() {
        return {
            queued: this.tasks.length,
            active: this.activeCount
        };
    }

    /**
     * 停止任务队列，清空待执行任务
     * 注意：已开始执行的任务无法取消，会继续执行完成
     */
    clear() {
        this.tasks = []; // 清空待执行任务
        this.isRunning = false; // 停止队列运行状态
    }
}


export const shallowCompareFirstNElements = (arr1: any[], arr2: any[], n: number) => {
  // 首先检查两个数组是否存在以及n是否大于数组的最小长度
  if (!arr1 || !arr2 || n > arr1.length || n > arr2.length) {
    return false;
  }
  
  // 对比前n个元素
  for (let i = 0; i < n; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}