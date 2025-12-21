import apiService from '@/services/api.service'
import type {
  Appointment,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
} from '../types/appointment'

export const appointmentService = {
  async getAppointments(): Promise<Appointment[]> {
    const response = await apiService.get('/appointments')
    return response.data
  },

  async getAppointmentById(id: string): Promise<Appointment> {
    const response = await apiService.get(`/appointments/${id}`)
    return response.data
  },

  async createAppointment(appointmentData: CreateAppointmentRequest): Promise<Appointment> {
    const response = await apiService.post('/appointments', appointmentData)
    return response.data
  },

  async updateAppointment(appointmentData: UpdateAppointmentRequest): Promise<Appointment> {
    const response = await apiService.put(`/appointments/${appointmentData.id}`, appointmentData)
    return response.data
  },

  async deleteAppointment(id: string): Promise<void> {
    await apiService.delete(`/appointments/${id}`)
  },

  async getAppointmentsByStatus(status: Appointment['status']): Promise<Appointment[]> {
    const response = await apiService.get(`/appointments?status=${status}`)
    return response.data
  },

  async getAppointmentsByDate(date: Date): Promise<Appointment[]> {
    const dateString = date.toISOString().split('T')[0]
    const response = await apiService.get(`/appointments?date=${dateString}`)
    return response.data
  },
}
