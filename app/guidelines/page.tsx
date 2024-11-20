import { AlertCircle, BookOpen, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Diretrizes() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Diretrizes de Gestão de Crises</h1>
          <p className="text-xl text-gray-400">Informações essenciais para países em zonas de conflito</p>
        </div>

        {/* Protocolos de Emergência */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold">Protocolos de Emergência</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gray-800/50">
              <h3 className="text-xl font-bold mb-4">Proteção Civil</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Estabelecer abrigos de emergência</li>
                <li>• Criar rotas de evacuação</li>
                <li>• Manter serviços essenciais</li>
                <li>• Configurar comunicação de emergência</li>
              </ul>
            </Card>
            <Card className="p-6 bg-gray-800/50">
              <h3 className="text-xl font-bold mb-4">Gestão de Recursos</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Garantir suprimentos de água e alimentos</li>
                <li>• Estabelecer reservas médicas</li>
                <li>• Proteger infraestrutura crítica</li>
                <li>• Gerenciar distribuição de combustível</li>
              </ul>
            </Card>
            <Card className="p-6 bg-gray-800/50">
              <h3 className="text-xl font-bold mb-4">Comunicação</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Manter canais de informação pública</li>
                <li>• Estabelecer transmissões de emergência</li>
                <li>• Combater desinformação</li>
                <li>• Coordenar com organizações de ajuda</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Diretrizes Detalhadas */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Diretrizes Detalhadas</h2>
          </div>
          <Card className="p-6 bg-gray-800/50">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Medidas de Proteção Civil</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-gray-300">
                    <p>1. Identificar e preparar zonas seguras</p>
                    <p>2. Estabelecer sistemas de alerta precoce</p>
                    <p>3. Criar equipes de resposta a emergências</p>
                    <p>4. Manter infraestrutura essencial</p>
                    <p>5. Coordenar com organizações humanitárias</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Gestão de Saúde</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-gray-300">
                    <p>1. Garantir suprimentos médicos</p>
                    <p>2. Estabelecer hospitais de campanha</p>
                    <p>3. Treinar pessoal médico de emergência</p>
                    <p>4. Criar protocolos de evacuação</p>
                    <p>5. Manter padrões de saneamento</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Proteção de Infraestrutura</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-gray-300">
                    <p>1. Identificar instalações críticas</p>
                    <p>2. Implementar medidas de segurança</p>
                    <p>3. Estabelecer sistemas de backup</p>
                    <p>4. Criar protocolos de manutenção</p>
                    <p>5. Planejar reparos rápidos</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </section>

        {/* Estratégias de Prevenção */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-bold">Estratégias de Prevenção</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gray-800/50">
              <h3 className="text-xl font-bold mb-4">Medidas Diplomáticas</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Participar de negociações de paz</li>
                <li>• Manter canais diplomáticos</li>
                <li>• Buscar mediação internacional</li>
                <li>• Construir alianças regionais</li>
                <li>• Participar de iniciativas de paz</li>
              </ul>
            </Card>
            <Card className="p-6 bg-gray-800/50">
              <h3 className="text-xl font-bold mb-4">Estabilidade Econômica</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Proteger rotas comerciais essenciais</li>
                <li>• Manter estabilidade da moeda</li>
                <li>• Proteger indústrias críticas</li>
                <li>• Garantir segurança alimentar</li>
                <li>• Desenvolver fundos de contingência</li>
              </ul>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}