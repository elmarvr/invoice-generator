<script setup lang="ts">
import {
  SelectLabel as ArkSelectLabel,
  type SelectLabelProps,
} from "@ark-ui/vue/select";

const props = defineProps<SelectLabelProps>();
</script>

<template>
  <ArkSelectLabel as-child>
    <UiLabel v-bind="props">
      <slot />
    </UiLabel>
  </ArkSelectLabel>
</template>
