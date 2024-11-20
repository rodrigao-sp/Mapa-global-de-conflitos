import { BookOpen, Shield, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Prevencao() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Estratégias de Prevenção de Conflitos</h1>
          <p className="text-xl text-gray-400">Medidas proativas para prevenir a escalada de conflitos</p>
        </div>

        {/* Estratégias Principais */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Estratégias Principais de Prevenção
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gray-800/50">
              <h3 className="text-xl font-bold mb-4">Engajamento Diplomático</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Diálogo diplomático regular</li>
                <li>• Mediação internacional</li>
                <li>• Programas de intercâmbio cultural</li>
                <li>• Iniciativas econômicas conjuntas</li>
              </ul>
            </Card>
            <Card className="p-6 bg-gray-800/50">
              <h3 className="text-xl font-bold mb-4">Cooperação Econômica</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Acordos comerciais</li>
                <li>• Projetos de infraestrutura conjuntos</li>
                <li>• Compartilhamento de recursos</li>
                <li>• Interdependência econômica</li>
              </ul>
            </Card>
            <Card className="p-6 bg-gray-800/50">
              <h3 className="text-xl font-bold mb-4">Medidas de Segurança</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Acordos de controle de armas</li>
                <li>• Transparência militar</li>
                <li>• Exercícios militares conjuntos</li>
                <li>• Cooperação em segurança de fronteiras</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Sinais de Alerta Precoce */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Sinais de Alerta Precoce
          </h2>
          <Card className="p-6 bg-gray-800/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Indicadores Políticos</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Aumento da tensão política</li>
                  <li>• Ruptura no diálogo</li>
                  <li>• Aumento da retórica nacionalista</li>
                  <li>• Restrições à mídia</li>
                  <li>• Violações dos direitos humanos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Indicadores Sociais</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Tensões étnicas ou religiosas</li>
                  <li>• Deslocamento populacional</li>
                  <li>• Disparidades econômicas</li>
                  <li>• Agitação social</li>
                  <li>• Aumento de propaganda</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Recursos de Prevenção */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Recursos de Prevenção
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gray-800/50">
              <h3 className="text-xl font-bold mb-4">Organizações Internacionais</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold">Nações Unidas</p>
                  <p className="text-gray-400">Serviços de manutenção da paz e mediação</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold">Organizações Regionais</p>
                  <p className="text-gray-400">Mecanismos locais de resolução de conflitos</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <p className="font-semibold">ONGs</p>
                  <p className="text-gray-400">Iniciativas humanitárias e de construção da paz</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gray-800/50">
              <h3 className="text-xl font-bold mb-4">Serviços de Suporte</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold">Serviços de Mediação</p>
                  <p className="text-gray-400">Resolução profissional de conflitos</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold">Linhas de Emergência</p>
                  <p className="text-gray-400">Suporte de emergência 24/7</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="font-semibold">Programas de Treinamento</p>
                  <p className="text-gray-400">Educação em prevenção de conflitos</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}