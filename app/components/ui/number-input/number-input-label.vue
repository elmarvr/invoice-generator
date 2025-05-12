<script setup lang="ts">
import {
  NumberInputLabel as ArkNumberInputLabel,
  type NumberInputLabelProps,
} from "@ark-ui/vue/number-input";

const props = defineProps<NumberInputLabelProps>();
</script>

<template>
  <ArkNumberInputLabel as-child>
    <UiLabel v-bind="props">
      <slot />
    </UiLabel>
  </ArkNumberInputLabel>
</template>
