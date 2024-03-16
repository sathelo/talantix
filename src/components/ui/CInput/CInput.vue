<template>
  <section class="input">
    <label class="input__label">
      <img :src="pathImage" alt="search" class="input__ico" />
    </label>
    <input
      v-model="value"
      :placeholder="placeholder"
      type="search"
      class="input__field"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface IEmits {
  (e: "update:modelValue", v: string): void;
  (e: "change", v: string): void;
}
interface IProps {
  pathImage: string;
  modelValue?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: "Text...",
});
const emits = defineEmits<IEmits>();

const valueLocal = ref("");
const value = computed({
  get: () => props.modelValue ?? valueLocal.value,
  set: (value) => {
    valueLocal.value = value;
    emits("update:modelValue", value);
    emits("change", value);
  },
});
</script>

<style lang="scss" scoped>
.input {
  display: flex;

  &__label {
    border-right: 1px solid var(--text-gray-lighten);
    padding: 6px 8px;
  }

  &__ico {
    display: flex;
    width: 100%;
    max-width: 16px;
    opacity: 0.5;
  }

  &__field {
    width: 100%;
    padding: 6px 8px;
  }
}
</style>
