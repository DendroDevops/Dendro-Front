import {Injectable} from '@angular/core';
import {Coordinate} from "../../admin/inventaires/shared/model/inventaire.interface";
import {MapsAPILoader} from "@agm/core";

declare var google: any

@Injectable()
export class MapService {
  geocoder: any;

  constructor(private mapsLoaderApi: MapsAPILoader) {
    this.loadMapService();
  }

  static formatCoordinate(Coord: Coordinate) {
    return {
      lat: Coord.lat,
      lng: Coord.long
    }
  }

  /**
   *
   * @param coord
   * @private
   */
  public static createArrayInverse(coord: any[]) {
    return coord.map((elt) => {
      return {lat: elt.lat, long: elt.lng}
    });
  }

  /**
   * Transform polygon coord to display in the map
   * @param coord
   */
  static factoryCoordPolygon(coord: Coordinate[]): any[] {
    if (coord.length == 0) return;
    return coord.map((elt: Coordinate) => {
      return MapService.formatCoordinate(elt);
    });
  }

  // Get Latitude && longitude
  loadMapService() {
    return this.mapsLoaderApi.load();
  }

  async getLatLng(placeId: string) {
    let coordinate = {
      lat: null,
      lng: null
    }
    let geocoder = new google.maps.Geocoder();
    await geocoder.geocode({placeId: placeId}, (results, status) => {
      const data = results.shift();
      coordinate.lat = data.geometry.location.lat();
      coordinate.lng = data.geometry.location.lng();
    });
    return coordinate;
  }

}
