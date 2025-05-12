<script setup lang="ts">
import {
  FieldsetLegend as ArkFieldsetLegend,
  type FieldsetLegendProps,
} from "@ark-ui/vue/fieldset";
import type { ClassValue } from "cva";

const props = defineProps<FieldsetLegendProps & { class?: ClassValue }>();
const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <ArkFieldsetLegend
    v-bind="delegated"
    :class="cx('font-semibold', props.class)"
  >
    <slot />
  </ArkFieldsetLegend>
</template>
