/**
 * GeoJSON Datasource
 * Loads and parses GeoJSON data - works cross-platform
 */

import { LocationDTO } from '../models';

export interface GeoJSONFeature {
  type: 'Feature';
  properties: Record<string, unknown>;
  geometry: {
    type: 'Point' | 'LineString' | 'Polygon';
    coordinates: number[] | number[][] | number[][][];
  };
  id?: string | number;
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

/**
 * Hardcoded GeoJSON data for cross-platform compatibility
 */
const GEOJSON_DATA: Record<string, GeoJSONFeatureCollection> = {
  'export.geojson': {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          '@id': 'node/357746143',
          'addr:city': 'Branchburg',
          'addr:country': 'US',
          'addr:housenumber': '118',
          'addr:postcode': '08876',
          'addr:state': 'NJ',
          'addr:street': 'Lamington Road',
          amenity: 'college',
          'contact:phone': '+1 908 526 1200',
          'contact:website': 'http://www.raritanval.edu/',
          ele: '48',
          'gnis:feature_id': '2059626',
          name: 'Raritan Valley Community College',
          wikidata: 'Q7294576',
          wikipedia: 'en:Raritan Valley Community College',
        },
        geometry: {
          type: 'Point',
          coordinates: [-74.6882225, 40.6100961],
        },
        id: 'node/357746143',
      },
    ],
  },
  'sample.geojson': {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: 'Raritan Valley Community College',
          amenity: 'college',
        },
        geometry: {
          type: 'Point',
          coordinates: [-74.6882225, 40.6100961],
        },
        id: 'node/357746143',
      },
    ],
  },
};

/**
 * Loads GeoJSON from hardcoded data and converts to LocationDTOs
 */
export class GeoJSONDataSource {
  /**
   * Load and parse GeoJSON file
   * @param fileName - The name of the GeoJSON file
   * @returns Array of LocationDTOs extracted from GeoJSON features
   */
  async loadGeoJSON(fileName: string): Promise<LocationDTO[]> {
    try {
      const geojson = await this.getRawGeoJSON(fileName);

      if (!geojson.features || !Array.isArray(geojson.features)) {
        console.warn('Invalid GeoJSON structure: missing features array');
        return [];
      }

      // Convert GeoJSON Point features to LocationDTOs
      return geojson.features
        .filter((feature) => feature.geometry.type === 'Point')
        .map((feature) => {
          const [longitude, latitude] = feature.geometry.coordinates as [number, number];
          const props = feature.properties || {};

          return {
            id: String(feature.id || `${latitude}-${longitude}`),
            latitude,
            longitude,
            name: (props.name as string) || 'Unknown Location',
            description: (props.description as string) || 
                         (props.amenity as string) || 
                         undefined,
            createdAt: new Date().toISOString(),
          };
        });
    } catch (error) {
      console.error(`Error loading GeoJSON file "${fileName}":`, error);
      throw new Error(`Failed to load GeoJSON: ${fileName}`);
    }
  }

  /**
   * Get raw GeoJSON data
   * @param fileName - The name of the GeoJSON file
   * @returns Raw GeoJSON FeatureCollection
   */
  async getRawGeoJSON(fileName: string): Promise<GeoJSONFeatureCollection> {
    const geojson = GEOJSON_DATA[fileName];

    if (!geojson) {
      throw new Error(`GeoJSON file not found: ${fileName}`);
    }

    return geojson;
  }
}
