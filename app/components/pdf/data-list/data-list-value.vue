<script setup lang="ts">
import type { ClassValue } from "cva";

const props = defineProps<{
  class?: ClassValue;
}>();
const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <div v-bind="delegated" :class="cx('text-sm', props.class)">
    <slot />
  </div>
</template>
