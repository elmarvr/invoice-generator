<script setup lang="ts">
import {
  SelectContent as ArkSelectContent,
  SelectPositioner as ArkSelectPositioner,
  type SelectContentProps,
} from "@ark-ui/vue/select";

const props = defineProps<SelectContentProps>();
const delegated = reactiveOmit(props, ["class"]);
</script>

<template>
  <Teleport to="body">
    <ArkSelectPositioner>
      <ArkSelectContent
        v-bind="delegated"
        :class="
          cx(
            'relative z-50 p-1 overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
            props.class
          )
        "
      >
        <slot />
      </ArkSelectContent>
    </ArkSelectPositioner>
  </Teleport>
</template>
