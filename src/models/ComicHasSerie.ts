import { Serie } from './Serie';
import { Comic } from './Comic';
import { ComicHasSeriePK } from './ComicHasSeriePK';

export class ComicHasSerie {
    idSerie: number;
    idComic: number;
    anotacionPublica: string;

    constructor(
        idSerie: number,
        idComic: number,
        anotacionPublica: string,
    ) {
        this.idComic = idComic || null;
        this.idSerie = idSerie || null;
        this.anotacionPublica = anotacionPublica || '';
    }
}
