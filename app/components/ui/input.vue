<script setup lang="ts">
import type { ClassValue } from "cva";
import type { InputHTMLAttributes } from "vue";

const props = defineProps<{
  type?: InputHTMLAttributes["type"];
  class?: ClassValue;
}>();

const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <input
    v-bind="delegated"
    :class="cx('h-8 text-sm px-3 border border-input rounded-md', props.class)"
  />
</template>
