"use client"

import * as React from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const CREAM = "#f5f0e8"

const svgMarkerIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="${CREAM}" fill-opacity="0.95" stroke="${CREAM}" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="#1a1a1a"/></svg>`

const markerIcon = L.divIcon({
  html: svgMarkerIcon,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -14],
})

interface MapMarkerProps {
  position: [number, number]
  label?: string
}

function MapMarker({ position, label }: MapMarkerProps) {
  return (
    <Marker position={position} icon={markerIcon}>
      {label && (
        <Popup
          className="particle-map-popup"
          closeButton={false}
        >
          <span style={{ color: CREAM, fontSize: 13 }}>{label}</span>
        </Popup>
      )}
    </Marker>
  )
}

function RecenterView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  React.useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])
  return null
}

interface MapProps {
  center?: [number, number]
  zoom?: number
  height?: string | number
  markers?: { position: [number, number]; label?: string }[]
  className?: string
}

function Map({
  center = [48.8566, 2.3522],
  zoom = 13,
  height = 400,
  markers = [],
  className,
}: MapProps) {
  const h = typeof height === "number" ? `${height}px` : height

  return (
    <>
      <style>{`
        .particle-map-popup .leaflet-popup-content-wrapper {
          background: #18181b;
          border: 1px solid #27272a;
          border-radius: 8px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.5);
          padding: 0;
        }
        .particle-map-popup .leaflet-popup-content {
          margin: 8px 12px;
        }
        .particle-map-popup .leaflet-popup-tip {
          background: #18181b;
        }
        .leaflet-control-attribution {
          background: rgba(0,0,0,0.5) !important;
          color: rgba(255,255,255,0.35) !important;
          font-size: 10px !important;
        }
        .leaflet-control-attribution a {
          color: rgba(255,255,255,0.45) !important;
        }
        .leaflet-control-zoom a {
          background: #18181b !important;
          color: ${CREAM} !important;
          border-color: #27272a !important;
        }
        .leaflet-control-zoom a:hover {
          background: #27272a !important;
        }
      `}</style>
      <div
        className={["overflow-hidden rounded-xl border border-border", className]
          .filter(Boolean)
          .join(" ")}
        style={{ height: h }}
      >
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ width: "100%", height: "100%" }}
          attributionControl
          zoomControl
        >
          <RecenterView center={center} zoom={zoom} />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
            subdomains="abcd"
            maxZoom={19}
          />
          {markers.map((m, i) => (
            <MapMarker key={i} position={m.position} label={m.label} />
          ))}
        </MapContainer>
      </div>
    </>
  )
}

export { Map, MapMarker }
