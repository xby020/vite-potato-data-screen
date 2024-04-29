<template>
  <div class="w-full h-full flex flex-col" ref="containerRef" :key="loopTime">
    <!-- header -->
    <div class="w-full" v-if="headerShow">
      <div class="w-full flex items-center" :class="headerClass">
        <!-- header Item -->
        <div
          v-for="(item, index) in header"
          :key="index"
          class="flex items-center"
          :class="`${placement(item.placement)}`"
          :style="countWidth(item.width)"
        >
          <!-- render Header -->
          <div v-if="item.headerRender" :style="item.headerStyle">
            <component :is="item.headerRender()"></component>
          </div>

          <!-- normal header -->
          <div v-else :style="item.headerStyle">
            {{ item.header }}
          </div>
        </div>
      </div>
    </div>

    <!-- pop loop container -->
    <div
      v-if="loopType === 'pop'"
      class="w-full flex-auto flex flex-col"
      v-auto-animate="true"
    >
      <!-- loop Item -->
      <div
        v-for="(item, itemIndex) in loopDataShow"
        :key="item.loopKey"
        class="w-full flex-auto flex items-center"
        :class="itemClass"
      >
        <!-- table item -->
        <div
          v-for="(head, index) in header"
          :key="index"
          class="flex items-center"
          :class="`${placement(head.placement)}`"
          :style="countWidth(head.width)"
        >
          <!-- render loop Item -->
          <div v-if="head.itemRender" :style="head.itemStyle">
            <component :is="head.itemRender(item, itemIndex)"></component>
          </div>

          <!-- normal loop Item -->
          <div v-else :style="head.itemStyle">
            {{ item[head.key] }}
          </div>
        </div>
      </div>
    </div>

    <!-- waterfall loop container -->
    <transition-group
      v-if="loopType === 'waterfall'"
      tag="div"
      name="list"
      class="relative w-full flex-auto overflow-hidden"
    >
      <!-- loop Item -->
      <div
        v-for="(item, itemIndex) in loopDataShow"
        :key="item.loopKey"
        class="absolute w-full flex-auto flex items-center transition-all transform-gpu ease-linear"
        :class="itemClass"
        :style="{
          transitionDuration: `${props.loopTime}ms`,
          height: `${100 / showCount}%`,
          top: `${(100 / showCount) * itemIndex}%`,
        }"
      >
        <!-- table item -->
        <div
          v-for="(head, index) in header"
          :key="index"
          class="flex items-center"
          :class="`${placement(head.placement)}`"
          :style="countWidth(head.width)"
        >
          <!-- render loop Item -->
          <div v-if="head.itemRender" :style="head.itemStyle">
            <component :is="head.itemRender(item, itemIndex)"></component>
          </div>

          <!-- normal loop Item -->
          <div v-else :style="head.itemStyle">
            {{ item[head.key] }}
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string,any>">
type LoopListItem = {
  header?: string;
  key: string;
  headerRender?: () => VNode;
  placement?: string;
  itemRender?: (item: T, index: number) => VNode;
  width?: number | string;
  headerStyle?: string | Record<string, string>;
  itemStyle?: string | Record<string, string>;
};

interface Props {
  prefab?: 'table' | 'custom';
  header?: Array<LoopListItem>;
  headerShow?: boolean;
  headerClass?: string;
  itemClass?: string;
  showCount?: number;
  loopTime?: number;
  data?: T[];
  loopType?: 'pop' | 'waterfall';
}

const props = withDefaults(defineProps<Props>(), {
  prefab: 'table',
  header: () => [],
  headerShow: true,
  data: () => [],
  loopTime: 3000,
  showCount: 3,
  loopType: 'pop',
  reverse: false,
  infinite: false,
});

// dom Ref
const containerRef = ref<HTMLElement>();

// placement
const placement = (placement?: string) => {
  switch (placement) {
    case 'left':
      return 'justify-start';
    case 'right':
      return 'justify-end';
    case 'center':
      return 'justify-center';
    default:
      return 'justify-center';
  }
};

// count width
const { width: containerWidth } = useElementSize(containerRef);

function countWidth(width: number | string | undefined) {
  if (width) {
    if (typeof width === 'number') {
      return {
        flex: `${width} ${width} ${width}px`,
      };
    } else {
      return {
        flex: `0 0 ${width}`,
      };
    }
  } else {
    return {
      flex: '1 1 0',
    };
  }
}

// loop
const loopIndex = ref(0);
const showCount = computed(() => {
  return props.data.length > props.showCount
    ? props.showCount
    : props.data.length;
});

// loop timer
const loopTimer = ref<NodeJS.Timeout | null>(null);

type LoopDataItem = T & { loopKey: string };

const loopDataCount = (): LoopDataItem[] => {
  const timeString = new Date().getTime().toString();
  return props.data.map((item, index) => {
    return {
      ...item,
      loopKey: `${timeString}-${index}`,
    };
  });
};
const loopShowDataCount = (): LoopDataItem[] => {
  const timeString = new Date().getTime().toString();

  const endIndex = loopIndex.value + showCount.value;
  if (endIndex >= loopData.value.length) {
    const tail = loopData.value.slice(loopIndex.value, loopData.value.length);
    const head = loopData.value.slice(0, endIndex - props.data.length);

    const headLastone = head[head.length - 1];
    if (headLastone) {
      headLastone.loopKey = `${timeString}-${
        headLastone.loopKey.split('-')[1]
      }`;
    }

    return [...tail, ...head];
  } else {
    return loopData.value.slice(loopIndex.value, endIndex);
  }
};

const loopData = ref<LoopDataItem[]>([]) as Ref<LoopDataItem[]>;
const loopDataShow = ref<LoopDataItem[]>([]) as Ref<LoopDataItem[]>;

onMounted(() => {
  loopData.value = loopDataCount();
  loopDataShow.value = loopShowDataCount();

  if (props.loopTime) {
    loopTimer.value = setInterval(() => {
      loopIndex.value++;
      if (loopIndex.value >= loopData.value.length) {
        loopIndex.value = 0;
      }

      loopDataShow.value = loopShowDataCount();
    }, props.loopTime);
  }
});

onUnmounted(() => {
  if (loopTimer.value) {
    clearInterval(loopTimer.value);
  }
});
</script>

<style scoped>
.list-enter-from {
  transform: translateY(100%);
}
.list-enter-to {
  transform: translateY(0);
}

.list-leave-to {
  transform: translateY(-100%);
}
</style>
