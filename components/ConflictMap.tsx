"use client";

import { useEffect, useState, useMemo } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDadosDeConflito } from "@/hooks/useConflictData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// Interface para as coordenadas dos conflitos
interface CoordenadasConflitos {
  [key: string]: [number, number];
}

// Coordenadas corretas dos conflitos
const coordenadasConflitos: CoordenadasConflitos = {
  "Guerra Rússia-Ucrânia": [49.0275, 31.4828],
  "Conflito Israel-Hamas": [31.7683, 35.2137],
  "Guerra Civil no Sudão": [15.5007, 32.5599],
};

const TrendIcon = ({
  trend,
}: {
  trend: "subindo" | "descendo" | "estável";
}) => {
  if (trend === "subindo")
    return <TrendingUp className="w-4 h-4 text-red-500" />;
  if (trend === "descendo")
    return <TrendingDown className="w-4 h-4 text-green-500" />;
  return <Minus className="w-4 h-4 text-gray-500" />;
};

// Componente para atualizar o centro do mapa quando as coordenadas mudam
function MapCenterUpdater({ coordinates }: { coordinates: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coordinates);
  }, [coordinates, map]);
  return null;
}

const MapaDeConflitos = () => {
  const { conflitos, zonasDeRisco } = useDadosDeConflito();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedConflict, setSelectedConflict] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Memorizar os ícones para evitar recriação desnecessária
  const icons = useMemo(
    () => ({
      Crítico: new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      Alto: new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      Médio: new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      Baixo: new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    }),
    []
  );

  useEffect(() => {
    try {
      setIsMounted(true);
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    } catch (err) {
      setError("Erro ao inicializar o mapa. Por favor, recarregue a página.");
    }
  }, []);

  const getCorDeConflito = (intensidade: string) => {
    switch (intensidade) {
      case "Crítico":
        return "#ef4444";
      case "Alto":
        return "#f97316";
      case "Médio":
        return "#eab308";
      default:
        return "#22c55e";
    }
  };

  const getCorDeZonaDeRisco = (nívelDeTensão: number) => {
    if (nívelDeTensão >= 8) return "#ef4444";
    if (nívelDeTensão >= 6) return "#f97316";
    if (nívelDeTensão >= 4) return "#eab308";
    return "#22c55e";
  };

  const formatarNúmero = (num: number) => {
    return new Intl.NumberFormat("pt-BR").format(num);
  };

  if (error) {
    return (
      <div className="w-full h-[500px] bg-gray-800/50 rounded-lg flex items-center justify-center">
        <p className="text-white">{error}</p>
      </div>
    );
  }

  if (!isMounted) {
    return (
      <div className="w-full h-[500px] bg-gray-800/50 rounded-lg flex items-center justify-center">
        <p className="text-white">Carregando mapa...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden relative shadow-2xl border border-gray-700">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        className="z-0 bg-gray-900"
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={true}
        doubleClickZoom={true}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          maxZoom={19}
        />
        {selectedConflict && coordenadasConflitos[selectedConflict] && (
          <MapCenterUpdater
            coordinates={coordenadasConflitos[selectedConflict]}
          />
        )}
        {conflitos.map((conflito) => {
          const coordinates =
            coordenadasConflitos[conflito.name] || conflito.coordinates;
          return (
            <div key={conflito.name}>
              <Circle
                center={coordinates}
                radius={200000}
                pathOptions={{
                  color: getCorDeConflito(conflito.intensidade),
                  fillColor: getCorDeConflito(conflito.intensidade),
                  fillOpacity: 0.3,
                  className: "transition-all duration-500 ease-in-out",
                }}
                eventHandlers={{
                  click: () => setSelectedConflict(conflito.name),
                }}
              />
              <Marker
                position={coordinates}
                icon={icons[conflito.intensidade]}
                eventHandlers={{
                  click: () => setSelectedConflict(conflito.name),
                }}
              >
                <Popup>
                  <div className="p-2 transition-all duration-300">
                    <h3 className="font-bold text-lg">{conflito.name}</h3>
                    <p className="text-red-600 font-semibold">
                      {conflito.status}
                    </p>
                    <p className="text-sm mt-1">{conflito.description}</p>
                    <div className="mt-2 text-sm space-y-2">
                      <div className="flex items-center gap-2 transition-all duration-300">
                        <span>
                          Vítimas Fatais: {formatarNúmero(conflito.vítimas)}
                        </span>
                        <TrendIcon trend={conflito.vítimasTendência} />
                      </div>
                      <div className="flex items-center gap-2 transition-all duration-300">
                        <span>
                          Deslocados: {formatarNúmero(conflito.deslocados)}
                        </span>
                        <TrendIcon trend={conflito.deslocadosTendência} />
                      </div>
                      <div className="flex items-center gap-2 transition-all duration-300">
                        <span>
                          Área Afetada: {formatarNúmero(conflito.área)} km²
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="font-semibold text-sm">
                          Últimos Eventos:
                        </p>
                        <ul className="text-xs space-y-1 mt-1">
                          {conflito.últimosEventos
                            .slice(0, 2)
                            .map((evento, idx) => (
                              <li
                                key={idx}
                                className={`
                              py-1 px-2 rounded
                              ${
                                evento.tipo === "combate"
                                  ? "bg-red-100 text-red-700"
                                  : evento.tipo === "humanitário"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }
                              transition-all duration-300
                            `}
                              >
                                {evento.descrição}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 flex flex-col gap-1">
                      <p>
                        Início:{" "}
                        {new Date(conflito.dataInício).toLocaleDateString(
                          "pt-BR"
                        )}
                      </p>
                      <p>
                        Atualizado:{" "}
                        {new Date(conflito.lastUpdate).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}

        {zonasDeRisco.map((zona) => (
          <Circle
            key={zona.id}
            center={zona.coordinates}
            radius={150000}
            pathOptions={{
              color: getCorDeZonaDeRisco(zona.nívelDeTensão),
              fillColor: getCorDeZonaDeRisco(zona.nívelDeTensão),
              fillOpacity: 0.2,
              dashArray: "5, 10",
              className: "transition-all duration-500 ease-in-out",
            }}
          >
            <Popup>
              <div className="p-2 transition-all duration-300">
                <h3 className="font-bold">{zona.name}</h3>
                <p className="text-sm">{zona.description}</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 transition-all duration-300">
                    <span className="text-sm">
                      Nível de Tensão: {zona.nívelDeTensão.toFixed(1)}/10
                    </span>
                    <TrendIcon trend={zona.tensãoTendência} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mt-2">
                      Fatores de Risco:
                    </p>
                    <ul className="text-xs space-y-1 mt-1">
                      {zona.fatoresDeRisco.map((fator, idx) => (
                        <li
                          key={idx}
                          className="bg-gray-100 text-gray-700 py-1 px-2 rounded"
                        >
                          {fator}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">Probabilidade de Conflito:</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="h-2 rounded-full transition-all duration-500 ease-in-out"
                        style={{
                          width: `${zona.probabilidadeConflito}%`,
                          backgroundColor: getCorDeZonaDeRisco(
                            zona.nívelDeTensão
                          ),
                        }}
                      />
                    </div>
                    <p className="text-xs text-right mt-1">
                      {zona.probabilidadeConflito.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    <p>Países Envolvidos: {zona.países.join(", ")}</p>
                    <p className="mt-1">
                      Atualizado:{" "}
                      {new Date(zona.lastUpdate).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>
            </Popup>
          </Circle>
        ))}

        <div className="absolute inset-0 pointer-events-none bg-gray-900/10 z-[400]" />
      </MapContainer>

      <div className="absolute bottom-4 left-4 bg-gray-900/80 p-3 rounded-lg z-[500] backdrop-blur-sm border border-gray-700">
        <h3 className="text-sm font-semibold text-white mb-2">
          Intensidade do Conflito
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs text-gray-200">Crítico</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-xs text-gray-200">Alto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-xs text-gray-200">Médio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-gray-200">Baixo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaDeConflitos;
