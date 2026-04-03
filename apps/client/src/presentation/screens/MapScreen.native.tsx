/**
 * Map Screen (Native)
 * Displays an interactive map with GeoJSON features using MapLibre on iOS/Android
 */

import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapLibreGL from '@rnmapbox/maps';
import { GeoJSONDataSource, type GeoJSONFeatureCollection } from '../../data/datasources';
import { colors, spacing } from '../styles';

// MapLibre requires an access token (can be empty string for offline/local tiles)
MapLibreGL.setAccessToken('');

interface MapScreenProps {
  geojsonFile?: string;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  geojsonFile = 'export.geojson',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [geojsonData, setGeojsonData] = useState<GeoJSONFeatureCollection | null>(null);
  const mapRef = useRef<MapLibreGL.MapView>(null);

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

  return (
    <View style={styles.container}>
      <MapLibreGL.MapView
        ref={mapRef}
        style={styles.map}
        styleURL="https://demotiles.maplibre.org/style.json"
        zoomLevel={12}
        centerCoordinate={[-74.6882225, 40.6100961]}
      >
        <MapLibreGL.Camera
          zoomLevel={12}
          centerCoordinate={[-74.6882225, 40.6100961]}
          animationMode="flyTo"
          animationDuration={5000}
        />

        {geojsonData && (
          <MapLibreGL.ShapeSource
            id="geojson-source"
            shape={geojsonData}
          >
            <MapLibreGL.CircleLayer
              id="geojson-points"
              style={pointLayerStyle}
              filter={['==', ['geometry-type'], 'Point']}
            />

            <MapLibreGL.SymbolLayer
              id="geojson-labels"
              style={labelLayerStyle}
              filter={['==', ['geometry-type'], 'Point']}
            />
          </MapLibreGL.ShapeSource>
        )}

        <MapLibreGL.AttributionView
          animated={true}
          contentInset={{
            left: spacing.md,
            bottom: spacing.md,
            right: spacing.md,
            top: spacing.md,
          }}
        />
      </MapLibreGL.MapView>
    </View>
  );
};

const pointLayerStyle = {
  circleRadius: 12,
  circleColor: colors.primary,
  circleOpacity: 0.8,
  circleStrokeColor: colors.background,
  circleStrokeWidth: 2,
};

const labelLayerStyle = {
  textField: ['get', 'name'],
  textSize: 12,
  textColor: colors.text,
  textOffset: [0, 1.8],
  textAnchor: 'top',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  map: {
    flex: 1,
  },
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
});
