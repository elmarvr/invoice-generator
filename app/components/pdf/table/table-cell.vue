<script setup lang="ts">
import type { ClassValue } from "cva";

const props = defineProps<{
  class?: ClassValue;
}>();

const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <td :class="cx('p-2 align-middle', props.class)" v-bind="delegated">
    <slot />
  </td>
</template>
