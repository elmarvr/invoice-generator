<script setup lang="ts">
import type { ClassValue } from "cva";

const props = defineProps<{
  class?: ClassValue;
}>();
const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <textarea
    v-bind="delegated"
    :class="
      cx('min-h-20 text-sm p-3 border border-input rounded-md', props.class)
    "
  />
</template>
