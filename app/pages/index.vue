<script setup lang="ts">
import type {
  FormExpose,
  PartialDeep,
  SubmissionHandler,
} from "~/components/ui/form.vue";
import { InputSchema } from "#shared/validators";
import { toQueryString } from "#shared/utils";

const form = useTemplateRef<FormExpose<typeof InputSchema>>("form");
const isLoading = ref(false);

const initialValues = {
  currency: ["EUR"],
} satisfies PartialDeep<(typeof InputSchema)["_input"]>;

const onSubmit: SubmissionHandler<typeof InputSchema> = async (data) => {
  const qs = toQueryString(data);
  isLoading.value = true;
  window.location.href = `/render?${qs}`;
};

const selectedCurrency = computed(() => {
  return form.value?.api.values.currency[0] ?? initialValues.currency[0];
});

onBeforeRouteLeave(() => {
  isLoading.value = false;
});
</script>

<template>
  <div class="container mx-auto p-8">
    <div class="max-w-2xl">
      <h1 class="text-3xl font-bold mb-4">AI Invoice Generator</h1>
      <p class="mb-8">
        Describe your work or hours in your own words. Google AI will turn it
        into a professional invoice. Just fill in the details below and submit.
      </p>
    </div>

    <UiForm
      :schema="InputSchema"
      @submit="onSubmit"
      ref="form"
      :initial-values="initialValues"
    >
      <div class="grid grid-cols-2 gap-6">
        <FieldsetEntity name="from">
          <UiFieldsetLegend>From</UiFieldsetLegend>
        </FieldsetEntity>
        <FieldsetEntity name="to">
          <UiFieldsetLegend>To</UiFieldsetLegend>
        </FieldsetEntity>
      </div>

      <UiFieldset class="grid grid-cols-2 gap-6">
        <UiFieldsetLegend>Details</UiFieldsetLegend>

        <div class="space-y-4 mb-0">
          <div class="flex gap-6 *:flex-1">
            <UiField name="title">
              <UiFieldLabel>Title</UiFieldLabel>
              <UiFieldInput />
              <UiFieldError />
            </UiField>

            <UiField name="invoice">
              <UiNumberInput input-mode="numeric">
                <UiNumberInputLabel>Invoice</UiNumberInputLabel>
                <UiNumberInputControl />
              </UiNumberInput>
              <UiFieldError />
            </UiField>
          </div>

          <div class="flex gap-6 *:flex-1">
            <UiField name="date">
              <UiFieldLabel>Date</UiFieldLabel>
              <UiFieldInput type="date" />
              <UiFieldError />
            </UiField>
            <UiField name="due">
              <UiFieldLabel>Due</UiFieldLabel>
              <UiFieldInput type="date" />
              <UiFieldError />
            </UiField>
          </div>

          <div class="flex gap-3">
            <UiField name="currency">
              <SelectCurrency>
                <UiSelectLabel>Currency</UiSelectLabel>
                <UiSelectControl />
              </SelectCurrency>

              <UiFieldError />
            </UiField>

            <UiField name="rate" class="flex-1">
              <UiNumberInput
                :format-options="{
                  style: 'currency',
                  currency: selectedCurrency,
                }"
              >
                <UiNumberInputLabel>Rate</UiNumberInputLabel>
                <UiNumberInputControl />
              </UiNumberInput>
              <UiFieldError />
            </UiField>
          </div>
        </div>
        <UiField name="prompt">
          <UiFieldLabel>Hours description</UiFieldLabel>
          <UiFieldTextarea class="flex-1" />
          <UiFieldError />
        </UiField>
      </UiFieldset>

      <UiButton type="submit" :disabled="isLoading" class="h-10">
        Generate Invoice
        <Icon
          v-if="isLoading"
          name="lucide:loader-circle"
          class="animate-spin"
        />
      </UiButton>
    </UiForm>
  </div>
</template>
