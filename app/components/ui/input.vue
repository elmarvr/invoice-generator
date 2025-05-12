<script setup lang="ts">
import type { ClassValue } from "cva";
import type { InputHTMLAttributes } from "vue";

const props = defineProps<{
  type?: InputHTMLAttributes["type"];
  class?: ClassValue;
}>();
const delegated = reactiveOmit(props, ["class"]);

const modelValue = defineModel<any>();
</script>

<template>
  <input
    v-bind="delegated"
    v-model="modelValue"
    :class="cx('h-8 text-sm px-3 border border-input rounded-md', props.class)"
  />
</template>
