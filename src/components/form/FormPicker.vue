<script setup lang="ts">
import { ref, computed, watch, type HTMLAttributes } from "vue"
import { useI18n } from "vue-i18n"
import DatePicker from "vue-datepicker-next"
import "vue-datepicker-next/index.css"
import { Input } from "@/components/ui/input"
import { useField } from "vee-validate"
import { cn } from "@/lib/utils"

interface Props {
  modelValue?: Date | string
  name?: string
  label?: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  rules?: ((val: any) => true | string)[]
  customValidator?: (val: any) => true | string
  validateOnMount?: boolean
  class?: HTMLAttributes["class"]
  inputClass?: HTMLAttributes["class"]
  format?: string
  mask?: string
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "DD.MM.YYYY",
  type: "date",
  clearable: false,
  format: "DD.MM.YYYY",
  mask: "##.##.####",
  inputClass: "h-10 cursor-pointer",
})

const emit = defineEmits<{
  (e: "update:modelValue", value: Date | string): void
}>()

const { t } = useI18n()

const innerValue = ref<Date | string>(props.modelValue ?? "")
const autoRules = computed(() => {
  const arr: ((v: any) => true | string)[] = []
  if (props.required) arr.push((v) => (v ? true : t("validation.required")))
  if (props.customValidator) arr.push(props.customValidator)
  if (props.rules) arr.push(...props.rules)
  return arr
})

const field = props.name
  ? useField<Date | string>(props.name, autoRules.value as any, {
      initialValue: innerValue.value,
      validateOnMount: props.validateOnMount,
    })
  : null

watch(innerValue, (val) => {
  emit("update:modelValue", val)
  if (field) field.setValue(val)
})

const hasError = computed(() => !!field?.errorMessage.value)
const displayedError = computed(() => field?.errorMessage.value)
const containerClasses = computed(() => cn("space-y-2", props.class))

const inputClasses = computed(() =>
  cn(
    hasError.value &&
      "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50",
  ),
)

const labelClasses = computed(() =>
  cn(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block",
    hasError.value && "text-destructive",
  ),
)
</script>

<template>
  <div :class="containerClasses">
    <label v-if="label" :class="labelClasses">{{ label }}</label>
    <DatePicker
      v-model:value="innerValue"
      value-type="format"
      :clearable="clearable"
      :type="type"
      :disabled="disabled"
      :format="format"
      class="!w-full"
      v-maska="mask"
    >
      <template #input>
        <Input
          :disabled="disabled"
          :placeholder="placeholder"
          v-model="innerValue as string"
          :aria-invalid="hasError"
          :class="[inputClasses, inputClass]"
        />
      </template>
    </DatePicker>

    <p v-if="hasError" class="text-sm text-destructive mt-1">{{ displayedError }}</p>
  </div>
</template>
