<script setup lang="ts" generic="T extends CollectionItem">
import {
  SelectRootProvider as ArkSelectRootProvider,
  useSelect,
  type CollectionItem,
  type SelectRootEmits,
  type SelectRootProps,
} from "@ark-ui/vue/select";
import { useField } from "../field/use-field";

const props = defineProps<SelectRootProps<T> & {}>();
const emit = defineEmits<SelectRootEmits<T>>();

const field = useField<string[]>();

const select = useSelect(
  computed(() => ({
    collection: props.collection,
    value: field.value.value,
    onValueChange(details: { value: string[] }) {
      field.handleChange(details.value);
    },
    onBlur() {
      field.handleBlur();
    },
  })),
  emit
);
</script>

<template>
  <ArkSelectRootProvider
    :value="select"
    :class="cx('flex flex-col gap-1.5', props.class)"
  >
    <slot />
  </ArkSelectRootProvider>
</template>
