import { SelectedAchievement } from '../types';

// Types
type AchievementTrigger = 'onAppUsage' | 'onItemUnlocked';

type AchievementContext = {
  unlockedAchievements: string[];
  unlockAchievement: (id: string) => Promise<void>;
  appUsageDates?: string[];
  unlockedItems?: string[];
  // goalsCompleted?: number;
  // itemsPurchased?: number;
  // journalEntries?: string[];
};

export const achievementsLockedIcon = require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Badge nog te verdienen.png');

export const achievementsDataContainer = [
  {
    title: 'Betrokken Ontdekker',
    description:
      'Deze badges verdien je wanneer je Releafe gedurende een bepaald aantal dagen consequent gebruikt.',
    achievements: [
      {
        id: 'betrokken_ontdekker_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (1 ster).png'),
        points: 10,
        description:
          'Verdiend door binnen 7 dagen minstens één keer interactie te hebben met verschillende modules in de app.',
      },
      {
        id: 'betrokken_ontdekker_2',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (2 sterren).png'),
        points: 20,
        description:
          'Verdiend door de app 7 dagen achter elkaar consequent te gebruiken.',
      },
      {
        id: 'betrokken_ontdekker_3',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (3 sterren).png'),
        points: 50,
        description:
          'Verdiend door de app 28 dagen op rij consequent te gebruiken.',
      },
    ],
  },

  {
    title: 'Innerlijke Tuinier',
    description:
      'Deze badges verdien je door een bepaald aantal upgrades voor je bonsaiboom te kopen.',
    achievements: [
      {
        id: 'innerlijke_tuinier_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (1 ster).png'),
        points: 10,
        description:
          'Verdiend bij het voor de eerste keer kopen van een upgrade voor de boom.',
      },
      {
        id: 'innerlijke_tuinier_2',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (2 sterren).png'),
        points: 20,
        description: 'Verdiend door 3 keer upgrades voor de boom te kopen.',
      },
      {
        id: 'innerlijke_tuinier_3',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (3 sterren).png'),
        points: 50,
        description: 'Verdiend door 5 keer upgrades voor de boom te kopen.',
      },
    ],
  },

  {
    title: 'Aandachtige Ontdekker',
    description:
      'Deze badges verdien je door je dagboek gedurende een bepaalde periode consequent bij te houden.',
    achievements: [
      {
        id: 'aandachtige_ontdekker_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (1 ster).png'),
        points: 10,
        description: 'Verdiend door de eerste keer het dagboek in te vullen.',
      },
      {
        id: 'aandachtige_ontdekker_2',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (2 sterren).png'),
        points: 20,
        description:
          'Verdiend door dagboek 7 dagen op rij consequent in te vullen.',
      },
      {
        id: 'aandachtige_ontdekker_3',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (3 sterren).png'),
        points: 50,
        description:
          'Verdiend door dagboek 28 dagen op rij consequent in te vullen.',
      },
    ],
  },

  {
    title: 'Gedreven Onderzoeker',
    description:
      'Deze badge verdien je door jouw welzijnsoverzicht te bekijken zodra de eerste gegevens beschikbaar zijn.',
    achievements: [
      {
        id: 'gedreven_onderzoeker_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Gedreven Onderzoeker.png'),
        points: 20,
        description:
          'Verdiend door het welzijnsoverzicht te bekijken zodra de eerste set gegevens beschikbaar is.',
      },
    ],
  },

  {
    title: 'Doelgerichte Groeier',
    description:
      'Deze badges verdien je door een persoonlijk doel aan te maken en de voortgang hiervan gedurende een bepaalde periode bij te houden.',
    achievements: [
      {
        id: 'doelgerichte_groier_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (1 ster).png'),
        points: 10,
        description: 'Verdiend door een eerste persoonlijk doel aan te maken.',
      },
      {
        id: 'doelgerichte_groier_2',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (2 sterren).png'),
        points: 20,
        description:
          'Verdiend door voor het eerst in het dagboek aan te geven dat je aan een doel hebt gewerkt.',
      },
      {
        id: 'doelgerichte_groier_3',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (3 sterren).png'),
        points: 50,
        description:
          'Verdiend door een volledige eerste week van een doel te behalen (dit kan elk doel zijn; de tijdsperiode maakt niet uit, zolang de gebruiker de vereisten voor een week succesvol volbrengt).',
      },
    ],
  },

  {
    title: 'Zucht Van Opluchting',
    description:
      'Deze badge verdien je door voor het eerst een zorg of gedachte op te slaan in het Zorgenbakje.',
    achievements: [
      {
        id: 'zucht_van_opluchting_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Zucht Van Opluchting.png'),
        points: 20,
        description:
          'Verdiend door voor het eerst een zorg of gedachte op te slaan in het Zorgenbakje.',
      },
    ],
  },

  {
    title: 'De Optimist',
    description:
      'Deze badge verdien je door voor het eerst een gedachte of zorg te herformuleren.',
    achievements: [
      {
        id: 'de_optimist_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_De Optimist.png'),
        points: 20,
        description:
          'Verdiend door voor het eerst een gedachte of zorg te herformuleren.',
      },
    ],
  },

  {
    title: 'Innerlijke Rust',
    description:
      'Deze badge verdien je door voor het eerst een ontspanningsoefening te bekijken of te beluisteren.',
    achievements: [
      {
        id: 'innerlijke_rust_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Rust.png'),
        points: 20,
        description:
          'Verdiend door voor het eerste een ontspanningsoefening afgekeken of afgeluisterd te hebben.',
      },
    ],
  },
];

// Helper functions
function getConsecutiveDays(dates: string[]): number {
  const sortedDates = [...new Set(dates)] // remove duplicates
    .map((d) => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const diffInDays =
      (sortedDates[i].getTime() - sortedDates[i - 1].getTime()) /
      (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else if (diffInDays > 1) {
      currentStreak = 1; // reset streak
    }
  }

  return maxStreak;
}

export const findAchievementById = (id: string): SelectedAchievement | null => {
  for (const group of achievementsDataContainer) {
    const match = group.achievements.find((a) => a.id === id);
    if (match) {
      return {
        id: match.id,
        icon: match.icon,
        points: match.points,
        description: match.description,
        parentTitle: group.title,
      };
    }
  }
  return null;
};

// Logic functions

export const evaluateBetrokkenOntdekker = async (
  context: AchievementContext
) => {
  const { appUsageDates, unlockedAchievements, unlockAchievement } = context;

  const consecutiveDays = getConsecutiveDays(appUsageDates!);

  if (
    consecutiveDays >= 2 &&
    !unlockedAchievements.includes('betrokken_ontdekker_1')
  ) {
    unlockAchievement('betrokken_ontdekker_1');
  }

  if (
    consecutiveDays >= 7 &&
    !unlockedAchievements.includes('betrokken_ontdekker_2')
  ) {
    unlockAchievement('betrokken_ontdekker_2');
  }

  if (
    consecutiveDays >= 28 &&
    !unlockedAchievements.includes('betrokken_ontdekker_3')
  ) {
    unlockAchievement('betrokken_ontdekker_3');
  }
};

export const evaluateInnerlijkeTuinier = async (
  context: AchievementContext
) => {
  const { unlockedAchievements, unlockAchievement, unlockedItems } = context;

  const unlockedItemsCount = unlockedItems?.length ?? 0;

  if (
    unlockedItemsCount >= 1 &&
    !unlockedAchievements.includes('innerlijke_tuinier_1')
  ) {
    unlockAchievement('innerlijke_tuinier_1');
  }

  if (
    unlockedItemsCount >= 3 &&
    !unlockedAchievements.includes('innerlijke_tuinier_2')
  ) {
    unlockAchievement('innerlijke_tuinier_2');
  }

  if (
    unlockedItemsCount >= 5 &&
    !unlockedAchievements.includes('innerlijke_tuinier_3')
  ) {
    unlockAchievement('innerlijke_tuinier_3');
  }
};

export const evaluateAllAchievements = async (
  trigger: AchievementTrigger,
  context: AchievementContext
) => {
  switch (trigger) {
    case 'onAppUsage':
      await evaluateBetrokkenOntdekker(context);
      break;
    case 'onItemUnlocked':
      await evaluateInnerlijkeTuinier(context);
      break;
  }
};
