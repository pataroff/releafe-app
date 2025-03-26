interface SliderStep {
  heading: string;
  question: string;
  options: string[];
}

interface TextStep {
  question: string;
  placeholder: string;
}

export const sliderSteps: SliderStep[] = [
  {
    heading: 'Vraag 1. Algeheel gevoel',
    question: 'Hoe zou je je algemene stemming vandaag beschrijven?',
    options: ['Zeer slecht', 'Zeer goed'],
  },
  {
    heading: 'Vraag 2. Angst & zorgen',
    question: 'Hoeveel angst of zorgen heb je vandaag ervaren?',
    options: ['Geen', 'Zeer veel'],
  },
  {
    heading: 'Vraag 3. Stress',
    question: 'Hoe gestrest voelde je je vandaag?',
    options: ['Geen', 'Zeer veel'],
  },
  {
    heading: 'Vraag 4. Energie',
    question: 'Hoe zou je je energieniveau vandaag beoordelen?',
    options: ['Geen', 'Zeer veel'],
  },
  {
    heading: 'Vraag 5. Concentratie',
    question: 'Hoe goed kon je je vandaag concentreren op dingen die je deed?',
    options: ['Zeer slecht', 'Zeer goed'],
  },
  {
    heading: 'Vraag 6. Slaap',
    question: 'Hoe goed heb je geslapen afgelopen nacht?',
    options: ['Zeer slecht', 'Zeer goed'],
  },
];

export const textSteps: TextStep[] = [
  {
    question: 'Heb jij je vandaag ergens zorgen over gemaakt?',
    placeholder:
      'Omschrijf hier je angsten of zorgen en hoe jij je daardoor voelde...',
  },
  {
    question:
      'Heb je ook dingen vermeden?',
    placeholder:
      'Omschrijf hier wat je hebt vermeden, waarom en hoe jij je daardoor voelde...',
  },
  {
    question: 'Wat heeft je vandaag dankbaar, trots of blij gemaakt?',
    placeholder:
      'Schrijf het hier op...',
  },
  {
    question: 'Zijn er nog andere dingen die je graag kwijt zou willen?',
    placeholder: 'Schrijf het hier op...',
  },
];
