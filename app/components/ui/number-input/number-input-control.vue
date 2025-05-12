<script setup lang="ts">
import {
  NumberInputControl as ArkNumberInputControl,
  NumberInputInput as ArkNumberInputInput,
  type NumberInputControlProps,
} from "@ark-ui/vue/number-input";

const props = defineProps<Omit<NumberInputControlProps, "asChild">>();
const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <ArkNumberInputControl v-bind="delegated">
    <ArkNumberInputInput class="w-full" as-child>
      <UiInput />
    </ArkNumberInputInput>
  </ArkNumberInputControl>
</template>
