import { ImageSourcePropType } from 'react-native';

// Achievements

export const lockedIcon = require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Badge nog te verdienen.png');
export const achievementIcons: Record<string, ImageSourcePropType> = {
  betrokken_ontdekker_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (1 ster).png'),
  betrokken_ontdekker_2: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (2 sterren).png'),
  betrokken_ontdekker_3: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Betrokken Ontdekker (3 sterren).png'),
  innerlijke_tuinier_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (1 ster).png'),
  innerlijke_tuinier_2: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (2 sterren).png'),
  innerlijke_tuinier_3: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Tuinier (3 sterren).png'),
  aandachtige_ontdekker_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (1 ster).png'),
  aandachtige_ontdekker_2: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (2 sterren).png'),
  aandachtige_ontdekker_3: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Aandachtige Ontdekker (3 sterren).png'),
  gedreven_onderzoeker_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Gedreven Onderzoeker.png'),
  doelgerichte_groier_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (1 ster).png'),
  doelgerichte_groier_2: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (2 sterren).png'),
  doelgerichte_groier_3: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Doelgerichte Groeier (3 sterren).png'),
  zucht_van_opluchting_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Zucht Van Opluchting.png'),
  de_optimist_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_De Optimist.png'),
  innerlijke_rust_1: require('../../assets/images/badges_icons/transparent/Badges-gamification-V3-los-transparant_Innerlijke Rust.png'),
};

// Bonsai Tree

export const performanceBonsaiState = [
  {
    label: 'Takken',
    icon: require('../../assets/images/bonsai_tree_icons/branches_icon.png'),
    key: 'selectedBranchIndex',
  },
  {
    label: 'Bladeren',
    icon: require('../../assets/images/bonsai_tree_icons/leaves_icon.png'),
    key: 'selectedLeafIndex',
  },
  {
    label: 'Bloesems',
    icon: require('../../assets/images/bonsai_tree_icons/blossom_icon.png'),
    key: 'selectedFlowerIndex',
  },
];

export const stateIcons = [
  require('../../assets/images/bonsai_tree_icons/branches_icon.png'),
  require('../../assets/images/bonsai_tree_icons/leaves_icon.png'),
  require('../../assets/images/bonsai_tree_icons/blossom_icon.png'),
];

export const branchesStateIcons = [
  {
    id: 'branches_1',
    image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_1.png'),
  },
  {
    id: 'branches_2',
    image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_2.png'),
  },
  {
    id: 'branches_3',
    image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_3.png'),
  },
  {
    id: 'branches_4',
    image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_4.png'),
  },
  {
    id: 'branches_5',
    image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_5.png'),
  },
];

export const leavesStateIcons = [
  {
    id: 'leaves_1',
    image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_1.png'),
  },
  {
    id: 'leaves_2',
    image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_2.png'),
  },
  {
    id: 'leaves_3',
    image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_3.png'),
  },
  {
    id: 'leaves_4',
    image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_4.png'),
  },
  {
    id: 'leaves_5',
    image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_5.png'),
  },
];

export const flowersStateIcons = [
  {
    id: 'flowers_1',
    image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_1.png'),
  },
  {
    id: 'flowers_2',
    image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_2.png'),
  },
  {
    id: 'flowers_3',
    image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_3.png'),
  },
  {
    id: 'flowers_4',
    image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_4.png'),
  },
  {
    id: 'flowers_5',
    image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_5.png'),
  },
];

export const branchesImages = [
  require('../../assets/images/bonsai_tree_icons/branches/branches_1.png'),
  require('../../assets/images/bonsai_tree_icons/branches/branches_2.png'),
  require('../../assets/images/bonsai_tree_icons/branches/branches_3.png'),
  require('../../assets/images/bonsai_tree_icons/branches/branches_4.png'),
  require('../../assets/images/bonsai_tree_icons/branches/branches_5.png'),
];

export const leavesImages = [
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_1.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_2.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_3.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_4.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_5.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_6.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_7.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_8.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_9.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_10.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_11.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_12.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_13.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_14.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_15.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_16.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_17.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_18.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_19.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_20.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_21.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_22.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_23.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_24.png'),
  require('../../assets/images/bonsai_tree_icons/leaves/leaves_25.png'),
];

export const flowerImages = [
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_1.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_2.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_3.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_4.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_5.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_6.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_7.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_8.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_9.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_10.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_11.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_12.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_13.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_14.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_15.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_16.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_17.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_18.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_19.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_20.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_21.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_22.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_23.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_24.png'),
  require('../../assets/images/bonsai_tree_icons/flowers/flowers_25.png'),
];

export const bonsaiShopCategories = [
  {
    title: 'Takken',
    icons: [
      {
        image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_1.png'),
        price: 180,
        id: 'branches_1',
      },
      {
        image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_2.png'),
        price: 200,
        id: 'branches_2',
      },
      {
        image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_3.png'),
        price: 220,
        id: 'branches_3',
      },
      {
        image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_4.png'),
        price: 240,
        id: 'branches_4',
      },
      {
        image: require('../../assets/images/bonsai_tree_icons/branches_icons/branches_icon_5.png'),
        price: 260,
        id: 'branches_5',
      },
    ],
  },
  {
    title: 'Bladeren',
    icons: [
      {
        image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_1.png'),
        price: 180,
        id: 'leaves_1',
      },
      {
        image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_2.png'),
        price: 200,
        id: 'leaves_2',
      },
      {
        image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_3.png'),
        price: 220,
        id: 'leaves_3',
      },
      {
        image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_4.png'),
        price: 240,
        id: 'leaves_4',
      },
      {
        image: require('../../assets/images/bonsai_tree_icons/leaves_icons/leaves_icon_5.png'),
        price: 260,
        id: 'leaves_5',
      },
    ],
  },
  {
    title: 'Bloesems',
    icons: [
      {
        image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_1.png'),
        price: 180,
        id: 'flowers_1',
      },
      {
        image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_2.png'),
        price: 200,
        id: 'flowers_2',
      },
      {
        image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_3.png'),
        price: 220,
        id: 'flowers_3',
      },
      {
        image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_4.png'),
        price: 240,
        id: 'flowers_4',
      },
      {
        image: require('../../assets/images/bonsai_tree_icons/flowers_icons/flowers_icon_5.png'),
        price: 260,
        id: 'flowers_5',
      },
    ],
  },
];
