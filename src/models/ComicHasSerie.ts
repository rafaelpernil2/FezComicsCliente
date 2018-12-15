import { Serie } from "./Serie";
import { Comic } from "./Comic";
import { ComicHasSeriePK } from "./ComicHasSeriePK";

export class ComicHasSerie {
    serie : Serie;
    comic : Comic;
    anotacionPublica : String;
    comicHasSeriePK: ComicHasSeriePK;

    constructor(
        serie : Serie,
        comic : Comic,
        anotacionPublica : String,
        comicHasSeriePK : ComicHasSeriePK
    ) {
        this.comic = comic || null;
        this.serie = serie || null;
        this.anotacionPublica = anotacionPublica || '';
        this.comicHasSeriePK = comicHasSeriePK || null;
    }
}