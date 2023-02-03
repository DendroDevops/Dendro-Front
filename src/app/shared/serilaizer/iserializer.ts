import {Resource} from '../modele/resource';

export interface Iserializer {
  // from json server to the front
  fromJson(json: any): Resource;

  // construct json to send to the server
  toJson(resource: Resource): any;
}
