// Экспорт типов
export type { Patient, CreatePatientRequest, UpdatePatientRequest } from './types/patient'

// Экспорт store
export { usePatientStore } from './stores/patientStore'

// Экспорт сервиса
export { patientService } from './services/patientApi'

// Экспорт роутера
export { patientRoutes } from './routes/patientRoutes'

// Экспорт компонентов
export { default as PatientList } from './components/PatientList.vue'
export { default as PatientCard } from './components/PatientCard.vue'
export { default as PatientModule } from './index.vue'
