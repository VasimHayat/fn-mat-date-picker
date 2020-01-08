
export class FnDateFormatter {

    format(d?: Date, pattern?: any, langId?: any) {
        if (langId == "undefined" || langId == null || langId.trim() == "") {
            langId = "NoLang"
        }
        if (typeof pattern != "string") return;
        let dYear = d.getFullYear();
        let dMonth = d.getMonth();
        let dDate = d.getDate();
        let dDay = d.getDay();
        let dHours = d.getHours();
        let dMinutes = d.getMinutes();
        let dSeconds = d.getSeconds();
        let res = "";
        if (pattern === "RIB") {
            res = this.from24to12(dHours) + (":" + this.preZero(dMinutes)) + this.ap(dHours);
        }
        else if (pattern === "RIB_DT") {
            res = this.preZero(dMonth + 1) + '/' + this.preZero(dDate) + '/' + dYear + " " + this.from24to12(dHours) + (":" + this.preZero(dMinutes)) + this.ap(dHours);
            console.log(res)
        }
        else {
            for (let i = 0, len = pattern.length; i < len; i++) {
                let c = pattern.charAt(i);
                switch (c) {
                    case "#":
                        if (i == len - 1) break;
                        res += pattern.charAt(++i);
                        break;
                    case "Y":
                        res += dYear;
                        break;
                    case "y":
                        res += dYear.toString().substr(2, 2);
                        break;
                    case "m":
                        res += this.preZero(dMonth + 1);
                        break;
                    case "M":
                        res += dMonth + 1;
                        break;
                    case "d":
                        res += this.preZero(dDate);
                        break;
                    case "j":
                        res += dDate;
                        break;
                    case "w":
                        res += dDay;
                        break;
                    case "N":
                        res += this.isoDay(dDay);
                        break;
                    case "l":
                        if (langId != "NoLang") {
                            res += this.weekFullInLocal(langId, dDay);
                            break;
                        }
                        res += this.weekFullEn[dDay];
                        break;
                    case "D":
                        if (langId != "NoLang") {
                            res += this.getDayInLocal(langId, dDay);
                            break;
                        }
                        res += this.weekFullEn[dDay].substr(0, 3);
                        break;
                    case "X":
                        if (langId != "NoLang") {
                            res += this.getDayInShortLocal(langId, dDay);
                            break;
                        }
                        res += this.weekFullEn[dDay].substr(0, 1);
                        break;
                    case "J":
                        res += this.weekJp[dDay];
                        break;
                    case "F":
                        if (langId != "NoLang") {
                            res += this.getMonthInLocal(langId, dMonth);
                            break;
                        }
                        res += this.monthFullEn[dMonth];
                        break;
                    case "R":
                        if (langId != "NoLang") {
                            res += this.getMonthAbbrInLocal(langId, dMonth);
                            break;
                        }
                        res += this.monthFullEn[dMonth].substr(0, 3);
                        break;
                    case "O":
                        res += this.monthOldJp[dMonth];
                        break;
                    case "a":
                        res += this.ampm(dHours);
                        break;
                    case "P":
                        res += this.ap(dHours);
                        break;
                    case "A":
                        res += this.ampm(dHours).toUpperCase();
                        break;
                    case "H":
                        res += this.preZero(dHours);
                        break;
                    case "h":
                        res += this.preZero(this.from24to12(dHours));
                        break;
                    case "g":
                        res += this.from24to12(dHours);
                        break;
                    case "G":
                        res += dHours;
                        break;
                    case "i":
                        res += this.preZero(dMinutes);
                        break;
                    case "s":
                        res += this.preZero(dSeconds);
                        break;
                    case "t":
                        res += this.lastDayOfMonth(d);
                        break;
                    case "L":
                        res += this.isLeapYear(dYear);
                        break;
                    case "z":
                        res += this.dateCount(dYear, dMonth, dDate);
                        break;
                    case "S":
                        res += this.dateSuffix[dDate - 1];
                        break;
                    default:
                        res += c;
                        break;
                }
            }
        }
        return res;
    };

    weekFullEn: any = ["Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday", "Saturday"];

    weekJp: any = ["日", "月", "火", "水", "木", "金", "土"];

    monthFullEn: any = ["January", "February", "March", "ril", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    monthOldJp: any = ["睦月", "如月", "弥生", "卯月", "皐月", "水無月",
        "文月", "葉月", "長月", "神無月", "霜月", "師走"];

    dateSuffix: any = [
        "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
        "th", "th", "th", "th", "th", "th", "th", "th", "th", "th",
        "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st"];

    preZero(value: any) {
        return (parseInt(value) < 10) ? "0" + value : value;
    };

    from24to12(hours: any) {
        return (hours > 12) ? hours - 12 : (hours == 0 ? 12 : hours);
    };

    ampm(hours: any) {
        return (hours < 12) ? "am" : "pm";
    };
    ap(hours: any) {
        return (hours < 12) ? "a" : "p";
    };

    isoDay(day: any) {
        return (day == 0) ? "7" : day;
    };

    lastDayOfMonth(dateObj: any) {
        let tmp = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 1);
        tmp.setTime(tmp.getTime() - 1);
        return tmp.getDate();
    };

    isLeapYear(year: any) {
        let tmp = new Date(year, 0, 1);
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            tmp.setMonth(i);
            sum += this.lastDayOfMonth(tmp);
        }
        return (sum == 365) ? "0" : "1";
    };

    dateCount(year: any, month: any, date: any) {
        let tmp = new Date(year, 0, 1);
        let sum = -1;
        for (let i = 0; i < month; i++) {
            tmp.setMonth(i);
            sum += this.lastDayOfMonth(tmp);
        }
        return sum + date;
    };
    getMonthAbbrInLocal(lngIID: any, month: any) {
        let lagnHash: any = {
            "es": ["ene", "feb", "mar", "abr", "may", "jun",
                "jul", "ago", "sep", "oct", "nov", "dic"],
            "en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "fr": ["&#106;&#97;&#110;&#118;", "&#102;&#101;&#118;&#114;", "&#109;&#97;&#114;&#115;", "&#97;&#118;&#114;&#105;&#108;", "&#109;&#97;&#105;", " &#106;&#117;&#105;&#110;",
                "&#106;&#117;&#105;&#108;", "&#97;&#111;&#117;&#116;", "&#115;&#101;&#112;&#116;", "&#111;&#99;&#116;", "&#110;&#111;&#118;", "&#100;&#101;&#99;"],
            "zh": ["&#19968;&#26376;", "&#20108;&#26376;", " &#19977;&#26376;", "&#22235;&#26376;", "&#20116;&#26376;", "&#20845;&#26376;",
                "&#19971;&#26376;", "&#19971;&#26376;", "&#20061;&#26376;", " &#21313;&#26376;", " &#21313;&#19968;&#26376;", " &#21313;&#20108;&#26376;"],
            "de": ["Jan", "Feb.", "März", "Apr.", "Mai", "Juni",
                "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez"],
            "it": ["genn", "febbr", "mar", "apr", "magg", "giugno",
                "luglio", "ag", "sett", "ott", "nov", "dic"]
        }
        return lagnHash[lngIID][month];
    };
    getMonthInLocal(lngIID: any, month: any) {
        let lagnHash: any = {
            "es": ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            "en": ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"],
            "fr": ["janvier", "février", "mars", "avril", "mai", "juin",
                "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
            "zh": ["&#19968;&#26376;", "&#20108;&#26376;", " &#19977;&#26376;", "&#22235;&#26376;", "&#20116;&#26376;", "&#20845;&#26376;",
                "&#19971;&#26376;", "&#19971;&#26376;", "&#20061;&#26376;", " &#21313;&#26376;", " &#21313;&#19968;&#26376;", " &#21313;&#20108;&#26376;"],
            "de": ["Januar", "Februar", "Marz", "April", "Mai", "Juni",
                "Juli", "August", "September", "Oktober", "November", "Dezember"],
            "it": ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
                "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
        }
        return lagnHash[lngIID][month];
    };
    getDayInLocal(lngIID: any, day: any) {
        let lagnHash: any = {
            "es": ["Dom", "Lu", "Ma", "Mx", "Ju", "Vi", "Sab"],
            "en": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "fr": ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
            "zh": ["&#21608;&#26085;", "&#21608;&#19968;", "&#21608;&#20108;", "&#21608;&#19977;", "&#21608;&#22235;", "&#21608;&#20116;", "&#21608;&#20845;"],
            "de": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
            "it": ["dom", "lun", "mar", "mer", "gio", "ven", "sab"]
        }
        return lagnHash[lngIID][day];
    };
    weekFullInLocal(langId: any, dayIndex: any) {
        let dayHashOnLang: any = {
            "en": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "es": ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            "fr": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
            "zh": ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            "de": ["Sonntag", "Montag", "Dienstag	", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
            "it": ["domenica", "luned\u00ec", "marted\u00ec", "mercoled\u00ec", "gioved\u00ec", "venerd\u00ec", "sabato"]
        }
        return dayHashOnLang[langId][dayIndex]
    };
    getDayInShortLocal(lngIID: any, day: any) {
        let lagnHash: any = {
            "es": ["D", "L", "M", "M", "J", "V", "S"],
            "en": ["S", "M", "T", "W", "T", "F", "S"],
            "fr": ["D", "L", "M", "M", "J", "V", "S"],
            "zh": ["&#21608;&#26085;", "&#21608;&#19968;", "&#21608;&#20108;", "&#21608;&#19977;", "&#21608;&#22235;", "&#21608;&#20116;", "&#21608;&#20845;"],
            "de": ["S", "M", "D", "M", "D", "F", "S"],
            "it": ["d", "l", "m", "m", "g", "v", "s"]
        }
        return lagnHash[lngIID][day];
    }
}



//     export class FnDateFormatter {

//   static  format(d?: Date, pattern?: any, langId?: any) {
//         if (langId == "undefined" || langId == null || langId.trim() == "") {
//             langId = "NoLang"
//         }
//         if (typeof pattern != "string") return;
//         let dYear = d.getFullYear();
//         let dMonth = d.getMonth();
//         let dDate = d.getDate();
//         let dDay = d.getDay();
//         let dHours = d.getHours();
//         let dMinutes = d.getMinutes();
//         let dSeconds = d.getSeconds();
//         let res = "";
//         if (pattern === "RIB") {
//             res = this.from24to12(dHours) + (":" + this.preZero(dMinutes)) + this.ap(dHours);
//         }
//         else if (pattern === "RIB_DT") {
//             res = this.preZero(dMonth + 1) + '/' + this.preZero(dDate) + '/' + dYear + " " + this.from24to12(dHours) + (":" + this.preZero(dMinutes)) + this.ap(dHours);
//         }
//         else {
//             for (let i = 0, len = pattern.length; i < len; i++) {
//                 let c = pattern.charAt(i);
//                 switch (c) {
//                     case "#":
//                         if (i == len - 1) break;
//                         res += pattern.charAt(++i);
//                         break;
//                     case "Y":
//                         res += dYear;
//                         break;
//                     case "y":
//                         res += dYear.toString().substr(2, 2);
//                         break;
//                     case "m":
//                         res += this.preZero(dMonth + 1);
//                         break;
//                     case "M":
//                         res += dMonth + 1;
//                         break;
//                     case "d":
//                         res += this.preZero(dDate);
//                         break;
//                     case "j":
//                         res += dDate;
//                         break;
//                     case "w":
//                         res += dDay;
//                         break;
//                     case "N":
//                         res += this.isoDay(dDay);
//                         break;
//                     case "l":
//                         if (langId != "NoLang") {
//                             res += this.weekFullInLocal(langId, dDay);
//                             break;
//                         }
//                         res += this.weekFullEn[dDay];
//                         break;
//                     case "D":
//                         if (langId != "NoLang") {
//                             res += this.getDayInLocal(langId, dDay);
//                             break;
//                         }
//                         res += this.weekFullEn[dDay].substr(0, 3);
//                         break;
//                     case "X":
//                         if (langId != "NoLang") {
//                             res += this.getDayInShortLocal(langId, dDay);
//                             break;
//                         }
//                         res += this.weekFullEn[dDay].substr(0, 1);
//                         break;
//                     case "J":
//                         res += this.weekJp[dDay];
//                         break;
//                     case "F":
//                         if (langId != "NoLang") {
//                             res += this.getMonthInLocal(langId, dMonth);
//                             break;
//                         }
//                         res += this.monthFullEn[dMonth];
//                         break;
//                     case "R":
//                         if (langId != "NoLang") {
//                             res += this.getMonthAbbrInLocal(langId, dMonth);
//                             break;
//                         }
//                         res += this.monthFullEn[dMonth].substr(0, 3);
//                         break;
//                     case "O":
//                         res += this.monthOldJp[dMonth];
//                         break;
//                     case "a":
//                         res += this.ampm(dHours);
//                         break;
//                     case "P":
//                         res += this.ap(dHours);
//                         break;
//                     case "A":
//                         res += this.ampm(dHours).toUpperCase();
//                         break;
//                     case "H":
//                         res += this.preZero(dHours);
//                         break;
//                     case "h":
//                         res += this.preZero(this.from24to12(dHours));
//                         break;
//                     case "g":
//                         res += this.from24to12(dHours);
//                         break;
//                     case "G":
//                         res += dHours;
//                         break;
//                     case "i":
//                         res += this.preZero(dMinutes);
//                         break;
//                     case "s":
//                         res += this.preZero(dSeconds);
//                         break;
//                     case "t":
//                         res += this.lastDayOfMonth(d);
//                         break;
//                     case "L":
//                         res += this.isLeapYear(dYear);
//                         break;
//                     case "z":
//                         res += this.dateCount(dYear, dMonth, dDate);
//                         break;
//                     case "S":
//                         res += this.dateSuffix[dDate - 1];
//                         break;
//                     default:
//                         res += c;
//                         break;
//                 }
//             }
//         }
//         return res;
//     };

//     static weekFullEn: any = ["Sunday", "Monday", "Tuesday",
//         "Wednesday", "Thursday", "Friday", "Saturday"];

//     static weekJp: any = ["日", "月", "火", "水", "木", "金", "土"];

//     static monthFullEn: any = ["January", "February", "March", "ril", "May", "June",
//         "July", "August", "September", "October", "November", "December"];

//     static monthOldJp: any = ["睦月", "如月", "弥生", "卯月", "皐月", "水無月",
//         "文月", "葉月", "長月", "神無月", "霜月", "師走"];

//    static dateSuffix: any = [
//         "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th",
//         "th", "th", "th", "th", "th", "th", "th", "th", "th", "th",
//         "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st"];

//    static preZero(value: any) {
//         return (parseInt(value) < 10) ? "0" + value : value;
//     };

//     static from24to12(hours: any) {
//         return (hours > 12) ? hours - 12 : (hours == 0 ? 12 : hours);
//     };

//     static ampm(hours: any) {
//         return (hours < 12) ? "am" : "pm";
//     };
//     static ap(hours: any) {
//         return (hours < 12) ? "a" : "p";
//     };

//    static isoDay(day: any) {
//         return (day == 0) ? "7" : day;
//     };

//     static lastDayOfMonth(dateObj: any) {
//         let tmp = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 1);
//         tmp.setTime(tmp.getTime() - 1);
//         return tmp.getDate();
//     };

//   static  isLeapYear(year: any) {
//         let tmp = new Date(year, 0, 1);
//         let sum = 0;
//         for (let i = 0; i < 12; i++) {
//             tmp.setMonth(i);
//             sum += this.lastDayOfMonth(tmp);
//         }
//         return (sum == 365) ? "0" : "1";
//     };

//     static dateCount(year: any, month: any, date: any) {
//         let tmp = new Date(year, 0, 1);
//         let sum = -1;
//         for (let i = 0; i < month; i++) {
//             tmp.setMonth(i);
//             sum += this.lastDayOfMonth(tmp);
//         }
//         return sum + date;
//     };
//     static getMonthAbbrInLocal(lngIID: any, month: any) {
//         let lagnHash: any = {
//             "es": ["ene", "feb", "mar", "abr", "may", "jun",
//                 "jul", "ago", "sep", "oct", "nov", "dic"],
//             "en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//                 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//             "fr": ["&#106;&#97;&#110;&#118;", "&#102;&#101;&#118;&#114;", "&#109;&#97;&#114;&#115;", "&#97;&#118;&#114;&#105;&#108;", "&#109;&#97;&#105;", " &#106;&#117;&#105;&#110;",
//                 "&#106;&#117;&#105;&#108;", "&#97;&#111;&#117;&#116;", "&#115;&#101;&#112;&#116;", "&#111;&#99;&#116;", "&#110;&#111;&#118;", "&#100;&#101;&#99;"],
//             "zh": ["&#19968;&#26376;", "&#20108;&#26376;", " &#19977;&#26376;", "&#22235;&#26376;", "&#20116;&#26376;", "&#20845;&#26376;",
//                 "&#19971;&#26376;", "&#19971;&#26376;", "&#20061;&#26376;", " &#21313;&#26376;", " &#21313;&#19968;&#26376;", " &#21313;&#20108;&#26376;"],
//             "de": ["Jan", "Feb.", "März", "Apr.", "Mai", "Juni",
//                 "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez"],
//             "it": ["genn", "febbr", "mar", "apr", "magg", "giugno",
//                 "luglio", "ag", "sett", "ott", "nov", "dic"]
//         }
//         return lagnHash[lngIID][month];
//     };
//     static getMonthInLocal(lngIID: any, month: any) {
//         let lagnHash: any = {
//             "es": ["enero", "febrero", "marzo", "abril", "mayo", "junio",
//                 "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
//             "en": ["January", "February", "March", "April", "May", "June",
//                 "July", "August", "September", "October", "November", "December"],
//             "fr": ["janvier", "février", "mars", "avril", "mai", "juin",
//                 "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
//             "zh": ["&#19968;&#26376;", "&#20108;&#26376;", " &#19977;&#26376;", "&#22235;&#26376;", "&#20116;&#26376;", "&#20845;&#26376;",
//                 "&#19971;&#26376;", "&#19971;&#26376;", "&#20061;&#26376;", " &#21313;&#26376;", " &#21313;&#19968;&#26376;", " &#21313;&#20108;&#26376;"],
//             "de": ["Januar", "Februar", "Marz", "April", "Mai", "Juni",
//                 "Juli", "August", "September", "Oktober", "November", "Dezember"],
//             "it": ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
//                 "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
//         }
//         return lagnHash[lngIID][month];
//     };
//     static getDayInLocal(lngIID: any, day: any) {
//         let lagnHash: any = {
//             "es": ["Dom", "Lu", "Ma", "Mx", "Ju", "Vi", "Sab"],
//             "en": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//             "fr": ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
//             "zh": ["&#21608;&#26085;", "&#21608;&#19968;", "&#21608;&#20108;", "&#21608;&#19977;", "&#21608;&#22235;", "&#21608;&#20116;", "&#21608;&#20845;"],
//             "de": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
//             "it": ["dom", "lun", "mar", "mer", "gio", "ven", "sab"]
//         }
//         return lagnHash[lngIID][day];
//     };
//     static weekFullInLocal(langId: any, dayIndex: any) {
//         let dayHashOnLang: any = {
//             "en": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//             "es": ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
//             "fr": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
//             "zh": ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
//             "de": ["Sonntag", "Montag", "Dienstag	", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
//             "it": ["domenica", "luned\u00ec", "marted\u00ec", "mercoled\u00ec", "gioved\u00ec", "venerd\u00ec", "sabato"]
//         }
//         return dayHashOnLang[langId][dayIndex]
//     };
//   static  getDayInShortLocal(lngIID: any, day: any) {
//         let lagnHash: any = {
//             "es": ["D", "L", "M", "M", "J", "V", "S"],
//             "en": ["S", "M", "T", "W", "T", "F", "S"],
//             "fr": ["D", "L", "M", "M", "J", "V", "S"],
//             "zh": ["&#21608;&#26085;", "&#21608;&#19968;", "&#21608;&#20108;", "&#21608;&#19977;", "&#21608;&#22235;", "&#21608;&#20116;", "&#21608;&#20845;"],
//             "de": ["S", "M", "D", "M", "D", "F", "S"],
//             "it": ["d", "l", "m", "m", "g", "v", "s"]
//         }
//         return lagnHash[lngIID][day];
//     }
// }