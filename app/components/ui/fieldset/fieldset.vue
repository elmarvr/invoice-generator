<script setup lang="ts">
import {
  FieldsetRoot as ArkFieldset,
  type FieldsetRootProps,
} from "@ark-ui/vue/fieldset";
import type { ClassValue } from "cva";

const props = defineProps<FieldsetRootProps & { class?: ClassValue }>();
const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <ArkFieldset
    v-bind="delegated"
    :class="cx('space-y-4 py-5 rounded-md *:first:mb-0', props.class)"
  >
    <slot />
  </ArkFieldset>
</template>
