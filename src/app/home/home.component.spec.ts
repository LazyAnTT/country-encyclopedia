import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Country } from '../models/country.model';
import { CountryService } from '../services/country.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let countryServiceSpy: jasmine.SpyObj<CountryService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CountryService', ['getCountries']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
      providers: [{ provide: CountryService, useValue: spy }],
    }).compileComponents();

    countryServiceSpy = TestBed.inject(CountryService) as jasmine.SpyObj<
      CountryService
    >;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    // Set up test data
    const latvia: Country = {
      name: { common: 'Latvia', official: 'Republic of Latvia' },
      alpha2Code: 'LV',
      alpha3Code: 'LVA',
      region: 'Europe',
      subregion: 'Northern Europe',
      population: 1915000,
      populationRank: 145,
      flags: { svg: 'https://restcountries.com/data/lva.svg', png: '' },
      area: 64559,
      neighbors: ['EST', 'LTU', 'RUS', 'BLR'],
      languages: [
        { code: 'lav', name: { official: 'Latvian', common: 'Latvian' } },
      ],
      translations: {
        cym: { official: 'Republic of Latvia', common: 'Latfia' },
        deu: { official: 'Republik Lettland', common: 'Lettland' },
        fra: { official: 'R\u00e9publique de Lettonie', common: 'Lettonie' },
        hrv: { official: 'Republika Latvija', common: 'Latvija' },
        ita: { official: 'Repubblica di Lettonia', common: 'Lettonia' },
        jpn: {
          official: '\u30e9\u30c8\u30d3\u30a2\u5171\u548c\u56fd',
          common: '\u30e9\u30c8\u30d3\u30a2',
        },
        nld: { official: 'Republiek Letland', common: 'Letland' },
        por: { official: 'Rep\u00fablica da Let\u00f3nia', common: 'Let\u00f3nia' },
        rus: {
          official: '\u041b\u0430\u0442\u0432\u0438\u0439\u0441\u043a\u0430\u044f \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430',
          common: '\u041b\u0430\u0442\u0432\u0438\u044f',
        },
        spa: { official: 'Rep\u00fablica de Letonia', common: 'Letonia' },
      },
    };
    component.countries = [latvia];
    component.countriesToShow = [latvia];
  fixture.detectChanges();
});

it('should create', () => {
expect(component).toBeTruthy();
});

it('should call the country service on init', () => {
component.ngOnInit();
expect(countryServiceSpy.getCountries).toHaveBeenCalled();
});

it('should update the countriesToShow list when the search query changes', () => {
  component.searchQuery = 'Latvia';
  component.onSearchQueryChanged();
  expect(component.countriesToShow.length).toBe(1);
  expect(component.countriesToShow[0].name.common).toBe('Latvia');

  component.searchQuery = 'Non-existing Country';
  component.onSearchQueryChanged();
  expect(component.countriesToShow.length).toBe(0);
});

it('should reset the search query and update the countriesToShow list when resetSearch is called', () => {
  component.searchQuery = 'Latvia';
  component.onSearchQueryChanged();
  expect(component.countriesToShow.length).toBe(1);

  component.searchQuery = '';
  component.onSearchQueryChanged();
  expect(component.countriesToShow.length).toBe(component.countries.length);
});
});