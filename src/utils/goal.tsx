import { Text, StyleSheet, Platform, TextStyle } from 'react-native';
import { Fonts } from '../styles';
import { GoalCategory, Timeframe } from '../types';

interface Goal {
  category: string;
  title: string;
  description: string;
  endText: string;
  dropdownText?: string;
  dropdownOptions?: { label: string; value: string }[];
  diarySentence?: string;
}

export const categories = [
  [
    'Releafe',
    'Kies een doel om Releafe te gebruiken op een manier die bij jou past.',
  ],
  ['Bewegen', 'Kies een doel om meer te bewegen op een manier die bij je past.'],
  ['Slapen', 'Kies een doel om beter te slapen en meer rust te ervaren.'],
  ['Voeding', 'Kies een doel om gezonder te eten en te drinken.'],
  [
    'Alcohol, drugs en cafeïne',
    'Kies een doel om minder alcohol, drugs of cafeïne te gebruiken.',
  ],
  [
    'Ontspanning',
    'Kies een doel om vaker een rustmoment voor jezelf te nemen.',
  ],
  [
    'Ervaringen delen',
    'Kies een doel om vaker iets te delen met anderen.',
  ],
  [
    'Dingen doen',
    'Kies een doel om dingen te blijven doen en niet te vermijden.',
  ],
];

export const categoryGoals = new Map<GoalCategory, Goal[]>([
  // Releafe
  [
    GoalCategory.Releafe,
    [
      {
        category: 'Releafe',
        title: 'Dagboek invullen',
        description:
          'Schrijf je gedachten op. Dat helpt je om jezelf beter te begrijpen en met je gevoelens om te gaan.',
        endText: 'mijn dagboek invullen.',
        diarySentence: 'Ik heb vandaag mijn dagboek ingevuld.',
      },
      {
        category: 'Releafe',
        title: 'Ontspannen',
        description:
          'Doe oefeningen die je helpen ontspannen, minder stressen en beter concentreren.',
        endText: 'een ontspannende oefening doen.',
        diarySentence: 'Ik heb vandaag een ontspannende oefening gedaan.',
      },
      {
        category: 'Releafe',
        title: 'Reframen',
        description:
          'Leer je gedachten anders te bekijken (reframen). Zo doorbreek je negatieve patronen en voel je je sterker.',
        endText: 'een zorg of gedachte reframen.',
        diarySentence:
          'Ik heb vandaag een zorg of gedachte anders bekeken.',
      },
    ],
  ],
  // Bewegen
  [
    GoalCategory.Bewegen,
    [
      {
        category: 'Bewegen',
        title: 'Stappendoel',
        description:
          'Stel een dagelijks stappendoel. Zo beweeg je meer, en dat is goed voor je lichaam en hoofd. Het geeft je energie, vermindert stress en maakt je vrolijker.',
        endText: 'per dag zetten.',
        dropdownText: 'Hoeveel stappen wil je per keer zetten?',
        dropdownOptions: [
          { label: '2.000 stappen', value: '2.000 stappen' },
          { label: '3.000 stappen', value: '3.000 stappen' },
          { label: '4.000 stappen', value: '4.000 stappen' },
          { label: '5.000 stappen', value: '5.000 stappen' },
          { label: '6.000 stappen', value: '6.000 stappen' },
          { label: '7.000 stappen', value: '7.000 stappen' },
          { label: '8.000 stappen', value: '8.000 stappen' },
          { label: '9.000 stappen', value: '9.000 stappen' },
          { label: '10.000 stappen', value: '10.000 stappen' },
        ],
        diarySentence: 'Ik heb vandaag X gezet.',
      },
      {
        category: 'Bewegen',
        title: 'Lopen of fietsen',
        description:
          'Ga lopen of pak de fiets in plaats van de auto of bus. Zo beweeg je meer, en dat is goed voor je lichaam. Het helpt tegen stress en je kunt je beter concentreren.',
        endText: 'lopen of fietsen naar mijn bestemming.',
        diarySentence:
          'Ik ben vandaag lopend of fietsend naar een bestemming gegaan.',
      },
      {
        category: 'Bewegen',
        title: 'Regelmatig bewegen',
        description:
          'Regelmatig bewegen is goed voor je lichaam én je hoofd. Het helpt tegen somberheid en angst.',
        endText: 'bewegen.',
        dropdownText: 'Hoelang wil je per keer bewegen?',
        dropdownOptions: [
          { label: '10 minuten', value: '10 minuten' },
          { label: '20 minuten', value: '20 minuten' },
          { label: '30 minuten', value: '30 minuten' },
          { label: '40 minuten', value: '40 minuten' },
          { label: '50 minuten', value: '50 minuten' },
          { label: '60 minuten', value: '60 minuten' },
        ],
        diarySentence: 'Ik heb vandaag X aan beweging gedaan.',
      },
      {
        category: 'Bewegen',
        title: 'Krachttraining',
        description:
          'Krachttraining is goed voor hoe je over jezelf denkt. Je voelt je beter in je eigen lichaam. Ook komen er stofjes vrij in je lichaam, die je vrolijk maken.',
        endText: 'krachttraining doen.',
        dropdownText:
          'Hoeveel minuten wil je per keer aan krachttraining doen?',
        dropdownOptions: [
          { label: '10 minuten', value: '10 minuten' },
          { label: '20 minuten', value: '20 minuten' },
          { label: '30 minuten', value: '30 minuten' },
          { label: '40 minuten', value: '40 minuten' },
          { label: '50 minuten', value: '50 minuten' },
          { label: '60 minuten', value: '60 minuten' },
        ],
        diarySentence: 'Ik heb vandaag X aan krachttraining gedaan.',
      },
      {
        category: 'Bewegen',
        title: 'Intervaltraining',
        description:
          'Intervaltraining helpt tegen stress en geeft je meer energie. Het is goed voor je hart en helpt je vet verbranden.',
        endText: 'aan intervaltraining doen.',
        dropdownText:
          'Hoeveel minuten wil je per keer aan intervaltraining doen?',
        dropdownOptions: [
          { label: '10 minuten', value: '10 minuten' },
          { label: '20 minuten', value: '20 minuten' },
          { label: '30 minuten', value: '30 minuten' },
          { label: '40 minuten', value: '40 minuten' },
          { label: '50 minuten', value: '50 minuten' },
          { label: '60 minuten', value: '60 minuten' },
        ],
        diarySentence: 'Ik heb vandaag X aan intervaltraining gedaan.',
      },
    ],
  ],
  // Slapen
  [
    GoalCategory.Slapen,
    [
      {
        category: 'Slapen',
        title: 'Voldoende slaap',
        description:
          'Goed slapen is heel belangrijk. Als je genoeg slaapt, kun je beter nadenken en je emoties beter regelen.',
        endText: '7 tot 9 uren slapen.',
        diarySentence: 'Ik heb afgelopen nacht 7 tot 9 uren geslapen.',
      },
      {
        category: 'Slapen',
        title: 'Kwaliteit van slaap',
        description:
          'Als je ontspanningsoefeningen doet, slaap je beter. Beter slapen is goed voor je gezondheid. Ook helpt het tegen sombere gevoelens en angst.',
        endText: 'iets ontspannends doen voor het slapen gaan.',
        diarySentence: 'Ik heb iets ontspannends gedaan voor het slapen gaan.',
      },
      {
        category: 'Slapen',
        title: 'Regelmatige bedtijden',
        description:
          'Als je elke dag op dezelfde tijd gaat slapen en wakker wordt, helpt dat je lichaam. Je slaapt dan beter en je bent vrolijker.',
        endText: 'op een vaste tijd naar bed gaan en opstaan.',
        diarySentence: 'Ik ben op een vaste tijd naar bed gegaan en opgestaan',
      },
      {
        category: 'Slapen',
        title: 'Geen of minder middagdutjes',
        description:
          'Korte dutjes overdag zijn prima, maar lange dutjes zijn niet goed. Daardoor slaap je \'s nachts minder goed. Goed slapen is belangrijk voor je lichaam en hoe je je voelt.',
        endText: 'geen middagdutje doen.',
        diarySentence: 'Ik heb vandaag geen middagdutje gedaan.',
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
          'Groente en fruit geven je energie en maken je vrolijker. Eet elke dag 250 gram groente en 2 stuks fruit.',
        endText: '250 gram groente en twee stuks fruit eten.',
        diarySentence:
          'Ik heb vandaag 250 gram groenten en 2 stuks fruit gegeten.',
      },
      {
        category: 'Voeding',
        title: 'Minder zoete drankjes',
        description:
          'Drink minder drankjes met suiker. Dat is goed voor je energie en helpt je om je rustiger en stabieler te voelen.',
        endText: 'drankjes met suiker per dag drinken.',
        dropdownText:
          'Hoeveel drankjes met suiker wil je maximaal per dag drinken?',
        dropdownOptions: [
          { label: '0', value: '0' },
          { label: 'niet meer dan 1', value: 'niet meer dan 1' },
          { label: 'niet meer dan 2', value: 'niet meer dan 2' },
          { label: 'niet meer dan 3', value: 'niet meer dan 3' },
        ],
        diarySentence: 'Ik heb vandaag X drankjes met suiker gedronken.',
      },
      {
        category: 'Voeding',
        title: 'Kies volkoren',
        description:
          'Volkoren is goed voor je. Er zitten veel vezels in. Die geven energie en helpen je hersenen beter werken.',
        endText: 'een volkoren maaltijd eten.',
        diarySentence: 'Ik heb vandaag een volkoren maaltijd gegeten.',
      },
      {
        category: 'Voeding',
        title: 'Handvol noten',
        description:
          'Noten zonder zout zijn gezond. Ze helpen je hersenen goed werken en houden je stemming in balans.',
        endText: 'een handvol ongezouten noten eten.',
        diarySentence: 'Ik heb vandaag een handvol ongezouten noten gegeten.',
      },
      {
        category: 'Voeding',
        title: 'Minder rood vlees',
        description:
          'Minder rood vlees eten is beter voor je lichaam. Je hebt dan minder kans om ziek te worden en je voelt je fitter.',
        endText: 'geen rood vlees eten.',
        diarySentence: 'Ik heb vandaag geen rood vlees gegeten.',
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
          'Minder alcohol drinken helpt je beter te slapen. Je voelt je ook rustiger en minder angstig of somber.',
        endText: 'geen alcohol drinken.',
        diarySentence: 'Ik heb vandaag geen alcohol gedronken.',
      },
      {
        category: 'Alcohol, drugs en cafeïne',
        title: 'Minder koffie',
        description:
          'Minder koffie drinken helpt tegen onrust, slecht slapen en angst.',
        endText: 'kopjes koffie drinken per dag.',
        dropdownText: 'Hoeveel kopjes koffie wil je maximaal drinken per dag?',
        dropdownOptions: [
          { label: '0', value: '0' },
          { label: 'niet meer dan 1', value: 'niet meer dan 1' },
          { label: 'niet meer dan 2', value: 'niet meer dan 2' },
          { label: 'niet meer dan 3', value: 'niet meer dan 3' },
          { label: 'niet meer dan 4', value: 'niet meer dan 4' },
        ],
        diarySentence: 'Ik heb vandaag X kopjes koffie gedronken.',
      },
      {
        category: 'Alcohol, drugs en cafeïne',
        title: 'Stoppen met roken',
        description:
          'Stoppen met roken is goed voor je lichaam. En als je lichaam gezond is, voel je je ook beter in je hoofd.',
        endText: 'een sigaret roken per dag.',
        dropdownText: 'Hoe vaak wil je maximaal per dag een sigaret roken?',
        dropdownOptions: [
          { label: '0 keer', value: '0 keer' },
          { label: 'niet meer dan 1 keer', value: 'niet meer dan 1x' },
          { label: 'niet meer dan 2 keer', value: 'niet meer dan 2x' },
          { label: 'niet meer dan 3 keer', value: 'niet meer dan 3x' },
          { label: 'niet meer dan 4 keer', value: 'niet meer dan 4x' },
          { label: 'niet meer dan 5 keer', value: 'niet meer dan 5x' },
        ],
        diarySentence: 'Ik heb vandaag X een sigaret gerookt.',
      },
      {
        category: 'Alcohol, drugs en cafeïne',
        title: 'Minder drugs',
        description:
          "Minder drugs is beter voor je hoofd en je stemming. Je voelt je helderder en rustiger.",
        endText: 'geen drugs gebruiken.',
        diarySentence: 'Ik heb vandaag geen drugs gebruikt.',
      },
      {
        category: 'Alcohol, drugs en cafeïne',
        title: 'Minder energiedrankjes',
        description:
          'Drink minder energiedrankjes. Je voelt je dan rustiger en je energie blijft stabieler.',
        endText: 'energiedrankjes per dag drinken.',
        dropdownText: 'Hoeveel energiedrankjes wil je maximaal drinken per dag?',
        dropdownOptions: [
          { label: '0 keer', value: '0 keer' },
          { label: 'niet meer dan 1 keer', value: 'niet meer dan 1' },
          { label: 'niet meer dan 2 keer', value: 'niet meer dan 2' },
          { label: 'niet meer dan 3 keer', value: 'niet meer dan 3' },
        ],
        diarySentence: 'Ik heb vandaag X energiedrankjes gedronken.',
      },
    ],
  ],
  // Ontspanning
  [
    GoalCategory.Ontspanning,
    [
      {
        category: 'Ontspanning',
        title: 'Gecontroleerd ademen',
        description:
          'Doe regelmatig een ademhalingsoefening. Dit helpt je lichaam ontspannen en omgaan met stress.',
        endText: 'een ademhalingsoefening doen.',
        diarySentence: 'Ik heb vandaag een ademhalingsoefening gedaan.',
      },
      {
        category: 'Ontspanning',
        title: 'Mindfulness',
        description:
          'Mindfulness helpt je ontspannen. Je kunt je beter concentreren, laat stress los en voelt je fijner.',
        endText: 'een mindfulnessoefening doen.',
        diarySentence: 'Ik heb vandaag een mindfulnessoefening gedaan.',
      },
      {
        category: 'Ontspanning',
        title: 'Mediteren',
        description:
          'Mediteren maakt je hoofd rustiger. Je merkt beter wat je voelt en denkt. Dit maakt je sterker in moeilijke situaties.',
        endText: 'een meditatieoefening doen.',
        diarySentence: 'Ik heb vandaag een meditatieoefening gedaan.',
      },
      {
        category: 'Ontspanning',
        title: 'Omgaan met stress',
        description:
          'Leer hoe je beter omgaat met stress. Zo voel je je rustiger en dat is goed voor je mentale gezondheid.',
        endText: 'een stressmanagementoefening.',
        diarySentence: 'Ik heb vandaag een stressmanagementoefening gedaan.',
      },
      {
        category: 'Ontspanning',
        title: 'Yoga',
        description:
          'Yoga is goed voor je lichaam en je hoofd. Je wordt er soepeler en sterker van. Het helpt ook tegen stress.',
        endText: 'een yogasessie doen.',
        diarySentence: 'Ik heb vandaag een yogasessie gedaan.',
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
          'Praat over wat je meemaakt. Dat lucht op, geeft steun en je voelt je minder alleen.',
        endText: 'mijn ervaringen of zorgen met iemand delen.',
        diarySentence:
          'Ik heb vandaag mijn ervaringen of zorgen met iemand gedeeld.',
      },
      {
        category: 'Ervaringen delen',
        title: 'Familie en vrienden betrekken',
        description:
          'Praat met familie of vrienden over wat je meemaakt en voelt. Zo begrijpen ze je beter en krijg je meer steun.',
        endText:
          'mijn persoonlijke proces met een vriend of familie bespreken.',
        diarySentence:
          'Ik heb vandaag mijn persoonlijke proces met een vriend of familielid besproken.',
      },
      {
        category: 'Ervaringen delen',
        title: 'Steun van een groep',
        description:
          'In een groep van lotgenoten voel je je minder alleen. Je krijgt steun van mensen die hetzelfde meemaken.',
        endText: 'deelnemen aan een steun- of lotgenotengroep.',
        diarySentence:
          'Ik heb vandaag deelgenomen aan een steun- of lotgenotengroep.', 
      },
    ],
  ],
  // Ondernemen
  [
    GoalCategory.Ondernemen,
    [
      {
        category: 'Dingen doen',
        title: 'Sociale contacten onderhouden',
        description:
          'Heb vaker contact met anderen. Dat geeft steun en helpt tegen eenzaamheid.',
        endText: 'een sociale contact hebben.',
        diarySentence: 'Ik heb vandaag een sociaal contact gehad.',
        
      },
      {
        category: 'Dingen doen',
        title: "Tijd nemen voor hobby's",
        description:
          "Doe iets wat je leuk vindt. Hobby’s geven rust en zorgen voor meer balans.",
        endText: 'besteden aan een hobby.',
        dropdownText: 'Hoeveel tijd wil je per keer aan een hobby besteden?',
        dropdownOptions: [
          { label: '15 minuten', value: '15 minuten' },
          { label: '30 minuten', value: '30 minuten' },
          { label: '45 minuten', value: '45 minuten' },
          { label: '60 minuten', value: '60 minuten' },
        ],
        diarySentence: 'Ik heb vandaag X besteed aan een hobby.',
      },
      {
        category: 'Dingen doen',
        title: 'Deelnemen aan sociale activiteiten',
        description:
          'Doe mee aan een activiteit. Je ontmoet mensen en voelt je minder alleen. Dit geeft je meer zelfvertrouwen.',
        endText: 'meedoen aan een activiteit',
        diarySentence: 'Ik heb vandaag meegedaan aan een activiteit.',
      },
      {
        category: 'Dingen doen',
        title: 'Vermijding overwinnen',
        description:
          'Ga uitdagingen aan. Dit helpt je angsten te overwinnen en minder te vermijden. Het geeft je zelfvertrouwen en meer controle over je leven.',
        endText: 'een uitdaging aangaan.',
        diarySentence: 'Ik ben vandaag een uitdaging aangegaan.',
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

export const getDaysBetweenDates = (
  startDate: Date | null,
  endDate: Date | null
): number => {
  if (!startDate || !endDate) {
    console.error('startDate and endDate must not be null or undefined');
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const timeDifference = Math.abs(end.getTime() - start.getTime());
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  return daysDifference;
};

export const getWeeksBetweenDates = (
  startDate: Date | null,
  endDate: Date | null
): number => {
  const daysDifference = getDaysBetweenDates(startDate, endDate);

  const weeksDifference = Math.round(daysDifference / 7);
  return weeksDifference;
};

export const getMonthsBetweenDates = (
  startDate: Date | null,
  endDate: Date | null
): number => {
  if (!startDate || !endDate) {
    console.error('startDate and endDate must not be null or undefined');
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const yearsDifference = end.getFullYear() - start.getFullYear();
  const monthsDifference = end.getMonth() - start.getMonth();

  // Calculate total months
  let totalMonths = yearsDifference * 12 + monthsDifference;

  // Include partial month if the end date's day is later than the start date's day
  if (end.getDate() >= start.getDate()) {
    totalMonths += 1; // Consider partial months
  }

  return totalMonths;
};

export const calculatePeriod = (
  timeframe: Timeframe,
  startDate: Date | null,
  endDate: Date | null
): number => {
  switch (timeframe) {
    case Timeframe.Daily:
      return getDaysBetweenDates(startDate, endDate);
    case Timeframe.Weekly:
      return getWeeksBetweenDates(startDate, endDate);
    case Timeframe.Monthly:
      return getMonthsBetweenDates(startDate, endDate);
  }
};

export const formatDateString = (date: Date): string => {
  return new Date(date).toLocaleDateString('nl-NL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const highlightFrequency = (sentence: string) => {
  const keywords = ['dagelijks', 'wekelijks', 'maandelijks'];
  const words = sentence.split(' ');

  let modifiedWords: React.ReactNode[] = [];
  let shouldBoldNext = false;

  words.forEach((word, index) => {
    if (shouldBoldNext) {
      modifiedWords.push(
        <Text key={index} style={styles.boldText}>
          {word + ' '}
        </Text>
      );
      shouldBoldNext = false;
    } else if (keywords.some((keyword) => word.startsWith(keyword))) {
      modifiedWords.push(
        <Text key={index} style={styles.boldText}>
          {word + ' '}
        </Text>
      );
      shouldBoldNext = true;
    } else {
      modifiedWords.push(<Text key={index}>{word + ' '}</Text>);
    }
  });

  return modifiedWords;
};

const styles = StyleSheet.create({
  boldText: {
    ...Fonts.sofiaProSemiBold[Platform.OS],
  } as TextStyle,
});
