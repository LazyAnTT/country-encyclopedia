export class Country {
  name: {
    common: string;
    official: string;
  };
  alpha2Code: string;
  alpha3Code: string;
  region: string;
  subregion: string;
  population: number;
  populationRank: number;
  flags: {
    svg: string;
    png: string;
  };
  area: number;
  neighbors: string[];
  languages: Language[];
  isFavorite?: boolean;
  translations: Translations;

  constructor() {
    this.name = {
      common: '',
      official: '',
    };
    this.alpha2Code = '';
    this.alpha3Code = '';
    this.region = '';
    this.subregion = '';
    this.population = 0;
    this.populationRank = 0;
    this.flags = {
      svg: '',
      png: '',
    };
    this.area = 0;
    this.neighbors = [];
    this.languages = [];
    this.translations = {
      cym: { official: '', common: '' },
      deu: { official: '', common: '' },
      fra: { official: '', common: '' },
      hrv: { official: '', common: '' },
      ita: { official: '', common: '' },
      jpn: { official: '', common: '' },
      nld: { official: '', common: '' },
      por: { official: '', common: '' },
      rus: { official: '', common: '' },
      spa: { official: '', common: '' },
    };
  }
}


export interface Language {
  code: string;
  name: { official: string; common: string };
}



export interface Translations {
  cym: {
    official: string;
    common: string;
  };
  deu: {
    official: string;
    common: string;
  };
  fra: {
    official: string;
    common: string;
  };
  hrv: {
    official: string;
    common: string;
  };
  ita: {
    official: string;
    common: string;
  };
  jpn: {
    official: string;
    common: string;
  };
  nld: {
    official: string;
    common: string;
  };
  por: {
    official: string;
    common: string;
  };
  rus: {
    official: string;
    common: string;
  };
  spa: {
    official: string;
    common: string;
  };
}
