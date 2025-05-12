<script setup lang="ts">
import {
  FieldTextarea as ArkFieldTextarea,
  type FieldTextareaProps,
} from "@ark-ui/vue/field";
import { useField } from "./use-field";

const props = defineProps<Omit<FieldTextareaProps, "modelValue" | "asChild">>();

const field = useField<any>();
const name = computed(() => unref(field.name));
</script>

<template>
  <ArkFieldTextarea
    v-bind="props"
    :modelValue="field.value.value"
    @update:model-value="field.handleChange"
    @blur="field.handleBlur"
    :name="name"
    as-child
  >
    <UiTextarea />
  </ArkFieldTextarea>
</template>
