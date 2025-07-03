import { Exercise, ExerciseCategory } from '../types';

export const categories = [
  {
    title: 'Bekijk alle oefeningen',
    description: 'Kies een oefening waarmee jij aan de slag wilt.',
  },
  {
    title: 'Voelen',
    description:
      'In deze oefeningen sta je stil bij je lichaam. Je voelt bijvoorbeeld waar spanning zit of wat er gebeurt als je rustig zit of ligt. Je wordt je bewuster van jezelf.',
  },
  {
    title: 'Bewegen',
    description:
      'Hier doe je rustige bewegingen met aandacht. Je beweegt bewust en langzaam, zoals bij wandelen of stretchen. Zo leer je beter luisteren naar je lichaam.',
  },
  {
    title: 'Ademen',
    description:
      ' Bij deze oefeningen let je op je adem. Je merkt hoe je adem in en uit je lichaam stroomt. Dit helpt om rustiger te worden in je hoofd én in je lichaam.',
  },
];

export const categoryExercises = new Map<ExerciseCategory, Exercise[]>([
  [
    // Mindfulness
    ExerciseCategory.Mindfulness,
    [
      // Jan's Input Start
      {
        id: '1',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Mindfulness Bodyscan',
        description: 'Bodyscan meditatie oefening',
        duration: '40 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/705236692&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/bodyscan-1" title="Mindfulness Bodyscan (Nederlands - 40 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Mindfulness Bodyscan (Nederlands - 40 min)</a></div>',
      },
      {
        id: '2',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Zitten in aandacht',
        description: 'Zitten in aandacht meditatie oefening',
        duration: '17 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/399471789&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/zitten-in-aandacht" title="Zitten in aandacht (17 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Zitten in aandacht (17 min)</a></div>',
      },
      {
        id: '3',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Aandacht voor adem, lichaam en geluiden',
        description:
          'Aandacht voor adem, lichaam en geluiden meditatie oefening',
        duration: '19 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390818730&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/aandacht-voor-lichaam-geluiden" title="Aandacht voor adem, lichaam en geluiden (19 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Aandacht voor adem, lichaam en geluiden (19 min)</a></div>',
      },
      {
        id: '4',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title:
          'Aandacht voor onaangename gevoelens - zitten met een moeilijkheid',
        description:
          'Aandacht voor onaangename gevoelens - zitten met een moeilijkheid meditatie oefening',
        duration: '16 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390816732&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/zitten-met-een-moeilijkheid" title="Aandacht voor onaangename gevoelens - zitten met een moeilijkheid (16 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Aandacht voor onaangename gevoelens - zitten met een moeilijkheid (16 min)</a></div>',
      },
      {
        id: '5',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Keuzeloze aandacht',
        description: 'Keuzeloze aandacht meditatie oefening',
        duration: '12 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390816255&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/keuzeloze-aandacht" title="Keuzeloze aandacht (12 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Keuzeloze aandacht (12 min)</a></div>',
      },
      {
        id: '6',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Bergmeditatie',
        description: 'Berrmeditatie oefening',
        duration: '19 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390808308&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/bergmeditatie" title="Bergmeditatie (19 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Bergmeditatie (19 min)</a></div>',
      },
      {
        id: '7',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Lichaamsbewustzijn - Bekken, borst en onderrug',
        description: 'Lichaamsbewustzijn - Bekken, borst en onderrug',
        duration: '6 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025961&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/bekken-borst-en-onderrug-1" title="Lichaamsbewustzijn - Bekken, borst en onderrug" target="_blank" style="color: #cccccc; text-decoration: none;">Lichaamsbewustzijn - Bekken, borst en onderrug</a></div>',
      },
      {
        id: '8',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Lichaamsbewustzijn - borstgebied en bovenrug',
        description: 'Lichaamsbewustzijn - borstgebied en bovenrug',
        duration: '7 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025958&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/goed-33-2" title="Lichaamsbewustzijn - borstgebied en bovenrug" target="_blank" style="color: #cccccc; text-decoration: none;">Lichaamsbewustzijn - borstgebied en bovenrug</a></div>',
      },
      {
        id: '9',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Lichaamsbewustzijn - voeten en benen',
        description: 'Lichaamsbewustzijn - voeten en benen',
        duration: '10 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025967&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/mi-week-3-dag-1-3" title="Lichaamsbewustzijn - voeten en benen" target="_blank" style="color: #cccccc; text-decoration: none;">Lichaamsbewustzijn - voeten en benen</a></div>',
      },
      {
        id: '10',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Lichaamsbewustzijn - schouders en armen',
        description: 'Lichaamsbewustzijn - schouders en armen',
        duration: '6 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025964&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/mindful-insights-34-schouders-en-armen-5" title="Lichaamsbewustzijn - schouders en armen" target="_blank" style="color: #cccccc; text-decoration: none;">Lichaamsbewustzijn - schouders en armen</a></div>',
      },
      {
        id: '11',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Verleggen van de aandacht',
        description: 'Verleggen van de aandacht',
        duration: '7 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025064&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/aandacht-verleggeb-1" title="Verleggen van de aandacht" target="_blank" style="color: #cccccc; text-decoration: none;">Verleggen van de aandacht</a></div>',
      },
      {
        id: '12',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Vasthouden van de aandacht',
        description: 'Vasthouden van de aandacht',
        duration: '9 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025067&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/mi-week-2-dag-1-vasthouden-van-aandacht-2" title="Vasthouden van de aandacht" target="_blank" style="color: #cccccc; text-decoration: none;">Vasthouden van de aandacht</a></div>',
      },
      {
        id: '13',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Alle elementen van de aandacht',
        description: 'Alle elementen van de aandacht',
        duration: '9 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025070&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/mi-week-2-dag-5-alles-gecombineerd-1-3" title="Alle elementen van de aandacht" target="_blank" style="color: #cccccc; text-decoration: none;">Alle elementen van de aandacht</a></div>',
      },
      {
        id: '14',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Vernauwen van de aandacht',
        description: 'Vernauwen van de aandacht',
        duration: '5 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025058&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/mindful-insights-23-12-12-2023-2241-2-1-4" title="Vernauwen van de aandacht" target="_blank" style="color: #cccccc; text-decoration: none;">Vernauwen van de aandacht</a></div>',
      },
      {
        id: '15',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Verwijden van de aandacht',
        description: 'Verwijden van de aandacht',
        duration: '6 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025061&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/verwijden-goed-1-5" title="Verwijden van de aandacht" target="_blank" style="color: #cccccc; text-decoration: none;">Verwijden van de aandacht</a></div>',
      },
      // Jan's Input End
    ],
  ],

  [
    // Lichaamsbeweging
    ExerciseCategory.Lichaamsbeweging,
    [
      {
        id: '16',
        icon: require('../../assets/images/exercises_icons/lichaamsbeweging_wandelen_icon.png'),
        title: 'Bewegen in aandacht',
        description: 'Bewegen in aandacht meditatie oefening',
        duration: '50 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390819900&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/bewegen-in-aandacht" title="Bewegen in aandacht (50 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Bewegen in aandacht (50 min)</a></div>',
      },
      {
        id: '17',
        icon: require('../../assets/images/exercises_icons/lichaamsbeweging_wandelen_icon.png'),
        title: 'Bewegen in aandacht 2',
        description: 'Bewegen in aandacht meditatie oefening',
        duration: '39 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/402388137&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/bewegen-in-aandacht-2" title="Bewegen in aandacht 2 (39 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Bewegen in aandacht 2 (39 min)</a></div>',
      },
    ],
  ],
  [
    // Ademhaling
    ExerciseCategory.Ademhaling,
    [
      {
        id: '20',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'Aandacht voor de adem',
        description: 'Aandacht voor de adem meditatie oefening',
        duration: '14 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390819327&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/aandacht-voor-de-ademhaling" title="Aandacht voor de adem (14 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Aandacht voor de adem (14 min)</a></div>',
      },
      {
        id: '24',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'De ademstroom',
        description:
          'Maak laagdrempelig contact met mindfulness door te verbinden met je ademhaling',
        duration: '6 minuten',
        link: '<iframe width="100%" height="280" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201364&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademstroom-1" title="De ademstroom" target="_blank" style="color: #cccccc; text-decoration: none;">De ademstroom</a></div>',
      },
      {
        id: '25',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: 'De ademhaling en het borstgebied',
        description:
          'Maak laagdrempelig contact met mindfulness door te verbinden met je ademhaling',
        duration: '6 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201380&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademhaling-en-het-borstgebied-2" title="De ademhaling en het borstgebied" target="_blank" style="color: #cccccc; text-decoration: none;">De ademhaling en het borstgebied</a></div>',
      },
      {
        id: '26',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'De ademhaling en het buikgebied',
        description:
          'Maak laagdrempelig contact met mindfulness door te verbinden met je ademhaling',
        duration: '4 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201376&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademhaling-en-het-buikgebied-3" title="De ademhaling en het buikgebied" target="_blank" style="color: #cccccc; text-decoration: none;">De ademhaling en het buikgebied</a></div>',
      },
      {
        id: '27',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'De ademhaling en stilte',
        description:
          'Maak laagdrempelig contact met mindfulness door te verbinden met je ademhaling',
        duration: '5 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201372&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademhaling-en-stilte-4" title="De ademhaling en stilte" target="_blank" style="color: #cccccc; text-decoration: none;">De ademhaling en stilte</a></div>',
      },
      {
        id: '28',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'De ademhaling als geheel',
        description:
          'Maak laagdrempelig contact met mindfulness door te verbinden met je ademhaling',
        duration: '5 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201368&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademhaling-als-geheel-5" title="De ademhaling als geheel" target="_blank" style="color: #cccccc; text-decoration: none;">De ademhaling als geheel</a></div>',
      },
    ],
  ],
]);

export const categoryIcons = [
  require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
  require('../../assets/images/exercises_icons/lichaamsbeweging_wandelen_icon.png'),
  require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
  require('../../assets/images/exercises_categories_icons/meditation_icon.png'),
  require('../../assets/images/exercises_categories_icons/relaxation_icon.png'),
];

export const getExerciseCategory = (category: string) => {
  switch (category) {
    case 'Voelen':
      return ExerciseCategory.Mindfulness;
    case 'Meditatie':
      return ExerciseCategory.Meditatie;
    case 'Ontspanning':
      return ExerciseCategory.Ontspanning;
    case 'Bewegen':
      return ExerciseCategory.Lichaamsbeweging;
    case 'Ademen':
      return ExerciseCategory.Ademhaling;
    default:
      return ExerciseCategory.Mindfulness;
  }
};

export const getExerciseCategoryString = (category: ExerciseCategory) => {
  switch (category) {
    case ExerciseCategory.Mindfulness:
      return 'Voelen';
    case ExerciseCategory.Meditatie:
      return 'Meditatie';
    case ExerciseCategory.Ontspanning:
      return 'Ontspanning';
    case ExerciseCategory.Lichaamsbeweging:
      return 'Bewegen';
    case ExerciseCategory.Ademhaling:
      return 'Ademen';
  }
};

export const getExerciseCategoryIcon = (index: number) => {
  switch (index) {
    case 1:
      return categoryIcons[0];
    case 2:
      return categoryIcons[1];
    case 3:
      return categoryIcons[2];
    case 4:
      return categoryIcons[3];
    case 5:
      return categoryIcons[4];
  }
};
