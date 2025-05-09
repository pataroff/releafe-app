import { Priority, Category } from '../types';
import { Image } from 'react-native';

type ReframingStep = {
  heading: string | null;
  description: string | null;
  question?: string;
  instruction?: string;
  placeholder?: string;
};

export const reframingSteps: ReframingStep[] = [
  {
    heading: 'Stap 1: Situatieomschrijving',
    description:"",
    placeholder: 'Omschrijf hier jouw zorg...',
  },
  {
    heading: 'Stap 2: Gevoel',
    description:
      'Schrijf op hoe je je voelt door deze gedachte. Dat helpt ons om er goed mee aan de slag te gaan.',
    placeholder: 'Omschrijf hier hoe jij je daarbij voelt...',
  },
  {
    heading: 'Stap 3: Bewijs',
    description: 'Omschrijf hier jouw antwoord op de volgende vraag.',
    question: 'Wat maakt dat je denkt dat deze gedachte klopt?',
    instruction:
      'Noem feiten of dingen die je hebt gezien of meegemaakt. Zo ontdek je of je zorg echt ergens op is gebaseerd.',
    placeholder: 'Omschrijf hier jouw bewijs...',
  },
  {
    heading: 'Stap 4: Tegenbewijs',
    description: 'Omschrijf hier jouw antwoord op de volgende vraag.',
    question: 'Waarom zou deze gedachte misschien niet kloppen?',
    instruction:
      'Denk aan dingen die laten zien dat het misschien anders zit. Dat helpt je om je zorg van meerdere kanten te bekijken.',
    placeholder: 'Omschrijf hier jouw bewijs...',
  },
  {
    heading: 'Stap 5: Advies',
    description: '',
    question: 'Wat zou je zeggen tegen een vriend(in) die dit denkt?',
    instruction:
      'Bedenk welk advies je zou geven. Dat helpt je om ook vriendelijker en realistischer naar je eigen gedachten te kijken.',
    placeholder: 'Omschrijf hier wat jij tegen jouw vriend(in) zou zeggen...',
  },
  {
    heading: 'Stap 5: Advies',
    description: '',
    question: 'Lees dit nog eens goed door:',
  },
  {
    heading: 'Stap 6: Hoe groot is de kans?',
    description: 'Probeer antwoord te geven op de volgende vraag.',
    question:
      'Hoe groot denk je nu dat de kans is dat je negatieve gedachte echt uitkomt?',
    instruction:
      'Gebruik de schuifbalk om dit in te schatten. Dat helpt je om rustiger te kijken naar je gedachte – en om minder bang te zijn voor dingen die misschien niet gebeuren.',
    placeholder: 'En waarom...?',
  },
  {
    heading: 'Stap 7: Andere uitleg',
    description: 'Omschrijf hier jouw antwoord op de volgende vraag.',
    question:
      'Wat is een andere en minder negatieve uitleg voor deze situatie?',
    instruction:
      'Probeer redenen te bedenken die ook kunnen kloppen, maar minder negatief zijn. Dat helpt je om anders naar de situatie te kijken en je rustiger te voelen.',
    placeholder: 'Omschrijf hier jouw alternatieve verklaring...',
  },
  // This is the `ReframingSuccessModal` placeholder index!
  {
    heading: null,
    description: null,
  },
];

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case Priority.None:
      return 'gray';
    case Priority.Low:
      return '#FFD335';
    case Priority.Medium:
      return '#FF8D30';
    case Priority.High:
      return '#F15249';
    default:
      return 'gray';
  }
};

export const getCategory = (category: Category): React.ReactElement => {
  switch (category) {
    case Category.Work:
      return (
        <Image
          style={{
            height: 24,
            width: 24,
          }}
          source={require('../../assets/images/dropdown_icons/dropdown_icon_work.png')}
          resizeMode='contain'
        />
      );
    case Category.Health:
      return (
        <Image
          style={{
            height: 24,
            width: 24,
          }}
          source={require('../../assets/images/dropdown_icons/dropdown_icon_gezin_en_relaties.png')}
          resizeMode='contain'
        />
      );
    case Category.Relationships:
      return (
        <Image
          style={{
            height: 24,
            width: 24,
          }}
          source={require('../../assets/images/dropdown_icons/dropdown_icon_gezin_en_relaties.png')}
          resizeMode='contain'
        />
      );
    case Category.Education:
      return (
        <Image
          style={{
            height: 24,
            width: 24,
          }}
          source={require('../../assets/images/dropdown_icons/dropdown_icon_onderwijs.png')}
          resizeMode='contain'
        />
      );
    case Category.Finance:
      return (
        <Image
          style={{
            height: 24,
            width: 24,
          }}
          source={require('../../assets/images/dropdown_icons/dropdown_icon_financien.png')}
          resizeMode='contain'
        />
      );
    case Category.Other:
      return (
        <Image
          style={{
            height: 24,
            width: 24,
          }}
          source={require('../../assets/images/dropdown_icons/dropdown_icon_overig.png')}
          resizeMode='contain'
        />
      );
    default:
      return (
        <Image
          style={{
            height: 24,
            width: 24,
          }}
          source={require('../../assets/images/dropdown_icons/dropdown_icon_overig.png')}
          resizeMode='contain'
        />
      );
  }
};
