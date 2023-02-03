import {Injectable} from "@angular/core";
import {Resource} from "../modele/resource";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Iserializer} from "../serilaizer/iserializer";
import {environment} from "../../../environments/environment";
import {map} from 'rxjs/operators';
import {ResourceListInterface} from "../modele/resourceList.interface";

@Injectable()

export class ResourceService<T extends Resource> {
  constructor(
    protected httpClient: HttpClient,
    protected endpoint: string,
    private serializer: Iserializer
  ) {

  }

  create(data: T): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}${this.endpoint}`,
      this.serializer.toJson(data), {headers: environment.headers})
  }

  list(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${environment.baseUrl}${this.endpoint}`, {headers: environment.headers})
      .pipe(map((data: T[]) => this.convertData(data)))
  }

  listPaginate(page: number = 1): Observable<ResourceListInterface<T>> {
    return this.httpClient.get(`${environment.baseUrl}${this.endpoint}?page=${page}`, {headers: environment.headers})
      .pipe(map((result: ResourceListInterface<T>) => {
          return {...result, datas: this.convertData(result.datas)}
        })
      )
  }

  search(page: Number = 1, filter: string): Observable<ResourceListInterface<T>> {
    return this.httpClient.post(`${environment.baseUrl}${this.endpoint}/search?page=${page}`, {infos: filter}, {headers: environment.headers})
      .pipe(
        map((result: ResourceListInterface<T>) => {
          return {...result, data: this.convertData(result.datas)}
        })
      )
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}${this.endpoint}/${id}`, {headers: environment.headers})
  }

  read(id: number): Observable<T> {
    return this.httpClient.get<T>(`${environment.baseUrl}${this.endpoint}/${id}`, {headers: environment.headers})
      .pipe(
        map((res: T) => this.serializer.fromJson(res) as T)
      );
  }

  update(data: T): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}${this.endpoint}/${data.id}`,
      data, {headers: environment.headers}
    )
  }

  protected convertData(data: any): T[] {
    return data.map(item => this.serializer.fromJson(item));
  }
}
