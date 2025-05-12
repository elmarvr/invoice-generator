<script setup lang="ts">
import { OutputSchema } from "#shared/validators";
import { construct } from "radash";

definePageMeta({
  middleware: [
    (to, from) => {
      const data = construct(to.query);
      const result = OutputSchema.safeParse(data);

      if (!result.success) {
        return navigateTo({
          path: "/",
        });
      }

      to.meta.search = result.data;

      return true;
    },
  ],
});

const route = useRoute();

const search = computed(() => {
  return route.meta.search as unknown as (typeof OutputSchema)["_output"];
});

const format = {
  date(value: Date) {
    return value.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  },

  currency(value: number) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: search.value.currency,
    });
    return formatter.format(value);
  },

  hours(value: number) {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });
  },
};
</script>

<template>
  <div>
    <h1 class="font-bold text-xl pb-[2em]">
      {{ search.title }}
    </h1>

    <div class="grid grid-cols-2">
      <div class="space-y-[1em] pb-[2em]">
        <PdfDataList>
          <PdfDataListLabel>From</PdfDataListLabel>
          <PdfDataListValue>{{ search.from.name }}</PdfDataListValue>
          <PdfDataListValue>{{ search.from.address }}</PdfDataListValue>
          <PdfDataListValue>
            {{ search.from.postal }} {{ search.from.city }}
          </PdfDataListValue>
          <PdfDataListValue>{{ search.from.country }}</PdfDataListValue>
        </PdfDataList>

        <PdfDataList>
          <PdfDataListLabel>To</PdfDataListLabel>
          <PdfDataListValue>{{ search.to.name }}</PdfDataListValue>
          <PdfDataListValue v-if="search.to.address">
            {{ search.to.address }}
          </PdfDataListValue>
          <PdfDataListValue v-if="search.to.city">
            {{ search.to.postal }} {{ search.to.city }}
          </PdfDataListValue>
          <PdfDataListValue v-if="search.to.country">
            {{ search.to.country }}
          </PdfDataListValue>
        </PdfDataList>
      </div>

      <div class="space-y-[1em]">
        <PdfDataList>
          <PdfDataListLabel>Invoice No.</PdfDataListLabel>
          <PdfDataListValue>#INV-{{ search.invoice }}</PdfDataListValue>
        </PdfDataList>

        <PdfDataList>
          <PdfDataListLabel>Issued</PdfDataListLabel>
          <PdfDataListValue>{{ format.date(search.date) }}</PdfDataListValue>
        </PdfDataList>

        <PdfDataList>
          <PdfDataListLabel>Due</PdfDataListLabel>
          <PdfDataListValue>{{ format.date(search.due) }}</PdfDataListValue>
        </PdfDataList>
      </div>
    </div>

    <PdfTable>
      <PdfTableHeader>
        <PdfTableRow>
          <PdfTableHead>Description</PdfTableHead>
          <PdfTableHead class="text-end">Quantity</PdfTableHead>
          <PdfTableHead class="text-end">Rate</PdfTableHead>
          <PdfTableHead class="text-end">Amount</PdfTableHead>
        </PdfTableRow>
      </PdfTableHeader>
      <PdfTableBody>
        <PdfTableRow v-for="(item, index) of search.items" :key="index">
          <PdfTableCell>{{ item.description }}</PdfTableCell>
          <PdfTableCell class="text-end">
            {{ format.hours(item.quantity) }}
          </PdfTableCell>
          <PdfTableCell class="text-end">
            {{ format.currency(search.rate) }}
          </PdfTableCell>
          <PdfTableCell class="text-end">
            {{ format.currency(item.quantity * search.rate) }}
          </PdfTableCell>
        </PdfTableRow>
      </PdfTableBody>
    </PdfTable>
  </div>
</template>

<style>
@page {
  margin: 0.5in;
}
</style>
