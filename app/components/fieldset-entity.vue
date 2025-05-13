<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <UiFieldset>
    <slot />
    <UiField :name="`${name}.name`">
      <UiFieldLabel>Name</UiFieldLabel>
      <UiFieldInput />
      <UiFieldError />
    </UiField>
    <UiField :name="`${name}.address`">
      <UiFieldLabel>Address</UiFieldLabel>
      <UiFieldInput />
      <UiFieldError />
    </UiField>
    <div class="flex gap-6 *:flex-1">
      <UiField :name="`${name}.postal`">
        <UiFieldLabel>Postal</UiFieldLabel>
        <UiFieldInput />
        <UiFieldError />
      </UiField>

      <UiField :name="`${name}.city`">
        <UiFieldLabel>City</UiFieldLabel>
        <UiFieldInput />
        <UiFieldError />
      </UiField>
    </div>
    <UiField :name="`${name}.country`">
      <UiFieldLabel>Country</UiFieldLabel>
      <UiFieldInput />
      <UiFieldError />
    </UiField>
  </UiFieldset>
</template>
