<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useSlots } from "vue"
import { cn } from "@/lib/utils"
import { useField } from "vee-validate"
import { useI18n } from "vue-i18n"

export interface GenericOption<T = any> {
  [key: string]: T
}

interface Props<T = any> {
  modelValue?: T | T[] | null
  name?: string
  rules?: any
  validateOnMount?: boolean
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  class?: HTMLAttributes["class"]
  selectClass?: HTMLAttributes["class"]
  selectTriggerClass?: HTMLAttributes["class"]
  labelClass?: HTMLAttributes["class"]
  errorClass?: HTMLAttributes["class"]
  required?: boolean
  validateOn?: "input" | "blur" | "change" | "eager"
  options: GenericOption[]
  optionLabel?: string
  optionValue?: string
  returnObject?: boolean
  multiple?: boolean
  errorMessages?: Partial<Record<"required", string>>
  customValidator?: (value: any) => true | string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  validateOn: "blur",
  optionLabel: "text",
  optionValue: "value",
  returnObject: false,
  multiple: false,
  selectTriggerClass: "!h-10",
})

const emits = defineEmits<{
  (e: "update:modelValue", payload: any): void
}>()

const { t } = useI18n()
const slots = useSlots()

// helpers
const isEmpty = (v: unknown) => {
  if (Array.isArray(v)) return v.length === 0
  return v === undefined || v === null || String(v).trim() === ""
}

// auto rules
const autoRules = computed(() => {
  const rulesArr: ((v: unknown) => true | string)[] = []

  if (props.required) {
    rulesArr.push((v) =>
      !isEmpty(v) ? true : (props.errorMessages?.required ?? t("validation.required")),
    )
  }

  if (props.customValidator) {
    rulesArr.push((v: any) => {
      const res = props.customValidator!(v)
      return res === true ? true : typeof res === "string" ? res : t("validation.invalid")
    })
  }

  if (props.rules) {
    return Array.isArray(props.rules) ? [...rulesArr, ...props.rules] : [...rulesArr, props.rules]
  }

  return rulesArr
})

// vee-validate integration
const field = props.name
  ? useField<any>(props.name, autoRules.value as any, {
      initialValue: props.modelValue,
      validateOnMount: props.validateOnMount,
    })
  : null

// innerValue transform
const innerValue = computed({
  get() {
    if (!props.returnObject) return field ? field.value.value : props.modelValue

    // returnObject = true
    if (props.multiple) {
      const current = (field ? field.value.value : props.modelValue) as any[] | null
      return current
        ? props.options.filter((opt) =>
            current.some(
              (c: any) => c[props.optionValue] && c[props.optionValue] === opt[props.optionValue],
            ),
          )
        : []
    } else {
      const current = field ? field.value.value : props.modelValue
      return (
        props.options.find((opt) => opt[props.optionValue] === current?.[props.optionValue]) ?? null
      )
    }
  },
  set(v) {
    let payload: any
    if (!props.returnObject) {
      payload = v
    } else {
      if (props.multiple) {
        payload = Array.isArray(v)
          ? v.map(
              (o: any) =>
                props.options.find((opt) => opt[props.optionValue] === o[props.optionValue]) ?? o,
            )
          : []
      } else {
        payload = v
      }
    }

    emits("update:modelValue", payload)
    if (field) field.setValue(payload)
  },
})

// error state
const displayedError = computed<string | undefined>(() => {
  if (props.error) return props.error
  if (field && field.errorMessage.value) return field.errorMessage.value as string
  return undefined
})

const hasError = computed(() => !!displayedError.value)

const selectClasses = computed(() =>
  cn(
    hasError.value &&
      "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50",
    props.selectClass,
  ),
)

const labelClasses = computed(() =>
  cn(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block",
    hasError.value && "text-destructive",
    props.labelClass,
  ),
)

const errorClasses = computed(() => cn("text-sm text-destructive mt-1", props.errorClass))
const containerClasses = computed(() => cn("space-y-2", props.class))
</script>

<template>
  <div :class="containerClasses">
    <label v-if="label" :class="labelClasses">{{ label }}</label>

    <Select
      v-model="innerValue"
      :disabled="disabled"
      :multiple="multiple"
      :aria-invalid="hasError"
      :class="selectClasses"
    >
      <SelectTrigger class="w-full" :class="[selectClasses, selectTriggerClass]">
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            v-for="option in options"
            :key="option[optionValue]"
            :value="returnObject ? option : option[optionValue]"
          >
            {{ option[optionLabel] }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <div v-if="displayedError" :class="errorClasses" role="alert">
      {{ displayedError }}
    </div>
  </div>
</template>
