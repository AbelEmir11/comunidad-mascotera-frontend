'use client';

import { useState } from 'react';
import { MOCK_FOLLOWUPS } from '@/data/mockData';
import { 
  Award, 
  Camera, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Send,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export default function LifeAlbumPreview() {
  const [followups, setFollowups] = useState(MOCK_FOLLOWUPS);
  const [selectedPetId, setSelectedPetId] = useState('pet-adoptada-1');
  const [simulatedUpload, setSimulatedUpload] = useState(false);
  const [newNote, setNewNote] = useState('');

  const currentFollowup = followups.find((f) => f.petId === selectedPetId) || followups[0];

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote) return;

    setFollowups((prev) =>
      prev.map((item) => {
        if (item.petId !== currentFollowup.petId) return item;
        const updatedMilestones = item.milestones.map((m) => {
          if (m.status === 'pendiente' || m.status === 'demorado') {
            return {
              ...m,
              status: 'completado' as const,
              completedAt: 'Hoy',
              photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
              notes: newNote,
            };
          }
          return m;
        });

        return {
          ...item,
          healthTrafficLight: 'verde' as const,
          lastUpdateDate: 'Hoy',
          milestones: updatedMilestones,
        };
      })
    );

    setSimulatedUpload(true);
    setNewNote('');
    setTimeout(() => setSimulatedUpload(false), 4000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-100 shadow-xl space-y-8">
      
      {/* Header explicativo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-1">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            El Corazón del Software: Seguimiento Didáctico
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Álbum de Vida y Semáforo Post-Adopción
          </h3>
          <p className="text-sm text-stone-600 max-w-2xl">
            Convertimos el seguimiento obligatorio en una experiencia divertida para el adoptante (álbum con fotos y medallas) y un panel de tranquilidad en tiempo real para el refugio.
          </p>
        </div>

        {/* Selector de Mascota */}
        <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl w-fit">
          {followups.map((item) => (
            <button
              key={item.petId}
              onClick={() => setSelectedPetId(item.petId)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedPetId === item.petId
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <img
                src={item.petPhoto}
                alt={item.petName}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{item.petName}</span>
              <span 
                className={`w-2 h-2 rounded-full ${
                  item.healthTrafficLight === 'verde'
                    ? 'bg-emerald-500'
                    : item.healthTrafficLight === 'amarillo'
                    ? 'bg-amber-500 animate-pulse'
                    : 'bg-rose-500'
                }`} 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Grid Principal: Vista Adoptante vs Vista Refugio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Columna Izquierda (8 cols): La Línea de Tiempo del Adoptante con Medallas */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-14 h-14 rounded-2xl bg-cover bg-center border border-stone-200 shadow-xs"
                style={{ backgroundImage: `url(${currentFollowup.petPhoto})` }}
              />
              <div>
                <h4 className="text-lg font-bold text-stone-900">
                  Diario de Aventuras de {currentFollowup.petName}
                </h4>
                <p className="text-xs text-stone-500">
                  Adoptado/a por <strong className="text-stone-700">{currentFollowup.adopterName}</strong> • {currentFollowup.shelterName}
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold bg-stone-100 text-stone-600 px-3 py-1 rounded-full hidden sm:inline-block">
              Adopción: {currentFollowup.adoptionDate}
            </span>
          </div>

          {/* Timeline de Hitos */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-dashed border-amber-200 space-y-6">
            {currentFollowup.milestones.map((milestone, idx) => (
              <div key={milestone.id} className="relative group">
                {/* Dot / Badge Icon on timeline */}
                <div className={`absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-xs ${
                  milestone.status === 'completado'
                    ? 'bg-emerald-500 text-white'
                    : milestone.status === 'demorado'
                    ? 'bg-amber-500 text-white'
                    : 'bg-stone-200 text-stone-600'
                }`}>
                  {milestone.status === 'completado' ? (
                    '🏅'
                  ) : milestone.status === 'demorado' ? (
                    '⏳'
                  ) : (
                    '🐾'
                  )}
                </div>

                {/* Milestone Card */}
                <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  milestone.status === 'completado'
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : milestone.status === 'demorado'
                    ? 'bg-amber-50/50 border-amber-200'
                    : 'bg-stone-50/70 border-stone-200'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                        {milestone.period}
                      </span>
                      <h5 className="text-sm font-bold text-stone-900">{milestone.title}</h5>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      {milestone.status === 'completado' ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          ¡Medalla &quot;{milestone.badge.name}&quot; desbloqueada!
                        </span>
                      ) : milestone.status === 'demorado' ? (
                        <span className="text-amber-800 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Recordatorio suave enviado
                        </span>
                      ) : (
                        <span className="text-stone-500">
                          Próxima fecha: {milestone.dueDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mb-3">{milestone.description}</p>

                  {/* Foto y Anécdota si está completado */}
                  {milestone.photoUrl && (
                    <div className="flex flex-col sm:flex-row items-start gap-3 bg-white p-3 rounded-xl border border-stone-200/80 mt-2">
                      <img
                        src={milestone.photoUrl}
                        alt="Foto del hito"
                        className="w-full sm:w-28 h-24 object-cover rounded-lg shrink-0 border border-stone-100"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>Anécdota del adoptante:</span>
                        </div>
                        <p className="text-xs italic text-stone-700">
                          &quot;{milestone.notes}&quot;
                        </p>
                        <span className="text-[10px] text-stone-400 block pt-1">
                          Foto y reporte verificado por el refugio
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Formulario Interactivo: Simular Carga de Foto y Desbloqueo de Medalla */}
          <div className="bg-gradient-to-tr from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-200 space-y-3">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-600" />
              <h5 className="font-bold text-sm text-stone-900">
                Probar la experiencia del adoptante (Simulación en vivo)
              </h5>
            </div>
            <p className="text-xs text-stone-600">
              Escribí un breve comentario o anécdota y hacé clic en &quot;Subir reporte quincenal&quot; para ver cómo se desbloquea el hito y el semáforo pasa a verde.
            </p>

            {simulatedUpload && (
              <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top duration-300">
                <Sparkles className="w-4 h-4" />
                <span>¡Felicitaciones! Reporte cargado con éxito. ¡Medalla desbloqueada y sumada al perfil!</span>
              </div>
            )}

            <form onSubmit={handleSimulateUpload} className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Ej: Ya aprendió a dar la pata y ama salir al parque..."
                className="flex-1 bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Subir reporte quincenal</span>
              </button>
            </form>
          </div>
        </div>

        {/* Columna Derecha (4 cols): El Semáforo del Refugio */}
        <div className="lg:col-span-4 bg-stone-50 rounded-2xl p-5 border border-stone-200/80 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <h4 className="font-extrabold text-sm text-stone-900">
                Panel de Control del Refugio
              </h4>
            </div>

            <p className="text-xs text-stone-600">
              El refugio ve de un vistazo el estado de todos sus animales adoptados sin tener que revisar chats de WhatsApp uno por uno.
            </p>

            {/* Semáforo List */}
            <div className="space-y-2.5">
              <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                  <div>
                    <strong className="text-stone-900 block">Bella</strong>
                    <span className="text-[11px] text-stone-500">Al día (Fotos hace 3 días)</span>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Excelente
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 bg-amber-50/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0 animate-pulse" />
                  <div>
                    <strong className="text-stone-900 block">Toby</strong>
                    <span className="text-[11px] text-stone-500">Demorado (18 días)</span>
                  </div>
                </div>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Aviso suave
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 opacity-60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
                  <div>
                    <strong className="text-stone-900 block">Rocco</strong>
                    <span className="text-[11px] text-stone-500">+35 días sin noticias</span>
                  </div>
                </div>
                <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Alerta visita
                </span>
              </div>
            </div>

            {/* Acción de 1-clic para el voluntario del refugio */}
            <div className="p-3.5 bg-amber-100/60 rounded-xl border border-amber-200 space-y-2">
              <span className="text-[11px] font-bold text-amber-900 block flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                Disparador Automático:
              </span>
              <p className="text-[11px] text-stone-600">
                Cuando un hito se demora 3 días, el sistema prepara un mensaje de WhatsApp cariñoso y no invasivo para el adoptante.
              </p>
              <a
                href={`https://wa.me/?text=Hola!%20Te%20escribimos%20desde%20el%20refugio%20para%20saber%20como%20sigue%20todo%20con%20tu%20mascota%20adoptada!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-lg shadow-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enviar recordatorio amigable</span>
              </a>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-stone-400 text-center border-t border-stone-200">
            Ahorra más de 12 horas semanales de gestión a los voluntarios del refugio.
          </div>
        </div>

      </div>

    </div>
  );
}
