let roller = [
        {
            key:"Sanitet",
            krav:["Hjelpekorpsprøve"]
        },
        {
            key:"Ambulansemedhjelper",
            krav:["Hjelpekorpsprøve", "Ambulansesertifisering"]
        },
        {
            key:"Ambulansesjåfør",
            krav:["Hjelpekorpsprøve", "Ambulansesertifisering", "Førerkort 160 utrykningskjøring"]
        },
        {
            key:"3 mann ambulanse",
            krav:["Hjelpekorpsprøve", "Videregående førstehjelpskurs"]
        },
        {
            key:"Båtfører",
            krav:["Hjelpekorpsprøve","Båtførerprøven","Maritimt VHF-sertifikat","Videregående sjøredningskurs"]
        },
        {
            key:"Båtmedhjelper",
            krav:["Hjelpekorpsprøve", "Ambulansesertifisering", "Videregående sjøredningskurs"]
        },
        {
            key:"Båtmannskap",
            krav:["Hjelpekorpsprøve", "Kvalifisert sjøredningskurs"]
        },
        {
            key:"Vaktleder",
            krav:["Hjelpekorpsprøve", "Vaktlederkurs"]
        },
        {
            key:"Scootermedhjelper",
            krav:["Hjelpekorpsprøve", "Ambulansesertifisering", "Kvalifisert kurs søk og redning (vinter)"]
        },
        {
            key:"Scootersjåfør",
            krav:["Hjelpekorpsprøve", "Kvalifisert kurs søk og redning (vinter)", "Kvalifisert snøscooterkurs", "Førerkort S snøscooter", "Førerkort BE tilhenger"]
        },
        {
            key:"3 mann scooter",
            krav:["Hjelpekorpsprøve", "Videregående førstehjelpskurs", "Kvalifisert kurs søk og redning"]
        },
        {
            key:"ATV fører",
            krav:["Hjelpekorpsprøve","Kvalifisert kurs søk og redning (sommer)","Kvalifisert ATV kurs","Førerkort BE tilhenger"]
        },
        {
            key:"Distriktssensor",
            krav:["Hjelpekorpsprøve","Distriktsensorkurs"]
        },
        {
            key:"Under opplæring",
            krav:[]
        },
        {
            key:"Markør",
            krav:[]
        }
    ];

let eventMaler = [
    {
        key:1,
        navn: "Skihytte",
        krav: [{rolle: "Vaktleder", antall: 1}, {rolle: "Sanitet", antall: 4}, {rolle: "Scootersjåfør", antall: 1}, {rolle: "Scootermedhjelper", antall: 1}, {rolle: "3 mann scooter", antall: 1}]
    },
    {
        key:2,
        navn: "Fotballkamp",
        krav: [{rolle: "Vaktleder", antall: 1}, {rolle: "Sanitet", antall: 8}, {rolle: "Ambulansesjåfør", antall: 4}, {rolle: "Ambulansemedhjelper", antall: 4}, {rolle: "3 mann ambulanse", antall: 4}]
    },
    {
        key:3,
        navn: "Triatlon",
        krav: [{rolle: "Sanitet", antall: 2}, {rolle: "Båtfører", antall: 1}, {rolle: "Båtmedhjelper", antall: 1}, {rolle: "Båtmannskap", antall: 1}]
    },
    {
        key:4,
        navn: "Hjelpekorpsprøve",
        krav: [{rolle: "Distriktsensor", antall: 1},{rolle: "Sanitet", antall: 14}, {rolle: "Markør", antall: 4}]
    }
];

export {roller, eventMaler};