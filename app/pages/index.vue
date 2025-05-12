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
</script>

<template>
  <div class="container mx-auto">
    <UiForm
      :schema="InputSchema"
      @submit="onSubmit"
      ref="form"
      :initial-values="initialValues"
    >
      <div class="grid grid-cols-2 gap-6">
        <UiFieldset class="col-start-1">
          <UiFieldsetLegend>From</UiFieldsetLegend>
          <UiField name="from.name">
            <UiFieldLabel>Name</UiFieldLabel>
            <UiFieldInput />
            <UiFieldError />
          </UiField>
          <UiField name="from.address">
            <UiFieldLabel>Address</UiFieldLabel>
            <UiFieldInput />
            <UiFieldError />
          </UiField>
          <div class="flex gap-6 *:flex-1">
            <UiField name="from.postal">
              <UiFieldLabel>Postal</UiFieldLabel>
              <UiFieldInput />
              <UiFieldError />
            </UiField>

            <UiField name="from.city">
              <UiFieldLabel>City</UiFieldLabel>
              <UiFieldInput />
              <UiFieldError />
            </UiField>
          </div>
          <UiField name="from.country">
            <UiFieldLabel>Country</UiFieldLabel>
            <UiFieldInput />
            <UiFieldError />
          </UiField>
        </UiFieldset>

        <UiFieldset>
          <UiFieldsetLegend>To</UiFieldsetLegend>
          <UiField name="to.name">
            <UiFieldLabel>Name</UiFieldLabel>
            <UiFieldInput />
            <UiFieldError />
          </UiField>
          <UiField name="to.address">
            <UiFieldLabel>Address</UiFieldLabel>
            <UiFieldInput />
            <UiFieldError />
          </UiField>
          <div class="flex gap-6 *:flex-1">
            <UiField name="to.postal">
              <UiFieldLabel>Postal</UiFieldLabel>
              <UiFieldInput />
              <UiFieldError />
            </UiField>
            <UiField name="to.city">
              <UiFieldLabel>City</UiFieldLabel>
              <UiFieldInput />
              <UiFieldError />
            </UiField>
          </div>
          <UiField name="to.country">
            <UiFieldLabel>Country</UiFieldLabel>
            <UiFieldInput />
            <UiFieldError />
          </UiField>
        </UiFieldset>
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
          <UiFieldLabel>Description</UiFieldLabel>
          <UiFieldTextarea class="flex-1" />
          <UiFieldError />
        </UiField>
      </UiFieldset>

      <UiButton type="submit" :disabled="isLoading">
        Submit
        <Icon
          v-if="isLoading"
          name="lucide:loader-circle"
          class="animate-spin"
        />
      </UiButton>
    </UiForm>
  </div>
</template>
