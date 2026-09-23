export type Species = 'perro' | 'gato';
export type Gender = 'macho' | 'hembra';
export type Size = 'pequeño' | 'mediano' | 'grande';
export type EnergyLevel = 'bajo' | 'medio' | 'alto';

export interface NeedItem {
  id: string;
  item: string;
  needed: number;
  current: number;
  unit: string;
  urgency: 'alta' | 'media' | 'baja';
}

export interface Shelter {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  coverImage: string;
  location: string;
  zone: string; // ej. Godoy Cruz, Luján de Cuyo, Maipú, Capital, Las Heras
  description: string;
  story: string;
  alias: string;
  cbu: string;
  bankName: string;
  titular: string;
  cuit: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  email: string;
  animalsCount: number;
  adoptionsCount: number;
  needs: NeedItem[];
}

export interface HealthInfo {
  vaccinated: boolean;
  neutered: boolean; // castrado
  dewormed: boolean; // desparasitado
  microchip: boolean;
  specialCare?: string;
}

export interface CompatibilityProfile {
  apartment: boolean; // apto depto
  kids: boolean; // se lleva bien con chicos
  otherDogs: boolean;
  cats: boolean;
  energyLevel: EnergyLevel;
  hoursAloneOk: 'pocas' | 'medias' | 'muchas';
  experienceRequired: boolean;
}

export interface Pet {
  id: string;
  name: string;
  species: Species;
  gender: Gender;
  age: string;
  approxAgeMonths: number;
  size: Size;
  shelterId: string;
  shelterName: string;
  shelterLocation: string;
  status: 'en_adopcion' | 'en_transito' | 'adoptado';
  photos: string[];
  story: string;
  traits: string[];
  health: HealthInfo;
  compatibility: CompatibilityProfile;
  urgent: boolean;
  timeInShelter: string;
}

export interface Milestone {
  id: string;
  period: string; // ej. "Día 15", "Mes 1", "Mes 2", "Mes 6", "1 Año"
  title: string;
  description: string;
  dueDate: string;
  status: 'completado' | 'pendiente' | 'demorado';
  photoUrl?: string;
  notes?: string;
  completedAt?: string;
  badge: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
}

export interface AdoptionFollowup {
  id: string;
  petId: string;
  petName: string;
  petPhoto: string;
  species: Species;
  shelterId: string;
  shelterName: string;
  adopterName: string;
  adopterLocation: string;
  adoptionDate: string;
  healthTrafficLight: 'verde' | 'amarillo' | 'rojo';
  lastUpdateDate: string;
  nextDueDate: string;
  milestones: Milestone[];
}

export interface CommunityNotice {
  id: string;
  type: 'movil_zoonosis' | 'castracion' | 'meta_lograda' | 'evento_adopcion';
  title: string;
  subtitle: string;
  highlightBadge: string;
  location: string;
  municipality?: string;
  date: string;
  actionText: string;
  actionUrl: string;
  image?: string;
  isUrgent?: boolean;
}

export interface Sponsor {
  id: string;
  name: string;
  category: 'municipio' | 'veterinaria' | 'petshop' | 'empresa' | 'marca';
  tier: 'platino' | 'oro' | 'plata';
  logo: string;
  description: string;
  location: string;
  supportType: string; // ej. "Campañas de Zoonosis y Móvil Quirúrgico" o "Atención médica y castraciones"
  benefitForAdopters?: string; // ej. "15% OFF en 1ra consulta y vacunas"
  contactUrl?: string;
}
