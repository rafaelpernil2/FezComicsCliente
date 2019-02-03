import { Serie } from "./Serie";
import { Comic } from "./Comic";
import { ComicHasSeriePK } from "./ComicHasSeriePK";

export class ComicHasSerie {
    id_serie : number;
    id_comic : number;
    anotacion_publica : String;
    //comicHasSeriePK: ComicHasSeriePK;

    constructor(
        id_serie : number,
        id_comic : number,
        anotacion_publica : String,
        //comicHasSeriePK : ComicHasSeriePK
    ) {
        this.id_comic = id_comic || null;
        this.id_serie = id_serie || null;
        this.anotacion_publica = anotacion_publica || '';
        //this.comicHasSeriePK = comicHasSeriePK || null;
    }
}