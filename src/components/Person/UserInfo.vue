<script setup lang="ts">
import { onMounted, ref, toRef } from "vue"
import { CalendarIcon, UserCircle } from "lucide-vue-next"
import i18n from "@/app/i18n"
import type { IPerson } from "@/models"
import { PersonService } from "@/services/others/person.service"
import InfoRow from "./InfoRow.vue"
import Divider from "./Divider.vue"
import PassportIcon from "./icon/PassportIcon.vue"

interface Props {
  person: IPerson
  title?: string
  hideImage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: i18n.global.t("serviceRecipient"),
})

const person = toRef(props, "person")
const personPhoto = ref("")

const setPhoto = async () => {
  if (person.value?.id) {
    const res = await PersonService.GetPhoto(person.value.id)
    personPhoto.value = `data:image/jpeg;base64, ${res.data}`
  }
}

onMounted(() => {
  if (!props.hideImage) setPhoto()
})
</script>

<template>
  <div class="w-full">
    <!-- Title -->
    <h4 class="text-lg font-semibold">{{ title }}:</h4>

    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Image -->
      <img
        v-if="!hideImage"
        :src="personPhoto"
        class="w-[150px] h-[200px] rounded-md object-cover mx-auto lg:mx-0"
        alt="Person photo"
      />

      <!-- Info -->
      <div class="flex-1 space-y-3">
        <!-- Birinchi row -->
        <div class="grid grid-cols-24 gap-x-2 gap-y-3">
          <!-- Birinchi InfoRow -->
          <InfoRow icon="user" class="col-span-24 md:col-span-11">
            <template #label>{{ $t("fullName") }}:</template>
            <template #value>
              <UserCircle :size="16" />
              <b>{{ person.fullName }}</b>
            </template>
          </InfoRow>

          <div class="col-span-2 h-full mx-auto hidden md:block">
            <Divider />
          </div>

          <!-- Ikkinchi InfoRow -->
          <InfoRow icon="calendar" class="col-span-24 md:col-span-11">
            <template #label>{{ $t("birthOn") }}</template>
            <template #value>
              <CalendarIcon :size="16" />
              <b>{{ person.birthDate }}</b>
            </template>
          </InfoRow>
        </div>

        <div class="grid grid-cols-24 gap-x-2 gap-y-3">
          <InfoRow class="col-span-24 md:col-span-11">
            <template #label>{{ $t("nationalityName") }}</template>
            <template #value>
              <b>{{ person.nationality }}</b>
            </template>
          </InfoRow>
          <div class="col-span-2 h-full mx-auto hidden md:block">
            <Divider />
          </div>

          <InfoRow class="col-span-24 md:col-span-11">
            <template #label>{{ $t("genderName") }}</template>
            <template #value>
              <b>{{ person.gender }}</b>
            </template>
          </InfoRow>
        </div>

        <div class="grid grid-cols-24 gap-x-2 gap-y-3">
          <InfoRow class="col-span-24 md:col-span-11">
            <template #label>{{ $t("doc") }}</template>
            <template #value>
              <PassportIcon size="16" />
              <b>{{ person.passportSeria }} - {{ person.passportNumber }}</b>
            </template>
          </InfoRow>
          <div class="col-span-2 h-full mx-auto hidden md:block">
            <Divider />
          </div>

          <InfoRow class="col-span-24 md:col-span-11">
            <template #label>{{ $t("pinfl") }}</template>
            <template #value>
              <b>{{ person.pinfl }}</b>
            </template>
          </InfoRow>
        </div>

        <div class="grid grid-cols-24 gap-x-2 gap-y-3">
          <InfoRow class="col-span-24 md:col-span-11">
            <template #label>{{ $t("docIssueOn") }}</template>
            <template #value>
              <CalendarIcon :size="16" />
              <b>{{ person.passportDate }}</b>
            </template>
          </InfoRow>
          <div class="col-span-2 h-full mx-auto hidden md:block">
            <Divider />
          </div>

          <InfoRow class="col-span-24 md:col-span-11">
            <template #label>{{ $t("docExpireOn") }}</template>
            <template #value>
              <CalendarIcon :size="16" />
              <b>{{ person.passportExpiration }}</b>
            </template>
          </InfoRow>
        </div>

        <div class="grid grid-cols-24 gap-x-2 gap-y-3">
          <InfoRow class="col-span-24 md:col-span-11">
            <template #label>{{ $t("region") }}</template>
            <template #value>
              <b>{{ person.livingRegion ?? "_" }}</b>
            </template>
          </InfoRow>
          <div class="col-span-2 h-full mx-auto hidden md:block">
            <Divider />
          </div>

          <InfoRow class="col-span-24 md:col-span-11">
            <template #label>{{ $t("district") }}</template>
            <template #value>
              <b>{{ person.livingDistrict ?? "_" }}</b>
            </template>
          </InfoRow>
        </div>

        <div class="grid grid-cols-24 gap-x-2 gap-y-3">
          <InfoRow class="col-span-24 md:col-span-11">
            <template #label>{{ $t("mfy") }}</template>
            <template #value>
              <MapPinIcon size="16" />
              <b>{{ person.livingMfy ?? "_" }}</b>
            </template>
          </InfoRow>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
