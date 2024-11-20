import { Clock, Flag, Globe, Users, AlertTriangle, Siren } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ConflictUpdate {
  date: string;
  description: string;
  type: 'military' | 'humanitarian' | 'diplomatic';
}

interface Conflict {
  id: string;
  name: string;
  countries: string[];
  causes: string[];
  startDate: string;
  casualties: number;
  displaced: number;
  status: string;
  latestUpdates: ConflictUpdate[];
}

// Dados simulados - substituir por dados reais da API
const activeConflicts: Conflict[] = [
  {
    id: '1',
    name: 'Guerra Rússia-Ucrânia',
    countries: ['Rússia', 'Ucrânia'],
    causes: [
      'Disputas territoriais',
      'Tensões geopolíticas',
      'Expansão da OTAN',
      'Questões de segurança regional'
    ],
    startDate: '2022-02-24',
    casualties: 500000,
    displaced: 8000000,
    status: 'Conflito ativo',
    latestUpdates: [
      {
        date: '2024-01-15',
        description: 'Intensificação dos ataques aéreos em Kiev',
        type: 'military'
      },
      {
        date: '2024-01-14',
        description: 'Nova onda de refugiados reportada na fronteira polonesa',
        type: 'humanitarian'
      },
      {
        date: '2024-01-13',
        description: 'Negociações de paz suspensas após novos ataques',
        type: 'diplomatic'
      }
    ]
  },
  {
    id: '2',
    name: 'Conflito Israel-Hamas',
    countries: ['Israel', 'Palestina'],
    causes: [
      'Disputas territoriais',
      'Conflitos religiosos',
      'Questões de soberania',
      'Tensões históricas'
    ],
    startDate: '2023-10-07',
    casualties: 25000,
    displaced: 1800000,
    status: 'Conflito ativo',
    latestUpdates: [
      {
        date: '2024-01-15',
        description: 'Operações militares intensificadas em Gaza',
        type: 'military'
      },
      {
        date: '2024-01-14',
        description: 'Crise humanitária se agrava com falta de suprimentos',
        type: 'humanitarian'
      },
      {
        date: '2024-01-13',
        description: 'Mediação internacional busca novo cessar-fogo',
        type: 'diplomatic'
      }
    ]
  }
];

function getUpdateTypeColor(type: string) {
  switch (type) {
    case 'military':
      return 'text-red-500';
    case 'humanitarian':
      return 'text-yellow-500';
    case 'diplomatic':
      return 'text-blue-500';
    default:
      return 'text-gray-500';
  }
}

function getUpdateTypeIcon(type: string) {
  switch (type) {
    case 'military':
      return <Siren className="w-5 h-5" />;
    case 'humanitarian':
      return <Users className="w-5 h-5" />;
    case 'diplomatic':
      return <Globe className="w-5 h-5" />;
    default:
      return <AlertTriangle className="w-5 h-5" />;
  }
}

export default function ConflitosAtivos() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Conflitos Ativos Globais</h1>
          <p className="text-xl text-gray-400">Monitoramento em tempo real de zonas de conflito</p>
        </div>

        {/* Lista de Conflitos */}
        <div className="space-y-8">
          {activeConflicts.map((conflict) => (
            <Card key={conflict.id} className="p-6 bg-gray-800/50">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Flag className="w-6 h-6 text-red-500" />
                    {conflict.name}
                  </h2>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                    {conflict.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-gray-400 mb-1">Início do Conflito</p>
                    <p className="text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      {new Date(conflict.startDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Baixas Estimadas</p>
                    <p className="text-lg text-red-400">
                      {conflict.casualties.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Pessoas Deslocadas</p>
                    <p className="text-lg text-yellow-400">
                      {conflict.displaced.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="details">
                    <AccordionTrigger>Detalhes do Conflito</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Países Envolvidos</h3>
                          <div className="flex flex-wrap gap-2">
                            {conflict.countries.map((country) => (
                              <span
                                key={country}
                                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                              >
                                {country}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Causas Principais</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {conflict.causes.map((cause) => (
                              <li key={cause}>{cause}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="updates">
                    <AccordionTrigger>Atualizações Recentes</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {conflict.latestUpdates.map((update, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg"
                          >
                            <div className={getUpdateTypeColor(update.type)}>
                              {getUpdateTypeIcon(update.type)}
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">
                                {new Date(update.date).toLocaleDateString('pt-BR')}
                              </p>
                              <p className="text-gray-300">{update.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
