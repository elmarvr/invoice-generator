<script lang="ts">
export type SubmissionHandler<TSchema extends z.ZodTypeAny> = (
  values: TSchema["_output"],
  ctx: SubmissionContext<TSchema["_input"]>
) => void;

export type FormExpose<TSchema extends z.ZodTypeAny> = {
  api: FormContext<TSchema["_input"], TSchema["_output"]>;
};

export type PartialDeep<T> = {
  [K in keyof T]?: T[K] extends object ? PartialDeep<T[K]> : T[K];
};
</script>

<script setup lang="ts" generic="TSchema extends z.ZodTypeAny">
import {
  useForm,
  type FormContext,
  type SubmissionContext,
} from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { z } from "zod";
import type { ClassValue } from "cva";

const props = defineProps<{
  schema: TSchema;
  class?: ClassValue;
  initialValues?: PartialDeep<TSchema["_input"]>;
}>();

const emit = defineEmits<{
  (
    e: "submit",
    values: TSchema["_output"],
    context: SubmissionContext<TSchema["_input"]>
  ): void;
}>();

const form = useForm({
  validationSchema: computed(() => toTypedSchema(props.schema)),
  get initialValues() {
    return props.initialValues as any;
  },
});

const onSubmit = form.handleSubmit(
  (values, ctx) => emit("submit", values, ctx),
  () => {}
);

defineExpose({
  api: form as FormExpose<TSchema>["api"],
});
</script>

<template>
  <form @submit="onSubmit" :class="cx('space-y-6', props.class)">
    <slot />
  </form>
</template>
