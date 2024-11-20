import { BarChart, LineChart } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Estatisticas() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Estatísticas e Análise de Conflitos</h1>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-gray-800/50">
            <h3 className="text-xl font-bold mb-4">Impacto Global</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400">População Afetada</p>
                <p className="text-2xl font-bold">243,2M</p>
              </div>
              <div>
                <p className="text-gray-400">Custo Econômico</p>
                <p className="text-2xl font-bold">R$ 14,4T</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-800/50">
            <h3 className="text-xl font-bold mb-4">Crise Humanitária</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400">Refugiados</p>
                <p className="text-2xl font-bold">12,3M</p>
              </div>
              <div>
                <p className="text-gray-400">Ajuda Necessária</p>
                <p className="text-2xl font-bold">R$ 42,6B</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-800/50">
            <h3 className="text-xl font-bold mb-4">Zonas de Conflito</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400">Conflitos Ativos</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div>
                <p className="text-gray-400">Áreas de Alto Risco</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Estatísticas Detalhadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-gray-800/50">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="w-6 h-6" />
              <h3 className="text-xl font-bold">Tendências de Conflitos</h3>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">Tensões Crescentes</p>
                <p className="text-gray-400">Aumento de 42% em atividades militares</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-semibold">Relações Diplomáticas</p>
                <p className="text-gray-400">Queda de 23% na cooperação internacional</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="font-semibold">Impacto na População Civil</p>
                <p className="text-gray-400">Aumento de 67% em populações deslocadas</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-800/50">
            <div className="flex items-center gap-2 mb-4">
              <BarChart className="w-6 h-6" />
              <h3 className="text-xl font-bold">Distribuição de Recursos</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Gastos Militares</p>
                <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
                  <div className="bg-red-500 h-4 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <p className="font-semibold">Ajuda Humanitária</p>
                <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
                  <div className="bg-blue-500 h-4 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <p className="font-semibold">Desenvolvimento de Infraestrutura</p>
                <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
                  <div className="bg-green-500 h-4 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}