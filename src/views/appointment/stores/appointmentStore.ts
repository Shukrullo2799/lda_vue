import { defineStore } from 'pinia'
import type {
  Appointment,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
} from '../types/appointment'

export const useAppointmentStore = defineStore('appointment', {
  state: () => ({
    appointments: [] as Appointment[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getAppointmentById: (state) => (id: string) => {
      return state.appointments.find((appointment) => appointment.id === id)
    },

    getAppointmentsByStatus: (state) => (status: Appointment['status']) => {
      return state.appointments.filter((appointment) => appointment.status === status)
    },
  },

  actions: {
    async fetchAppointments() {
      this.loading = true
      this.error = null

      try {
        // Здесь будет API вызов
        // const response = await appointmentService.getAppointments()
        // this.appointments = response.data

        // Временные данные для примера
        this.appointments = []
      } catch (error) {
        this.error = 'Failed to fetch appointments'
        console.error('Error fetching appointments:', error)
      } finally {
        this.loading = false
      }
    },

    async createAppointment(appointmentData: CreateAppointmentRequest) {
      this.loading = true
      this.error = null

      try {
        // Здесь будет API вызов
        // const response = await appointmentService.createAppointment(appointmentData)
        // this.appointments.push(response.data)

        // Временная логика для примера
        const newAppointment: Appointment = {
          id: Date.now().toString(),
          ...appointmentData,
          status: 'scheduled',
        }
        this.appointments.push(newAppointment)
      } catch (error) {
        this.error = 'Failed to create appointment'
        console.error('Error creating appointment:', error)
      } finally {
        this.loading = false
      }
    },

    async updateAppointment(appointmentData: UpdateAppointmentRequest) {
      this.loading = true
      this.error = null

      try {
        // Здесь будет API вызов
        // const response = await appointmentService.updateAppointment(appointmentData)

        // Временная логика для примера
        const index = this.appointments.findIndex((app) => app.id === appointmentData.id)
        if (index !== -1) {
          this.appointments[index] = { ...this.appointments[index], ...appointmentData }
        }
      } catch (error) {
        this.error = 'Failed to update appointment'
        console.error('Error updating appointment:', error)
      } finally {
        this.loading = false
      }
    },

    async deleteAppointment(id: string) {
      this.loading = true
      this.error = null

      try {
        // Здесь будет API вызов
        // await appointmentService.deleteAppointment(id)

        // Временная логика для примера
        this.appointments = this.appointments.filter((app) => app.id !== id)
      } catch (error) {
        this.error = 'Failed to delete appointment'
        console.error('Error deleting appointment:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
