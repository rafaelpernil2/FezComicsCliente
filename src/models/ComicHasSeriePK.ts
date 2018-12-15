

export class ComicHasSeriePK {
    idComic : number;
    idSerie : number;
    
    
    constructor(
       idComic : number,
       idSerie : number,
    ) {
        this.idComic = idComic || null;
        this.idSerie = idSerie || null;
    }
}