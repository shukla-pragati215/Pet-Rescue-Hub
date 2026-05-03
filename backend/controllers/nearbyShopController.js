import axios from "axios";

// distance in km
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  return 2 * R * Math.asin(Math.sqrt(a));
}

export const getNearbyPetShops = async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "lat and lng are required",
      });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const searchRadius = parseInt(radius, 10);

    if (isNaN(userLat) || isNaN(userLng) || isNaN(searchRadius)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lat/lng/radius",
      });
    }

    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["shop"="pet"](around:${searchRadius},${userLat},${userLng});
        way["shop"="pet"](around:${searchRadius},${userLat},${userLng});
        relation["shop"="pet"](around:${searchRadius},${userLat},${userLng});

        node["shop"="pet_grooming"](around:${searchRadius},${userLat},${userLng});
        way["shop"="pet_grooming"](around:${searchRadius},${userLat},${userLng});
        relation["shop"="pet_grooming"](around:${searchRadius},${userLat},${userLng});
      );
      out center tags;
    `;

    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      overpassQuery,
      {
        headers: {
          "Content-Type": "text/plain",
          "User-Agent": "PetRescueHub/1.0",
        },
        timeout: 20000,
      }
    );

    const elements = response.data.elements || [];

    const shops = elements
      .map((item) => {
        const shopLat = item.lat || item.center?.lat;
        const shopLng = item.lon || item.center?.lon;

        if (!shopLat || !shopLng) return null;

        const tags = item.tags || {};
        const distance = haversineKm(userLat, userLng, shopLat, shopLng);

        return {
          id: `${item.type}-${item.id}`,
          name: tags.name || "Unnamed Pet Shop",
          lat: shopLat,
          lng: shopLng,
          address: [
            tags["addr:housenumber"],
            tags["addr:street"],
            tags["addr:city"],
          ]
            .filter(Boolean)
            .join(", "),
          phone: tags.phone || tags["contact:phone"] || "",
          website: tags.website || tags["contact:website"] || "",
          openingHours: tags.opening_hours || "",
          status: tags.opening_hours ? "Available" : "Status unavailable",
          opens: tags.opening_hours || "Hours not available",
          rating: null,
          reviews: null,
          images: [
            "https://placehold.co/600x400?text=Pet+Shop",
            "https://placehold.co/600x400?text=Nearby+Shop",
          ],
          distanceKm: Number(distance.toFixed(2)),
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return res.status(200).json({
      success: true,
      count: shops.length,
      data: shops,
    });
  } catch (error) {
    console.error(
      "Nearby pet shops error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch nearby pet shops",
      error: error.response?.data || error.message,
    });
  }
};