// Экспорт типов
export type { Doctor, CreateDoctorRequest, UpdateDoctorRequest } from './types/doctor'

// Экспорт store
export { useDoctorStore } from './stores/doctorStore'

// Экспорт сервиса
export { doctorService } from './services/doctorApi'

// Экспорт роутера
export { doctorRoutes } from './routes/doctorRoutes'

// Экспорт компонентов
export { default as DoctorList } from './components/DoctorList.vue'
export { default as DoctorCard } from './components/DoctorCard.vue'
export { default as DoctorModule } from './index.vue'
