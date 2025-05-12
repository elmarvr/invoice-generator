<script setup lang="ts">
import {
  NumberInputRootProvider as ArkNumberInputRootProvider,
  useNumberInput,
  type NumberInputRootEmits,
  type NumberInputRootProps,
} from "@ark-ui/vue/number-input";
import { useField } from "../field/use-field";

const props = defineProps<NumberInputRootProps>();
const emit = defineEmits<NumberInputRootEmits>();

const field = useField<string>();

const numberInput = useNumberInput(
  computed(() => {
    return {
      formatOptions: props.formatOptions,
      pattern: (props.formatOptions ? null : props.pattern) as never as string,
      value: field.value.value,
      onValueChange(details) {
        field.handleChange(details.value);
      },
      onBlur() {
        field.handleBlur();
      },
    };
  }),
  emit
);
</script>

<template>
  <ArkNumberInputRootProvider
    :value="numberInput"
    :class="cx('flex flex-col gap-1.5', props.class)"
  >
    <slot />
  </ArkNumberInputRootProvider>
</template>
