import {
  IDiaryEntry,
  IGoalEntry,
  INoteEntry,
  IWorryEntry,
  SelectedAchievement,
} from '../types';

// Types
type AchievementTrigger =
  | 'onAppUsage'
  | 'onItemUnlocked'
  | 'onDiaryCompleted'
  | 'onWellBeingDataAvailable'
  | 'onGoalCreated'
  | 'onGoalCompleted'
  | 'onWorryCreated'
  | 'onReframingCompleted'
  | 'onExerciseCompleted';

type AchievementContext = {
  unlockedAchievements: string[];
  unlockAchievement: (id: string) => Promise<void>;
  appUsageDates?: string[];
  unlockedItems?: string[];
  diaryEntries?: IDiaryEntry[];
  goalEntries?: IGoalEntry[];
  worryEntries?: IWorryEntry[];
  noteEntries?: INoteEntry[];
};

export const achievementsLockedIcon = require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Badge nog te verdienen.png');

export const achievementsDataContainer = [
  {
    title: 'Betrokken Ontdekker',
    description:
      'Deze badges verdien je wanneer je Releafe gedurende een bepaald aantal dagen gebruikt.',
    achievements: [
      {
        id: 'betrokken_ontdekker_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (1 ster).png'),
        points: 10,
        description: 'Je hebt de app 3 dagen achter elkaar gebruikt.',
      },
      {
        id: 'betrokken_ontdekker_2',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (2 sterren).png'),
        points: 20,
        description: 'Je hebt de app 7 dagen achter elkaar gebruikt.',
      },
      {
        id: 'betrokken_ontdekker_3',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (3 sterren).png'),
        points: 50,
        description: 'Je hebt de app 28 dagen achter elkaar gebruikt.',
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
        description: 'Je hebt je bonsaiboom voor het eerst laten groeien.',
      },
      {
        id: 'innerlijke_tuinier_2',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (2 sterren).png'),
        points: 20,
        description: 'Je hebt je bonsaiboom drie keer laten groeien.',
      },
      {
        id: 'innerlijke_tuinier_3',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (3 sterren).png'),
        points: 50,
        description: 'Je hebt je bonsaiboom vijf keer laten groeien.',
      },
    ],
  },

  {
    title: 'Aandachtige Ontdekker',
    description:
      'Deze badges verdien je door je dagboek gedurende een bepaalde periode bij te houden.',
    achievements: [
      {
        id: 'aandachtige_ontdekker_1',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (1 ster).png'),
        points: 10,
        description: 'Je hebt voor het eerst je dagboek ingevuld.',
      },
      {
        id: 'aandachtige_ontdekker_2',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (2 sterren).png'),
        points: 20,
        description: 'Je hebt je dagboek 7 dagen achter elkaar ingevuld.',
      },
      {
        id: 'aandachtige_ontdekker_3',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (3 sterren).png'),
        points: 50,
        description: 'Je hebt je dagboek 28 dagen achter elkaar ingevuld.',
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
        description: 'Je hebt voor het eerst je welzijnsoverzicht bekeken.',
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
        description: 'Je hebt je eerste persoonlijke doel aangemaakt.',
      },
      {
        id: 'doelgerichte_groier_2',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (2 sterren).png'),
        points: 20,
        description: 'Je hebt gewerkt aan een persoonlijk doel.',
      },
      {
        id: 'doelgerichte_groier_3',
        icon: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (3 sterren).png'),
        points: 50,
        description: 'Je hebt een persoonlijk doel van een hele week behaald.',
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
          'Je hebt voor het eerst iets opgeslagen in je Zorgenbakje.',
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
          'Je hebt voor het eerst een gedachte of zorg anders bekeken.',
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
        description: 'Je hebt voor het eerst een ontspanningsoefening gedaan.',
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
    consecutiveDays >= 3 &&
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

export const evaluateAandachtigeOntdekker = async (
  context: AchievementContext
) => {
  const { diaryEntries, unlockedAchievements, unlockAchievement } = context;

  if (!diaryEntries) return;

  const consecutiveDays = getConsecutiveDays(
    diaryEntries.map((entry) => entry.date.toISOString().split('T')[0])
  );

  if (
    diaryEntries.length > 0 &&
    !unlockedAchievements.includes('aandachtige_ontdekker_1')
  ) {
    unlockAchievement('aandachtige_ontdekker_1');
  }

  if (
    consecutiveDays >= 7 &&
    !unlockedAchievements.includes('aandachtige_ontdekker_2')
  ) {
    unlockAchievement('aandachtige_ontdekker_2');
  }

  if (
    consecutiveDays >= 28 &&
    !unlockedAchievements.includes('aandachtige_ontdekker_3')
  ) {
    unlockAchievement('aandachtige_ontdekker_3');
  }
};

export const evaluateGedrevenOnderzoeker = async (
  context: AchievementContext
) => {
  const { diaryEntries, unlockedAchievements, unlockAchievement } = context;

  if (!diaryEntries) return;

  if (
    diaryEntries.length > 0 &&
    !unlockedAchievements.includes('gedreven_onderzoeker_1')
  ) {
    unlockAchievement('gedreven_onderzoeker_1');
  }
};

export const evaluateDoelgerichteGroierOnCreate = async (
  context: AchievementContext
) => {
  const { goalEntries, unlockedAchievements, unlockAchievement } = context;

  if (!goalEntries) return;

  if (
    goalEntries.length > 0 &&
    !unlockedAchievements.includes('doelgerichte_groier_1')
  ) {
    unlockAchievement('doelgerichte_groier_1');
  }
};

export const evaluateDoelgerichteGroierOnComplete = async (
  context: AchievementContext
) => {
  const {
    /* checkedGoalEntries, */ // @TODO: To speed up the iteration process!
    goalEntries,
    unlockedAchievements,
    unlockAchievement,
  } = context;

  if (!goalEntries) return;

  const hasCompletedGoal = goalEntries.some(
    (entry) => entry.completedDates.length > 0
  );

  let hasCompletedFullWeek = false;

  for (const goal of goalEntries) {
    const consecutiveDays = getConsecutiveDays(goal.completedDates);
    if (consecutiveDays >= 7) {
      hasCompletedFullWeek = true;
    }
  }

  if (
    hasCompletedGoal &&
    !unlockedAchievements.includes('doelgerichte_groier_2')
  ) {
    unlockAchievement('doelgerichte_groier_2');
  }

  if (
    hasCompletedFullWeek &&
    !unlockedAchievements.includes('doelgerichte_groier_3')
  ) {
    unlockAchievement('doelgerichte_groier_3');
  }
};

const evaluateZuchtVanOpluchting = async (context: AchievementContext) => {
  const { worryEntries, unlockedAchievements, unlockAchievement } = context;

  if (!worryEntries) return;

  if (
    worryEntries.length > 0 &&
    !unlockedAchievements.includes('zucht_van_opluchting_1')
  ) {
    unlockAchievement('zucht_van_opluchting_1');
  }
};

const evaluateDeOptimist = async (context: AchievementContext) => {
  const { noteEntries, unlockedAchievements, unlockAchievement } = context;

  if (!noteEntries || noteEntries.length <= 0) return;

  const hasReframedEntry = noteEntries.some(
    (entry) => entry.feelingDescription.trim() !== ''
  );

  if (hasReframedEntry && !unlockedAchievements.includes('de_optimist_1')) {
    unlockAchievement('de_optimist_1');
  }
};

const evaluateInnerlijkeRust = async (context: AchievementContext) => {
  const { unlockedAchievements, unlockAchievement } = context;

  if (!unlockedAchievements.includes('innerlijke_rust_1')) {
    unlockAchievement('innerlijke_rust_1');
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
    case 'onDiaryCompleted':
      await evaluateAandachtigeOntdekker(context);
      break;
    case 'onWellBeingDataAvailable':
      await evaluateGedrevenOnderzoeker(context);
      break;
    case 'onGoalCreated':
      await evaluateDoelgerichteGroierOnCreate(context);
      break;
    case 'onGoalCompleted':
      await evaluateDoelgerichteGroierOnComplete(context);
      break;
    case 'onWorryCreated':
      await evaluateZuchtVanOpluchting(context);
      break;
    case 'onReframingCompleted':
      await evaluateDeOptimist(context);
      break;
    case 'onExerciseCompleted':
      await evaluateInnerlijkeRust(context);
      break;
  }
};
