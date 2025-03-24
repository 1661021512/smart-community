import {District} from './district';

export interface GeoJson {
  features: {
    properties: {
      name: string,
      district: District
    }
  } []
  type: 'FeatureCollection' | 'Feature',
}
