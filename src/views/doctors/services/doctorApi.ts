import apiService from "@/services/api.service"
import type { Doctor, CreateDoctorRequest, UpdateDoctorRequest } from "../types/doctor"
import type { IFilter } from "@/models"

export const doctorService = {
  async getDoctors(payload: IFilter): Promise<Doctor[]> {
    const response = await apiService.post("/doctor/all", payload)
    return response.data
  },

  async getDoctor(id: string): Promise<Doctor> {
    if (+id) {
      const response = await apiService.get(`/doctor/${id}`)
      return response.data
    } else {
      const response = await apiService.get(`/doctor`)
      return response.data
    }
  },

  async createDoctor(doctorData: CreateDoctorRequest): Promise<Doctor> {
    const response = await apiService.post("/doctor", doctorData)
    return response.data
  },

  async updateDoctor(doctorData: UpdateDoctorRequest): Promise<Doctor> {
    const response = await apiService.put(`/doctor`, doctorData)
    return response.data
  },

  async deleteDoctor(id: string): Promise<void> {
    await apiService.delete(`/doctors/${id}`)
  },
}
