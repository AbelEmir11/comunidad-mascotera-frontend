import { Pet } from '@/types';
import { MOCK_SHELTERS } from '@/data/mockData';

export interface AnimalBackendResponse {
  id: string;
  name: string;
  species: 'perro' | 'gato';
  gender: 'macho' | 'hembra';
  age: string;
  approxAgeMonths: number;
  size: 'pequeño' | 'mediano' | 'grande';
  status: string;
  story: string;
  urgent: boolean;
  timeInShelter: string;
  photos: string[];
  traits: string[];
  shelterId?: string;
  health?: {
    vaccinated: boolean;
    neutered: boolean;
    dewormed: boolean;
    microchip: boolean;
    specialCare?: string;
  };
  compatibility?: {
    apartment: boolean;
    kids: boolean;
    otherDogs: boolean;
    cats: boolean;
    energyLevel: 'bajo' | 'medio' | 'alto';
    hoursAloneOk: 'pocas' | 'medias' | 'muchas';
    experienceRequired: boolean;
  };
}

/**
 * Adaptador centralizado para transformar la respuesta REST del Backend (AnimalResponseDto)
 * en el tipo Pet consumido por la interfaz de usuario de Comunidad Mascotera.
 */
export function adaptAnimalToPet(raw: AnimalBackendResponse): Pet {
  const shelter = MOCK_SHELTERS.find((s) => s.id === raw.shelterId);

  return {
    id: raw.id,
    name: raw.name,
    species: raw.species || 'perro',
    gender: raw.gender || 'macho',
    age: raw.age || 'Edad no especificada',
    approxAgeMonths: raw.approxAgeMonths || 0,
    size: (raw.size as Pet['size']) || 'mediano',
    shelterId: raw.shelterId || '',
    shelterName: shelter ? shelter.name : 'Refugio Amigo Mendoza',
    shelterLocation: shelter ? shelter.location : 'Mendoza, Argentina',
    status: (raw.status as Pet['status']) || 'en_adopcion',
    photos: raw.photos && raw.photos.length > 0
      ? raw.photos
      : ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'],
    story: raw.story || 'Sin historia disponible por el momento.',
    traits: raw.traits || [],
    health: {
      vaccinated: Boolean(raw.health?.vaccinated),
      neutered: Boolean(raw.health?.neutered),
      dewormed: Boolean(raw.health?.dewormed),
      microchip: Boolean(raw.health?.microchip),
      specialCare: raw.health?.specialCare || undefined,
    },
    compatibility: {
      apartment: Boolean(raw.compatibility?.apartment),
      kids: Boolean(raw.compatibility?.kids),
      otherDogs: Boolean(raw.compatibility?.otherDogs),
      cats: Boolean(raw.compatibility?.cats),
      energyLevel: raw.compatibility?.energyLevel || 'medio',
      hoursAloneOk: raw.compatibility?.hoursAloneOk || 'medias',
      experienceRequired: Boolean(raw.compatibility?.experienceRequired),
    },
    urgent: Boolean(raw.urgent),
    timeInShelter: raw.timeInShelter || 'Reciente',
  };
}
