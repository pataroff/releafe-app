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
    heading: 'Vraag 1. Algehele gevoel',
    question: 'Hoe zou je je algehele gevoel vandaag beschrijven?',
    options: ['Zeer slecht', 'Zeer goed'],
  },
  {
    heading: 'Vraag 2. Angst & zorgen',
    question: 'Hoeveel angst of zorgen heb je vandaag ervaren?',
    options: ['Geen', 'Zeer veel'],
  },
  {
    heading: 'Vraag 3. Stress',
    question: 'Hoeveel stress heb je vandaag gehad?',
    options: ['Geen', 'Zeer veel'],
  },
  {
    heading: 'Vraag 4. Energie',
    question: 'Hoeveel energie heb je vandaag?',
    options: ['Geen', 'Zeer veel'],
  },
  {
    heading: 'Vraag 5. Concentratie',
    question: 'Hoe goed kon je je vandaag concentreren?',
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
    question: 'Heb je ook dingen vermeden?',
    placeholder:
      'Omschrijf hier wat je hebt vermeden, waarom en hoe jij je daardoor voelde...',
  },
  {
    question: 'Wat heeft je vandaag dankbaar, trots of blij gemaakt?',
    placeholder: 'Schrijf het hier op...',
  },
  {
    question: 'Zijn er nog andere dingen die je graag kwijt zou willen?',
    placeholder: 'Schrijf het hier op...',
  },
];

export const getFormattedDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const serializeRecord = (record: Record<number, number | string>) => {
  return JSON.stringify(record);
};

export const deserializeRecord = (data: {
  [key: string]: number | string;
}): Record<number, number | string> => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [Number(key), value])
  );
};
