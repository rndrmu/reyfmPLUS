import { PlayerQuality, RfmApiData, Station } from "@utils/types";

export * from "./player";
export * from "./notification";
export * from "./modal";

/**
 * General API Definitions
 */
export class NuxtStoreGetters {
    private _getters: any;
    constructor() {
        this._getters = window.$nuxt.$store.getters;
    }

    get getters() {
        return this._getters;
    }

    get currentStationInView(): Station {
        return this._getters["main/getCurrentStation"];
    }

    get currentPlayingStation(): Station {
        return this._getters["player/getCurrentStation"];
    }

    get data(): RfmApiData {
        return this._getters["main/getData"];
    }

    get allListeners(): number {
        return this.data.all_listeners;
    }

    get audio(): HTMLAudioElement {
        return this._getters["player/getAudio"];
    }

    get loading(): boolean {
        return this._getters["player/getLoading"];
    }

    get playing(): boolean {
        return this._getters["player/getPlaying"];
    }

    get volume(): number {
        return Number(this._getters["player/getVolume"]);
    }

    get quality(): PlayerQuality {
        return this._getters["player/getQuality"];
    }
}

/**
 * HTTP Client - aka hijacking the axios instance
 */
export class HttpClient {
    private _axios: any;
    private _config: any = {
        baseURL: "https://api.reyfm.de/v4"
    }
    constructor() {
        this._axios = window.$nuxt.$axios;
    }

    get axios() {
        return this._axios;
    }

    setBaseUrl(url: string) {
        this._config.baseURL = url;
    }

    get(url: string, config?: any) {
        return this._axios.get(url, config);
    }

    post(url: string, data?: any, config?: any) {
        return this._axios.post(url, data, config);
    }

    put(url: string, data?: any, config?: any) {
        return this._axios.put(url, data, config);
    }

    delete(url: string, config?: any) {
        return this._axios.delete(url, config);
    }

    head(url: string, config?: any) {
        return this._axios.head(url, config);
    }

    options(url: string, config?: any) {
        return this._axios.options(url, config);
    }

    patch(url: string, data?: any, config?: any) {
        return this._axios.patch(url, data, config);
    }
}

interface IApi {
    getters: NuxtStoreGetters;
    http: HttpClient;
}


export const Api: IApi = {
    getters: new NuxtStoreGetters(),
    http: new HttpClient(),
};


// vue component that just returns a "hello world" string as compiled template
/**
 * example component -> returns privacy policy
 * function(e,n,r){"use strict";r.r(n);var t={name:"Privacy"},d=r(36),component=Object(d.a)(t,(function(){this._self._c;return this._m(0)}),[function(){var e=this,n=e._self._c;return n("div",{staticClass:"base-container space-y-12 pt-32 pb-12"},[n("h1",{staticClass:"akira text-xl text-white"},[e._v("Datenschutzerkl??rung")]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("Verantwortlicher")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      Luca Riefer"),n("br"),e._v("Auf dem Holtfeld, 19"),n("br"),e._v("59199 B??nen\\n    ")])]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n    Diese Datenschutzerkl??rung kl??rt Sie ??ber die Art, den Umfang und Zweck\\n    der Verarbeitung von personenbezogenen Daten (nachfolgend kurz ???Daten???)\\n    innerhalb unseres Onlineangebotes und der mit ihm verbundenen Webseiten,\\n    Funktionen und Inhalte sowie externen Onlinepr??senzen, wie z.B. unser\\n    Social Media Profile auf. (nachfolgend gemeinsam bezeichnet als\\n    ???Onlineangebot???). Im Hinblick auf die verwendeten Begrifflichkeiten, wie\\n    z.B. ???Verarbeitung??? oder ???Verantwortlicher??? verweisen wir auf die\\n    Definitionen im Art. 4 der Datenschutzgrundverordnung (DSGVO).\\n  ")]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("Arten der verarbeiteten Daten")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      - Bestandsdaten (z.B., Namen, Adressen)."),n("br"),e._v("\\n      - Kontaktdaten (z.B., E-Mail, Telefonnummern)."),n("br"),e._v("\\n      - Inhaltsdaten (z.B., Texteingaben, Fotografien, Videos)."),n("br"),e._v("\\n      - Nutzungsdaten (z.B., besuchte Webseiten, Interesse an Inhalten,\\n      Zugriffszeiten)."),n("br"),e._v("\\n      - Meta-/Kommunikationsdaten (z.B., Ger??te-Informationen, IP-Adressen).\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("Zweck der Verarbeitung")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      - Zurverf??gungstellung des Onlineangebotes, seiner Funktionen und\\n      Inhalte."),n("br"),e._v("\\n      - Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern."),n("br"),e._v("\\n      - Sicherheitsma??nahmen."),n("br"),e._v("\\n      - Reichweitenmessung/Marketing\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("Verwendete Begrifflichkeiten")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      ???Personenbezogene Daten??? sind alle Informationen, die sich auf eine\\n      identifizierte oder identifizierbare nat??rliche Person (im Folgenden\\n      ???betroffene Person???) beziehen; als identifizierbar wird eine nat??rliche\\n      Person angesehen, die direkt oder indirekt, insbesondere mittels\\n      Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu\\n      Standortdaten, zu einer Online-Kennung (z.B. Cookie) oder zu einem oder\\n      mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck\\n      der physischen, physiologischen, genetischen, psychischen,\\n      wirtschaftlichen, kulturellen oder sozialen Identit??t dieser nat??rlichen\\n      Person sind."),n("br"),e._v(" "),n("br"),e._v("\\n      ???Verarbeitung??? ist jeder mit oder ohne Hilfe automatisierter Verfahren\\n      ausgef??hrten Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit\\n      personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch\\n      jeden Umgang mit Daten."),n("br"),e._v(" "),n("br"),e._v("\\n      Als ???Verantwortlicher??? wird die nat??rliche oder juristische Person,\\n      Beh??rde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit\\n      anderen ??ber die Zwecke und Mittel der Verarbeitung von\\n      personenbezogenen Daten entscheidet, bezeichnet.\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("Ma??gebliche Rechtsgrundlagen")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      Nach Ma??gabe des Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen\\n      unserer Datenverarbeitungen mit. Sofern die Rechtsgrundlage in der\\n      Datenschutzerkl??rung nicht genannt wird, gilt Folgendes: Die\\n      Rechtsgrundlage f??r die Einholung von Einwilligungen ist Art. 6 Abs. 1\\n      lit. a und Art. 7 DSGVO, die Rechtsgrundlage f??r die Verarbeitung zur\\n      Erf??llung unserer Leistungen und Durchf??hrung vertraglicher Ma??nahmen\\n      sowie Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO, die\\n      Rechtsgrundlage f??r die Verarbeitung zur Erf??llung unserer rechtlichen\\n      Verpflichtungen ist Art. 6 Abs. 1 lit. c DSGVO, und die Rechtsgrundlage\\n      f??r die Verarbeitung zur Wahrung unserer berechtigten Interessen ist\\n      Art. 6 Abs. 1 lit. f DSGVO. F??r den Fall, dass lebenswichtige Interessen\\n      der betroffenen Person oder einer anderen nat??rlichen Person eine\\n      Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6\\n      Abs. 1 lit. d DSGVO als Rechtsgrundlage.\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("Sicherheitsma??nahmen")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      Wir bitten Sie sich regelm????ig ??ber den Inhalt unserer\\n      Datenschutzerkl??rung zu informieren. Wir passen die Datenschutzerkl??rung\\n      an, sobald die ??nderungen der von uns durchgef??hrten Datenverarbeitungen\\n      dies erforderlich machen. Wir informieren Sie, sobald durch die\\n      ??nderungen eine Mitwirkungshandlung Ihrerseits (z.B. Einwilligung) oder\\n      eine sonstige individuelle Benachrichtigung erforderlich wird.\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("??bermittlungen in Drittl??nder")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      Sofern wir Daten in einem Drittland (d.h. au??erhalb der Europ??ischen\\n      Union (EU) oder des Europ??ischen Wirtschaftsraums (EWR) verarbeiten oder\\n      dies im Rahmen der Inanspruchnahme von Diensten Dritter oder\\n      Offenlegung, bzw. ??bermittlung von Daten an Dritte geschieht, erfolgt\\n      dies nur, wenn es zur Erf??llung unserer (vor)vertraglichen Pflichten,\\n      auf Grundlage Ihrer Einwilligung, aufgrund einer rechtlichen\\n      Verpflichtung oder auf Grundlage unserer berechtigten Interessen\\n      geschieht. Vorbehaltlich gesetzlicher oder vertraglicher Erlaubnisse,\\n      verarbeiten oder lassen wir die Daten in einem Drittland nur beim\\n      Vorliegen der besonderen Voraussetzungen der Art. 44 ff. DSGVO\\n      verarbeiten. D.h. die Verarbeitung erfolgt z.B. auf Grundlage besonderer\\n      Garantien, wie der offiziell anerkannten Feststellung eines der EU\\n      entsprechenden Datenschutzniveaus (z.B. f??r die USA durch das ???Privacy\\n      Shield???) oder Beachtung offiziell anerkannter spezieller vertraglicher\\n      Verpflichtungen (so genannte ???Standardvertragsklauseln???).\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("Rechte der betroffenen Personen")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      Sie haben das Recht, eine Best??tigung dar??ber zu verlangen, ob\\n      betreffende Daten verarbeitet werden und auf Auskunft ??ber diese Daten\\n      sowie auf weitere Informationen und Kopie der Daten entsprechend Art. 15\\n      DSGVO."),n("br"),e._v(" "),n("br"),e._v("\\n      Sie haben entsprechend. Art. 16 DSGVO das Recht, die Vervollst??ndigung\\n      der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden\\n      unrichtigen Daten zu verlangen."),n("br"),e._v(" "),n("br"),e._v("\\n      Sie haben nach Ma??gabe des Art. 17 DSGVO das Recht zu verlangen, dass\\n      betreffende Daten unverz??glich gel??scht werden, bzw. alternativ nach\\n      Ma??gabe des Art. 18 DSGVO eine Einschr??nkung der Verarbeitung der Daten\\n      zu verlangen."),n("br"),e._v(" "),n("br"),e._v("\\n      Sie haben das Recht zu verlangen, dass die Sie betreffenden Daten, die\\n      Sie uns bereitgestellt haben nach Ma??gabe des Art. 20 DSGVO zu erhalten\\n      und deren ??bermittlung an andere Verantwortliche zu fordern. "),n("br"),e._v(" "),n("br"),e._v("\\n      Sie haben ferner gem. Art. 77 DSGVO das Recht, eine Beschwerde bei der\\n      zust??ndigen Aufsichtsbeh??rde einzureichen.\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("Widerrufsrecht")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      Sie k??nnen der k??nftigen Verarbeitung der Sie betreffenden Daten nach\\n      Ma??gabe des Art. 21 DSGVO jederzeit widersprechen. Der Widerspruch kann\\n      insbesondere gegen die Verarbeitung f??r Zwecke der Direktwerbung\\n      erfolgen.\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("\\n      Cookies und Widerspruchsrecht bei Direktwerbung\\n    ")]),e._v(" "),n("span",{staticClass:"text-white text-opacity-50"},[e._v("\\n      Als ???Cookies??? werden kleine Dateien bezeichnet, die auf Rechnern der\\n      Nutzer gespeichert werden. Innerhalb der Cookies k??nnen unterschiedliche\\n      Angaben gespeichert werden. Ein Cookie dient prim??r dazu, die Angaben zu\\n      einem Nutzer (bzw. dem Ger??t auf dem das Cookie gespeichert ist) w??hrend\\n      oder auch nach seinem Besuch innerhalb eines Onlineangebotes zu\\n      speichern. Als tempor??re Cookies, bzw. ???Session-Cookies??? oder\\n      ???transiente Cookies???, werden Cookies bezeichnet, die gel??scht werden,\\n      nachdem ein Nutzer ein Onlineangebot verl??sst und seinen Browser\\n      schlie??t. In einem solchen Cookie kann z.B. der Inhalt eines Warenkorbs\\n      in einem Onlineshop oder ein Login-Staus gespeichert werden. Als\\n      ???permanent??? oder ???persistent??? werden Cookies bezeichnet, die auch nach\\n      dem Schlie??en des Browsers gespeichert bleiben. So kann z.B. der\\n      Login-Status gespeichert werden, wenn die Nutzer diese nach mehreren\\n      Tagen aufsuchen. Ebenso k??nnen in einem solchen Cookie die Interessen\\n      der Nutzer gespeichert werden, die f??r Reichweitenmessung oder\\n      Marketingzwecke verwendet werden. Als ???Third-Party-Cookie??? werden\\n      Cookies bezeichnet, die von anderen Anbietern als dem Verantwortlichen,\\n      der das Onlineangebot betreibt, angeboten werden (andernfalls, wenn es\\n      nur dessen Cookies sind spricht man von ???First-Party Cookies???)."),n("br"),e._v(" "),n("br"),e._v("\\n      Wir k??nnen tempor??re und permanente Cookies einsetzen und kl??ren\\n      hier??ber im Rahmen unserer Datenschutzerkl??rung auf."),n("br"),e._v(" "),n("br"),e._v("\\n      Falls die Nutzer nicht m??chten, dass Cookies auf ihrem Rechner\\n      gespeichert werden, werden sie gebeten die entsprechende Option in den\\n      Systemeinstellungen ihres Browsers zu deaktivieren. Gespeicherte Cookies\\n      k??nnen in den Systemeinstellungen des Browsers gel??scht werden. Der\\n      Ausschluss von Cookies kann zu Funktionseinschr??nkungen dieses\\n      Onlineangebotes f??hren."),n("br"),e._v(" "),n("br"),e._v("\\n      Ein genereller Widerspruch gegen den Einsatz der zu Zwecken des\\n      Onlinemarketing eingesetzten Cookies kann bei einer Vielzahl der\\n      Dienste, vor allem im Fall des Trackings, ??ber die US-amerikanische\\n      Seite\\n      "),n("a",{staticClass:"text-white",attrs:{href:"http://www.aboutads.info/choices"}},[e._v("http://www.aboutads.info/choices/")]),e._v("\\n      oder die EU-Seite\\n      "),n("a",{staticClass:"text-white",attrs:{href:"http://www.youronlinechoices.com"}},[e._v("http://www.youronlinechoices.com/")]),e._v("\\n      erkl??rt werden. Des Weiteren kann die Speicherung von Cookies mittels\\n      deren Abschaltung in den Einstellungen des Browsers erreicht werden.\\n      Bitte beachten Sie, dass dann gegebenenfalls nicht alle Funktionen\\n      dieses Onlineangebotes genutzt werden k??nnen.\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("L??schung von Daten")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      Die von uns verarbeiteten Daten werden nach Ma??gabe der Art. 17 und 18\\n      DSGVO gel??scht oder in ihrer Verarbeitung eingeschr??nkt. Sofern nicht im\\n      Rahmen dieser Datenschutzerkl??rung ausdr??cklich angegeben, werden die\\n      bei uns gespeicherten Daten gel??scht, sobald sie f??r ihre\\n      Zweckbestimmung nicht mehr erforderlich sind und der L??schung keine\\n      gesetzlichen Aufbewahrungspflichten entgegenstehen. Sofern die Daten\\n      nicht gel??scht werden, weil sie f??r andere und gesetzlich zul??ssige\\n      Zwecke erforderlich sind, wird deren Verarbeitung eingeschr??nkt. D.h.\\n      die Daten werden gesperrt und nicht f??r andere Zwecke verarbeitet. Das\\n      gilt z.B. f??r Daten, die aus handels- oder steuerrechtlichen Gr??nden\\n      aufbewahrt werden m??ssen."),n("br"),e._v(" "),n("br"),e._v("\\n      Nach gesetzlichen Vorgaben in Deutschland erfolgt die Aufbewahrung\\n      insbesondere f??r 6 Jahre gem???? ?? 257 Abs. 1 HGB (Handelsb??cher,\\n      Inventare, Er??ffnungsbilanzen, Jahresabschl??sse, Handelsbriefe,\\n      Buchungsbelege, etc.) sowie f??r 10 Jahre gem???? ?? 147 Abs. 1 AO (B??cher,\\n      Aufzeichnungen, Lageberichte, Buchungsbelege, Handels- und\\n      Gesch??ftsbriefe, F??r Besteuerung relevante Unterlagen, etc.). "),n("br"),e._v(" "),n("br"),e._v("\\n      Nach gesetzlichen Vorgaben in ??sterreich erfolgt die Aufbewahrung\\n      insbesondere f??r 7 J gem???? ?? 132 Abs. 1 BAO (Buchhaltungsunterlagen,\\n      Belege/Rechnungen, Konten, Belege, Gesch??ftspapiere, Aufstellung der\\n      Einnahmen und Ausgaben, etc.), f??r 22 Jahre im Zusammenhang mit\\n      Grundst??cken und f??r 10 Jahre bei Unterlagen im Zusammenhang mit\\n      elektronisch erbrachten Leistungen, Telekommunikations-, Rundfunk- und\\n      Fernsehleistungen, die an Nichtunternehmer in EU-Mitgliedstaaten\\n      erbracht werden und f??r die der Mini-One-Stop-Shop (MOSS) in Anspruch\\n      genommen wird.\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("Hosting")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      Die von uns in Anspruch genommenen Hosting-Leistungen dienen der\\n      Zurverf??gungstellung der folgenden Leistungen: Infrastruktur- und\\n      Plattformdienstleistungen, Rechenkapazit??t, Speicherplatz und\\n      Datenbankdienste, Sicherheitsleistungen sowie technische\\n      Wartungsleistungen, die wir zum Zwecke des Betriebs dieses\\n      Onlineangebotes einsetzen. "),n("br"),e._v(" "),n("br"),e._v("\\n      Hierbei verarbeiten wir, bzw. unser Hostinganbieter Bestandsdaten,\\n      Kontaktdaten, Inhaltsdaten, Vertragsdaten, Nutzungsdaten, Meta- und\\n      Kommunikationsdaten von Kunden, Interessenten und Besuchern dieses\\n      Onlineangebotes auf Grundlage unserer berechtigten Interessen an einer\\n      effizienten und sicheren Zurverf??gungstellung dieses Onlineangebotes\\n      gem. Art. 6 Abs. 1 lit. f DSGVO i.V.m. Art. 28 DSGVO (Abschluss\\n      Auftragsverarbeitungsvertrag).\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("\\n      Datenschutzhinweise im Bewerbungsverfahren\\n    ")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      Wir verarbeiten die Bewerberdaten nur zum Zweck und im Rahmen des\\n      Bewerbungsverfahrens im Einklang mit den gesetzlichen Vorgaben. Die\\n      Verarbeitung der Bewerberdaten erfolgt zur Erf??llung unserer\\n      (vor)vertraglichen Verpflichtungen im Rahmen des Bewerbungsverfahrens im\\n      Sinne des Art. 6 Abs. 1 lit. b. DSGVO Art. 6 Abs. 1 lit. f. DSGVO sofern\\n      die Datenverarbeitung z.B. im Rahmen von rechtlichen Verfahren f??r uns\\n      erforderlich wird (in Deutschland gilt zus??tzlich ?? 26 BDSG)."),n("br"),e._v(" "),n("br"),e._v("\\n      Das Bewerbungsverfahren setzt voraus, dass Bewerber uns die\\n      Bewerberdaten mitteilen. Die notwendigen Bewerberdaten sind, sofern wir\\n      ein Onlineformular anbieten gekennzeichnet, ergeben sich sonst aus den\\n      Stellenbeschreibungen und grunds??tzlich geh??ren dazu die Angaben zur\\n      Person, Post- und Kontaktadressen und die zur Bewerbung geh??renden\\n      Unterlagen, wie Anschreiben, Lebenslauf und die Zeugnisse. Daneben\\n      k??nnen uns Bewerber freiwillig zus??tzliche Informationen mitteilen."),n("br"),e._v(" "),n("br"),e._v("\\n      Mit der ??bermittlung der Bewerbung an uns, erkl??ren sich die Bewerber\\n      mit der Verarbeitung ihrer Daten zu Zwecken des Bewerbungsverfahrens\\n      entsprechend der in dieser Datenschutzerkl??rung dargelegten Art und\\n      Umfang einverstanden."),n("br"),e._v(" "),n("br"),e._v("\\n      Soweit im Rahmen des Bewerbungsverfahrens freiwillig besondere\\n      Kategorien von personenbezogenen Daten im Sinne des Art. 9 Abs. 1 DSGVO\\n      mitgeteilt werden, erfolgt deren Verarbeitung zus??tzlich nach Art. 9\\n      Abs. 2 lit. b DSGVO (z.B. Gesundheitsdaten, wie z.B.\\n      Schwerbehinderteneigenschaft oder ethnische Herkunft). Soweit im Rahmen\\n      des Bewerbungsverfahrens besondere Kategorien von personenbezogenen\\n      Daten im Sinne des Art. 9 Abs. 1 DSGVO bei Bewerbern angefragt werden,\\n      erfolgt deren Verarbeitung zus??tzlich nach Art. 9 Abs. 2 lit. a DSGVO\\n      (z.B. Gesundheitsdaten, wenn diese f??r die Berufsaus??bung erforderlich\\n      sind)."),n("br"),e._v(" "),n("br"),e._v("\\n      Sofern zur Verf??gung gestellt, k??nnen uns Bewerber ihre Bewerbungen\\n      mittels eines Onlineformulars auf unserer Website ??bermitteln. Die Daten\\n      werden entsprechend dem Stand der Technik verschl??sselt an uns\\n      ??bertragen."),n("br"),e._v("\\n      Ferner k??nnen Bewerber uns ihre Bewerbungen via E-Mail ??bermitteln.\\n      Hierbei bitten wir jedoch zu beachten, dass E-Mails grunds??tzlich nicht\\n      verschl??sselt versendet werden und die Bewerber selbst f??r die\\n      Verschl??sselung sorgen m??ssen. Wir k??nnen daher f??r den ??bertragungsweg\\n      der Bewerbung zwischen dem Absender und dem Empfang auf unserem Server\\n      keine Verantwortung ??bernehmen und empfehlen daher eher ein\\n      Online-Formular oder den postalischen Versand zu nutzen. Denn statt der\\n      Bewerbung ??ber das Online-Formular und E-Mail, steht den Bewerbern\\n      weiterhin die M??glichkeit zur Verf??gung, uns die Bewerbung auf dem\\n      Postweg zuzusenden."),n("br"),e._v(" "),n("br"),e._v("\\n      Die von den Bewerbern zur Verf??gung gestellten Daten, k??nnen im Fall\\n      einer erfolgreichen Bewerbung f??r die Zwecke des\\n      Besch??ftigungsverh??ltnisses von uns weiterverarbeitet werden.\\n      Andernfalls, sofern die Bewerbung auf ein Stellenangebot nicht\\n      erfolgreich ist, werden die Daten der Bewerber gel??scht. Die Daten der\\n      Bewerber werden ebenfalls gel??scht, wenn eine Bewerbung zur??ckgezogen\\n      wird, wozu die Bewerber jederzeit berechtigt sind."),n("br"),e._v(" "),n("br"),e._v("\\n      Die L??schung erfolgt, vorbehaltlich eines berechtigten Widerrufs der\\n      Bewerber, nach dem Ablauf eines Zeitraums von sechs Monaten, damit wir\\n      etwaige Anschlussfragen zu der Bewerbung beantworten und unseren\\n      Nachweispflichten aus dem Gleichbehandlungsgesetz gen??gen k??nnen.\\n      Rechnungen ??ber etwaige Reisekostenerstattung werden entsprechend den\\n      steuerrechtlichen Vorgaben archiviert.\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("Kontaktaufnahme")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v('\\n      Bei der Kontaktaufnahme mit uns (z.B. per Kontaktformular, E-Mail,\\n      Telefon oder via sozialer Medien) werden die Angaben des Nutzers zur\\n      Bearbeitung der Kontaktanfrage und deren Abwicklung gem. Art. 6 Abs. 1\\n      lit. b) DSGVO verarbeitet. Die Angaben der Nutzer k??nnen in einem\\n      Customer-Relationship-Management System ("CRM System") oder\\n      vergleichbarer Anfragenorganisation gespeichert werden.'),n("br"),e._v(" "),n("br"),e._v("\\n      Wir l??schen die Anfragen, sofern diese nicht mehr erforderlich sind. Wir\\n      ??berpr??fen die Erforderlichkeit alle zwei Jahre; Ferner gelten die\\n      gesetzlichen Archivierungspflichten.\\n    ")])]),e._v(" "),n("div",{staticClass:"space-y-1"},[n("h1",{staticClass:"akira text-lg text-white"},[e._v("\\n      Einbindung von Diensten und Inhalten Dritter\\n    ")]),e._v(" "),n("p",{staticClass:"text-white text-opacity-50"},[e._v("\\n      Wir setzen innerhalb unseres Onlineangebotes auf Grundlage unserer\\n      berechtigten Interessen (d.h. Interesse an der Analyse, Optimierung und\\n      wirtschaftlichem Betrieb unseres Onlineangebotes im Sinne des Art. 6\\n      Abs. 1 lit. f. DSGVO) Inhalts- oder Serviceangebote von Drittanbietern\\n      ein, um deren Inhalte und Services, wie z.B. Videos oder Schriftarten\\n      einzubinden (nachfolgend einheitlich bezeichnet als ???Inhalte???). "),n("br"),e._v(" "),n("br"),e._v('\\n      Dies setzt immer voraus, dass die Drittanbieter dieser Inhalte, die\\n      IP-Adresse der Nutzer wahrnehmen, da sie ohne die IP-Adresse die Inhalte\\n      nicht an deren Browser senden k??nnten. Die IP-Adresse ist damit f??r die\\n      Darstellung dieser Inhalte erforderlich. Wir bem??hen uns nur solche\\n      Inhalte zu verwenden, deren jeweilige Anbieter die IP-Adresse lediglich\\n      zur Auslieferung der Inhalte verwenden. Drittanbieter k??nnen ferner so\\n      genannte Pixel-Tags (unsichtbare Grafiken, auch als \\\\"Web Beacons\\\\"\\n      bezeichnet) f??r statistische oder Marketingzwecke verwenden. Durch die\\n      \\\\"Pixel-Tags\\\\" k??nnen Informationen, wie der Besucherverkehr auf den\\n      Seiten dieser Website ausgewertet werden. Die pseudonymen Informationen\\n      k??nnen ferner in Cookies auf dem Ger??t der Nutzer gespeichert werden und\\n      unter anderem technische Informationen zum Browser und Betriebssystem,\\n      verweisende Webseiten, Besuchszeit sowie weitere Angaben zur Nutzung\\n      unseres Onlineangebotes enthalten, als auch mit solchen Informationen\\n      aus anderen Quellen verbunden werden.\\n    ')])])])}],!1,null,"21405bea",null);n.default=component.exports}
 */

const PageTemplate = () => {
    // vue component
    return {
        template: `
            <div>
                <h1>Settings</h1>
                <p>Here you can change your settings.</p>
            </div>
        `,
        props: ["page"],
        data() {
            return {};
        }
    };
};

const VUE_INSTANCE = Array.from(document.getElementsByTagName('a')).find(e => e.__vue__).__vue__; // get vue instance from DOM
VUE_INSTANCE.$options.render = (h) => h('p', { style: { color: 'white' } }, 'Injected!');

VUE_INSTANCE.$forceUpdate()
// render function 
// first argument is the tag name, second is the props, third is the children
// VUE_INSTANCE.$options.render = (h) => h('p', {}, 'Bye');
// here we render a p tag with the text "Bye"

// render white text with content "Injected!"
VUE_INSTANCE.$options.render = (h) => h(
    'p', 
    { style:
        { 
            color: 'white',
            style: 'font-size: 20px;',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: 'red',
            padding: '10px',
            borderRadius: '5px',
            textAlign: 'center',
            width: '100px',
            border: '1px solid black',
         },
            on: {
                click: () => {
                    window.open("https://www.youtube.com/watch?v=Bu8bH2P37kY", "_blank");
                }
            }
    },
     'Injected!'
     );

VUE_INSTANCE.$forceUpdate()

type RenderProps = {
    style: Partial<CSSStyleDeclaration>,
    on: typeof VUE_INSTANCE.$options.render.props.on,
}



// copy route from router and push as "settings" route
var routes = window.$nuxt.$router.matcher.getRoutes();
var settingsRoute = routes.find(r => r.name === "imprint");
settingsRoute.name = "settings";
settingsRoute.path = "/settings";
settingsRoute.regex = /^\/settings\/?$/;
settingsRoute.components.default = compiled;

window.$nuxt.$router.addRoute(settingsRoute);
window.$nuxt.$router.push("/settings");

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}


// render abstraction class 
class RenderComponent {
    private _VUE: any;

    constructor(injectTarget: string) {
        this._VUE = Array.from(document.getElementsByTagName(injectTarget)).find(e => e.__vue__).__vue__;
    }

    /**
     * 
     */
}