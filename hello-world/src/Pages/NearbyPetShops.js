import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./NearbyPetShops.css";

// ✅ Fix default marker icon issue in React + Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ✅ Marker icons
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
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
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

export default function NearbyPetShops() {
  const [myLoc, setMyLoc] = useState(null);
  const [selected, setSelected] = useState(null);
  const mapRef = useRef(null);
  const markerRefs = useRef({});

  // ✅ sample shops
  const shops = [
    {
      id: "pet-house",
      name: "Pet House – Pet Shop, Grooming & Spa",
      rating: 4.9,
      reviews: 157,
      status: "Closed",
      opens: "Opens 10am Thu",
      lat: 19.2965,
      lng: 72.8762,
      images: [
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=60",
      ],
    },
    {
      id: "meowy",
      name: "Meowy Pet Shop",
      rating: 4.8,
      reviews: 31,
      status: "Open",
      opens: "Closes 9pm",
      lat: 19.2898,
      lng: 72.8723,
      images: [
        "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=60",
      ],
    },
    {
      id: "pets-vera",
      name: "Pets Vera – The Happy Pets Store",
      rating: 5.0,
      reviews: 50,
      status: "Closed",
      opens: "Opens 10am Thu",
      lat: 19.282,
      lng: 72.873,
      images: [
        "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1598133894004-518c5e4b9c44?auto=format&fit=crop&w=900&q=60",
      ],
    },
    {
      id: "pet-world",
      name: "Pet World Store",
      rating: 4.6,
      reviews: 44,
      status: "Open",
      opens: "Closes 8pm",
      lat: 19.2855,
      lng: 72.8781,
      images: [
        "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=60",
      ],
    },
    {
      id: "dog-cat",
      name: "Dog & Cat Pet Shop",
      rating: 4.7,
      reviews: 28,
      status: "Open",
      opens: "Closes 9pm",
      lat: 19.2912,
      lng: 72.8705,
      images: [
        "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=900&q=60",
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=60",
      ],
    },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setMyLoc({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setMyLoc({ lat: 19.2819, lng: 72.8726 })
    );
  }, []);

  const handleSelectShop = (shop) => {
    setSelected(shop);

    const map = mapRef.current;
    if (map) map.flyTo([shop.lat, shop.lng], 16, { duration: 0.8 });

    setTimeout(() => {
      const marker = markerRefs.current[shop.id];
      if (!marker) return;

      if (marker?.openPopup) marker.openPopup();
    }, 200);
  };

  const openInGoogleMaps = (shop) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${shop.lat},${shop.lng}`,
      "_blank"
    );
  };

  const directions = (shop) => {
    if (!myLoc) return;
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${myLoc.lat},${myLoc.lng}&destination=${shop.lat},${shop.lng}`,
      "_blank"
    );
  };

  const distanceKm = (shop) => {
    if (!myLoc) return null;
    return haversineKm(myLoc, { lat: shop.lat, lng: shop.lng });
  };

  if (!myLoc) return <div className="np-loading">Detecting location...</div>;

  return (
    <div className="np-wrap">
      {/* LEFT: LIST */}
      <div className="np-list">
        <h2 className="np-title">📍 Nearby Pet Shops</h2>

        {shops.map((s) => {
          const km = distanceKm(s);
          const isActive = selected?.id === s.id;

          return (
            <button
              key={s.id}
              className={`np-card ${isActive ? "active" : ""}`}
              onClick={() => handleSelectShop(s)}
            >
              <div className="np-cardRow">
                <div className="np-thumb">
                  <img
                    src={
                      s.images?.[0] ||
                      "https://placehold.co/200x200?text=Pet+Shop"
                    }
                    alt={s.name}
                  />
                </div>

                <div className="np-cardBody">
                  <div className="np-name">{s.name}</div>

                  <div className="np-meta">
                    <span className="np-star">★</span>{" "}
                    <b>{s.rating.toFixed(1)}</b> ({s.reviews}) · Pet store
                  </div>

                  <div className="np-sub">
                    <span
                      className={`np-status ${
                        s.status === "Open" ? "open" : "closed"
                      }`}
                    >
                      {s.status}
                    </span>
                    <span className="np-dot">·</span>
                    <span>{s.opens}</span>

                    {km != null && (
                      <>
                        <span className="np-dot">·</span>
                        <span>{km.toFixed(1)} km</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* RIGHT: MAP */}
      <div className="np-map">
        <MapContainer
          center={[myLoc.lat, myLoc.lng]}
          zoom={13}
          className="np-mapCanvas"
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {shops.map((s) => (
            <Marker
              key={s.id}
              position={[s.lat, s.lng]}
              icon={selected?.id === s.id ? selectedIcon : normalIcon}
              eventHandlers={{ click: () => handleSelectShop(s) }}
              ref={(ref) => {
                if (ref) markerRefs.current[s.id] = ref;
              }}
            >
              <Popup>
                <div style={{ minWidth: 180 }}>
                  <b>{s.name}</b>
                  <div>
                    ⭐ {s.rating.toFixed(1)} ({s.reviews})
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <span style={{ fontWeight: 700 }}>{s.status}</span> ·{" "}
                    {s.opens}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Bottom Preview */}
        {selected && (
          <div className="np-preview">
            <div className="np-previewTop">
              <button
                className="np-openBtn"
                onClick={() => openInGoogleMaps(selected)}
              >
                Open in Maps
              </button>
              <button className="np-close" onClick={() => setSelected(null)}>
                ✕
              </button>
            </div>

            <div className="np-previewImgs">
              <img
                src={
                  selected.images?.[0] ||
                  "https://placehold.co/600x400?text=Shop+Photo"
                }
                alt="shop"
              />
              <img
                src={
                  selected.images?.[1] ||
                  "https://placehold.co/600x400?text=Shop+Photo"
                }
                alt="shop"
              />
            </div>

            <div className="np-previewInfo">
              <div className="np-previewName">{selected.name}</div>

              <div className="np-previewMeta">
                <span className="np-star">★</span>
                <b>{selected.rating.toFixed(1)}</b> ({selected.reviews}) · Pet
                store
              </div>

              <div className="np-previewSub">
                <span
                  className={`np-status ${
                    selected.status === "Open" ? "open" : "closed"
                  }`}
                >
                  {selected.status}
                </span>
                <span className="np-dot">·</span>
                <span>{selected.opens}</span>
                {distanceKm(selected) != null && (
                  <>
                    <span className="np-dot">·</span>
                    <span>{distanceKm(selected).toFixed(1)} km</span>
                  </>
                )}
              </div>

              <div className="np-actions">
                <button className="np-btn" onClick={() => directions(selected)}>
                  Directions
                </button>
                <button
                  className="np-btn ghost"
                  onClick={() => openInGoogleMaps(selected)}
                >
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