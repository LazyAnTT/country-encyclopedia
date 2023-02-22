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
          country.flags.svg = item.flags.svg;
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
    const url = `https://restcountries.com/v3.1/name/${code}`;

    return this.http.get<Country>(url).pipe(
      map((response: any) => {
              const responseDestructured = response[0];
        const country = new Country();
        country.name = {
          common: responseDestructured.name?.common,
          official: responseDestructured.name?.official,
        };
        country.alpha2Code = responseDestructured.cca2;
        country.alpha3Code = responseDestructured.cca3;
        country.region = responseDestructured.region;
        country.subregion = responseDestructured.subregion;
        country.population = responseDestructured.population;
        country.populationRank = responseDestructured.populationRank;
        country.flags.svg = responseDestructured.flags.svg;
        country.area = responseDestructured.area;
        country.neighbors = responseDestructured.borders;
        // country.languages = responseDestructured.languages.cnr
        country.languages = Object.keys(
          responseDestructured.languages || {}
        ).map((key) => {
                   const language: Language = {
            code: key,
            name: responseDestructured.languages[key],
          };
          return language;
        });
       
        country.translations =
          responseDestructured.translations as Translations;
        return country;
      })
    );
  }
}
