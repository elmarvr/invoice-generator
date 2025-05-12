<script setup lang="ts">
import { ark, type PolymorphicProps } from "@ark-ui/vue";
import type { ClassValue } from "cva";

const props = defineProps<
  {
    class?: ClassValue;
  } & PolymorphicProps
>();

const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <ark.tr
    :class="
      cx(
        'border-b transition-colors  data-[state=selected]:bg-muted',
        // hover:bg-muted/50
        props.class
      )
    "
    v-bind="delegated"
  >
    <slot />
  </ark.tr>
</template>
