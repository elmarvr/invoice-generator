<script setup lang="ts">
import type { ClassValue } from "cva";

const props = defineProps<{
  class?: ClassValue;
}>();

const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <th
    :class="cx('h-10 px-2 text-left align-middle font-bold', props.class)"
    v-bind="delegated"
  >
    <slot />
  </th>
</template>
