import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  baseUrl: 'https://dendromap.fr/api/',
  headers :new HttpHeaders({
 
    'Content-Type':'undefined',
    'Accept':'*/*'
    
  })
};