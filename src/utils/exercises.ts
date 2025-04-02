import { Exercise, ExerciseCategory } from '../types';

export const categories = [
  {
    title: 'Bekijk alle oefeningen',
    description: 'Kies een oefening waarmee jij aan de slag wilt.',
  },
  {
    title: 'Mindfulness',
    description:
      'Met mindfulness leer je om meer bewust en aanwezig te zijn in het hier en nu. Dit helpt je beter om te gaan met stress en spanningsklachten.',
  },
  {
    title: 'Meditatie',
    description:
      'Meditatie draait om (mentale) stilte. Je laat je geest volledig tot rust komen en probeert uiteindelijk tot een andere staat van bewustzijn te komen door je volledig op het hier en nu te focussen.',
  },
  {
    title: 'Ontspanning',
    description:
      'Door te ontspannen werkt jouw lichaam weer beter na stress. Als je ontspant, adem je rustiger, klopt het hart langzamer en verlaagt de bloeddruk. Dit is goed voor het lichaam.',
  },
  {
    title: 'Lichaamsbeweging',
    description:
      'Voldoende bewegen heeft invloed op het gewicht en zorgt verbetert de motoriek. Ook is het goed voor de ontwikkeling van de hersenen en de mentale gezondheid, onder andere omdat bewegen stressregulatie verbetert.',
  },
  {
    title: 'Ademhaling',
    description:
      'Voldoende bewegen heeft invloed op het gewicht en zorgt verbetert de motoriek. Ook is het goed voor de ontwikkeling van de hersenen en de mentale gezondheid, onder andere omdat bewegen stressregulatie verbetert.',
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
        icon: require('../../assets/images/exercises_icons/mindfulness_bodyscan_icon.png'),
        title: 'Bodyscan',
        description: 'Bodyscan meditatie oefening',
        duration: '40 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/705236692&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/bodyscan-1" title="Mindfulness Bodyscan (Nederlands - 40 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Mindfulness Bodyscan (Nederlands - 40 min)</a></div>',
      },
      {
        id: '2',
        icon: require('../../assets/images/exercises_icons/mindfulness_bodyscan_icon.png'),
        title: 'Zitten in aandacht',
        description: 'Zitten in aandacht meditatie oefening',
        duration: '17 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/399471789&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/zitten-in-aandacht" title="Zitten in aandacht (17 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Zitten in aandacht (17 min)</a></div>',
      },
      {
        id: '3',
        icon: require('../../assets/images/exercises_icons/mindfulness_bodyscan_icon.png'),
        title: 'Aandacht voor adem, lichaam en geluiden',
        description:
          'Aandacht voor adem, lichaam en geluiden meditatie oefening',
        duration: '19 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390818730&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/aandacht-voor-lichaam-geluiden" title="Aandacht voor adem, lichaam en geluiden (19 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Aandacht voor adem, lichaam en geluiden (19 min)</a></div>',
      },
      {
        id: '4',
        icon: require('../../assets/images/exercises_icons/mindfulness_bodyscan_icon.png'),
        title:
          'Aandacht voor onaangename gevoelens - zitten met een moeilijkheid',
        description:
          'Aandacht voor onaangename gevoelens - zitten met een moeilijkheid meditatie oefening',
        duration: '16 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390816732&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/zitten-met-een-moeilijkheid" title="Aandacht voor onaangename gevoelens - zitten met een moeilijkheid (16 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Aandacht voor onaangename gevoelens - zitten met een moeilijkheid (16 min)</a></div>',
      },
      {
        id: '5',
        icon: require('../../assets/images/exercises_icons/mindfulness_bodyscan_icon.png'),
        title: 'Keuzeloze aandacht',
        description: 'Keuzeloze aandacht meditatie oefening',
        duration: '12 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390816255&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/keuzeloze-aandacht" title="Keuzeloze aandacht (12 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Keuzeloze aandacht (12 min)</a></div>',
      },
      {
        id: '6',
        icon: require('../../assets/images/exercises_icons/mindfulness_bodyscan_icon.png'),
        title: 'Bergmeditatie',
        description: 'Berrmeditatie oefening',
        duration: '19 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390808308&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/bergmeditatie" title="Bergmeditatie (19 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Bergmeditatie (19 min)</a></div>',
      },
      // Jan's Input End
      {
        id: '7',
        icon: require('../../assets/images/exercises_icons/mindfulness_vijf_zintuigen_icon.png'),
        title: 'Vijf zintuigen',
        description:
          'Neem de tijd om bewust te worden van wat je via elke zintuig ervaart.',
        duration: '5 minuten',
        link: '',
      },
      {
        id: '8',
        icon: require('../../assets/images/exercises_icons/mindfulness_mindful_journaling_icon.png'),
        title: 'Mindful Journaling',
        description: 'Schrijf je gedachten en gevoelens op zonder oordeel.',
        duration: '10 - 20 minuten',
        link: '',
      },
    ],
  ],
  [
    // Meditatie
    ExerciseCategory.Meditatie,
    [
      {
        id: '9',
        icon: require('../../assets/images/exercises_icons/meditatie_meditatie_icon.png'),
        title: 'Mantra meditatie',
        description:
          'Ga ontspannen zitten, sluit je ogen en herhaal in stilte een woord, zin of geluid.',
        duration: '10 - 20 minuten',
        link: '',
      },
      {
        id: '10',
        icon: require('../../assets/images/exercises_icons/meditatie_meditatie_icon.png'),
        title: 'Yoga Nidra',
        description:
          'Een vorm van yoga die je geestelijk en lichamelijk voorbereidt op meditatie en het verkennen van diepere niveaus van bewustzijn.',
        duration: '20 - 30 minuten',
        link: '',
      },
      {
        id: '11',
        icon: require('../../assets/images/exercises_icons/meditatie_meditatie_icon.png'),
        title: 'Tellen meditatie',
        description:
          'Ga comfortabel zitten en sluit je ogen. Tel bij het inademen in stilte "één" en bij het uitademen "twee".',
        duration: '5 - 15 minuten',
        link: '',
      },
      {
        id: '12',
        icon: require('../../assets/images/exercises_icons/meditatie_meditatie_icon.png'),
        title: 'Visualisatie meditatie',
        description:
          'Sluit je ogen en stel je een vredige plek voor. Gebruik je verbeelding om alle details te visualiseren.',
        duration: '10 - 15 minuten',
        link: '',
      },
      {
        id: '13',
        icon: require('../../assets/images/exercises_icons/meditatie_meditatie_icon.png'),
        title: 'Chakra meditatie',
        description:
          'Ga in een comfortabele positie zitten met je ogen dicht. Visualiseer energiecentra in je lichaam.',
        duration: '15 - 30 minuten',
        link: '',
      },
    ],
  ],
  [
    // Ontspanning
    ExerciseCategory.Ontspanning,
    [
      {
        id: '14',
        icon: require('../../assets/images/exercises_icons/ontspanning_zelfmassage_icon.png'),
        title: 'Zelfmassage',
        description:
          'Ga comfortabel zitten en masseer met je handen zachtjes de plekken waar je spanning voelt.',
        duration: '5 - 10 minuten',
        link: '',
      },
      {
        id: '15',
        icon: require('../../assets/images/exercises_icons/ontspanning_regel_voor_angst_icon.png'),
        title: '"3-3-3"-regel voor angst"',
        description:
          'Wanneer jij je angstig voelt, gebruik de 3-3-3-regel: kijk om je heen, luister aandachtig en beweeg.',
        duration: '2 - 3 minuten',
        link: '',
      },
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
      {
        id: '18',
        icon: require('../../assets/images/exercises_icons/lichaamsbeweging_wandelen_icon.png'),
        title: 'Wandelen',
        description:
          'Wandel in een comfortabel tempo buiten of op een loopband. Concentreer de ademhaling en de sensaties in het lichaam.',
        duration: '20 - 30 minuten',
        link: '',
      },
      {
        id: '19',
        icon: require('../../assets/images/exercises_icons/lichaamsbeweging_yoga_icon.png'),
        title: 'Yoga',
        description:
          'Neem de tijd om via verschillende poses een persoonlijke reis in yoga te maken.',
        duration: '30 - 45 minuten',
        link: '',
      },
    ],
  ],
  [
    // Ademhaling
    ExerciseCategory.Ademhaling,
    [
      {
        id: '20',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: 'Aandacht voor de adem',
        description: 'Aandacht voor de adem meditatie oefening',
        duration: '14 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390819327&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/aandacht-voor-de-ademhaling" title="Aandacht voor de adem (14 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Aandacht voor de adem (14 min)</a></div>',
      },
      {
        id: '21',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: '4-7-8 ademhaling',
        description:
          'Deze techniek combineert ademhalingscontrole met ritmisch tellen om ontspanning en slaapbereidheid te bevorderen.',
        duration: '2 - 3 minuten',
        link: '',
      },
      {
        id: '22',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: 'Box-ademhaling',
        description:
          'Bij box-ademhaling worden de ademhalingen in gelijke delen uitgevoerd: inademen, vasthouden en uitademen.',
        duration: '2 - 3 minuten',
        link: '',
      },
      {
        id: '23',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: 'Sama Vritti',
        description:
          'Bij gelijkmatige ademhaling ligt de nadruk op een evenwichtige in- en uitademing.',
        duration: '2 - 3 minuten',
        link: '',
      },
      {
        id: '24',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: 'De ademstroom',
        description: 'Maak laagdrempelig contact met mindfulness door te verbinden met je ademhaling',
        duration: '6 minuten',
        link: '<iframe width="100%" height="280" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201364&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademstroom-1" title="De ademstroom" target="_blank" style="color: #cccccc; text-decoration: none;">De ademstroom</a></div>'
      },
      {
        id: '25',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: 'De ademhaling en het borstgebied',
        description: 'Maak laagdrempelig contact met mindfulness door te verbinden met je ademhaling',
        duration: '6 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201380&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademhaling-en-het-borstgebied-2" title="De ademhaling en het borstgebied" target="_blank" style="color: #cccccc; text-decoration: none;">De ademhaling en het borstgebied</a></div>'
      },
      {
        id: '26',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: 'De ademhaling en het buikgebied',
        description: 'Maak laagdrempelig contact met mindfulness door te verbinden met je ademhaling',
        duration: '4 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201376&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademhaling-en-het-buikgebied-3" title="De ademhaling en het buikgebied" target="_blank" style="color: #cccccc; text-decoration: none;">De ademhaling en het buikgebied</a></div>'
      },
      {
        id: '27',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: 'De ademhaling en stilte',
        description: 'Maak laagdrempelig contact met mindfulness door te verbinden met je ademhaling',
        duration: '5 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201372&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademhaling-en-stilte-4" title="De ademhaling en stilte" target="_blank" style="color: #cccccc; text-decoration: none;">De ademhaling en stilte</a></div>'
      },
      {
        id: '28',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: 'De ademhaling als geheel',
        description: 'Maak laagdrempelig contact met mindfulness door te verbinden met je ademhaling',
        duration: '5 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201368&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademhaling-als-geheel-5" title="De ademhaling als geheel" target="_blank" style="color: #cccccc; text-decoration: none;">De ademhaling als geheel</a></div>'
      },
    ],
  ],
]);

export const categoryIcons = [
  require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
  require('../../assets/images/exercises_categories_icons/meditation_icon.png'),
  require('../../assets/images/exercises_categories_icons/relaxation_icon.png'),
  require('../../assets/images/exercises_categories_icons/exercise_icon.png'),
  require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
];

export const getExerciseCategory = (category: string) => {
  switch (category) {
    case 'Mindfulness':
      return ExerciseCategory.Mindfulness;
    case 'Meditatie':
      return ExerciseCategory.Meditatie;
    case 'Ontspanning':
      return ExerciseCategory.Ontspanning;
    case 'Lichaamsbeweging':
      return ExerciseCategory.Lichaamsbeweging;
    case 'Ademhaling':
      return ExerciseCategory.Ademhaling;
    default:
      return ExerciseCategory.Mindfulness;
  }
};

export const getExerciseCategoryString = (category: ExerciseCategory) => {
  switch (category) {
    case ExerciseCategory.Mindfulness:
      return 'Mindfulness';
    case ExerciseCategory.Meditatie:
      return 'Meditatie';
    case ExerciseCategory.Ontspanning:
      return 'Ontspanning';
    case ExerciseCategory.Lichaamsbeweging:
      return 'Lichaamsbeweging';
    case ExerciseCategory.Ademhaling:
      return 'Ademhaling';
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
