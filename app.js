const NOK = new Intl.NumberFormat("nb-NO", {
  maximumFractionDigits: 1
});

const INTEGER = new Intl.NumberFormat("nb-NO", {
  maximumFractionDigits: 0
});

const MEDIAN_MONTHLY_WAGE_IMMIGRANTS = 48910;
const MEDIAN_MONTHLY_WAGE_OTHER_RESIDENTS = 57930;
const MEDIAN_MONTHLY_WAGE_NEW_EU = 47220;
const MEDIAN_MONTHLY_WAGE_ASIA = 47440;
const MEDIAN_MONTHLY_WAGE_AFRICA = 46100;
const BASE_ANNUAL_WAGE = MEDIAN_MONTHLY_WAGE_OTHER_RESIDENTS * 12;
const LOW_EDU_WORKERS = 760000;
const LOW_EDU_ANNUAL_WAGE = 520000;
const BENEFIT_AMOUNT = 365000;
const PAYROLL_TAX_RATE = 0.065;
const INDIRECT_RATE = 0.06;
const THIRD_GEN_CHILD_RESERVE_SHARE = 0.35;
const THIRD_GEN_ADULT_RESERVE_SHARE = 0.12;
const ELDER_CARE_RESERVE_SHARE = 0.2;
const SECOND_GEN_ELDER_RESERVE_SHARE = 0.25;
const WAGE_TAX_LOSS_RAMP_YEARS = 10;
const WAGE_TAX_LOSS_DECAY_YEARS = 15;

const basisScenario = {
    title: "Realistisk basis",
    netImmigration: 45,
    labourShare: 28,
    highSkillShare: 18,
    workingAgeShare: 60,
    elderDependentShare: 14,
    employmentStart: 22,
    employment10: 54,
    relativeWage: 76,
    workIntensity: 72,
    wagePressure: -2.4,
    benefitTransition: 32,
    serviceCost: 290,
    supplementCost: 70,
    remittanceShare: 12,
    housingExemptShare: 42,
    flowYears: 100,
    projectionYears: 150,
    secondGenRate: 65,
    childCost: 190,
    secondGenAdultCost: 55,
    thirdGenRate: 75,
    thirdGenChildCost: 160,
    thirdGenAdultCost: 45,
    elderReserveCost: 45,
    elderDependentBenefitCost: 260,
    elderCareShare: 18,
  elderCareCost: 1300,
  secondGenElderReserveCost: 30
};

const controlMeta = {
  netImmigration: { suffix: " 000 pers./år", decimals: 0 },
  labourShare: { suffix: " %", decimals: 0 },
  highSkillShare: { suffix: " %", decimals: 0 },
  workingAgeShare: { suffix: " %", decimals: 0 },
  elderDependentShare: { suffix: " %", decimals: 0 },
  employmentStart: { suffix: " %", decimals: 0 },
  employment10: { suffix: " %", decimals: 0 },
  relativeWage: { suffix: " %", decimals: 0 },
  workIntensity: { suffix: " %", decimals: 0 },
  wagePressure: { suffix: " %", decimals: 1 },
  benefitTransition: { suffix: " %", decimals: 0 },
  serviceCost: { suffix: " 000 kr", decimals: 0 },
  supplementCost: { suffix: " 000 kr", decimals: 0 },
  remittanceShare: { suffix: " %", decimals: 0 },
  housingExemptShare: { suffix: " %", decimals: 0 },
  flowYears: { suffix: " år", decimals: 0 },
  projectionYears: { suffix: " år", decimals: 0 },
  secondGenRate: { suffix: " per 100", decimals: 0 },
  childCost: { suffix: " 000 kr", decimals: 0 },
  secondGenAdultCost: { suffix: " 000 kr", decimals: 0 },
  thirdGenRate: { suffix: " per 100", decimals: 0 },
  thirdGenChildCost: { suffix: " 000 kr", decimals: 0 },
  thirdGenAdultCost: { suffix: " 000 kr", decimals: 0 },
  elderReserveCost: { suffix: " 000 kr", decimals: 0 },
  elderDependentBenefitCost: { suffix: " 000 kr", decimals: 0 },
  elderCareShare: { suffix: " %", decimals: 0 },
  elderCareCost: { suffix: " 000 kr", decimals: 0 },
  secondGenElderReserveCost: { suffix: " 000 kr", decimals: 0 }
};

const controlEvidence = {
  netImmigration: {
    kind: "Register",
    text: "Startverdien er forankret i registrert nettoinnvandring og befolkningsstatistikk.",
    up: "Flere ankomster skalerer både skatter og kostnader. Hvis gjennomsnittlig nettobalanse er negativ, øker regningen.",
    down: "Færre ankomster skalerer både skatter og kostnader ned. Da faller som regel finansieringsbehovet."
  },
  employmentStart: {
    kind: "Statistikk",
    text: "Startnivået er en modellverdi basert på arbeidsmarkedstilknytning tidlig etter ankomst.",
    up: "Høyere tidlig sysselsetting løfter skatteinntektene i de første årene.",
    down: "Lavere tidlig sysselsetting svekker skatteinntektene i starten av kohortløpet."
  },
  employment10: {
    kind: "Statistikk",
    text: "År-10-nivået bygger på sysselsettingsstatistikk og botidsmønstre.",
    up: "Høyere sysselsetting etter 10 år gir flere skattebetalere og trekker regningen ned.",
    down: "Lavere sysselsetting etter 10 år gir færre skattebetalere og trekker regningen opp."
  },
  relativeWage: {
    kind: "Statistikk",
    text: "Lønnsnivået er knyttet til SSBs medianlønn etter bosattgruppe og landbakgrunn.",
    up: "Høyere lønn øker arbeidsskatt og avgifter fra innenlandsk forbruk.",
    down: "Lavere lønn reduserer både arbeidsskatt og avgifter."
  },
  benefitTransition: {
    kind: "Modell",
    text: "Dette er en modellverdi for overgang til trygderelaterte ytelser over tid.",
    up: "Høyere trygdeovergang øker ytelseskostnadene direkte.",
    down: "Lavere trygdeovergang reduserer ytelseskostnadene direkte."
  },
  wagePressure: {
    kind: "Modell",
    text: "Dette er en modellert systemeffekt på skatteinntekter fra lavere utdannede arbeidstakere.",
    up: "Mindre negativ lønnseffekt gir lavere beregnet skattetap.",
    down: "Mer negativ lønnseffekt øker beregnet skattetap fra lavere lønnsnivå."
  },
  labourShare: {
    kind: "Modell",
    text: "Andelen påvirker arbeidsmarkeds- og integreringsprofilen, men øker ikke automatisk lønn eller sysselsetting.",
    up: "Mer arbeidsrettet ankomst kan øke arbeidsmarkedsflaten i modellen, men skatten øker bare hvis sysselsetting, lønn eller arbeidstid også er høy nok.",
    down: "Lavere arbeidsinnvandringsandel reduserer arbeidsmarkedsflaten i denne delen av modellen."
  },
  highSkillShare: {
    kind: "Modell",
    text: "Kompetanseandelen er en fordeling i modellen, ikke et rent registertall.",
    up: "Høyere kompetanseandel demper beregnet integrerings- og lavlønnspress.",
    down: "Lavere kompetanseandel øker beregnet integrerings- og lavlønnspress."
  },
  workingAgeShare: {
    kind: "Statistikk",
    text: "Aldersprofilen bygger på demografi ved ankomst og er forenklet i modellen.",
    up: "Flere i arbeidsfør alder øker skattepotensialet, men også trygderisiko og senere alderdomskostnader.",
    down: "Færre i arbeidsfør alder reduserer skattepotensialet, men flytter mer av kostnaden mot barn og eldre ved ankomst."
  },
  elderDependentShare: {
    kind: "Antakelse",
    text: "Dette er en antakelse om hvor stor del av ikke-arbeidsføre som er eldre/omsorgskrevende.",
    up: "Flere eldre blant ikke-arbeidsføre øker minstepensjon/stønad og omsorgsrelaterte kostnader.",
    down: "Færre eldre blant ikke-arbeidsføre reduserer minstepensjon/stønad og omsorgsrelaterte kostnader."
  },
  workIntensity: {
    kind: "Modell",
    text: "Arbeidsintensitet skal fange deltid, kortere arbeidsår og svakere timetilknytning.",
    up: "Høyere arbeidstid øker skattbar lønn og avgiftsgrunnlag.",
    down: "Lavere arbeidstid reduserer skattbar lønn og avgiftsgrunnlag."
  },
  serviceCost: {
    kind: "Statistikk",
    text: "Tjenestekostnaden er en samlet modellverdi for offentlige tjenester per person.",
    up: "Høyere tjenestekostnad øker den løpende regningen per ankomst.",
    down: "Lavere tjenestekostnad reduserer den løpende regningen per ankomst."
  },
  supplementCost: {
    kind: "Modell",
    text: "Samler familieytelser, bostøtte og sosialhjelp som ikke fanges godt av én enkelt ytelse.",
    up: "Høyere støttepakke øker de løpende ytelsene per ankomst.",
    down: "Lavere støttepakke reduserer de løpende ytelsene per ankomst."
  },
  remittanceShare: {
    kind: "Statistikk",
    text: "Pengeeksport er forankret i internasjonale remitteringsdata.",
    up: "Mer pengeeksport betyr at mindre inntekt forbrukes i Norge, og avgiftsinntektene faller.",
    down: "Mindre pengeeksport betyr at mer inntekt kan gi norsk avgiftsgrunnlag."
  },
  housingExemptShare: {
    kind: "Modell",
    text: "Andelen viser hvor mye av innenlandsk forbruk som ikke gir moms, særlig bolig.",
    up: "Høyere momsfri andel reduserer avgiftsinntektene.",
    down: "Lavere momsfri andel øker avgiftsinntektene."
  },
  flowYears: {
    kind: "Antakelse",
    text: "Angir hvor lenge samme årlige ankomstnivå videreføres.",
    up: "Flere år med samme nivå legger flere kohorter inn i langtidsregningen.",
    down: "Færre år med samme nivå legger færre kohorter inn i langtidsregningen."
  },
  projectionYears: {
    kind: "Antakelse",
    text: "Angir hvor langt fram regningen summeres i faste 2025-kroner.",
    up: "Lengre horisont tar med mer av alderdoms- og etterkommerfasen.",
    down: "Kortere horisont kutter mer av de sene kostnadene."
  },
  secondGenRate: {
    kind: "Antakelse",
    text: "Etterkommerraten er en demografisk modellverdi.",
    up: "Flere etterkommere øker barn/skole/tiltak og senere voksenkostnader.",
    down: "Færre etterkommere reduserer barn/skole/tiltak og senere voksenkostnader."
  },
  childCost: {
    kind: "Statistikk",
    text: "Barn/skole/tiltak er forankret i offentlige kostnader for barn, skole og tiltak.",
    up: "Høyere kostnad per barn øker familie- og utdanningsdelen av regningen.",
    down: "Lavere kostnad per barn reduserer familie- og utdanningsdelen av regningen."
  },
  secondGenAdultCost: {
    kind: "Antakelse",
    text: "Netto voksenkostnad for etterkommere er en eksplisitt modellantakelse.",
    up: "Høyere voksenkostnad for etterkommere øker regningen etter barnefasen.",
    down: "Lavere voksenkostnad for etterkommere reduserer regningen etter barnefasen."
  },
  thirdGenRate: {
    kind: "Antakelse",
    text: "Tredje generasjon er en langsiktig demografisk modellantakelse.",
    up: "Flere i tredje generasjon øker kostnadene som følger etterkommerlinjen videre.",
    down: "Færre i tredje generasjon reduserer kostnadene som følger etterkommerlinjen videre."
  },
  thirdGenChildCost: {
    kind: "Antakelse",
    text: "Barnekostnad for tredje generasjon er holdt synlig som egen antakelse.",
    up: "Høyere barnekostnad i tredje generasjon øker den langsiktige familiedelen.",
    down: "Lavere barnekostnad i tredje generasjon reduserer den langsiktige familiedelen."
  },
  thirdGenAdultCost: {
    kind: "Antakelse",
    text: "Voksenkostnad for tredje generasjon er en usikker langtidsantakelse.",
    up: "Høyere voksenkostnad i tredje generasjon øker regningen sent i horisonten.",
    down: "Lavere voksenkostnad i tredje generasjon reduserer regningen sent i horisonten."
  },
  elderReserveCost: {
    kind: "Modell",
    text: "Alderdomsreserve er en forenklet avsetning for kostnader etter lang botid.",
    up: "Høyere reserve øker kostnaden når kohortene blir eldre.",
    down: "Lavere reserve reduserer kostnaden når kohortene blir eldre."
  },
  elderDependentBenefitCost: {
    kind: "Modell",
    text: "Minstepensjon/stønad er en modellverdi for livsopphold til eldre ankomne.",
    up: "Høyere minstepensjon/stønad øker kostnaden for eldre ankomne.",
    down: "Lavere minstepensjon/stønad reduserer kostnaden for eldre ankomne."
  },
  elderCareShare: {
    kind: "Antakelse",
    text: "Omsorgsandelen viser hvor mange som antas å trenge tung omsorg.",
    up: "Høyere omsorgsandel gjør sykehjems-/omsorgsposten større.",
    down: "Lavere omsorgsandel gjør sykehjems-/omsorgsposten mindre."
  },
  elderCareCost: {
    kind: "Statistikk",
    text: "Prislappen bygger på offentlige tall for sykehjems- og omsorgstjenester.",
    up: "Høyere pris per plass øker alderdoms- og omsorgsregningen.",
    down: "Lavere pris per plass reduserer alderdoms- og omsorgsregningen."
  },
  secondGenElderReserveCost: {
    kind: "Antakelse",
    text: "Etterkommernes aldringsreserve er en langsiktig modellantakelse.",
    up: "Høyere reserve tar med mer av etterkommernes alderdomskostnader.",
    down: "Lavere reserve tar med mindre av etterkommernes alderdomskostnader."
  }
};

const controlLabels = {
  netImmigration: "Hvor mange flere per år",
  employmentStart: "Hvor mange jobber første år",
  employment10: "Hvor mange jobber etter 10 år",
  relativeWage: "Lønn sammenlignet med andre",
  benefitTransition: "Hvor mange går over på trygd",
  wagePressure: "Press på lave lønninger",
  labourShare: "Arbeidsrettet andel",
  highSkillShare: "Andel høy kompetanse",
  workingAgeShare: "Andel i arbeidsfør alder",
  elderDependentShare: "Eldre blant ikke-arbeidsføre",
  workIntensity: "Hvor mye de jobber",
  serviceCost: "Offentlige tjenester per person",
  supplementCost: "Ekstra støttepakke",
  remittanceShare: "Penger sendt ut av Norge",
  housingExemptShare: "Forbruk uten moms",
  flowYears: "År med samme innvandringsnivå",
  projectionYears: "År regningen summeres",
  secondGenRate: "Barn/etterkommere per 100",
  childCost: "Kostnad per barn",
  secondGenAdultCost: "Voksen etterkommer-kostnad",
  thirdGenRate: "Tredje generasjon per 100",
  thirdGenChildCost: "Tredje gen. barn-kostnad",
  thirdGenAdultCost: "Tredje gen. voksen-kostnad",
  elderReserveCost: "Alderdom etter lang botid",
  elderDependentBenefitCost: "Minstepensjon/Stønad",
  elderCareShare: "Andel med tung omsorg",
  elderCareCost: "Prislapp sykehjemsplass",
  secondGenElderReserveCost: "Etterkommeres alderdom"
};

const controlMeanings = {
  netImmigration: "antall netto nye personer per år som legges inn som nye kohorter.",
  employmentStart: "andel av arbeidsføre som antas å være i jobb rett etter ankomst.",
  employment10: "andel av arbeidsføre som antas å være i jobb etter 10 års botid.",
  relativeWage: "årslønn i prosent av medianlønnen for øvrige bosatte.",
  benefitTransition: "andel av arbeidsføre som over tid mottar trygderelaterte ytelser.",
  wagePressure: "beregnet lønnseffekt for lavere utdannede arbeidstakere i Norge.",
  labourShare: "andel av ankomstene som behandles som arbeidsrettet i modellens arbeidsmarkedsprofil.",
  highSkillShare: "andel av den arbeidsrettede gruppen som antas å ha høy kompetanse.",
  workingAgeShare: "andel av alle ankomne som regnes som arbeidsføre ved ankomst.",
  elderDependentShare: "andel av ikke-arbeidsføre ankomne som regnes som eldre/omsorgskrevende.",
  workIntensity: "hvor stor del av full årslønn som faktisk blir skattbar inntekt.",
  serviceCost: "årlig offentlig tjenestekostnad per person i faste 2025-kroner.",
  supplementCost: "årlig tillegg for familieytelser, bostøtte og sosialhjelp per person.",
  remittanceShare: "andel av inntekten som sendes ut og derfor ikke gir norsk avgiftsgrunnlag.",
  housingExemptShare: "andel av innenlandsk forbruk som ikke gir moms, særlig bolig.",
  flowYears: "antall år med samme årlige innvandringsnivå.",
  projectionYears: "antall år modellen summerer finansieringsbehovet.",
  secondGenRate: "antall etterkommere i forhold til 100 ankomne i modellen.",
  childCost: "årlig kostnad for barn, skole og tiltak per barn.",
  secondGenAdultCost: "årlig netto kostnad eller bidrag for voksne etterkommere.",
  thirdGenRate: "antall i tredje generasjon i forhold til 100 etterkommere.",
  thirdGenChildCost: "årlig barn/skole/tiltak-kostnad for tredje generasjon.",
  thirdGenAdultCost: "årlig netto kostnad eller bidrag for voksne i tredje generasjon.",
  elderReserveCost: "årlig reserve for alderdomskostnader etter lang botid.",
  elderDependentBenefitCost: "årlig livsopphold/stønad for eldre som ankommer uten opptjening.",
  elderCareShare: "andel som antas å trenge tung omsorg etter lang botid.",
  elderCareCost: "årlig pris per tung omsorgs-/sykehjemsplass.",
  secondGenElderReserveCost: "årlig reserve for alderdomskostnader hos etterkommere."
};

const sources = [
  {
    title: "SSB offentlig forvaltning",
    note: "Totale offentlige utgifter brukes som varsel om at lave per-person-kostnader kan undervurdere stat/kommune.",
    url: "https://www.ssb.no/statbank/table/10725/"
  },
  {
    title: "Udir: kostnader i barnehagene 2024",
    note: "Kommunal barnehagekostnad per heltidsplass gir referanse for barn-/familiekostnader.",
    url: "https://www.udir.no/tall-og-forskning/finn-forskning/rapporter/2026/kostnader-i-barnehagene-2024/"
  },
  {
    title: "NAV utbetalinger 2024",
    note: "NAV utbetalte 635 mrd. kroner i ytelser og alderspensjon i 2024.",
    url: "https://www.nav.no/no/nav-og-samfunn/statistikk/flere-statistikkomrader/nyheter/utbetalingene-fra-nav-okte-med-51-milliarder-kroner-i-2024"
  },
  {
    title: "SSB sykehjem og hjemmetjenester",
    note: "Institusjonstjenesten tilsvarte om lag 1,9 mill. kroner per sykehjemsbeboer i 2024.",
    url: "https://www.ssb.no/helse/helsetjenester/artikler/sykehjem-og-hjemmetjenesten-i-norge"
  },
  {
    title: "World Bank remittance data",
    note: "Pengeoverføringer ut av Norge brukes som begrunnelse for egen remitterings-/pengeeksportvariabel.",
    url: "https://data.worldbank.org/indicator/BM.TRF.PWKR.CD.DT?locations=NO"
  },
  {
    title: "SSB tabell 12524",
    note: "Median månedslønn 2025: innvandrere 48 910 kr, øvrige bosatte 57 930 kr.",
    url: "https://www.ssb.no/statbank/table/12524/"
  },
  {
    title: "SSB tabell 12525",
    note: "Median månedslønn 2025 etter landbakgrunn: nye EU-land 47 220 kr, Asia 47 440 kr, Afrika 46 100 kr.",
    url: "https://www.ssb.no/statbank/table/12525/"
  },
  {
    title: "Perspektivmeldingen 2009",
    note: "Langsiktig offentlig bærekraft, arbeid og fordeling.",
    url: "https://www.regjeringen.no/id/STM200820090009000DDDEPIS"
  },
  {
    title: "Perspektivmeldingen 2013",
    note: "Framskrivinger for offentlige finanser og aldrende befolkning.",
    url: "https://www.regjeringen.no/no/dokumenter/meld-st-12-20122013/id714050/"
  },
  {
    title: "Perspektivmeldingen 2017",
    note: "Omstilling, produktivitet, innvandring og velferdsordninger.",
    url: "https://www.regjeringen.no/no/dokumenter/meld.-st.-29-20162017/id2546674/"
  },
  {
    title: "Perspektivmeldingen 2021",
    note: "Scenarioer for økt sysselsetting og langsiktig finansiering.",
    url: "https://www.regjeringen.no/no/dokumenter/meld.-st.-14-20202021/id2834218/"
  },
  {
    title: "Perspektivmeldingen 2024",
    note: "Arbeidskraftbehov, aldring og handlingsrom for velferdsstaten.",
    url: "https://www.regjeringen.no/no/dokumenter/meld.-st.-31-20232024/id3049290/"
  },
  {
    title: "NOU 2011:7 Velferd og migrasjon",
    note: "Brochmann I: bærekraft, lønnsdannelse, trygd og arbeidslinje.",
    url: "https://www.regjeringen.no/no/dokumenter/nou-2011-07/id642496/"
  },
  {
    title: "NOU 2017:2 Integrasjon og tillit",
    note: "Brochmann II: høy innvandring, tillit, flyktninger og langsiktige konsekvenser.",
    url: "https://www.regjeringen.no/no/dokumenter/horing--nou-2017-2-integrasjon-og-tillit.-langsiktige-konsekvenser-av-hoy-innvandring/id2542340/"
  },
  {
    title: "Bratsberg, Raaum og Roed",
    note: "Langsiktig arbeidsmarkedstilknytning og social insurance for innvandrere.",
    url: "https://www.iza.org/publications/dp/8292/immigrants-labor-market-performance-and-social-insurance"
  },
  {
    title: "Bratsberg og Raaum - byggsektor",
    note: "Lønnseffekter av innvandring i norsk bygg/anlegg.",
    url: "https://academic.oup.com/ej/article-pdf/122/565/1177/26437030/ej1177.pdf"
  },
  {
    title: "OECD migration databases",
    note: "Internasjonale data om innvandring, sysselsetting, lønnsforskjeller og integrering.",
    url: "https://www.oecd.org/en/data/datasets/oecd-databases-on-migration.html"
  },
  {
    title: "DREAM Danmark",
    note: "Langsiktig offentlig nettoeffekt etter opprinnelsesgruppe.",
    url: "https://dreamgroup.dk/publications/2015/february/the-impact-of-immigrants-on-public-finances-a-forecast-analysis-for-denmark/"
  },
  {
    title: "UK Migration Advisory Committee",
    note: "Arbeidsmarked, lønnsfordeling, offentlige tjenester og EEA-migrasjon.",
    url: "https://www.gov.uk/government/publications/migration-advisory-committee-mac-report-eea-migration"
  }
];

const benchmarks = [
  {
    region: "Norge",
    target: "Lønn, sysselsetting, NAV-ytelser, alder og botid",
    signal: "Innvandrere har lavere gjennomsnittslønn enn øvrige; store forskjeller etter opprinnelse og botid."
  },
  {
    region: "Danmark",
    target: "DREAM/VIVE: netto bidrag etter opprinnelse",
    signal: "Rikere opprinnelsesland og høy kompetanse gir bedre statsfinansiell effekt enn lavinntektsopprinnelse."
  },
  {
    region: "OECD",
    target: "Sysselsetting, lønnsgap, integrering og sosial inkludering",
    signal: "Lønnsgapet er ofte stort ved inntreden, men kan falle med botid og mobilitet."
  },
  {
    region: "Storbritannia",
    target: "MAC: sektor- og lonnsvirkninger",
    signal: "Gjennomsnittseffekten kan være liten, mens lavere lønnsgrupper er mer utsatt."
  }
];

const controls = Object.keys(controlMeta);
let state = { ...basisScenario };
let isCustomized = false;
let lastChange = null;
let fiscalTooltipPoints = [];
let fiscalTooltipArea = null;

function formatSigned(value, suffix = "") {
  const sign = value > 0 ? "+" : "";
  return `${sign}${NOK.format(value)}${suffix}`;
}

function formatBn(value) {
  return `${formatSigned(value)} mrd.`;
}

function formatNeedBn(value) {
  return `${NOK.format(value)} mrd.`;
}

function effectiveIncomeTaxRate(wage) {
  if (wage <= 350000) {
    return 0.14;
  }

  if (wage <= 500000) {
    return 0.14 + ((wage - 350000) / 150000) * 0.05;
  }

  if (wage <= 700000) {
    return 0.19 + ((wage - 500000) / 200000) * 0.055;
  }

  if (wage <= 950000) {
    return 0.245 + ((wage - 700000) / 250000) * 0.045;
  }

  return Math.min(0.34, 0.29 + ((wage - 950000) / 800000) * 0.05);
}

function effectiveWorkTaxRate(wage) {
  return effectiveIncomeTaxRate(wage) + PAYROLL_TAX_RATE;
}

function setBar(id, value, max) {
  const element = document.getElementById(id);
  const width = max <= 0 ? 0 : Math.min(100, Math.max(3, (value / max) * 100));
  element.style.width = `${width}%`;
}

function updateOutputs() {
  controls.forEach((key) => {
    const input = document.getElementById(key);
    const output = document.getElementById(`${key}Value`);
    const meta = controlMeta[key];
    const value = Number(input.value);
    output.textContent = `${NOK.format(value.toFixed(meta.decimals))}${meta.suffix}`;
  });
}

function getControlName(key) {
  const label = document.querySelector(`label[for="${key}"]`);
  return label ? label.textContent : key;
}

function renderControlHelp() {
  controls.forEach((key) => {
    const input = document.getElementById(key);
    const control = input?.closest(".control");
    if (!control) {
      return;
    }

    const label = document.querySelector(`label[for="${key}"]`);
    if (label && controlLabels[key]) {
      label.textContent = controlLabels[key];
    }

    if (control.querySelector(".control-help")) {
      return;
    }

    const help = document.createElement("p");
    help.className = "control-help";
    const description = controlMeanings[key] || "Denne verdien brukes som en justerbar forutsetning i regnestykket.";
    help.textContent = `${description.charAt(0).toUpperCase()}${description.slice(1)}`;
    control.append(help);
  });
}

function renderChangeExplanation() {
  const element = document.getElementById("changeExplanation");
  if (!lastChange) {
    element.textContent = "Juster en verdi for å se hva den påvirker i regnestykket.";
    return;
  }

  const info = controlEvidence[lastChange.key];
  if (!info) {
    element.textContent = "Denne verdien er en del av modellens forutsetninger.";
    return;
  }

  const direction = lastChange.to > lastChange.from ? "up" : lastChange.to < lastChange.from ? "down" : "same";
  const explanation = info[direction] || info.text;
  element.textContent = `${getControlName(lastChange.key)}: ${explanation}`;
}

function renderDriverList(result) {
  const thirdGenChildReserve = result.thirdGenChildCost * THIRD_GEN_CHILD_RESERVE_SHARE;
  const thirdGenAdultReserve = result.thirdGenAdultCost * THIRD_GEN_ADULT_RESERVE_SHARE;
  const secondGenElderReserve = result.secondGenElderReserveCost * SECOND_GEN_ELDER_RESERVE_SHARE;
  const drivers = [
    {
      name: "Kommunale/statlige tjenester",
      value: result.serviceCost + result.integrationCost,
      note: "Tjenester per person og integrerings-/arbeidsmarkedsprofil."
    },
    {
      name: "Trygd og stønader",
      value: result.benefitCost + result.supplementCost + result.elderDependentBenefitCost,
      note: "Trygdeovergang, familie/bostøtte/sosialhjelp og minstepensjon/stønad."
    },
    {
      name: "Barn og etterkommere",
      value: result.childCost + result.secondGenAdultCost + thirdGenChildReserve + thirdGenAdultReserve,
      note: "Barn/skole/tiltak og voksenkostnader for neste generasjoner."
    },
    {
      name: "Aldring og omsorg",
      value: result.elderReserveCost + result.elderCareReserveCost + secondGenElderReserve,
      note: "Alderdomsreserve, sykehjemsplass og etterkommernes aldringsreserve."
    },
    {
      name: "Skattetap fra lønnspress",
      value: result.wageTaxLoss,
      note: "Systemeffekt fra lavere lønnsnivå for lavere utdannede arbeidstakere."
    }
  ]
    .filter((driver) => driver.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const list = document.getElementById("driverList");
  list.innerHTML = "";
  drivers.forEach((driver) => {
    const item = document.createElement("li");
    const title = document.createElement("strong");
    title.textContent = `${driver.name}: ${formatNeedBn(driver.value)}`;
    const note = document.createElement("span");
    note.textContent = driver.note;
    item.append(title, note);
    list.append(item);
  });
}

function calculate(input) {
  const annualPeople = input.netImmigration * 1000;
  const workingAge = annualPeople * (input.workingAgeShare / 100);
  const dependentsAtArrival = Math.max(0, annualPeople - workingAge);
  const elderDependentsAtArrival = dependentsAtArrival * (input.elderDependentShare / 100);
  const childDependentsAtArrival = Math.max(0, dependentsAtArrival - elderDependentsAtArrival);
  const secondGenChildren = annualPeople * (input.secondGenRate / 100);
  const childPopulation = childDependentsAtArrival + secondGenChildren;
  const employed = workingAge * (input.employment10 / 100);
  const fullTimeWage = BASE_ANNUAL_WAGE * (input.relativeWage / 100);
  const taxableWage = fullTimeWage * (input.workIntensity / 100);
  const effectiveTaxRate = effectiveWorkTaxRate(taxableWage);
  const directTax = (employed * taxableWage * effectiveTaxRate) / 1e9;
  const domesticConsumptionShare = Math.max(0, 1 - input.remittanceShare / 100);
  const taxableConsumptionShare = domesticConsumptionShare * Math.max(0, 1 - input.housingExemptShare / 100);
  const indirectTax = (employed * taxableWage * INDIRECT_RATE * taxableConsumptionShare) / 1e9;
  const taxRevenue = directTax + indirectTax;

  const benefitRecipients = workingAge * (input.benefitTransition / 100);
  const benefitCost = (benefitRecipients * BENEFIT_AMOUNT) / 1e9;
  const supplementCost = (annualPeople * input.supplementCost * 1000) / 1e9;
  const childCost = (childPopulation * input.childCost * 1000) / 1e9;
  const secondGenAdultCost = (secondGenChildren * input.secondGenAdultCost * 1000) / 1e9;
  const thirdGenChildren = secondGenChildren * (input.thirdGenRate / 100);
  const thirdGenChildCost = (thirdGenChildren * input.thirdGenChildCost * 1000) / 1e9;
  const thirdGenAdultCost = (thirdGenChildren * input.thirdGenAdultCost * 1000) / 1e9;
  const elderReserveCost = ((workingAge + elderDependentsAtArrival * 1.4) * input.elderReserveCost * 1000) / 1e9;
  const elderDependentBenefitCost = (elderDependentsAtArrival * input.elderDependentBenefitCost * 1000) / 1e9;
  const elderCareMatureCost =
    ((workingAge + elderDependentsAtArrival * 1.8) * (input.elderCareShare / 100) * input.elderCareCost * 1000) / 1e9;
  const elderCareReserveCost = elderCareMatureCost * ELDER_CARE_RESERVE_SHARE;
  const secondGenElderReserveCost = (secondGenChildren * input.secondGenElderReserveCost * 1000) / 1e9;
  const serviceCost = (annualPeople * input.serviceCost * 1000) / 1e9;
  const lowSkillWeight = (input.labourShare / 100) * (1 - input.highSkillShare / 100);
  const integrationCost = (annualPeople * (18000 + lowSkillWeight * 42000)) / 1e9;
  const wageTaxLoss =
    LOW_EDU_WORKERS *
    LOW_EDU_ANNUAL_WAGE *
    (Math.max(0, Math.abs(Math.min(0, input.wagePressure))) / 100) *
    effectiveWorkTaxRate(LOW_EDU_ANNUAL_WAGE) /
    1e9;

  const totalCost =
    benefitCost +
    supplementCost +
    childCost +
    secondGenAdultCost +
    thirdGenChildCost * THIRD_GEN_CHILD_RESERVE_SHARE +
    thirdGenAdultCost * THIRD_GEN_ADULT_RESERVE_SHARE +
    elderReserveCost +
    elderDependentBenefitCost +
    elderCareReserveCost +
    secondGenElderReserveCost * SECOND_GEN_ELDER_RESERVE_SHARE +
    serviceCost +
    integrationCost +
    wageTaxLoss;
  const balanceBeforeOil = taxRevenue - totalCost;
  const gapBeforeOil = Math.max(0, -balanceBeforeOil);

  return {
    annualPeople,
    workingAge,
    dependentsAtArrival,
    elderDependentsAtArrival,
    childDependentsAtArrival,
    secondGenChildren,
    childPopulation,
    employed,
    wage: taxableWage,
    fullTimeWage,
    taxableConsumptionShare,
    domesticConsumptionShare,
    effectiveTaxRate,
    directTax,
    indirectTax,
    taxRevenue,
    benefitCost,
    supplementCost,
    childCost,
    secondGenAdultCost,
    thirdGenChildren,
    thirdGenChildCost,
    thirdGenAdultCost,
    elderReserveCost,
    elderDependentBenefitCost,
    elderCareMatureCost,
    elderCareReserveCost,
    secondGenElderReserveCost,
    serviceCost,
    integrationCost,
    wageTaxLoss,
    totalCost,
    balanceBeforeOil,
    gapBeforeOil
  };
}

function updateMetrics(result) {
  const thirdGenChildReserve = result.thirdGenChildCost * THIRD_GEN_CHILD_RESERVE_SHARE;
  const thirdGenAdultReserve = result.thirdGenAdultCost * THIRD_GEN_ADULT_RESERVE_SHARE;
  const secondGenElderReserve = result.secondGenElderReserveCost * SECOND_GEN_ELDER_RESERVE_SHARE;

  document.getElementById("taxRevenueMetric").textContent = formatBn(result.taxRevenue);
  document.getElementById("costMetric").textContent = formatBn(-result.totalCost);
  document.getElementById("wageMetric").textContent = `${formatSigned(state.wagePressure, " %")}`;
  document.getElementById("gapMetric").textContent = formatNeedBn(result.gapBeforeOil);
  document.getElementById("taxProfileValue").textContent = `${NOK.format(result.effectiveTaxRate * 100)} % effektiv`;
  document.getElementById("avgWageValue").textContent = `${INTEGER.format(result.wage)} kr`;
  document.getElementById("medianSourceValue").textContent =
    `${INTEGER.format(MEDIAN_MONTHLY_WAGE_IMMIGRANTS)} / ${INTEGER.format(MEDIAN_MONTHLY_WAGE_OTHER_RESIDENTS)} kr mnd.`;

  document.getElementById("directTaxLabel").textContent = formatBn(result.directTax);
  document.getElementById("indirectTaxLabel").textContent = formatBn(result.indirectTax);
  document.getElementById("benefitLabel").textContent = formatBn(-result.benefitCost);
  document.getElementById("supplementLabel").textContent = formatBn(-result.supplementCost);
  document.getElementById("childLabel").textContent = formatBn(-result.childCost);
  document.getElementById("secondGenAdultLabel").textContent = formatBn(-result.secondGenAdultCost);
  document.getElementById("thirdGenLabel").textContent = formatBn(-thirdGenChildReserve);
  document.getElementById("thirdGenAdultLabel").textContent = formatBn(-thirdGenAdultReserve);
  document.getElementById("elderReserveLabel").textContent = formatBn(-result.elderReserveCost);
  document.getElementById("elderDependentBenefitLabel").textContent = formatBn(-result.elderDependentBenefitCost);
  document.getElementById("elderCareLabel").textContent = formatBn(-result.elderCareReserveCost);
  document.getElementById("secondGenElderLabel").textContent = formatBn(-secondGenElderReserve);
  document.getElementById("servicesLabel").textContent = formatBn(-(result.serviceCost + result.integrationCost));
  document.getElementById("wageLossLabel").textContent = formatBn(-result.wageTaxLoss);

  const flowMax = Math.max(
    result.directTax,
    result.indirectTax,
    result.benefitCost,
    result.supplementCost,
    result.childCost,
    Math.abs(result.secondGenAdultCost),
    Math.abs(thirdGenChildReserve),
    Math.abs(thirdGenAdultReserve),
    result.elderReserveCost,
    result.elderDependentBenefitCost,
    result.elderCareReserveCost,
    Math.abs(secondGenElderReserve),
    result.serviceCost + result.integrationCost,
    result.wageTaxLoss,
    1
  );
  setBar("directTaxBar", result.directTax, flowMax);
  setBar("indirectTaxBar", result.indirectTax, flowMax);
  setBar("benefitBar", result.benefitCost, flowMax);
  setBar("supplementBar", result.supplementCost, flowMax);
  setBar("childBar", result.childCost, flowMax);
  setBar("secondGenAdultBar", Math.abs(result.secondGenAdultCost), flowMax);
  setBar("thirdGenBar", Math.abs(thirdGenChildReserve), flowMax);
  setBar("thirdGenAdultBar", Math.abs(thirdGenAdultReserve), flowMax);
  setBar("elderReserveBar", result.elderReserveCost, flowMax);
  setBar("elderDependentBenefitBar", result.elderDependentBenefitCost, flowMax);
  setBar("elderCareBar", result.elderCareReserveCost, flowMax);
  setBar("secondGenElderBar", Math.abs(secondGenElderReserve), flowMax);
  setBar("servicesBar", result.serviceCost + result.integrationCost, flowMax);
  setBar("wageLossBar", result.wageTaxLoss, flowMax);

  const balancePill = document.getElementById("balancePill");
  balancePill.textContent = `${result.balanceBeforeOil >= 0 ? "Overskudd" : "Underskudd"} ${formatBn(result.balanceBeforeOil)}`;
  balancePill.className = `pill ${result.balanceBeforeOil >= 0 ? "is-positive" : "is-negative"}`;

  const lifecycle = simulateFundingNeed(result, state);
  const lifecycleHorizon = lifecycle.points.at(-1)?.x || state.projectionYears;
  document.getElementById("fiscalHorizonLabel").textContent = `${lifecycleHorizon} år`;
  document.getElementById("annualNeedValue").textContent = formatNeedBn(result.gapBeforeOil);
  document.getElementById("peakAnnualNeedValue").textContent = formatNeedBn(lifecycle.peakAnnualNeed);
  document.getElementById("cumulativeNeedLabel").textContent = `Akkumulert behov ${lifecycleHorizon} år`;
  document.getElementById("cumulativeNeedValue").textContent = formatNeedBn(lifecycle.cumulativeNeed);
  renderChangeExplanation();
  renderDriverList(result);
}

function setupCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(320, Math.floor(rect.width * ratio));
  canvas.height = Math.max(220, Math.floor(rect.height * ratio));
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width: rect.width, height: rect.height };
}

function drawAxes(ctx, width, height, minY, maxY, label) {
  const left = 46;
  const right = 16;
  const top = 18;
  const bottom = 34;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#d7ddd8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left, height - bottom);
  ctx.lineTo(width - right, height - bottom);
  ctx.stroke();
  ctx.fillStyle = "#68736f";
  ctx.font = "12px Segoe UI, Arial";
  ctx.fillText(label, left, 12);
  ctx.fillText(NOK.format(maxY), 6, top + 4);
  ctx.fillText(NOK.format(minY), 6, height - bottom + 4);
  return { left, right, top, bottom, plotW: width - left - right, plotH: height - top - bottom };
}

function drawLine(ctx, points, area, minY, maxY, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  points.forEach((point, index) => {
    const x = area.left + (point.x / points[points.length - 1].x) * area.plotW;
    const y = area.top + (1 - (point.y - minY) / (maxY - minY || 1)) * area.plotH;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
}

function hideFiscalTooltip() {
  const tooltip = document.getElementById("fiscalTooltip");
  if (tooltip) {
    tooltip.hidden = true;
  }
}

function updateFiscalTooltip(event) {
  const canvas = document.getElementById("fiscalChart");
  const tooltip = document.getElementById("fiscalTooltip");
  if (!canvas || !tooltip || !fiscalTooltipArea || fiscalTooltipPoints.length === 0) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const pointerX = event.clientX - rect.left;
  const pointerY = event.clientY - rect.top;
  const area = fiscalTooltipArea;
  const isInsidePlot =
    pointerX >= area.left &&
    pointerX <= area.left + area.plotW &&
    pointerY >= area.top - 18 &&
    pointerY <= area.top + area.plotH + 28;

  if (!isInsidePlot) {
    hideFiscalTooltip();
    return;
  }

  const nearest = fiscalTooltipPoints.reduce((closest, point) =>
    Math.abs(point.screenX - pointerX) < Math.abs(closest.screenX - pointerX) ? point : closest
  );
  tooltip.innerHTML = `
    <strong>År ${nearest.x}</strong>
    <span>Akkumulert behov: ${formatNeedBn(nearest.y)}</span>
    <span>Årlig trekk: ${formatNeedBn(nearest.annualNeed)}</span>
  `;
  tooltip.style.left = `${Math.min(Math.max(nearest.screenX, 92), rect.width - 92)}px`;
  tooltip.style.top = `${Math.max(nearest.screenY, 58)}px`;
  tooltip.hidden = false;
}

function drawTrajectory() {
  const canvas = document.getElementById("trajectoryChart");
  const { ctx, width, height } = setupCanvas(canvas);
  const area = drawAxes(ctx, width, height, 0, 100, "prosent");
  const employmentStart = state.employmentStart;
  const employmentEnd = Math.max(32, state.employment10 - state.benefitTransition * 0.38);
  const employment = [];
  const benefits = [];
  for (let year = 0; year <= 50; year += 1) {
    const firstPhase = employmentStart + (state.employment10 - employmentStart) * Math.min(1, year / 10);
    const oldAgePhase = Math.max(18, employmentEnd - Math.max(0, year - 35) * 0.9);
    const secondPhase = state.employment10 + (employmentEnd - state.employment10) * Math.min(1, Math.max(0, (year - 10) / 25));
    const latePhase = secondPhase + (oldAgePhase - secondPhase) * Math.min(1, Math.max(0, (year - 35) / 15));
    employment.push({ x: year, y: year <= 10 ? firstPhase : secondPhase });
    employment[employment.length - 1].y = year <= 35 ? employment[employment.length - 1].y : latePhase;
    const benefitStart = Math.max(5, state.benefitTransition * 0.25);
    const benefitY =
      benefitStart +
      (state.benefitTransition - benefitStart) * Math.min(1, Math.max(0, year - 1) / 14) +
      Math.max(0, year - 35) * 0.6;
    benefits.push({ x: year, y: benefitY });
  }
  drawLine(ctx, employment, area, 0, 100, "#177c73");
  drawLine(ctx, benefits, area, 0, 100, "#b74343");
  ctx.fillStyle = "#177c73";
  ctx.fillText("Sysselsetting", area.left + 8, area.top + 18);
  ctx.fillStyle = "#b74343";
  ctx.fillText("Trygdeovergang", area.left + 8, area.top + 36);
  ctx.fillStyle = "#68736f";
  ctx.fillText("0 år", area.left - 4, height - 10);
  ctx.fillText("50 år", width - 58, height - 10);
}

function simulateFundingNeed(result, input) {
  const points = [];
  let cumulativeNeed = 0;
  const horizonYears = Math.max(50, Math.min(180, Math.round(input.projectionYears || 150)));
  const flowYears = Math.min(horizonYears, Math.max(1, input.flowYears));
  let peakAnnualNeed = 0;
  let firstYearNeed = 0;

  function calendarWageTaxLoss(year) {
    const ramp = Math.min(1, year / WAGE_TAX_LOSS_RAMP_YEARS);
    if (year <= flowYears) {
      return result.wageTaxLoss * ramp;
    }

    const decay = Math.max(0, 1 - (year - flowYears) / WAGE_TAX_LOSS_DECAY_YEARS);
    return result.wageTaxLoss * decay;
  }

  function cohortAnnualNet(cohortAge, calendarYear) {
    const employmentAtAge =
      cohortAge <= 10
        ? input.employmentStart + (input.employment10 - input.employmentStart) * (cohortAge / 10)
        : cohortAge <= 35
          ? input.employment10 * Math.max(0.38, 1 - (cohortAge - 10) * 0.017)
          : input.employment10 * Math.max(0.15, 0.58 - (cohortAge - 35) * 0.027);
    const employmentRatio = input.employment10 <= 0 ? 0 : Math.max(0, employmentAtAge / input.employment10);
    const tax = result.taxRevenue * employmentRatio;
    const benefitRamp =
      cohortAge <= 15
        ? 0.45 + cohortAge * 0.037
        : 1 + Math.max(0, cohortAge - 35) * 0.045;
    const arrivalChildRamp = cohortAge <= 18 ? 1 : Math.max(0, 1 - (cohortAge - 18) / 6);
    const secondGenChildRamp = cohortAge <= 4 ? 0.25 : cohortAge <= 22 ? 1 : Math.max(0, 1 - (cohortAge - 22) / 8);
    const childDependentShare =
      result.childPopulation <= 0 ? 0 : result.childDependentsAtArrival / result.childPopulation;
    const secondGenShare =
      result.childPopulation <= 0 ? 0 : result.secondGenChildren / result.childPopulation;
    const childRamp = childDependentShare * arrivalChildRamp + secondGenShare * secondGenChildRamp;
    const secondGenAdultRamp =
      cohortAge <= 22 ? 0 : cohortAge <= 30 ? (cohortAge - 22) / 8 : 1;
    const thirdGenRamp =
      cohortAge <= 24 ? 0 : cohortAge <= 47 ? 1 : Math.max(0, 1 - (cohortAge - 47) / 8);
    const thirdGenAdultRamp =
      cohortAge <= 47 ? 0 : cohortAge <= 55 ? (cohortAge - 47) / 8 : 1;
    const elderRamp = cohortAge <= 35 ? 0 : Math.min(1, (cohortAge - 35) / 10);
    const elderArrivalRamp = Math.min(1, 0.35 + cohortAge * 0.08);
    const elderArrivalShare =
      result.workingAge + result.elderDependentsAtArrival * 1.4 <= 0
        ? 0
        : (result.elderDependentsAtArrival * 1.4) / (result.workingAge + result.elderDependentsAtArrival * 1.4);
    const workingElderShare = Math.max(0, 1 - elderArrivalShare);

    const annualCost =
      result.serviceCost +
      result.integrationCost +
      result.supplementCost +
      result.benefitCost * benefitRamp +
      result.childCost * childRamp +
      result.secondGenAdultCost * secondGenAdultRamp +
      result.thirdGenChildCost * thirdGenRamp +
      result.thirdGenAdultCost * thirdGenAdultRamp +
      result.elderReserveCost * (workingElderShare * elderRamp + elderArrivalShare * elderArrivalRamp) +
      result.elderDependentBenefitCost * elderArrivalRamp +
      result.elderCareMatureCost * (workingElderShare * elderRamp + elderArrivalShare * elderArrivalRamp) +
      result.secondGenElderReserveCost * secondGenAdultRamp;

    return tax - annualCost;
  }

  for (let year = 1; year <= horizonYears; year += 1) {
    let annualNet = 0;
    const activeCohorts = Math.min(year, flowYears);
    for (let cohort = 1; cohort <= activeCohorts; cohort += 1) {
      const cohortAge = year - cohort + 1;
      annualNet += cohortAnnualNet(cohortAge, year);
    }
    annualNet -= calendarWageTaxLoss(year);
    const annualNeed = Math.max(0, -annualNet);
    if (year === 1) {
      firstYearNeed = annualNeed;
    }
    peakAnnualNeed = Math.max(peakAnnualNeed, annualNeed);
    cumulativeNeed += annualNeed;
    points.push({ x: year, y: cumulativeNeed, annualNeed, annualNet });
  }

  return {
    points,
    firstYearNeed,
    peakAnnualNeed,
    cumulativeNeed
  };
}

function drawFiscal(result) {
  hideFiscalTooltip();
  const canvas = document.getElementById("fiscalChart");
  const { ctx, width, height } = setupCanvas(canvas);
  const { points } = simulateFundingNeed(result, state);
  const values = points.map((point) => point.y);
  const minY = 0;
  const maxY = Math.max(1, Math.ceil(Math.max(...values) + 4));
  const area = drawAxes(ctx, width, height, minY, maxY, "mrd. 2025-kroner som må dekkes");
  const lastYear = points[points.length - 1]?.x || 1;
  fiscalTooltipArea = area;
  fiscalTooltipPoints = points.map((point) => ({
    ...point,
    screenX: area.left + (point.x / lastYear) * area.plotW,
    screenY: area.top + (1 - (point.y - minY) / (maxY - minY || 1)) * area.plotH
  }));
  const zeroY = area.top + (1 - (0 - minY) / (maxY - minY || 1)) * area.plotH;
  ctx.strokeStyle = "#8e9892";
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(area.left, zeroY);
  ctx.lineTo(width - area.right, zeroY);
  ctx.stroke();
  ctx.setLineDash([]);
  drawLine(ctx, points, area, minY, maxY, "#b74343");
  ctx.fillStyle = "#68736f";
  ctx.fillText("år 1", area.left - 4, height - 10);
  ctx.fillText(`år ${points[points.length - 1].x}`, width - 68, height - 10);
}

function renderSources() {
  const sourceList = document.getElementById("sourceList");
  sourceList.innerHTML = sources
    .map((source) => `<li><a href="${source.url}" target="_blank" rel="noreferrer">${source.title}</a><small>${source.note}</small></li>`)
    .join("");

  const benchmarkRows = document.getElementById("benchmarkRows");
  benchmarkRows.innerHTML = benchmarks
    .map((row) => `<tr><td>${row.region}</td><td>${row.target}</td><td>${row.signal}</td></tr>`)
    .join("");
}

function syncControlsFromState() {
  controls.forEach((key) => {
    document.getElementById(key).value = state[key];
  });
  updateOutputs();
}

function updateScenarioText() {
  document.getElementById("scenarioTitle").textContent = state.title;
}

function resetDefaults() {
  state = { ...basisScenario };
  isCustomized = false;
  lastChange = null;
  syncControlsFromState();
  render();
}

function render() {
  controls.forEach((key) => {
    state[key] = Number(document.getElementById(key).value);
  });
  updateOutputs();
  updateScenarioText();
  const result = calculate(state);
  updateMetrics(result);
  drawTrajectory();
  drawFiscal(result);
}

function downloadCsv() {
  const result = calculate(state);
  const fundingNeed = simulateFundingNeed(result, state);
  const rows = [
    ["felt", "verdi"],
    ["modell", state.title],
    ["nettoinnvandring_1000", state.netImmigration],
    ["arbeidsinnvandring_prosent", state.labourShare],
    ["høykompetanse_prosent", state.highSkillShare],
    ["arbeidsfør_andel_ved_ankomst_prosent", state.workingAgeShare],
    ["eldre_omsorg_blant_ikke_arbeidsføre_prosent", state.elderDependentShare],
    ["sysselsetting_første_år_prosent", state.employmentStart],
    ["sysselsetting_10_år_prosent", state.employment10],
    ["relativ_lønn_prosent", state.relativeWage],
    ["arbeidsintensitet_prosent", state.workIntensity],
    ["lønnseffekt_lav_utdanning_prosent", state.wagePressure],
    ["trygdeovergang_10_plus_prosent", state.benefitTransition],
    ["tjenestekostnad_1000_kr", state.serviceCost],
    ["familie_bostotte_sosialhjelp_1000_kr", state.supplementCost],
    ["pengeeksport_prosent", state.remittanceShare],
    ["momsfri_boligandel_prosent", state.housingExemptShare],
    ["avgiftspliktig_forbruksandel_prosent", (result.taxableConsumptionShare * 100).toFixed(1)],
    ["år_med_samme_innvandringsnivå", state.flowYears],
    ["år_regningen_summeres", state.projectionYears],
    ["etterkommere_per_100_ankomne", state.secondGenRate],
    ["barn_skole_tiltak_1000_kr", state.childCost],
    ["etterkommer_22_plus_nettokostnad_1000_kr", state.secondGenAdultCost],
    ["tredje_generasjon_per_100_etterkommere", state.thirdGenRate],
    ["tredje_gen_barn_skole_tiltak_1000_kr", state.thirdGenChildCost],
    ["tredje_gen_22_plus_nettokostnad_1000_kr", state.thirdGenAdultCost],
    ["alderdomsreserve_1000_kr", state.elderReserveCost],
    ["minstepensjon_stonad_eldre_ankomne_1000_kr", state.elderDependentBenefitCost],
    ["tung_omsorgsandel_35_plus_prosent", state.elderCareShare],
    ["prislapp_sykehjemsplass_1000_kr", state.elderCareCost],
    ["etterkommer_aldringsreserve_1000_kr", state.secondGenElderReserveCost],
    ["effektiv_arbeidsskatt_prosent", (result.effectiveTaxRate * 100).toFixed(1)],
    ["skatt_og_avgifter_mrd", result.taxRevenue.toFixed(2)],
    ["ytelser_og_tjenester_mrd", result.totalCost.toFixed(2)],
    ["balanse_for_ekstra_finansiering_mrd", result.balanceBeforeOil.toFixed(2)],
    ["årlig_finansieringsbehov_mrd", result.gapBeforeOil.toFixed(2)],
    ["største_årlige_finansieringsbehov_mrd", fundingNeed.peakAnnualNeed.toFixed(2)],
    ["akkumulert_finansieringsbehov_mrd", fundingNeed.cumulativeNeed.toFixed(2)]
  ];
  const csv = rows.map((row) => row.join(";")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `velferdsstat-realistisk-basis${isCustomized ? "-justert" : ""}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function init() {
  renderSources();
  syncControlsFromState();
  renderControlHelp();
  const advancedToggle = document.getElementById("advancedToggle");
  const advancedControls = document.getElementById("advancedControls");
  advancedToggle.addEventListener("click", () => {
    const isOpen = !advancedControls.hidden;
    advancedControls.hidden = isOpen;
    advancedToggle.setAttribute("aria-expanded", String(!isOpen));
    advancedToggle.textContent = isOpen ? "Avanserte innstillinger" : "Skjul avanserte innstillinger";
  });
  controls.forEach((key) => {
    const input = document.getElementById(key);
    input.addEventListener("input", () => {
      lastChange = {
        key,
        from: Number(state[key]),
        to: Number(input.value)
      };
      isCustomized = true;
      state.title = "Justert realistisk basis";
      render();
    });
  });
  document.getElementById("downloadCsv").addEventListener("click", downloadCsv);
  document.getElementById("resetDefaults").addEventListener("click", resetDefaults);
  const fiscalChart = document.getElementById("fiscalChart");
  fiscalChart.addEventListener("pointermove", updateFiscalTooltip);
  fiscalChart.addEventListener("pointerleave", hideFiscalTooltip);
  document.addEventListener("pointermove", (event) => {
    if (event.target !== fiscalChart) {
      hideFiscalTooltip();
    }
  });
  window.addEventListener("resize", render);
  render();
}

init();
