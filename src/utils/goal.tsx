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
    'Bepaal doelen voor het gebruik van de functies in de Releafe app',
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
          'Schrijf je gedachten op in je dagboek. Dit helpt je om jezelfte begrijpen en je emoties te verwerken.',
        endText: 'mijn dagboek invullen.',
        diarySentence: 'Ik heb vandaag mijn dagboek ingevuld',
      },
      {
        category: 'Releafe',
        title: 'Ontspannen',
        description:
          'Ontspanningsoefeningen zijn een makkelijke manier om je concentratie te verbeteren, stress te verminderen en je algehele welzijn te verhogen.',
        endText: 'een ontspannende oefening doen.',
        diarySentence: 'Ik heb vandaag een ontspanningsoefening gedaan.',
      },
      {
        category: 'Releafe',
        title: 'Reframen',
        description:
          'Je gedachten ombuigen (reframen)? Dat helpt je om negatieve patronen te doorbreken. Zo krijg je meer controle over je gedachten en voel je je beter.',
        endText: 'een zorg of gedachte reframen.',
        diarySentence:
          'Ik heb vandaag een zorg of gedachte gereframed.',
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
          'Elke dag een stappendoel stellen om te wandelen, is goed voor je lichaam. Het helpt je om meer te bewegen. Meer bewegen is belangrijk voor je lichaam en je hoofd. Als je regelmatig wandelt, heb je minder stress. Je voelt je vrolijker en hebt meer energie.',
        endText: 'per dag zetten.',
        dropdownText: 'Hoeveel stappen wil je per keer zetten?',
        dropdownOptions: [
          { label: '2.000 stappen', value: '2.000 stappen' },
          { label: '4.000 stappen', value: '4.000 stappen' },
          { label: '6.000 stappen', value: '6.000 stappen' },
          { label: '8.000 stappen', value: '8.000 stappen' },
          { label: '10.000 stappen', value: '10.000 stappen' },
        ],
        diarySentence: 'Ik heb vandaag X gezet.',
      },
      {
        category: 'Bewegen',
        title: 'Actief verplaatsen',
        description:
          'Als je loopt of fietst in plaats van de auto of bus te nemen, beweeg je meer. Dit is goed voor je lichaam. Hierdoor heb je minder stress en kun je beter nadenken.',
        endText: 'lopend of fietsend naar mijn bestemming gaan.',
        diarySentence:
          'Ik ben vandaag lopend of fietsend naar een bestemming gegaan.',
      },
      {
        category: 'Bewegen',
        title: 'Regelmatig bewegen',
        description:
          'Regelmatig bewegen is goed voor je lichaam. En als je lichaam gezond is, voel je je ook beter in je hoofd. Bewegen helpt tegen sombere gevoelens en angst.',
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
          'Intervaltraining helpt goed tegen stress en geeft je meer energie. Ook is het goed voor je hart en verbrand je er veel calorieën mee.',
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
          'Het eten van groenten en fruit geeft je energie en maakt je vrolijker. Eet elke dag minstens 250 gram groenten en 2 stuks fruit. Dat is goed voor je.',
        endText: '250 gram groente en twee stuks fruit eten.',
        diarySentence:
          'Ik heb vandaag 250 gram groenten en 2 stuks fruit gegeten.',
      },
      {
        category: 'Voeding',
        title: 'Minder suikerhoudende dranken',
        description:
          'Drink geen zoete drankjes die suiker bevatten. Dat helpt om je energie beter te houden. Ook ben je dan minder snel boos of verdrietig.',
        endText: 'suikerhoudende dranken per dag drinken',
        dropdownText:
          'Hoeveel suikerhoudende dranken wil je maximaal drinken per dag?',
        dropdownOptions: [
          { label: '0', value: '0' },
          { label: 'niet meer dan 1', value: 'niet meer dan 1' },
          { label: 'niet meer dan 2', value: 'niet meer dan 2' },
          { label: 'niet meer dan 3', value: 'niet meer dan 3' },
        ],
        diarySentence: 'Ik heb vandaag X suikerhoudende dranken gedronken.',
      },
      {
        category: 'Voeding',
        title: 'Volkoren voorkeur',
        description:
          'Volkorenproducten zijn gezond. Er zitten meer goede stoffen en vezels in. Die helpen je bloedsuiker goed te houden en je hersenen beter te werken.',
        endText: 'een volkoren maaltijd eten.',
        diarySentence: 'Ik heb vandaag een volkoren maaltijd gegeten.',
      },
      {
        category: 'Voeding',
        title: 'Noten noodzaak',
        description:
          'Noten zonder zout zijn gezond. Ze hebben goede vetten en eiwitten. Die helpen je hersenen goed te werken en je stemming stabiel te houden.',
        endText: 'een handvol ongezouten noten eten.',
        diarySentence: 'Ik heb vandaag een handvol ongezouten noten gegeten.',
      },
      {
        category: 'Voeding',
        title: 'Minder rood vlees',
        description:
          'Minder rood vlees eten is beter voor je lichaam. Daardoor heb je minder kans op ziektes. En als je lichaam gezond is, voel je je ook beter in je hoofd.',
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
          'Minder alcohol drinken helpt je beter te slapen. Ook voel je je minder angstig en minder somber.',
        endText: 'geen alcohol drinken.',
        diarySentence: 'Ik heb vandaag geen alcohol gedronken.',
      },
      {
        category: 'Alcohol, drugs en cafeïne',
        title: 'Cafeïne controle',
        description:
          'Minder cafeïne gebruiken helpt tegen angst, slaapproblemen en onrust.',
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
        dropdownText: 'Hoeveel sigaretten wil je maximaal roken per dag?',
        dropdownOptions: [
          { label: '0 keer', value: '0 keer' },
          { label: 'niet meer dan 1 keer', value: 'niet meer dan 1x' },
          { label: 'niet meer dan 2 keer', value: 'niet meer dan 2x' },
          { label: 'niet meer dan 3 keer', value: 'niet meer dan 3x' },
          { label: 'niet meer dan 4 keer', value: 'niet meer dan 4x' },
          { label: 'niet meer dan 5 keer', value: 'niet meer dan 5x' },
        ],
        diarySentence: 'Ik heb vandaag X sigaretten gerookt.',
      },
      {
        category: 'Alcohol, drugs en cafeïne',
        title: 'Verminder drugs',
        description:
          "Minder drugs gebruiken is beter voor je. Daardoor heb je minder kans op problemen met je stemming en je hersenen.",
        endText: 'geen drugs gebruiken.',
        diarySentence: 'Ik heb vandaag geen drugs gebruikt.',
      },
      {
        category: 'Alcohol, drugs en cafeïne',
        title: 'Verminder energie dranken',
        description:
          'Drink geen energiedrankjes. Dan ben je minder onrustig en heb je meer rust in je hoofd. Je energie blijft ook beter in balans.',
        endText: 'energiedranken per dag drinken.',
        dropdownText: 'Hoeveel energiedranken wil je maximaal drinken per dag?',
        dropdownOptions: [
          { label: '0 keer', value: '0 keer' },
          { label: 'niet meer dan 1 keer', value: 'niet meer dan 1' },
          { label: 'niet meer dan 2 keer', value: 'niet meer dan 2' },
          { label: 'niet meer dan 3 keer', value: 'niet meer dan 3' },
        ],
        diarySentence: 'Ik heb vandaag X energiedranken gedronken.',
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
          'Regelmatig ademhalingsoefeningen doen, helpt je lichaam beter om te gaan met stress.',
        endText: 'een ademhalingsoefening doen.',
        diarySentence: 'Ik heb vandaag een ademhalingsoefening gedaan.',
      },
      {
        category: 'Ontspanning',
        title: 'Mindfulness routine',
        description:
          'Als je elke dag oefeningen doet om rustig en bewust te zijn (mindful), kun je je beter concentreren. Je hebt minder stress en je voelt je beter.',
        endText: 'een mindfulnessoefening doen.',
        diarySentence: 'Ik heb vandaag een mindfulnessoefening gedaan.',
      },
      {
        category: 'Ontspanning',
        title: 'Mediteren',
        description:
          'Als je regelmatig mediteert, word je rustiger en bewuster. Dat helpt tegen stress en maakt je sterker in moeilijke situaties.',
        endText: 'een meditatieoefening doen.',
        diarySentence: 'Ik heb vandaag een meditatieoefening gedaan.',
      },
      {
        category: 'Ontspanning',
        title: 'Omgaan met stress',
        description:
          'Als je leert hoe je met stress om moet gaan, heb je minder stress. Dat is goed voor je mentale gezondheid.',
        endText: 'een stressmanagementoefening.',
        diarySentence: 'Ik heb vandaag een stressmanagementoefening gedaan.',
      },
      {
        category: 'Ontspanning',
        title: 'Yoga',
        description:
          'Yoga is goed voor je lichaam en geest. Je wordt er soepeler en sterker van. Ook helpt het tegen stress',
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
          'Als je bespreekt wat je meemaakt, helpt dat. Je voelt je minder alleen en je krijgt steun van anderen.',
        endText: 'mijn ervaringen of zorgen met iemand delen.',
        diarySentence:
          'Ik heb vandaag mijn ervaringen of zorgen met iemand gedeeld.',
      },
      {
        category: 'Ervaringen delen',
        title: 'Familie en vrienden betrekken',
        description:
          'Als je je familie en vrienden vertelt over wat je meemaakt, begrijpen ze je beter. Je relaties worden beter en je krijgt meer emotionele steun.',
        endText:
          'mijn persoonlijke proces met een vriend of familie bespreken.',
        diarySentence:
          'Ik heb vandaag mijn persoonlijke proces met een vriend of familielid besproken.',
      },
      {
        category: 'Ervaringen delen',
        title: 'Steun van een groep',
        description:
          'In een groep met mensen die hetzelfde meemaken, krijg je steun. Je voelt je minder alleen en minder buitengesloten.',
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
        category: 'Ondernemen',
        title: 'Sociale contacten onderhouden',
        description:
          'Meer sociale contacten geven je een gevoel van verbondenheid en steun. Dit is belangrijk voor je emotionele gezondheid en helpt tegen eenzaamheid.',
        endText: 'een sociale contact hebben.',
        diarySentence: 'Ik heb vandaag een sociaal contact gehad.',
        
      },
      {
        category: 'Ondernemen',
        title: "Tijd nemen voor hobby's",
        description:
          "Hobby's geven je ontspanning, halen je uit de dagelijkse stress en zorgen voor meer balans in je leven.",
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
        category: 'Ondernemen',
        title: 'Deelnemen aan sociale activiteiten',
        description:
          'Meedoen aan sociale activiteiten helpt je om verbinding te voelen en minder eenzaam te zijn. Het versterkt je sociale vaardigheden en zelfvertrouwen, wat goed is voor je mentale gezondheid.',
        endText: 'een sociale activiteit ondernemen.',
        diarySentence: 'Ik heb vandaag een sociale activiteit ondernomen.',
      },
      {
        category: 'Ondernemen',
        title: 'Vermijding overwinnen',
        description:
          'Uitdagingen aangaan helpt je angsten te overwinnen en minder te vermijden. Dit maakt je zelfverzekerder en geeft je meer controle over je leven.',
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
