<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue";
import { z } from "zod";
import type { FormExpose, SubmissionHandler } from "~/components/ui/form.vue";

const currencies = [
  {
    value: "USD",
    label: "$ USD",
  },
  {
    value: "EUR",
    label: "€ EUR",
  },
  {
    value: "GBP",
    label: "£ GBP",
  },
] as const;

const currencyCollection = createListCollection({
  items: currencies,
  itemToString: (item) => item.label,
  itemToValue: (item) => item.value,
});

const schema = z.object({
  from: z.object({
    name: z.string(),
    postal: z.string(),
    city: z.string(),
    country: z.string(),
    address: z.string(),
  }),

  to: z.object({
    name: z.string(),
    postal: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    country: z.string().optional(),
  }),

  date: z.coerce.date(),
  due: z.coerce.date(),

  currency: z.enum(["USD", "EUR", "GBP"]).array(),
  rate: z.coerce.number(),
});

const form = useTemplateRef<FormExpose<typeof schema>>("form");
const onSubmit: SubmissionHandler<typeof schema> = async (data) => {
  console.log("Form submitted with data:", data);
};

const selectedCurrency = computed(() => {
  return form.value?.api.values.currency[0] ?? "EUR";
});
</script>

<template>
  <div class="container mx-auto">
    <UiForm
      :schema="schema"
      @submit="onSubmit"
      ref="form"
      :initial-values="{
        currency: ['EUR'],
      }"
    >
      <div class="grid grid-cols-2 gap-6">
        <UiFieldset>
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

      <UiFieldset>
        <UiFieldsetLegend>Details</UiFieldsetLegend>
        <div class="grid grid-cols-2 gap-6">
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

          <div class="flex gap-6">
            <UiField name="currency">
              <UiSelect :collection="currencyCollection">
                <UiSelectLabel>Currency</UiSelectLabel>
                <UiSelectControl />
                <UiSelectContent>
                  <UiSelectItem
                    :item="item"
                    v-for="item in currencyCollection.items"
                    :key="item.value"
                  >
                    {{ item.label }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
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
      </UiFieldset>

      <UiButton type="submit"> Submit </UiButton>
    </UiForm>
  </div>
</template>
