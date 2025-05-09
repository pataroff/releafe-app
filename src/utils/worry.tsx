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
    description:
      "Het resultaat van deze methode is een 'bericht aan jezelf'. Dit bericht zal worden opgeslagen in de lijst met berichten aan jezelf. Deze zorg zal na het reframen automatisch worden verwijderd uit je Zorgenbakje.",
    placeholder: 'Omschrijf hier jouw zorg...',
  },
  {
    heading: 'Stap 2: Gevoelsomschrijving',
    description:
      'Omschrijf hier hoe je je voelt door deze situatie, zodat we er mee aan de slag kunnen.',
    placeholder: 'Omschrijf hier hoe jij je daarbij voelt...',
  },
  {
    heading: 'Stap 3: Bewijs',
    description: 'Omschrijf hier jouw antwoord op de volgende vraag.',
    question: 'Welk bewijs heb ik dat deze gedachte echt waar is?',
    instruction:
      'Noteer feiten en observaties die jouw gedachte ondersteunen. Dit helpt je om na te gaan of er concreet bewijs is dat jouw zorg ondersteunt.',
    placeholder: 'Omschrijf hier jouw bewijs...',
  },
  {
    heading: 'Stap 4: Tegenbewijs',
    description: 'Omschrijf hier jouw antwoord op de volgende vraag.',
    question: 'Welk bewijs heb ik dat deze gedachte niet waar is?',
    instruction:
      'Denk aan tegenvoorbeelden en feiten die jouw gedachte weerleggen. Dit helpt je om een evenwichtiger beeld te krijgen en je gedachten te relativeren.',
    placeholder: 'Omschrijf hier jouw bewijs...',
  },
  {
    heading: 'Stap 5: Advies',
    description: '',
    question: 'Wat zou ik tegen een vriend(in) zeggen die deze gedachte heeft?',
    instruction:
      'Bedenk welk advies of welke troostende woorden je aan een vriend(in) zou geven in dezelfde situatie. Dit perspectief helpt je om milder en realistischer naar je eigen gedachten te kijken.',
    placeholder: 'Omschrijf hier wat jij tegen jouw vriend(in) zou zeggen...',
  },
  {
    heading: 'Stap 5: Advies',
    description: 'Omschrijf hier jouw antwoord op de volgende vraag.',
  },
  {
    heading: 'Stap 6: Inschatting waarschijnlijkheid',
    description: 'Probeer antwoord te geven op de volgende vraag.',
    question:
      'Hoe groot denk je dat de kans nu is dat de  omschreven, negatieve gedachte realiteit wordt?',
    instruction:
      'Gebruik de schuifbalk om aan te geven hoe waarschijnlijk je jouw (negatieve) gedachte nu inschat. Dit helpt je om in te schatten hoe groot de kans echt is dat het gebeurt en om minder bang te zijn voor dingen die misschien niet gebeuren.',
    placeholder: 'En waarom...?',
  },
  {
    heading: 'Stap 7: Alternatieve verklaring',
    description: 'Omschrijf hier jouw antwoord op de volgende vraag.',
    question:
      'Wat is een alternatieve, realistische verklaring die ik bij deze situatie heb?',
    instruction:
      'Zoek naar andere verklaringen of interpretaties van de situatie die realistischer en minder negatief zijn. Dit helpt je om je perspectief te verschuiven naar een meer evenwichtige en constructieve mindset.',
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
