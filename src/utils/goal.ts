import { GoalCategory, Timeframe } from '../types';

interface Goal {
  category: string;
  title: string;
  description: string;
  endText: string;
  dropdownOptions?: { label: string; value: string }[];
}

export const categories = [
  [
    'Releafe',
    'Bepaal doelen voor het gebruik van de functies in de Releafe-app',
  ],
  ['Bewegen', 'Stel doelen om actiever bezig te zijn met fysieke beweging'],
  ['Slapen', 'Stel doelen om bewuster om te gaan met je slaapkwaliteit'],
  ['Voeding', 'Stel doelen om je voedingsgewoonten actief te verbeteren'],
  [
    'Alcohol, drugs en cafeïne',
    'Stel doelen om bewust om te gaan met je gebruik van alcohol, drugs en cafeine',
  ],
  [
    'Ontspanning',
    'Stel doelen om regelmatig tijd voor ontspanning in te plannen',
  ],
  [
    'Ervaringen delen',
    'Stel doelen om je ervaringen regelmatig te delen met anderen',
  ],
  [
    'Ondernemen',
    'Stel doelen om actief nieuwe ondernemingskansen te verkennen',
  ],
];

export const categoryGoals = new Map<GoalCategory, Goal[]>([
  // Releafe
  [
    GoalCategory.Releafe,
    [
      {
        category: 'Releafe',
        title: 'Reflecteren in dagboek',
        description:
          'Het regelmatig bijhouden van het dagboek bevordert zelfinzicht en emotionele verwerking. Dit draagt bij aan betere mentale gezondheid.',
        endText: 'mijn dagboek in Releafe invullen.',
      },
      {
        category: 'Releafe',
        title: 'Ontspannen',
        description:
          'Ontspanningsoefeningen helpen bij het verbeteren van concentratie, het verlagen van stress en het verhogen van algemeen welzijn.',
        endText: 'een ontspannende oefening doen in Releafe.',
      },
      {
        category: 'Releafe',
        title: 'Ervaringen delen in de Community',
        description:
          'Het delen van je eigen (positieve en minder positieve) ervaringen en het lezen van ervaringen van anderen helpt je te realiseren dat je hier niet alleen in staat en zorgt ervoor dat je de mogelijkheid hebt om te relativeren waardoor je gevoelens dragelijker worden.',
        endText: 'een persoonlijke ervaring delen in de Community.',
      },
      {
        category: 'Releafe',
        title: 'Cognitief reframen',
        description:
          'Het reframen van een situatie of (negatieve) gedachte kan je helpen om patronen te doorbreken. Hierdoor voel je je gezonder en meer ‘in control’ over je eigen gedachtes.',
        endText: 'een zorg van mij Reframen in Releafe.',
      },
    ],
  ],
  // Bewegen
  [
    GoalCategory.Bewegen,
    [
      {
        category: 'Bewegen',
        title: 'Regelmatig bewegen',
        description:
          'Regelmatige lichaamsbeweging verbetert de fysieke gezondheid. Dit heeft direct invloed op het mentale welzijn doordat het symptomen van depressie en angst vermindert.',
        endText: 'bewegen.',
        dropdownOptions: [
          { label: '10 minuten', value: '10 minuten' },
          { label: '20 minuten', value: '20 minuten' },
          { label: '30 minuten', value: '30 minuten' },
          { label: '40 minuten', value: '40 minuten' },
          { label: '50 minuten', value: '50 minuten' },
          { label: '60 minuten', value: '60 minuten' },
        ],
      },
      {
        category: 'Bewegen',
        title: 'Krachttraining',
        description:
          'Krachttraining kan helpen bij het verbeteren van het zelfbeeld en hoe je je in je eigen lichaam voelt. Ook maakt het endorfines vrij die je humeur verbeteren.',
        endText: 'krachttraining uitvoeren.',
        dropdownOptions: [
          { label: '10 minuten', value: '10 minuten' },
          { label: '20 minuten', value: '20 minuten' },
          { label: '30 minuten', value: '30 minuten' },
          { label: '40 minuten', value: '40 minuten' },
          { label: '50 minuten', value: '50 minuten' },
          { label: '60 minuten', value: '60 minuten' },
        ],
      },
      {
        category: 'Bewegen',
        title: 'Actief transport',
        description:
          'Het gebruik van actief transport zoals wandelen of fietsen kan de dagelijkse fysieke activiteit verhogen en dit vermindert stress en verbetert de mentale helderheid.',
        endText: 'op een actieve manier naar een plaats van bestemming.',
      },
      {
        category: 'Bewegen',
        title: 'Interval training',
        description:
          'Intervaltraining kan helpen bij het effectief managen van stress en het verbeteren van de algehele energieniveaus. Daarnaast kan het helpen je hart gezond te houden en calorieën efficiënt te verbranden.',
        endText: 'aan intervaltraining doen.',
        dropdownOptions: [
          { label: '10 minuten', value: '10 minuten' },
          { label: '20 minuten', value: '20 minuten' },
          { label: '30 minuten', value: '30 minuten' },
          { label: '40 minuten', value: '40 minuten' },
          { label: '50 minuten', value: '50 minuten' },
          { label: '60 minuten', value: '60 minuten' },
        ],
      },
      {
        category: 'Bewegen',
        title: 'Stappendoel',
        description:
          'Het stellen van een dagelijks stappendoel helpt bij het verhogen van fysieke activiteit. Dit is belangrijk voor zowel je fysieke als mentale gezondheid. Regelmatig wandelen kan stress verminderen, je humeur verbeteren en je algehele energieniveau verhogen.',
        endText: 'per dag zetten.',
        dropdownOptions: [
          { label: '2.000 stappen', value: '2.000 stappen' },
          { label: '4.000 stappen', value: '4.000 stappen' },
          { label: '6.000 stappen', value: '6.000 stappen' },
          { label: '8.000 stappen', value: '8.000 stappen' },
          { label: '10.000 stappen', value: '10.000 stappen' },
        ],
      },
    ],
  ],
  // Slapen
  [
    GoalCategory.Slapen,
    [
      {
        category: 'Slapen',
        title: 'Consistente slaaptijden',
        description:
          'Het handhaven van een regelmatig slaapschema helpt de interne klok te stabiliseren. Dit leidt tot betere slaapkwaliteit en een verbeterd humeur.',
        endText: 'op dezelfde tijd naar bed gaan en opstaan.',
      },
      {
        category: 'Slapen',
        title: 'Kwaliteit van slaap',
        description:
          'Het verbeteren van de slaapkwaliteit door ontspanningsoefeningen kan de algehele gezondheid verbeteren en symptomen van depressie en angst verminderen.',
        endText: 'iets ontspannends doen voor het slapen gaan.',
      },
      {
        category: 'Slapen',
        title: 'Voldoende slaap',
        description:
          'Voldoende slaap krijgen is essentieel voor de cognitieve functie en emotionele regulatie.',
        endText: '7 tot 9 uren slapen.',
      },
      {
        category: 'Slapen',
        title: 'Geen of minder middagdutjes',
        description:
          'Beperking van middagdutjes kan nachtelijke slaapkwaliteit verbeteren. Dit is cruciaal voor emotioneel en fysiek herstel.',
        endText: 'geen middagdutje doen.',
      },
    ],
  ],
  // Voeding
  [
    GoalCategory.Voeding,
    [
      {
        category: 'Voeding',
        title: 'Groente en fruit boost',
        description:
          'Een dieet rijk aan groenten en fruit kan het energieniveau verhogen en bijdragen aan een beter humeur door de aanvoer van essentiële vitaminen en mineralen. Eet minimaal 250 gram groenten en 2 stuks fruit.',
        endText: '250 gram groente en twee stuks fruit eten.',
      },
      {
        category: 'Voeding',
        title: 'Volkoren voorkeur',
        description:
          'Volkorenproducten bevatten meer voedingsstoffen en vezels. Deze helpen bij het reguleren van de bloedsuikerspiegel en het verbeteren van de hersenfunctie.',
        endText: 'een volkoren maaltijd eten.',
      },
      {
        category: 'Voeding',
        title: 'Noten noodzaak',
        description:
          'Ongezouten noten bieden gezonde vetten en eiwitten die bijdragen aan hersengezondheid en stemmingstabilisatie.',
        endText: 'een handvol ongezouten noten eten.',
      },
      {
        category: 'Voeding',
        title: 'Minder rood vlees',
        description:
          'Het verminderen van de consumptie van rood vlees kan het risico op fysieke gezondheidsproblemen verlagen, wat indirect bijdraagt aan een beter mentaal welzijn.',
        endText: 'geen rood vlees eten.',
      },
      {
        category: 'Voeding',
        title: 'Minder suikerhoudende dranken',
        description:
          'Het vermijden van suikerhoudende dranken helpt bij het stabiliseren van energieniveaus en het voorkomen van stemmingswisselingen.',
        endText: 'suikerhoudende dranken drinken.',
        dropdownOptions: [
          { label: '0', value: '0' },
          { label: 'niet meer dan 1x', value: 'niet meer dan 1x' },
          { label: 'niet meer dan 2x', value: 'niet meer dan 2x' },
          { label: 'niet meer dan 3x', value: 'niet meer dan 3x' },
        ],
      },
    ],
  ],
  // Alcohol, drugs en cafeïne
  [
    GoalCategory.AlcoholDrugsCafeine,
    [
      {
        category: 'Alcohol, drugs en cafeïne',
        title: 'Alcoholvrije dagen',
        description:
          'Het verminderen van alcoholgebruik kan leiden tot betere slaapkwaliteit en verminderde angst en depressie.',
        endText: 'geen alcohol drinken.',
      },
      {
        category: 'Alcohol, drugs en cafeïne',
        title: 'Cafeïne controle',
        description:
          'Het beperken van cafeïne helpt bij het verminderen van angst, slaapproblemen en rusteloosheid.',
        endText: 'koffie drinken.',
        dropdownOptions: [
          { label: '0', value: '0' },
          { label: 'niet meer dan 1x', value: 'niet meer dan 1x' },
          { label: 'niet meer dan 2x', value: 'niet meer dan 2x' },
          { label: 'niet meer dan 3x', value: 'niet meer dan 3x' },
        ],
      },
      {
        category: 'Alcohol, drugs en cafeïne',
        title: 'Stoppen met roken',
        description:
          'Stoppen met roken verbetert de fysieke gezondheid. Dit is essentieel voor je mentale welzijn.',
        endText: 'sigaret roken.',
        dropdownOptions: [
          { label: '0', value: '0' },
          { label: 'niet meer dan 1x', value: 'niet meer dan 1x' },
          { label: 'niet meer dan 2x', value: 'niet meer dan 2x' },
          { label: 'niet meer dan 3x', value: 'niet meer dan 3x' },
        ],
      },
      {
        category: 'Alcohol, drugs en cafeïne',
        title: 'Minder drugs',
        description:
          "Verminderen van (recreatief) druggebruik vermindert risico's van stemmingsstoornissen en cognitieve beperkingen.",
        endText: 'drugs gebruiken',
        dropdownOptions: [
          { label: '0', value: '0' },
          { label: 'niet meer dan 1x', value: 'niet meer dan 1x' },
          { label: 'niet meer dan 2x', value: 'niet meer dan 2x' },
          { label: 'niet meer dan 3x', value: 'niet meer dan 3x' },
        ],
      },
      {
        category: 'Alcohol, drugs en cafeïne',
        title: 'Verminder energie dranken',
        description:
          'Vermijden van energiedranken vermindert overstimulatie en bevordert een stabieler energieniveau en mentaal evenwicht.',
        endText: 'energiedranken drinken.',
        dropdownOptions: [
          { label: '0', value: '0' },
          { label: 'niet meer dan 1x', value: 'niet meer dan 1x' },
          { label: 'niet meer dan 2x', value: 'niet meer dan 2x' },
          { label: 'niet meer dan 3x', value: 'niet meer dan 3x' },
        ],
      },
    ],
  ],
  // Ontspanning
  [
    GoalCategory.Ontspanning,
    [
      {
        category: 'Ontspanning',
        title: 'Mediteren',
        description:
          'Regelmatige meditatie bevordert mindfulness. Dit helpt bij het managen van stress en het verbeteren van emotionele veerkracht.',
        endText: 'een meditatieoefening doen.',
      },
      {
        category: 'Ontspanning',
        title: 'Yoga',
        description:
          'Yoga ondersteunt zowel fysieke als mentale gezondheid door het verbeteren van flexibiliteit, kracht, en stressverlichting.',
        endText: 'een yoga sessie doen.',
      },
      {
        category: 'Ontspanning',
        title: 'Ademhalingsbeheersing',
        description:
          'Regelmatige ademhalingsoefeningen kunnen helpen bij het reguleren van de reactie van het lichaam op stress.',
        endText: 'een ademhalingsoefening doen.',
      },
      {
        category: 'Ontspanning',
        title: 'Stress management',
        description:
          'Het toepassen van stressmanagementtechnieken helpt bij het verminderen van algehele stressniveaus en het bevorderen van mentale gezondheid.',
        endText: 'een stressmanagementoefening.',
      },
      {
        category: 'Ontspanning',
        title: 'Mindfulness routine',
        description:
          'Het integreren van mindfulness in het dagelijks leven helpt om bewuster te leven en stressvolle situaties beter aan te kunnen.',
        endText: 'een mindful moment nemen.',
      },
    ],
  ],
  // Ervaringen
  [
    GoalCategory.ErvaringenDelen,
    [
      {
        category: 'Ervaringen delen',
        title: 'Deel je ervaringen en zorgen',
        description:
          'Het delen van ervaringen biedt emotionele ondersteuning en helpt bij het verminderen van het gevoel van isolatie.',
        endText: 'mijn ervaringen met iemand delen.',
      },
      {
        category: 'Ervaringen delen',
        title: 'Groepsondersteuning',
        description:
          'Deelnemen aan steungroepen biedt gemeenschappelijke ondersteuning en vermindert gevoelens van eenzaamheid en isolatie.',
        endText: 'deelnemen aan een steun- of lotgenoten groep.',
      },
      {
        category: 'Ervaringen delen',
        title: 'Familie en vrienden betrekken',
        description:
          'Het betrekken van naasten bij het persoonlijke proces bevordert openheid en begrip, wat leidt tot betere relaties en emotionele steun.',
        endText: 'mijn ervaringen delen met een vriend of familie.',
      },
    ],
  ],
  // Ondernemen
  [
    GoalCategory.Ondernemen,
    [
      {
        category: 'Ondernemen',
        title: 'Vermijding overwinnen',
        description:
          'Het aangaan van uitdagingen helpt je om angsten te confronteren en vermijdingsgedrag te verminderen. Dit leidt tot grotere zelfverzekerdheid en controle over je leven.',
        endText: 'een uitdaging aangaan.',
      },
      {
        category: 'Ondernemen',
        title: "Tijd nemen voor hobby's",
        description:
          "Het onderhouden van hobby's zorgt voor noodzakelijke ontspanning en afleiding van dagelijkse stress. Dit bevordert emotioneel evenwicht.",
        endText: 'besteden aan een hobby.',
        dropdownOptions: [
          { label: '15 minuten', value: '15 minuten' },
          { label: '30 minuten', value: '30 minuten' },
          { label: '45 minuten', value: '45 minuten' },
          { label: '60 minuten', value: '60 minuten' },
        ],
      },
      {
        category: 'Ondernemen',
        title: 'Sociale contacten onderhouden',
        description:
          'Meer sociale contacten bevorderen het gevoel van verbondenheid en steun. Dit is cruciaal voor je emotionele gezondheid en het verminderen van gevoelens van isolatie.',
        endText: 'een sociale interactie hebben.',
      },
      {
        category: 'Ondernemen',
        title: 'Deelnemen aan sociale activiteiten',
        description:
          'Regelmatig deelnemen aan sociale activiteiten bevordert verbinding en verminderen gevoelens van isolatie. Ze helpen bij het opbouwen van sociale vaardigheden en zelfvertrouwen. Dit is essentieel voor mentaal welzijn en emotionele stabiliteit.',
        endText: 'een sociale activiteit ondernemen.',
      },
    ],
  ],
]);

export const categoryIcons = [
  require('../../assets/images/custom_icons/releafe_icon.png'),
  require('../../assets/images/custom_icons/bewegen_icon.png'),
  require('../../assets/images/custom_icons/slapen_icon.png'),
  require('../../assets/images/custom_icons/voeding_icon.png'),
  require('../../assets/images/custom_icons/alcohol_drugs_caffeine_icon.png'),
  require('../../assets/images/custom_icons/ontspanning_icon.png'),
  require('../../assets/images/custom_icons/ervaringen_icon.png'),
  require('../../assets/images/custom_icons/ondernemen_icon.png'),
];

export const getDescription = (index: number): string => {
  switch (index) {
    case 0:
      return 'Kies een categorie';
    case 1:
      return 'Kies een doel';
    case 2:
      return 'Personaliseer jouw doel';
    case 3:
      return 'Jouw nieuwe persoonlijke doel';
    default:
      return '';
  }
};

export const getGoalCategory = (index: number) => {
  switch (index) {
    case 0:
      return GoalCategory.Releafe;
    case 1:
      return GoalCategory.Bewegen;
    case 2:
      return GoalCategory.Slapen;
    case 3:
      return GoalCategory.Voeding;
    case 4:
      return GoalCategory.AlcoholDrugsCafeine;
    case 5:
      return GoalCategory.Ontspanning;
    case 6:
      return GoalCategory.ErvaringenDelen;
    case 7:
      return GoalCategory.Ondernemen;
    default:
      return GoalCategory.Releafe;
  }
};

export const getGoalCategoryIcon = (goalCategory: GoalCategory) => {
  switch (goalCategory) {
    case GoalCategory.Releafe:
      return categoryIcons[0];
    case GoalCategory.Bewegen:
      return categoryIcons[1];
    case GoalCategory.Slapen:
      return categoryIcons[2];
    case GoalCategory.Voeding:
      return categoryIcons[3];
    case GoalCategory.AlcoholDrugsCafeine:
      return categoryIcons[4];
    case GoalCategory.Ontspanning:
      return categoryIcons[5];
    case GoalCategory.ErvaringenDelen:
      return categoryIcons[6];
    case GoalCategory.Ondernemen:
      return categoryIcons[7];
  }
};

export const getGoalCategoryString = (goalCategory: GoalCategory): string => {
  switch (goalCategory) {
    case GoalCategory.Releafe:
      return 'Releafe';
    case GoalCategory.Bewegen:
      return 'Bewegen';
    case GoalCategory.Slapen:
      return 'Slapen';
    case GoalCategory.Voeding:
      return 'Voeding';
    case GoalCategory.AlcoholDrugsCafeine:
      return 'Alcohol, drugs en cafeïne';
    case GoalCategory.Ontspanning:
      return 'Ontspanning';
    case GoalCategory.ErvaringenDelen:
      return 'Ervaringen';
    case GoalCategory.Ondernemen:
      return 'Ondernemen';
  }
};

export const getTimeframeString = (timeframe: Timeframe): string => {
  switch (timeframe) {
    case Timeframe.Daily:
      return 'dagelijks';
    case Timeframe.Weekly:
      return 'wekelijks';
    case Timeframe.Monthly:
      return 'maandelijks';
  }
};
