<script setup lang="ts">
import {
  FieldInput as ArkFieldInput,
  type FieldInputProps,
} from "@ark-ui/vue/field";
import { useField } from "./use-field";

const props = defineProps<Omit<FieldInputProps, "modelValue" | "asChild">>();

const field = useField();
const name = computed(() => unref(field.name));
</script>

<template>
  <ArkFieldInput
    v-bind="props"
    :modelValue="field.value.value"
    @update:model-value="field.handleChange"
    @blur="field.handleBlur"
    :name="name"
    as-child
  >
    <UiInput />
  </ArkFieldInput>
</template>
