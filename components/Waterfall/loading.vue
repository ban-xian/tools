<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    loading?: boolean;
}>();

const loadText = computed(() => {
    return props.loading ? '加载中...' : '';
});
</script>

<template>
    <div
        class="loading-bar"
        :class="{ visible: loading }"
    >
        <div
            v-if="loading"
            class="loading-circle"
        ></div>
        <div class="load-text">{{ loadText }}</div>
    </div>
</template>

<style lang="scss" scoped>
@-webkit-keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.loading-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: row;
    height: 10px;
    transition: all ease 0.3s;
    &.visible {
        height: 66px;
        box-sizing: border-box;
        padding-bottom: 20px;
    }
}
.loading-circle {
    display: block;
    width: 20px;
    height: 20px;
    border-style: solid;
    border-width: 4px;
    border-color: rgba(0, 204, 255, 1) rgba(0, 204, 255, 1) rgba(0, 204, 255, 1) transparent;
    border-radius: 50%;
    -webkit-animation: rotate 1s linear infinite;
    animation: rotate 1s linear infinite;
}
.load-text {
    margin-left: 10px;
    color: #8a9399;
    font-size: 24px;
    line-height: 40px;
}
</style>
