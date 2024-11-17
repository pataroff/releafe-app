import { GoalCategory, Timeframe } from '../types';

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
