import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  baseUrl: 'https://test-dendromap.com/api/',
  headers :new HttpHeaders({
 
    'Content-Type':'undefined',
    'Accept':'*/*'
    
  })
};
  