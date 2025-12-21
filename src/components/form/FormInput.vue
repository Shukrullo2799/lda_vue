<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, useSlots, ref, watch, onMounted, onBeforeUnmount } from "vue"
import { cn } from "@/lib/utils"
import Input from "@/components/ui/input/Input.vue"
import { useField } from "vee-validate"
import { useI18n } from "vue-i18n"

interface Props {
  modelValue?: string | number
  name?: string
  rules?: any
  validateOnMount?: boolean
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  type?: string
  id?: string
  class?: HTMLAttributes["class"]
  inputClass?: HTMLAttributes["class"]
  labelClass?: HTMLAttributes["class"]
  errorClass?: HTMLAttributes["class"]
  required?: boolean
  minLength?: number
  maxLength?: number
  minValue?: number
  maxValue?: number
  pattern?: string | RegExp
  customValidator?: (value: string | number | undefined) => true | string
  validateOn?: "input" | "blur" | "change" | "eager"
  debounceMs?: number
  errorMessages?: Partial<
    Record<
      | "required"
      | "minLength"
      | "maxLength"
      | "minValue"
      | "maxValue"
      | "pattern"
      | "email"
      | "number",
      string
    >
  >
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  validateOn: "blur",
  debounceMs: 0,
  inputClass: "h-10",
})

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()
defineOptions({
  inheritAttrs: false,
})
const slots = useSlots()
const { t } = useI18n()

// Helpers
const isEmpty = (v: unknown) => v === undefined || v === null || String(v).trim() === ""
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

// Avtomatik rules generator
const autoRules = computed(() => {
  const rulesArr: ((v: unknown) => true | string)[] = []

  // required
  if (props.required) {
    rulesArr.push((v) =>
      !isEmpty(v) ? true : (props.errorMessages?.required ?? t("validation.required")),
    )
  }

  // type-based rules
  if (props.type === "email") {
    rulesArr.push((v) =>
      isEmpty(v) || isEmail(String(v))
        ? true
        : (props.errorMessages?.email ?? t("validation.email")),
    )
  }

  if (props.type === "number") {
    rulesArr.push((v) =>
      isEmpty(v) || !isNaN(Number(v))
        ? true
        : (props.errorMessages?.number ?? t("validation.number")),
    )
  }

  if (props.type === "password" && props.minLength === undefined) {
    // default password length 6
    rulesArr.push((v) =>
      String(v ?? "").length >= 6 ? true : t("validation.minChars", { count: 6 }),
    )
  }

  // minLength
  if (props.minLength !== undefined) {
    rulesArr.push((v) =>
      props.minLength && String(v ?? "").length >= props.minLength
        ? true
        : (props.errorMessages?.minLength ?? t("validation.minChars", { count: props.minLength })),
    )
  }

  // maxLength
  if (props.maxLength !== undefined) {
    rulesArr.push((v) =>
      props.maxLength && String(v ?? "").length <= props.maxLength
        ? true
        : (props.errorMessages?.maxLength ?? t("validation.maxChars", { count: props.maxLength })),
    )
  }
  // minValue
  if (props.minValue !== undefined) {
    rulesArr.push((v) => {
      if (isEmpty(v)) return true
      return Number(v) >= props.minValue!
        ? true
        : (props.errorMessages?.minValue ?? t("validation.minValue", { count: props.minValue }))
    })
  }

  // maxValue
  if (props.maxValue !== undefined) {
    rulesArr.push((v) => {
      if (isEmpty(v)) return true
      return Number(v) <= props.maxValue!
        ? true
        : (props.errorMessages?.maxValue ?? t("validation.maxValue", { count: props.maxValue }))
    })
  }

  // pattern
  if (props.pattern) {
    const re = props.pattern instanceof RegExp ? props.pattern : new RegExp(props.pattern)
    rulesArr.push((v) =>
      isEmpty(v) || re.test(String(v))
        ? true
        : (props.errorMessages?.pattern ?? t("validation.pattern")),
    )
  }

  // custom validator
  if (props.customValidator) {
    rulesArr.push((v: any) => {
      const res = props.customValidator!(v)
      return res === true ? true : typeof res === "string" ? res : t("validation.invalid")
    })
  }

  // merge with user provided rules
  if (props.rules) {
    if (Array.isArray(props.rules)) {
      return [...rulesArr, ...props.rules]
    } else {
      return [...rulesArr, props.rules]
    }
  }

  return rulesArr
})

// vee-validate integration
const field = props.name
  ? useField<string | number>(props.name, autoRules.value as any, {
      initialValue: props.modelValue as any,
      validateOnMount: props.validateOnMount,
    })
  : null

const innerValue = computed<string | number | undefined>({
  get() {
    return field ? field.value.value : props.modelValue
  },
  set(v) {
    emits("update:modelValue", v as any)
    if (field) field.setValue(v as any)
  },
})

// error state
const displayedError = computed<string | undefined>(() => {
  if (props.error) return props.error
  if (field && field.errorMessage.value) return field.errorMessage.value as string
  return undefined
})

const hasError = computed(() => !!displayedError.value)

const inputClasses = computed(() =>
  cn(
    hasError.value &&
      "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50",
    slots.prefix && "pl-10",
    slots.suffix && "pr-10",
    props.inputClass,
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
const inputId = computed(() => props.id || (props.name ? `fi-${props.name}` : undefined))
</script>

<template>
  <div :class="containerClasses">
    <label v-if="label" :for="inputId" :class="labelClasses">{{ label }}</label>

    <div class="relative">
      <div
        v-if="slots.prefix"
        class="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground z-10"
      >
        <slot name="prefix" />
      </div>

      <Input
        v-model="innerValue"
        :id="inputId"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="hasError"
        :class="inputClasses"
        v-bind="$attrs"
      />

      <div
        v-if="slots.suffix"
        class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground z-10"
      >
        <slot name="suffix" />
      </div>
    </div>

    <div v-if="displayedError" :class="errorClasses" role="alert">
      {{ displayedError }}
    </div>
  </div>
</template>
