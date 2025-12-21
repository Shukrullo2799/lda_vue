import apiService from '@/services/api.service'
import type { Patient, CreatePatientRequest, UpdatePatientRequest } from '../types/patient'

export const patientService = {
  async getPatients(): Promise<Patient[]> {
    const response = await apiService.get('/patients')
    return response.data
  },

  async getPatientById(id: string): Promise<Patient> {
    const response = await apiService.get(`/patients/${id}`)
    return response.data
  },

  async createPatient(patientData: CreatePatientRequest): Promise<Patient> {
    const response = await apiService.post('/patients', patientData)
    return response.data
  },

  async updatePatient(patientData: UpdatePatientRequest): Promise<Patient> {
    const response = await apiService.put(`/patients/${patientData.id}`, patientData)
    return response.data
  },

  async deletePatient(id: string): Promise<void> {
    await apiService.delete(`/patients/${id}`)
  },

  async getPatientsByGender(gender: Patient['gender']): Promise<Patient[]> {
    const response = await apiService.get(`/patients?gender=${gender}`)
    return response.data
  },

  async searchPatients(query: string): Promise<Patient[]> {
    const response = await apiService.get(`/patients/search?q=${encodeURIComponent(query)}`)
    return response.data
  },

  async getPatientsByAgeRange(minAge: number, maxAge: number): Promise<Patient[]> {
    const response = await apiService.get(`/patients?minAge=${minAge}&maxAge=${maxAge}`)
    return response.data
  },
}
