import { Comic } from 'src/models/Comic';
import { AppSettings } from 'src/config/AppSettings';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

export class DataUtil {
    public static getFoto(comic: Comic) {
        return 'data:image/jpeg;base64, ' + comic.foto;
    }

    public static getImgContent(domSanitizer: DomSanitizer, comic?: Comic): SafeUrl {
        let result: string;
        if (comic && comic.foto) {
            result = 'data:image/jpeg;base64, ' + comic.foto;
        } else {
            result = new AppSettings().json.default.DefaultLogo;
        }
        return domSanitizer.bypassSecurityTrustUrl(result);
    }



    public static setCookie = (name: string, value: string, days: number) => {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }
    public static getCookie = (cname: string) => {
        let result = '';
        const name = cname + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let c of ca) {
            // Remove spaces
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            // If found
            if (c.indexOf(name) === 0) {
                result = c.substring(name.length, c.length);
            }
        }

        return result;
    }
    public static eraseCookie = (name) => {
        document.cookie = name + '=; Max-Age=-99999999;';
    }

}
