<script setup lang="ts">
import {
  SelectControl as ArkSelectControl,
  SelectTrigger as ArkSelectTrigger,
  SelectValueText as ArkSelectValueText,
} from "@ark-ui/vue/select";
import type { ClassValue } from "cva";

const props = defineProps<{
  class?: ClassValue;
  placeholder?: string;
}>();
const delegated = reactiveOmit(props, ["class", "placeholder"]);
</script>

<template>
  <ArkSelectControl v-bind="delegated">
    <ArkSelectTrigger
      class="w-full px-4 hover:cursor-pointer text-sm h-8 border rounded-md border-input hover:bg-accent hover:text-accent-foreground transition"
    >
      <slot>
        <ArkSelectValueText :placeholder="placeholder" />
      </slot>
    </ArkSelectTrigger>
  </ArkSelectControl>
</template>
