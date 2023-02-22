import { Component, OnInit } from '@angular/core';
import { Country, Language } from '../models/country.model';
import { CountryService } from '../services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  countries: Country[] = [];
  searchQuery = '';
  countriesToShow: Country[] = [];
   itemsPerPage = 4;
  currentPage = 1;
  totalPages = 0;
  favoriteCountries: Country[] = [];

  constructor(private countryService: CountryService, private router: Router) {}

  onSearchQueryChanged(): void {
    this.currentPage = 1;
    let filteredCountries = [...this.countries];

    if (this.searchQuery !== '') {
      filteredCountries = filteredCountries.filter((country: Country) =>
        country.name.common
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }

    this.countriesToShow = filteredCountries.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
    this.totalPages = Math.ceil(filteredCountries.length / this.itemsPerPage);
  
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data: Country[]) => {
      this.countries = data;
      this.updateLanguageCountries();
      this.filterCountries();

      // Load favorite countries from local storage
      const favorites = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      ) as string[];
      this.countries.forEach((country: Country) => {
        country.isFavorite = favorites.includes(country.alpha3Code);
      });
      this.favoriteCountries = this.countries.filter(
        (country) => country.isFavorite
      );
    });
  }


  viewCountryDetails(country: Country): void {
    this.router.navigate(['/country', country.name.common]);
  } 

  getCountryLanguageList(languageList: Language[]): string {
    const validLanguages = languageList.filter(
      (l: Language) => l.name && l.name.common
    );
    return validLanguages.map((l: Language) => l.name.common).join(', ');
  }

  updateLanguageCountries(): void {
    this.countries.forEach((country: Country) => {
      country.languages.forEach((language: Language) => {
        if (language.name && language.name.common) {
          language.name.common =
            language.name.common.charAt(0).toUpperCase() +
            language.name.common.slice(1);
        }
      });
    });
  }

  filterCountries(): void {
    this.currentPage = 1;
    let filteredCountries = [...this.countries];

    if (this.searchQuery !== '') {
      filteredCountries = filteredCountries.filter((country: Country) => {
        const nameMatch = country.name.common
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const translationMatch = Object.values(country.translations || {}).some(
          (translation) =>
            (translation.common || '')
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            (translation.official || '')
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
        );
        return nameMatch || translationMatch;
      });
    }

    this.countriesToShow = filteredCountries.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
    this.totalPages = Math.ceil(filteredCountries.length / this.itemsPerPage);
  }

  toggleFavorite(country: Country): void {
    country.isFavorite = !country.isFavorite;

    // Update favorite countries list in local storage
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    ) as string[];
    if (country.isFavorite) {
      favorites.push(country.alpha3Code);
    } else {
      const index = favorites.indexOf(country.alpha3Code);
      if (index >= 0) {
        favorites.splice(index, 1);
      }
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));

    this.favoriteCountries = this.countries.filter(
      (country: Country) => country.isFavorite
    );
  }

  previousPage(): void {
    this.currentPage--;
    this.updateCountriesToShow();
  }

  nextPage(): void {
    this.currentPage++;
    this.updateCountriesToShow();
  }

  private updateCountriesToShow(): void {
    this.countriesToShow = this.countries.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }
}
