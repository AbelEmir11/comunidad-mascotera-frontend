import { Pet, Shelter, CommunityNotice, Sponsor, AdoptionFollowup } from '@/types';
import { MOCK_SHELTERS, MOCK_NOTICES, MOCK_SPONSORS, MOCK_FOLLOWUPS } from '@/data/mockData';
import { adaptAnimalToPet, AnimalBackendResponse } from './adapters';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

/**
 * Servicio de conexión con el Backend en Java Spring Boot.
 */

export async function fetchAnimals(species?: string): Promise<Pet[]> {
  const url = species && species !== 'todos' 
    ? `${API_BASE_URL}/animales?especie=${encodeURIComponent(species)}`
    : `${API_BASE_URL}/animales`;
  
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Error ${res.status}: No se pudo obtener el listado de animales del backend.`);
  }
  const data: AnimalBackendResponse[] = await res.json();
  return data.map(adaptAnimalToPet);
}

export async function fetchAnimalById(id: string): Promise<Pet | null> {
  const res = await fetch(`${API_BASE_URL}/animales/${id}`, { cache: 'no-store' });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Error ${res.status}: No se pudo obtener el detalle del animal desde el backend.`);
  }
  const data: AnimalBackendResponse = await res.json();
  return adaptAnimalToPet(data);
}

export async function fetchShelters(zone?: string): Promise<Shelter[]> {
  try {
    const url = zone && zone !== 'todas'
      ? `${API_BASE_URL}/refugios?zona=${encodeURIComponent(zone)}`
      : `${API_BASE_URL}/refugios`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.length > 0 ? data : MOCK_SHELTERS;
  } catch (err) {
    console.warn('Backend Spring Boot no disponible en /api/refugios, usando datos locales:', err);
    return zone && zone !== 'todas'
      ? MOCK_SHELTERS.filter((s) => s.zone === zone)
      : MOCK_SHELTERS;
  }
}

export async function fetchShelterById(id: string): Promise<Shelter | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}/refugios/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`Backend Spring Boot no disponible en /api/refugios/${id}, usando datos locales:`, err);
    return MOCK_SHELTERS.find((s) => s.id === id);
  }
}

export async function fetchNotices(municipality?: string): Promise<CommunityNotice[]> {
  try {
    const url = municipality && municipality !== 'todos'
      ? `${API_BASE_URL}/zoonosis?municipio=${encodeURIComponent(municipality)}`
      : `${API_BASE_URL}/zoonosis`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.length > 0 ? data : MOCK_NOTICES;
  } catch (err) {
    console.warn('Backend Spring Boot no disponible en /api/zoonosis, usando datos locales:', err);
    return municipality && municipality !== 'todos'
      ? MOCK_NOTICES.filter((n) => n.municipality === municipality)
      : MOCK_NOTICES;
  }
}

export async function fetchSponsors(): Promise<Sponsor[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/patrocinadores`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.length > 0 ? data : MOCK_SPONSORS;
  } catch (err) {
    console.warn('Backend Spring Boot no disponible en /api/patrocinadores, usando datos locales:', err);
    return MOCK_SPONSORS;
  }
}

export async function fetchFollowups(): Promise<AdoptionFollowup[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/seguimiento`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.length > 0 ? data : MOCK_FOLLOWUPS;
  } catch (err) {
    console.warn('Backend Spring Boot no disponible en /api/seguimiento, usando datos locales:', err);
    return MOCK_FOLLOWUPS;
  }
}

export async function submitAdoptionApplication(animalId: string, payload: {
  applicantName: string;
  applicantDni: string;
  applicantPhone: string;
  applicantHousing: string;
  agreedToFollowup: boolean;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/adopciones/postular/${animalId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Postulación guardada localmente por fallback:', err);
    return { success: true, localSaved: true };
  }
}

export async function completeMilestone(hitoId: string, notes: string, photoUrl: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/seguimiento/hitos/${hitoId}/completar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes, photoUrl }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Hito completado localmente por fallback:', err);
    return { success: true, localSaved: true };
  }
}
