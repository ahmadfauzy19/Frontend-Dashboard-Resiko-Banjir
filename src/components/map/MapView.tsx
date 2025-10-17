import { useEffect } from "react";
import L, { Map } from "leaflet";
import "leaflet/dist/leaflet.css";

interface ZonaRisiko {
  nama: string;
  risiko: "Tinggi" | "Sedang" | "Rendah";
}

const dataRisiko: ZonaRisiko[] = [
  { nama: "Bogor", risiko: "Tinggi" },
  { nama: "Bekasi", risiko: "Tinggi" },
  { nama: "Garut", risiko: "Sedang" },
  { nama: "Cianjur", risiko: "Sedang" },
  { nama: "Kota Bandung", risiko: "Rendah" },
];

const titikPenting = [
  { nama: "Pos TMA Citarum", lat: -6.95, lng: 107.6 },
  { nama: "Stasiun Hujan Cimahi", lat: -6.87, lng: 107.53 },
  { nama: "Lokasi Banjir 2024", lat: -6.9, lng: 107.7 },
];

const getColorByRisk = (risk: string): string => {
  switch (risk) {
    case "Tinggi":
      return "#d73027";
    case "Sedang":
      return "#fdae61";
    case "Rendah":
      return "#1a9850";
    default:
      return "#cccccc";
  }
};

export default function MapView() {
  useEffect(() => {
    let map: Map;

    map = L.map("map", {
      center: [-6.9, 107.6],
      zoom: 8.5,
      zoomControl: true,
      preferCanvas: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    fetch("/Batas_Kab_Jabar.geojson")
      .then((res) => res.json())
      .then((geojson) => {
        const geoLayer = L.geoJSON(geojson, {
          style: (feature: any) => {
            const kabupatenName =
              feature.properties?.WADMKK || feature.properties?.NAMOBJ;
            const risiko =
              dataRisiko.find((r) => kabupatenName?.includes(r.nama))?.risiko ||
              "";
            return {
              color: "#555",
              weight: 1,
              fillOpacity: 0.7,
              fillColor: getColorByRisk(risiko),
            };
          },
          onEachFeature: (feature, layer) => {
            const kabupatenName =
              feature.properties?.WADMKK || feature.properties?.NAMOBJ;
            const risiko =
              dataRisiko.find((r) => kabupatenName?.includes(r.nama))?.risiko ||
              "Rendah";

            // 💡 Tooltip muncul saat hover, bukan klik
            layer.bindTooltip(
              `
                <b>${kabupatenName}</b><br/>
                Risiko Banjir: <b style="color:${getColorByRisk(risiko)}">${risiko}</b>
              `,
              { direction: "top", sticky: true }
            );

            layer.on({
              mouseover: (e) => {
                const target = e.target;
                target.setStyle({ weight: 2, color: "black" });
                target.bringToFront(); // ✨ biar tampil di atas layer lain
              },
              mouseout: (e) => {
                geoLayer.resetStyle(e.target);
              },
            });
          },
        }).addTo(map);
      });

    titikPenting.forEach((t) => {
      L.marker([t.lat, t.lng])
        .bindPopup(`<strong>${t.nama}</strong>`)
        .addTo(map);
    });

    L.control.scale({ position: "bottomleft" }).addTo(map);
    setTimeout(() => map.invalidateSize(), 400);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{
        height: "100vh",
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
      }}
    />
  );
}
