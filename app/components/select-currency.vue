<script setup lang="ts">
import { createListCollection } from "@ark-ui/vue";

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

const collection = createListCollection({
  items: currencies,
  itemToString: (item) => item.label,
  itemToValue: (item) => item.value,
});
</script>

<template>
  <UiSelect :collection="collection">
    <slot />
    <UiSelectContent>
      <UiSelectItem
        :item="item"
        v-for="item in collection.items"
        :key="item.value"
      >
        {{ item.label }}
      </UiSelectItem>
    </UiSelectContent>
  </UiSelect>
</template>
