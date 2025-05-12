<script setup lang="ts">
import type { ClassValue } from "cva";

const props = defineProps<{
  class?: ClassValue;
}>();

const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <tbody
    :class="cx('[&_tr:last-child]:border-0', props.class)"
    v-bind="delegated"
  >
    <slot />
  </tbody>
</template>
