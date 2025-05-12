<script setup lang="ts">
import type { ClassValue } from "cva";

const props = defineProps<{
  class?: ClassValue;
}>();

const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <thead :class="cx('[&_tr]:border-b-2', props.class)" v-bind="delegated">
    <slot />
  </thead>
</template>
