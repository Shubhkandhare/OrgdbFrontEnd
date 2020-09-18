import { Injectable } from '@angular/core';
import { GlobalVariable } from "../global";
import { HttpClient  } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AreaServiceService {
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  constructor(private http: HttpClient) { }

  headers = {
    //'Authorization' : 'Basic ' + btao(username + ':' + password)
    'Access-Control-Allow-Origin':true,
    'Content-Type':'application/json; charset=utf-8',
    'X-Requested-With':'XMLHttpRequest'
  }

  getAllAreaGrid()
  {
    return this.http.get(this.baseApiUrl+`Area/getAreaGridInfo`);
  }
}
