import { Serie } from "./Serie";
import { Comic } from "./Comic";

export class ComicHasSerie {
    serie : Serie;
    comic : Comic;
    anotacionPublica : String
    constructor(
        serie : Serie,
        comic : Comic,
        anotacionPublica : String
    ) {
        this.comic = comic || null;
        this.serie = serie || null;
        this.anotacionPublica = anotacionPublica || null;
    }
}