import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./NearbyVets.css";

/* ✅ Fix default marker icon issue */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ✅ icons */
const normalIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// distance (km)
function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(x));
}

export default function NearbyVets() {
  const [myLoc, setMyLoc] = useState(null);
  const [selected, setSelected] = useState(null);
  const [geoErr, setGeoErr] = useState("");
  const mapRef = useRef(null);

  // ✅ store marker refs to open popup on card click
  const markerRefs = useRef({});

  const routeLocation = useLocation();
  const navigate = useNavigate();

  // ✅ LR Tiwari College default location (Mira Road)
  // (fallback/center point)
  const LR_TIWARI = { lat: 19.2849, lng: 72.8709 };

  // ✅ Login guard
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("Login required to access nearby services 📍");
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Location: first try from route state, else use user's geo, else LR Tiwari fallback
  useEffect(() => {
    if (routeLocation.state?.lat && routeLocation.state?.lng) {
      setMyLoc({ lat: routeLocation.state.lat, lng: routeLocation.state.lng });
      return;
    }

    if (!navigator.geolocation) {
      setGeoErr("Geolocation not supported");
      setMyLoc(LR_TIWARI);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => setMyLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => {
        setGeoErr(err.message || "Location access denied");
        setMyLoc(LR_TIWARI);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  }, [routeLocation.state]);

  // ✅ Vets near Shree L.R Tiwari College of Engineering (Mira Road area)
  const vets = [
    {
      id: "mira-road-vet-1",
      name: "Mira Road Pet Clinic & Surgery",
      rating: 4.7,
      reviews: 210,
      status: "Open",
      opens: "Closes 10pm",
      address: "Near Shree L.R Tiwari College, Mira Road",
      lat: 19.2862,
      lng: 72.8723,
      images: [
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=60",
      ],
    },
    {
      id: "mira-road-vet-2",
      name: "Care & Cure Veterinary Hospital",
      rating: 4.6,
      reviews: 155,
      status: "Open",
      opens: "Closes 9pm",
      address: "Hatkesh Area, Mira Road East",
      lat: 19.2836,
      lng: 72.8748,
      images: [
        "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=900&q=60",
      ],
    },
    {
      id: "mira-road-vet-3",
      name: "Happy Paws Vet Clinic",
      rating: 4.8,
      reviews: 188,
      status: "Closed",
      opens: "Opens 10am",
      address: "Mira Bhayandar Road, Mira Road",
      lat: 19.2891,
      lng: 72.8697,
      images: [
        "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1558944351-c50f4d7bd4fc?auto=format&fit=crop&w=900&q=60",
      ],
    },
    {
      id: "mira-road-vet-4",
      name: "PetLife Animal Hospital",
      rating: 4.7,
      reviews: 132,
      status: "Open",
      opens: "Closes 8pm",
      address: "Near Kashimira / Mira Road",
      lat: 19.2809,
      lng: 72.8688,
      images: [
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=900&q=60",
      ],
    },
  ];

  const handleSelectVet = (vet) => {
    setSelected(vet);

    const map = mapRef.current;
    if (map) map.flyTo([vet.lat, vet.lng], 16, { duration: 0.8 });

    // ✅ open popup on card click
    setTimeout(() => {
      const marker = markerRefs.current[vet.id];
      marker?.openPopup?.();
    }, 200);
  };

  const openInGoogleMaps = (vet) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${vet.lat},${vet.lng}`,
      "_blank"
    );
  };

  const directions = (vet) => {
    if (!myLoc) return;
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${myLoc.lat},${myLoc.lng}&destination=${vet.lat},${vet.lng}`,
      "_blank"
    );
  };

  const distanceKm = (vet) => {
    if (!myLoc) return null;
    return haversineKm(myLoc, { lat: vet.lat, lng: vet.lng });
  };

  if (!myLoc)
    return (
      <div className="nv-loading">
        Detecting location...
        {geoErr && <div className="nv-error">{geoErr}</div>}
      </div>
    );

  return (
    <div className="nv-wrap">
      {/* LEFT LIST */}
      <div className="nv-list">
        <h2 className="nv-title">🏥 Nearby Veterinary Clinics</h2>

        {/* optional info line */}
       
        {vets.map((v) => {
          const km = distanceKm(v);
          const active = selected?.id === v.id;

          return (
            <button
              key={v.id}
              className={`nv-card ${active ? "active" : ""}`}
              onClick={() => handleSelectVet(v)}
            >
              <div className="nv-row">
                <div className="nv-thumb">
                  <img
                    src={v.images?.[0] || "https://placehold.co/200x200?text=Vet"}
                    alt={v.name}
                  />
                </div>

                <div className="nv-body">
                  <div className="nv-name">{v.name}</div>

                  <div className="nv-meta">
                    <span className="nv-star">★</span>
                    <b>{v.rating.toFixed(1)}</b> ({v.reviews}) · Vet clinic
                  </div>

                  <div className="nv-sub">
                    <span className={`nv-status ${v.status === "Open" ? "open" : "closed"}`}>
                      {v.status}
                    </span>
                    <span className="nv-dot">·</span>
                    <span>{v.opens}</span>

                    {km != null && (
                      <>
                        <span className="nv-dot">·</span>
                        <span>{km.toFixed(1)} km</span>
                      </>
                    )}
                  </div>

                  <div className="nv-addr">📍 {v.address}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* RIGHT MAP */}
      <div className="nv-map">
        <MapContainer
          center={[LR_TIWARI.lat, LR_TIWARI.lng]}
          zoom={13}
          className="nv-mapCanvas"
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* ✅ Vets markers */}
          {vets.map((v) => (
            <Marker
              key={v.id}
              position={[v.lat, v.lng]}
              icon={selected?.id === v.id ? selectedIcon : normalIcon}
              eventHandlers={{ click: () => handleSelectVet(v) }}
              ref={(ref) => {
                if (ref) markerRefs.current[v.id] = ref;
              }}
            >
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <b>{v.name}</b>
                  <div>⭐ {v.rating.toFixed(1)} ({v.reviews})</div>
                  <div style={{ marginTop: 6 }}>
                    <b>{v.status}</b> · {v.opens}
                  </div>
                  <div style={{ marginTop: 6 }}>📍 {v.address}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Bottom Preview */}
        {selected && (
          <div className="nv-preview">
            <div className="nv-previewTop">
              <button className="nv-openBtn" onClick={() => openInGoogleMaps(selected)}>
                Open in Maps
              </button>
              <button className="nv-close" onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>

            <div className="nv-previewImgs">
              <img
                src={selected.images?.[0] || "https://placehold.co/600x400?text=Vet+Photo"}
                alt="vet"
              />
              <img
                src={selected.images?.[1] || "https://placehold.co/600x400?text=Vet+Photo"}
                alt="vet"
              />
            </div>

            <div className="nv-previewInfo">
              <div className="nv-previewName">{selected.name}</div>

              <div className="nv-previewMeta">
                <span className="nv-star">★</span>
                <b>{selected.rating.toFixed(1)}</b> ({selected.reviews}) · Vet clinic
              </div>

              <div className="nv-previewSub">
                <span className={`nv-status ${selected.status === "Open" ? "open" : "closed"}`}>
                  {selected.status}
                </span>
                <span className="nv-dot">·</span>
                <span>{selected.opens}</span>
                {distanceKm(selected) != null && (
                  <>
                    <span className="nv-dot">·</span>
                    <span>{distanceKm(selected).toFixed(1)} km</span>
                  </>
                )}
              </div>

              <div className="nv-addr2">📍 {selected.address}</div>

              <div className="nv-actions">
                <button className="nv-btn" onClick={() => directions(selected)}>
                  Directions
                </button>
                <button className="nv-btn ghost" onClick={() => openInGoogleMaps(selected)}>
                  View
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}