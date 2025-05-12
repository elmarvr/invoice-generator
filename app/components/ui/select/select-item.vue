<script setup lang="ts">
import {
  SelectItem as ArkSelectItem,
  SelectItemText as ArkSelectItemText,
  type SelectItemProps,
} from "@ark-ui/vue/select";

const props = defineProps<SelectItemProps>();
const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <ArkSelectItem
    v-bind="delegated"
    :class="
      cx(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class
      )
    "
  >
    <ArkSelectItemText>
      <slot />
    </ArkSelectItemText>
  </ArkSelectItem>
</template>
