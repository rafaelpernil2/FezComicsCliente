import { Comic } from "src/models/Comic";
import { AppSettings } from "src/config/AppSettings";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";

export class DataUtil {
    public static getFoto(comic: Comic) {
        return 'data:image/jpeg;base64, ' + comic.foto;
    }

    public static getImgContent(comic: Comic): SafeUrl {
        let result: string;
        let domSanitizer: DomSanitizer;
        if (comic.foto == null) {
            result = new AppSettings().json.default.DefaultLogo;
        } else {
            result = 'data:image/jpeg;base64, ' + comic.foto;
        }
        return domSanitizer.bypassSecurityTrustUrl(result);
    }

}