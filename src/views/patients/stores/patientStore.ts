import { defineStore } from 'pinia'
import type { Patient, CreatePatientRequest, UpdatePatientRequest } from '../types/patient'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [] as Patient[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getPatientById: (state) => (id: string) => {
      return state.patients.find((patient) => patient.id === id)
    },

    getPatientsByGender: (state) => (gender: Patient['gender']) => {
      return state.patients.filter((patient) => patient.gender === gender)
    },

    getPatientsByAge: (state) => (minAge: number, maxAge: number) => {
      const currentDate = new Date()
      return state.patients.filter((patient) => {
        const age = currentDate.getFullYear() - new Date(patient.dateOfBirth).getFullYear()
        return age >= minAge && age <= maxAge
      })
    },
  },

  actions: {
    async fetchPatients() {
      this.loading = true
      this.error = null

      try {
        // Здесь будет API вызов
        // const response = await patientService.getPatients()
        // this.patients = response.data

        // Временные данные для примера
        this.patients = []
      } catch (error) {
        this.error = 'Failed to fetch patients'
        console.error('Error fetching patients:', error)
      } finally {
        this.loading = false
      }
    },

    async createPatient(patientData: CreatePatientRequest) {
      this.loading = true
      this.error = null

      try {
        // Здесь будет API вызов
        // const response = await patientService.createPatient(patientData)
        // this.patients.push(response.data)

        // Временная логика для примера
        const newPatient: Patient = {
          id: Date.now().toString(),
          ...patientData,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        this.patients.push(newPatient)
      } catch (error) {
        this.error = 'Failed to create patient'
        console.error('Error creating patient:', error)
      } finally {
        this.loading = false
      }
    },

    async updatePatient(patientData: UpdatePatientRequest) {
      this.loading = true
      this.error = null

      try {
        // Здесь будет API вызов
        // const response = await patientService.updatePatient(patientData)

        // Временная логика для примера
        const index = this.patients.findIndex((patient) => patient.id === patientData.id)
        if (index !== -1) {
          this.patients[index] = {
            ...this.patients[index],
            ...patientData,
            updatedAt: new Date(),
          }
        }
      } catch (error) {
        this.error = 'Failed to update patient'
        console.error('Error updating patient:', error)
      } finally {
        this.loading = false
      }
    },

    async deletePatient(id: string) {
      this.loading = true
      this.error = null

      try {
        // Здесь будет API вызов
        // await patientService.deletePatient(id)

        // Временная логика для примера
        this.patients = this.patients.filter((patient) => patient.id !== id)
      } catch (error) {
        this.error = 'Failed to delete patient'
        console.error('Error deleting patient:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
