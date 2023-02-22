import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../models/country.model';
import { CountryService } from '../services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  country: Country = new Country()
  isFavorite = false;
  

  constructor(
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    
    const countryCode = this.route.snapshot.paramMap.get('code');
    if (countryCode === null) {
      return;
    }

    this.countryService
      .getCountryByCode(countryCode)
      .subscribe((data: Country) => {
    
        this.country = data;

        // Load favorite status from local storage
        const favorites = JSON.parse(
          localStorage.getItem('favorites') || '[]'
        ) as string[];
        this.isFavorite = favorites.includes(this.country.alpha3Code);
      });
     

     
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.country.isFavorite = this.isFavorite;

    // Update favorite countries list in local storage
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    ) as string[];
    if (this.isFavorite) {
      favorites.push(this.country.alpha3Code);
    } else {
      const index = favorites.indexOf(this.country.alpha3Code);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
