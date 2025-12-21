import { defineStore } from 'pinia'
import type { Doctor, CreateDoctorRequest, UpdateDoctorRequest } from '../types/doctor'

export const useDoctorStore = defineStore('doctor', {
  state: () => ({
    doctors: [] as Doctor[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getDoctorById: (state) => (id: string) => {
      return state.doctors.find((doctor) => doctor.id === id)
    },

    getDoctorsBySpecialization: (state) => (specialization: string) => {
      return state.doctors.filter((doctor) =>
        doctor.specialization.toLowerCase().includes(specialization.toLowerCase()),
      )
    },

    getDoctorsByExperience: (state) => (minExperience: number) => {
      return state.doctors.filter((doctor) => doctor.experience >= minExperience)
    },
  },

  actions: {
    async fetchDoctors() {
      this.loading = true
      this.error = null

      try {
        // Здесь будет API вызов
        // const response = await doctorService.getDoctors()
        // this.doctors = response.data

        // Временные данные для примера
        this.doctors = []
      } catch (error) {
        this.error = 'Failed to fetch doctors'
        console.error('Error fetching doctors:', error)
      } finally {
        this.loading = false
      }
    },

    async createDoctor(doctorData: CreateDoctorRequest) {
      this.loading = true
      this.error = null

      try {
        // Здесь будет API вызов
        // const response = await doctorService.createDoctor(doctorData)
        // this.doctors.push(response.data)

        // Временная логика для примера
        const newDoctor: Doctor = {
          id: Date.now().toString(),
          ...doctorData,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        this.doctors.push(newDoctor)
      } catch (error) {
        this.error = 'Failed to create doctor'
        console.error('Error creating doctor:', error)
      } finally {
        this.loading = false
      }
    },

    async updateDoctor(doctorData: UpdateDoctorRequest) {
      this.loading = true
      this.error = null

      try {
        // Здесь будет API вызов
        // const response = await doctorService.updateDoctor(doctorData)

        // Временная логика для примера
        const index = this.doctors.findIndex((doctor) => doctor.id === doctorData.id)
        if (index !== -1) {
          this.doctors[index] = {
            ...this.doctors[index],
            ...doctorData,
            updatedAt: new Date(),
          }
        }
      } catch (error) {
        this.error = 'Failed to update doctor'
        console.error('Error updating doctor:', error)
      } finally {
        this.loading = false
      }
    },

    async deleteDoctor(id: string) {
      this.loading = true
      this.error = null

      try {
        // Здесь будет API вызов
        // await doctorService.deleteDoctor(id)

        // Временная логика для примера
        this.doctors = this.doctors.filter((doctor) => doctor.id !== id)
      } catch (error) {
        this.error = 'Failed to delete doctor'
        console.error('Error deleting doctor:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
