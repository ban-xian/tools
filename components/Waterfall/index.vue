<!--
 * @Author: JieLiao
 * @Date: 2025-11-24 14:57:55
 * @Description: 瀑布流组件
-->
<script setup lang="ts">
import { ref, onMounted, computed, nextTick, withDefaults, onUnmounted, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { AsyncTaskQueue, shallowCompareFirstNElements } from './utils.ts'
import Loading from './loading.vue'

export interface WaterfallProps {
  hasImage?: boolean
  list?: any[] // 初始数据
  hasNext?: boolean // 暂未用到，如果要提示“没有更多数据”可使用
  loading?: boolean
  columnCount?: number // 列数，默认2
  style?: CSSProperties
}

const props = withDefaults(defineProps<WaterfallProps>(), {
  createIntersectionObserverEnable: true,
  hasImage: true,
  columnCount: 2,
  list: () => [],
})

const emit = defineEmits<{
  (e: 'loadMore'): void
}>()

const genUuid = () => Math.random().toString(36).substring(2, 10)

// 内部状态
const columns = ref<
  { height: number; items: { data: any; imageLoaded: () => void }[]; id: string }[]
>([])
const taskQueue = new AsyncTaskQueue(props.columnCount) // 并发数量提高用户体验

// const columnsWpStyle = computed(() => {
//     return {
//         ...props.style,
//     };
// });

let intersectionObserver: any = null

const bottomAnchorId = `bottom-anchor-${genUuid()}`

// 初始化列数据
const initColumns = () => {
  columns.value = Array.from({ length: props.columnCount }, (_v, i) => ({
    height: 0,
    items: [],
    id: `column-${i}-${genUuid()}`,
  }))
}

// 找到高度最小的列索引
const findShortestColumnIndex = () => {
  return columns.value.reduce((minIndex, column, index) => {
    return column.height < columns.value[minIndex].height ? index : minIndex
  }, 0)
}

// 计算列高度
const updateColumnHeights = async () => {
  await nextTick()
  columns.value?.forEach((column) => {
    const element = document.getElementById(column.id)
    if (element) {
      const rect = element.getBoundingClientRect()
      column.height = rect.height ?? 0
    }
  })
}

// 追加新数据到瀑布流
const distributeNewItems = (newItems: any[]) => {
  newItems.forEach((item) => {
    const task = () =>
      new Promise(async (resolve, reject) => {
        try {
          await updateColumnHeights()
          const shortestIndex = findShortestColumnIndex()
          columns.value[shortestIndex].items.push({ data: item, imageLoaded: () => resolve('') })
          if (!props.hasImage) {
            resolve('')
          }
        } catch (err) {
          console.log(err)
          reject(err)
        }
      })
    taskQueue.enqueue(task)
  })
}

const addLoadMoreObserver = () => {
  // 提取观察器配置为常量
  const observerOptions = {
    rootMargin: '100px 0px',
    threshold: 0.1,
  }
  // 使用原生IntersectionObserver替换uni.createIntersectionObserver
  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !props.loading && props.hasNext) {
        emit('loadMore')
      }
    })
  }, observerOptions)
  // 观察底部锚点元素
  const bottomAnchor = document.getElementById(bottomAnchorId)
  if (bottomAnchor) {
    intersectionObserver.observe(bottomAnchor)
  }
}

watch(
  [() => props.list],
  ([list], [prevList]) => {
    // 判断是不是新增了元素

    if (
      Array.isArray(list) &&
      Array.isArray(prevList) &&
      list.length > prevList.length &&
      shallowCompareFirstNElements(list, prevList, prevList.length)
    ) {
      const newArr = list.slice(prevList.length)
      distributeNewItems(newArr)
    } else {
      taskQueue.clear()
      initColumns()
      if (list.length > 0) {
        distributeNewItems(list)
      }
    }
  },
  {
    immediate: true,
  },
)

// 初始化
onMounted(() => {
  addLoadMoreObserver()
})

onUnmounted(() => {
  taskQueue.clear()
  intersectionObserver?.disconnect()
})
</script>

<template>
  <div class="waterfall-wp">
    <div class="waterfall-columns-wp">
      <div v-for="(column, index) in columns" :key="index" class="waterfall-column" :id="column.id">
        <div v-for="(item, itemIndex) in column.items" :key="itemIndex" class="waterfall-item">
          <slot :data="item.data" :index="itemIndex" :image-loaded="item.imageLoaded"></slot>
        </div>
      </div>
    </div>
    <div
      :id="bottomAnchorId"
      class="bottom-anchor"
      :style="{ display: props.hasNext ? 'block' : 'none' }"
    >
      <Loading :loading="loading" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.waterfall-columns-wp {
  position: relative;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
  gap: 10px;
  padding: 10px;

  .waterfall-column {
    flex-shrink: 0;
  }

  .waterfall-item {
    width: 100%;
    break-inside: avoid;
    margin-bottom: 10px;
  }
}
.bottom-anchor {
  width: 100%;
  min-height: 10px;
}
</style>
