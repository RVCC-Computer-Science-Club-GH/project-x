/**
 * Map Screen (Web)
 * Displays interactive map with GeoJSON locations using Leaflet and OpenStreetMap
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { GeoJSONDataSource, type GeoJSONFeatureCollection } from '../../data/datasources';
import { colors, spacing } from '../styles';
import 'leaflet/dist/leaflet.css';

interface MapScreenProps {
  geojsonFile?: string;
}

// Fix for Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/**
 * GeoJSON layer component
 */
const GeoJSONLayer: React.FC<{ data: GeoJSONFeatureCollection }> = ({ data }) => {
  const geoJsonLayer = React.useMemo(() => {
    return L.geoJSON(data as any, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: colors.primary,
          color: colors.background,
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        }).bindPopup(() => {
          const props = feature.properties || {};
          let html = `<div style="max-width: 250px;"><h3 style="margin: 0 0 10px 0;">${props.name}</h3>`;
          if (props.amenity) html += `<p><strong>Type:</strong> ${props.amenity}</p>`;
          if (props['contact:phone']) html += `<p><strong>Phone:</strong> ${props['contact:phone']}</p>`;
          if (props['contact:website']) html += `<p><strong>Website:</strong> <a href="${props['contact:website']}" target="_blank">${props['contact:website']}</a></p>`;
          if (props['addr:street']) html += `<p><strong>Address:</strong> ${props['addr:street']}, ${props['addr:city']}, ${props['addr:state']} ${props['addr:postcode']}</p>`;
          html += '</div>';
          return html;
        });
      },
    });
  }, [data]);

  const map = (window as any).__leafletMap;
  React.useEffect(() => {
    if (map) {
      geoJsonLayer.addTo(map);
      return () => {
        map.removeLayer(geoJsonLayer);
      };
    }
  }, [map, geoJsonLayer]);

  return null;
};

export const MapScreen: React.FC<MapScreenProps> = ({
  geojsonFile = 'export.geojson',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [geojsonData, setGeojsonData] = useState<GeoJSONFeatureCollection | null>(null);

  useEffect(() => {
    loadGeoJSON();
  }, [geojsonFile]);

  const loadGeoJSON = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const dataSource = new GeoJSONDataSource();
      const rawGeojson = await dataSource.getRawGeoJSON(geojsonFile);

      setGeojsonData(rawGeojson);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error loading GeoJSON';
      console.error('Failed to load GeoJSON:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  // Get center coordinates from first feature or default
  const centerCoord: [number, number] = geojsonData?.features[0]?.geometry?.type === 'Point'
    ? [
        (geojsonData.features[0].geometry.coordinates as [number, number])[1],
        (geojsonData.features[0].geometry.coordinates as [number, number])[0],
      ]
    : [40.6100961, -74.6882225]; // Fallback to RVCC

  return (
    <div style={styles.mapContainer}>
      <MapContainer
        center={centerCoord}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(map) => {
          (window as any).__leafletMap = map;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {geojsonData && <GeoJSONLayer data={geojsonData} />}
      </MapContainer>
    </div>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.text,
    fontSize: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  mapContainer: {
    flex: 1,
    height: '100vh',
    width: '100%',
  } as any,
});
