'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pet } from '@/types';
import { MOCK_PETS } from '@/data/mockData';
import { 
  X, 
  Sparkles, 
  Home, 
  Clock, 
  Users, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw,
  Heart
} from 'lucide-react';

interface PetCompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Answers {
  housing: 'depto' | 'casa_patio' | 'parque';
  hoursAlone: 'pocas' | 'medias' | 'muchas';
  coexistence: {
    kids: boolean;
    cats: boolean;
    dogs: boolean;
  };
  activityLevel: 'bajo' | 'medio' | 'alto';
  speciesPref: 'todos' | 'perro' | 'gato';
}

const initialAnswers: Answers = {
  housing: 'casa_patio',
  hoursAlone: 'medias',
  coexistence: {
    kids: false,
    cats: false,
    dogs: false,
  },
  activityLevel: 'medio',
  speciesPref: 'todos',
};

export default function PetCompatibilityModal({ isOpen, onClose }: PetCompatibilityModalProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [results, setResults] = useState<Array<{ pet: Pet; matchScore: number; reasons: string[] }>>([]);

  if (!isOpen) return null;

  const calculateMatches = () => {
    const scoredPets = MOCK_PETS.map((pet) => {
      let score = 50;
      const reasons: string[] = [];

      // Especie preferida
      if (answers.speciesPref !== 'todos') {
        if (pet.species === answers.speciesPref) {
          score += 15;
          reasons.push(`Buscás un ${pet.species} y ${pet.name} es ideal.`);
        } else {
          score -= 40;
        }
      }

      // Vivienda
      if (answers.housing === 'depto') {
        if (pet.compatibility.apartment) {
          score += 20;
          reasons.push('Se adapta perfectamente a departamento.');
        } else {
          score -= 30;
        }
      } else {
        score += 15;
        if (pet.size === 'grande') {
          reasons.push('Aprovechará al máximo tu patio o espacio verde.');
        }
      }

      // Horas solo
      if (answers.hoursAlone === 'muchas') {
        if (pet.compatibility.hoursAloneOk === 'muchas') {
          score += 15;
          reasons.push('Es independiente y tolera bien tus horas de trabajo.');
        } else if (pet.compatibility.hoursAloneOk === 'pocas') {
          score -= 20;
        }
      } else {
        score += 10;
      }

      // Convivencia
      if (answers.coexistence.kids) {
        if (pet.compatibility.kids) {
          score += 15;
          reasons.push('Excelente paciencia y cariño con chicos.');
        } else {
          score -= 25;
        }
      }

      if (answers.coexistence.cats) {
        if (pet.compatibility.cats) {
          score += 15;
          reasons.push('Convive pacíficamente con gatos.');
        } else {
          score -= 30;
        }
      }

      if (answers.coexistence.dogs) {
        if (pet.compatibility.otherDogs) {
          score += 15;
          reasons.push('Sociable con otros perros en el hogar.');
        } else {
          score -= 25;
        }
      }

      // Nivel de energía
      if (pet.compatibility.energyLevel === answers.activityLevel) {
        score += 20;
        reasons.push(`Coincide con tu ritmo de vida (${answers.activityLevel}).`);
      } else {
        score += 5;
      }

      // Normalizar entre 50 y 99
      const finalScore = Math.min(99, Math.max(45, score));

      return {
        pet,
        matchScore: finalScore,
        reasons: reasons.slice(0, 2),
      };
    });

    // Ordenar de mayor a menor compatibilidad
    scoredPets.sort((a, b) => b.matchScore - a.matchScore);
    setResults(scoredPets);
    setStep(5);
  };

  const handleReset = () => {
    setAnswers(initialAnswers);
    setStep(1);
    setResults([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-100 relative flex flex-col">
        
        {/* Header del Modal */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-stone-900">
                Test de Compatibilidad (&quot;Match Responsable&quot;)
              </h3>
              <p className="text-xs text-stone-500">
                Encontrá la mascota que mejor se adapta a tu hogar y estilo de vida
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
            aria-label="Cerrar test"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de progreso */}
        {step < 5 && (
          <div className="w-full bg-stone-100 h-1.5">
            <div 
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Contenido según paso */}
        <div className="p-6 sm:p-8 flex-1">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Paso 1 de 4</span>
                <h4 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Home className="w-5 h-5 text-amber-500" />
                  ¿Dónde vivís actualmente?
                </h4>
                <p className="text-sm text-stone-500">
                  El espacio disponible es clave para el bienestar del animal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'depto', title: 'Departamento', desc: 'Con balcón o sin patio exterior' },
                  { id: 'casa_patio', title: 'Casa con patio', desc: 'Patio cerrado y seguro' },
                  { id: 'parque', title: 'Espacio amplio', desc: 'Parque, finca o jardín grande' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAnswers({ ...answers, housing: item.id as Answers['housing'] })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      answers.housing === item.id
                        ? 'border-amber-500 bg-amber-50/50 shadow-sm ring-2 ring-amber-500/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="font-bold text-stone-900 text-sm">{item.title}</div>
                    <div className="text-xs text-stone-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="text-sm font-semibold text-stone-800 block mb-2">
                  ¿Tenés alguna preferencia de especie?
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'todos', label: 'Indistinto (Perro o Gato)' },
                    { id: 'perro', label: 'Prefiero Perro' },
                    { id: 'gato', label: 'Prefiero Gato' },
                  ].map((spec) => (
                    <button
                      key={spec.id}
                      onClick={() => setAnswers({ ...answers, speciesPref: spec.id as Answers['speciesPref'] })}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        answers.speciesPref === spec.id
                          ? 'border-amber-500 bg-amber-500 text-white'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {spec.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Paso 2 de 4</span>
                <h4 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  ¿Cuántas horas al día el animal quedará solo?
                </h4>
                <p className="text-sm text-stone-500">
                  Algunos animales sufren ansiedad por separación; otros son súper independientes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'pocas', title: 'Menos de 4 horas', desc: 'Trabajo remoto o siempre hay alguien' },
                  { id: 'medias', title: 'Entre 4 y 8 horas', desc: 'Jornada laboral típica' },
                  { id: 'muchas', title: 'Más de 8 horas', desc: 'Turnos largos fuera de casa' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAnswers({ ...answers, hoursAlone: item.id as Answers['hoursAlone'] })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      answers.hoursAlone === item.id
                        ? 'border-amber-500 bg-amber-50/50 shadow-sm ring-2 ring-amber-500/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="font-bold text-stone-900 text-sm">{item.title}</div>
                    <div className="text-xs text-stone-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Paso 3 de 4</span>
                <h4 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-500" />
                  ¿Con quiénes convivirá en casa?
                </h4>
                <p className="text-sm text-stone-500">
                  Marcá si tenés niños u otros animales para evaluar la sociabilidad.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'kids', title: 'Hay niños o bebés en casa', desc: 'Se priorizarán animales con temperamento dócil y paciente' },
                  { key: 'cats', title: 'Tengo otro gato en casa', desc: 'Se verificará que no tenga instinto de caza o reactividad' },
                  { key: 'dogs', title: 'Tengo otro perro en casa', desc: 'Se seleccionarán animales sociables en manada' },
                ].map((item) => {
                  const isChecked = answers.coexistence[item.key as keyof typeof answers.coexistence];
                  return (
                    <button
                      key={item.key}
                      onClick={() =>
                        setAnswers({
                          ...answers,
                          coexistence: {
                            ...answers.coexistence,
                            [item.key]: !isChecked,
                          },
                        })
                      }
                      className={`w-full p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all ${
                        isChecked
                          ? 'border-amber-500 bg-amber-50/40'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-amber-500 border-amber-500 text-white' : 'border-stone-300'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-bold text-stone-900 text-sm">{item.title}</div>
                        <div className="text-xs text-stone-500 mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Paso 4 de 4</span>
                <h4 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  ¿Qué nivel de energía buscás?
                </h4>
                <p className="text-sm text-stone-500">
                  ¿Querés paseos tranquilos o un compañero para salir a correr al parque?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'bajo', title: 'Tranquilo / Sillón', desc: 'Paseos cortos, siestas largas' },
                  { id: 'medio', title: 'Intermedio', desc: '1 o 2 paseos diarios normales' },
                  { id: 'alto', title: 'Muy Activo', desc: 'Juegos intensos, montaña y trote' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAnswers({ ...answers, activityLevel: item.id as Answers['activityLevel'] })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      answers.activityLevel === item.id
                        ? 'border-amber-500 bg-amber-50/50 shadow-sm ring-2 ring-amber-500/20'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="font-bold text-stone-900 text-sm">{item.title}</div>
                    <div className="text-xs text-stone-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-700">
                  <Heart className="w-8 h-8 fill-emerald-600" />
                </div>
                <h4 className="text-2xl font-extrabold text-stone-900">
                  ¡Encontramos candidatos ideales para vos!
                </h4>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Basado en tu espacio, disponibilidad y estilo de vida, estos animalitos tienen la mayor compatibilidad para una convivencia feliz.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {results.slice(0, 3).map(({ pet, matchScore, reasons }) => (
                  <div 
                    key={pet.id}
                    className="p-4 rounded-2xl border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-4 bg-stone-50/60"
                  >
                    <div 
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-cover bg-center shrink-0 border border-stone-200"
                      style={{ backgroundImage: `url(${pet.photos[0]})` }}
                    />
                    <div className="flex-1 text-center sm:text-left space-y-1">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <h5 className="text-lg font-bold text-stone-900">{pet.name}</h5>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 capitalize">
                          {pet.species} • {pet.age}
                        </span>
                        <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {matchScore}% Match
                        </span>
                      </div>
                      <p className="text-xs text-stone-500">{pet.shelterName} ({pet.shelterLocation})</p>
                      
                      <div className="pt-1 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                        {reasons.map((r, i) => (
                          <span key={i} className="text-[11px] bg-white border border-stone-200 text-stone-600 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/mascotas/${pet.id}`}
                      onClick={onClose}
                      className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                    >
                      Ver Perfil
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Volver a hacer el test
                </button>
                <Link
                  href="/adoptar"
                  onClick={onClose}
                  className="text-xs text-amber-700 hover:underline font-bold"
                >
                  Ver todos los animales en adopción →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {step < 5 && (
          <div className="p-6 border-t border-stone-100 flex items-center justify-between bg-stone-50/50 rounded-b-3xl">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-sm font-semibold text-stone-600 hover:text-stone-900"
              >
                Atrás
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={calculateMatches}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm px-7 py-3 rounded-xl shadow-md transition-all animate-pulse"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calcular Compatibilidad</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
