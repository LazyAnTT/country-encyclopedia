import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country, Language, Translations } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      map((response: any[]) => {
        return response.map((item: any) => {
          const country = new Country();
          country.name = {
            common: item.name?.common,
            official: item.name?.official,
          };
          country.alpha2Code = item.cca2;
          country.alpha3Code = item.cca3;
          country.region = item.region;
          country.subregion = item.subregion;
          country.population = item.population;
          country.populationRank = item.populationRank;
          country.flags.svg= item.flags.svg;
          country.area = item.area;
          country.neighbors = item.borders;
          country.languages = Object.keys(item.languages || {}).map((key) => {
            const language: Language = {
              code: key,
              name: item.languages[key],
            };
            return language;
          });
          country.translations = item.translations as Translations;
          return country;
        });
      })
    );
  }

  getCountryByCode(code: string): Observable<Country> {
    const url = 'https://restcountries.com/v3.1/alpha/${code}';
    return this.http.get<Country>(url).pipe(
      map((response: any) => {
        const country = new Country();
        country.name = {
          common: response.name?.common,
          official: response.name?.official,
        };
        country.alpha2Code = response.cca2;
        country.alpha3Code = response.cca3;
        country.region = response.region;
        country.subregion = response.subregion;
        country.population = response.population;
        country.populationRank = response.populationRank;
        country.flags.svg = response.flags.svg;
        country.area = response.area;
        country.neighbors = response.borders;
        country.languages = Object.keys(response.languages || {}).map((key) => {
          const language: Language = {
            code: key,
            name: response.languages[key],
          };
          return language;
        });
        country.translations = response.translations as Translations;
        return country;
      })
    );
  }
}
