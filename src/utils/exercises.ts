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
 /* {
    title: 'Meditatie',
    description:
      'Meditatie draait om (mentale) stilte. Je laat je geest volledig tot rust komen en probeert uiteindelijk tot een andere staat van bewustzijn te komen door je volledig op het hier en nu te focussen.',
  },*/
 /* {
    title: 'Ontspanning',
    description:
      'Door te ontspannen werkt jouw lichaam weer beter na stress. Als je ontspant, adem je rustiger, klopt het hart langzamer en verlaagt de bloeddruk. Dit is goed voor het lichaam.',
  },*/
  {
    title: 'Bewegen',
    description:
      'Hier doe je rustige bewegingen met aandacht. Je beweegt bewust en langzaam, zoals bij wandelen of stretchen. Zo leer je beter luisteren naar je lichaam.',
  },
  {
    title: 'Adem',
    description:
      'Bij deze oefeningen let je op je adem. Je merkt hoe je adem in en uit je lichaam stroomt. Dit helpt om rustiger te worden in je hoofd én in je lichaam.',
  },
];

export const categoryExercises = new Map<ExerciseCategory, Exercise[]>([
  [
    // Mindfulness
    ExerciseCategory.Voelen,
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
        title:
          'Aandacht voor onaangename gevoelens - zitten met een moeilijkheid',
        description:
          'Aandacht voor onaangename gevoelens - zitten met een moeilijkheid meditatie oefening',
        duration: '16 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390816732&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/zitten-met-een-moeilijkheid" title="Aandacht voor onaangename gevoelens - zitten met een moeilijkheid (16 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Aandacht voor onaangename gevoelens - zitten met een moeilijkheid (16 min)</a></div>',
      },
      {
        id: '4',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Keuzeloze aandacht',
        description: 'Keuzeloze aandacht meditatie oefening',
        duration: '12 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390816255&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/keuzeloze-aandacht" title="Keuzeloze aandacht (12 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Keuzeloze aandacht (12 min)</a></div>',
      },
      {
        id: '5',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Bergmeditatie',
        description: 'Bergmeditatie oefening',
        duration: '19 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390808308&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/bergmeditatie" title="Bergmeditatie (19 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Bergmeditatie (19 min)</a></div>',
      },
      {
      id: '6',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Lichaamsbewustzijn - Bekken, buik en onderrug',
        description: 'Frans je bij een gedeeltelijke body scan. In deze body scan sta je met de aandacht stil bij de bekken, de buik en de onderrug.',
        duration: '6 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025961&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/bekken-borst-en-onderrug-1" title="Lichaamsbewustzijn - Bekken, borst en onderrug" target="_blank" style="color: #cccccc; text-decoration: none;">Lichaamsbewustzijn - Bekken, borst en onderrug</a></div>'
      },
      {
        id: '8',
          icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
          title: 'Lichaamsbewustzijn - borstgebied en bovenrug',
          description: 'Frans begeleidt je bij een gedeeltelijke body scan. In deze body scan sta je met de aandacht stil bij het borstgebied en de bovenrug om zo je lichaamsbewustzijn te vergroten.',
          duration: '7 minuten',
          link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025958&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/goed-33-2" title="Lichaamsbewustzijn - borstgebied en bovenrug" target="_blank" style="color: #cccccc; text-decoration: none;">Lichaamsbewustzijn - borstgebied en bovenrug</a></div>'
      },
      {
        id: '7',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Lichaamsbewustzijn - voeten en benen',
        description: 'Mariëtte begeleidt je bij een gedeeltelijke body scan. In deze body scan sta je met je aandacht stil bij de voeten en benen.',
        duration: '10 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025967&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/mi-week-3-dag-1-3" title="Lichaamsbewustzijn - voeten en benen" target="_blank" style="color: #cccccc; text-decoration: none;">Lichaamsbewustzijn - voeten en benen</a></div>'
      },
      {
        id: '8',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Lichaamsbewustzijn - schouders en armen',
        description: 'Frans begeleidt je bij een gedeeltelijke body scan. In deze body scan sta je met de aandacht stil bij de schouders en armen om zo je lichaamsbewustzijn en ontspanning te vergroten.',
        duration: '6 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025964&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/mindful-insights-34-schouders-en-armen-5" title="Lichaamsbewustzijn - schouders en armen" target="_blank" style="color: #cccccc; text-decoration: none;">Lichaamsbewustzijn - schouders en armen</a></div>'
      },
      {
        id: '9',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Verleggen van de aandacht',
        description: 'Frans begeleidt je bij een meditatie over het verleggen (en vasthouden) van de aandacht.',
        duration: '7 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025064&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/aandacht-verleggeb-1" title="Verleggen van de aandacht" target="_blank" style="color: #cccccc; text-decoration: none;">Verleggen van de aandacht</a></div>',
      },
      {
        id: '10',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Vasthouden van de aandacht',
        description: 'Mariëtte begeleidt je bij een meditatie over de aandacht als geheel.',
        duration: '9 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025067&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/mi-week-2-dag-1-vasthouden-van-aandacht-2" title="Vasthouden van de aandacht" target="_blank" style="color: #cccccc; text-decoration: none;">Vasthouden van de aandacht</a></div>',
      },
      {
        id: '11',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Alle elementen van de aandacht',
        description: 'Arjen begeleidt je bij een meditatie over het vernauwen van de aandacht.',
        duration: '9 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025070&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/mi-week-2-dag-5-alles-gecombineerd-1-3" title="Alle elementen van de aandacht" target="_blank" style="color: #cccccc; text-decoration: none;">Alle elementen van de aandacht</a></div>',
      },
      {
        id: '12',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Vernauwen van de aandacht',
        description: 'Frans begeleidt je bij een meditatie over het verwijden van de aandacht.',
        duration: '5 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025058&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/mindful-insights-23-12-12-2023-2241-2-1-4" title="Vernauwen van de aandacht" target="_blank" style="color: #cccccc; text-decoration: none;">Vernauwen van de aandacht</a></div>',
      },
      {
        id: '13',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Verwijden van de aandacht',
        description: 'Frans begeleidt je bij een meditatie over het verwijden van de aandacht.',
        duration: '6 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2080025061&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/verwijden-goed-1-5" title="Verwijden van de aandacht" target="_blank" style="color: #cccccc; text-decoration: none;">Verwijden van de aandacht</a></div>',
      },
      {
        id: '14',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: '5-4-3-2-1',
        description: 'Frans begeleidt je bij een meditatie die zich richt op de vijf zintuigen. Je staat bij elke zintuig stil met je aandacht. Deze meditatie helpt je om meer in het hier-en-nu te komen en ontspannen de dag te beginnen.',
        duration: '9 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2102258889&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/5-4-3-2-1x-1" title="5-4-3-2-1" target="_blank" style="color: #cccccc; text-decoration: none;">5-4-3-2-1</a></div>',
      },
      {
        id: '15',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'De lift',
        description: 'Hënriette begeleidt je bij een oefening die je laat zakken in het huidige moment. Hierdoor kom je iets meer in het hier-en-nu en ervaar je meer rust.',
        duration: '5 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2102258892&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-lift-2-1-2" title="De-lift-2-_1_" target="_blank" style="color: #cccccc; text-decoration: none;">De-lift-2-_1_</a></div>',
      },
      {
        id: '16',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Geankerd zitten',
        description: 'Hënriette begeleidt je bij een meditatie die zich richt op het geankerd zitten. Geankerd zitten houdt in dat je je plaats krachtig inneemt en stevig in je zitplek rust. Deze meditatie helpt je om meer rust en stabiliteit op te wekken.',
        duration: '7 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2102258901&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/geankerd-zitten-1-3" title="Geankerd-zitten-_1_" target="_blank" style="color: #cccccc; text-decoration: none;">Geankerd-zitten-_1_</a></div>',
      },
      {
        id: '17',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Gronden en intentie',
        description: 'Bree begeleidt je bij een meditatie die je helpt aandacht te hebben voor de ervaring van dit moment en door de intentie die je vormt.',
        duration: '7 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2102258880&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/gronden-en-intentie-1-4" title="Gronden-en-intentie-1" target="_blank" style="color: #cccccc; text-decoration: none;">Gronden-en-intentie-1</a></div>',
      },
      {
        id: '18',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Solide als een berg',
        description: 'Peter begeleidt je bij een meditatie die je helpt meer stevigheid en zekerheid te vinden in een leven met veel verandering en uitdagingen.',
        duration: '7 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2102258904&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/mindful-insights-solide-als-een-berg-2-6" title="Mindful-Insights-Solide-als-een-berg-_2_" target="_blank" style="color: #cccccc; text-decoration: none;">Mindful-Insights-Solide-als-een-berg-_2_</a></div>',
      },
      {
        id: '19',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Ontspanningsmeditatie',
        description: 'Frans begeleidt je bij een ontspanningsmeditatie om zo samen de rust op te zoeken.',
        duration: '7 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2102258883&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/ontspanningsmeditatie-7" title="ontspanningsmeditatie" target="_blank" style="color: #cccccc; text-decoration: none;">ontspanningsmeditatie</a></div>',
      },
      {
        id: '20',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Progressieve spierontspanning',
        description: 'Jen begeleidt je bij een progressieve spierontspanning oefening. Met deze oefening creëer je meer ontspanning in je lichaam en hoofd.',
        duration: '8 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2102258898&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/progressieve-spierontspanning-8" title="Progressieve-spierontspanning" target="_blank" style="color: #cccccc; text-decoration: none;">Progressieve-spierontspanning</a></div>',
      },
      {
        id: '21',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Velden van aandacht',
        description: 'Jen begeleidt je bij een oefening waarmee je steeds op een andere manier met de aandacht aanwezig bent in dit moment.',
        duration: '7 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2102258910&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/velden-van-aandacht-10" title="velden-van-aandacht" target="_blank" style="color: #cccccc; text-decoration: none;">velden-van-aandacht</a></div>',
      },
      {
        id: '22',
        icon: require('../../assets/images/exercises_categories_icons/mindfulness_icon.png'),
        title: 'Wie neemt er waar',
        description: 'Harriëtte begeleidt je bij een meditatie waarbij je opzoek gaat naar de waarnemer.',
        duration: '6 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2102258907&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/wie-neemt-er-waar-1-11" title="Wie-neemt-er-waar-_1_" target="_blank" style="color: #cccccc; text-decoration: none;">Wie-neemt-er-waar-_1_</a></div>',
      },

      // Jan's Input End
     /* {
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
      },*/
    ],
  ],
  [
    // Meditatie
    ExerciseCategory.Meditatie,
    [
     /* {
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
      },*/
    ],
  ],
  [
    // Ontspanning
    ExerciseCategory.Ontspanning,
    [
     /* {
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
      },*/
    ],
  ],
  [
    // Lichaamsbeweging
    ExerciseCategory.Bewegen,
    [
      {
        id: '23',
        icon: require('../../assets/images/exercises_icons/lichaamsbeweging_wandelen_icon.png'),
        title: 'Bewegen in aandacht',
        description: 'Bewegen in aandacht meditatie oefening',
        duration: '50 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390819900&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/bewegen-in-aandacht" title="Bewegen in aandacht (50 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Bewegen in aandacht (50 min)</a></div>',
      },
      {
        id: '24',
        icon: require('../../assets/images/exercises_icons/lichaamsbeweging_wandelen_icon.png'),
        title: 'Bewegen in aandacht 2',
        description: 'Bewegen in aandacht meditatie oefening',
        duration: '39 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/402388137&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/bewegen-in-aandacht-2" title="Bewegen in aandacht 2 (39 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Bewegen in aandacht 2 (39 min)</a></div>',
      },
    /*  {
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
      },*/
    ],
  ],
  [
    // Ademhaling
    ExerciseCategory.Adem,
    [
      {
        id: '25',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'Aandacht voor de adem',
        description: 'Aandacht voor de adem meditatie oefening',
        duration: '14 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390819327&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/aandacht-voor-de-ademhaling" title="Aandacht voor de adem (14 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Aandacht voor de adem (14 min)</a></div>',
      },
      {
        id: '26',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'Aandacht voor adem, lichaam en geluiden',
        description:
          'Aandacht voor adem, lichaam en geluiden meditatie oefening',
        duration: '19 minuten',
        link: '<iframe width="100%" height="100%" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/390818730&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/aandacht-voor-lichaam-geluiden" title="Aandacht voor adem, lichaam en geluiden (19 min)" target="_blank" style="color: #cccccc; text-decoration: none;">Aandacht voor adem, lichaam en geluiden (19 min)</a></div>',
      },
    /*  {
        id: '21',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: '4-7-8 ademhaling',
        description:
          'Deze techniek combineert ademhalingscontrole met ritmisch tellen om ontspanning en slaapbereidheid te bevorderen.',
        duration: '2 - 3 minuten',
        link: '',
      },*/
     /* {
        id: '22',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: 'Box-ademhaling',
        description:
          'Bij box-ademhaling worden de ademhalingen in gelijke delen uitgevoerd: inademen, vasthouden en uitademen.',
        duration: '2 - 3 minuten',
        link: '',
      },*/
     /* {
        id: '23',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: 'Sama Vritti',
        description:
          'Bij gelijkmatige ademhaling ligt de nadruk op een evenwichtige in- en uitademing.',
        duration: '2 - 3 minuten',
        link: '',
      },*/
      {
        id: '27',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'De ademstroom',
        description: 'Hënriette begeleidt je met een meditatie over het observeren en volgen van de luchtroom.',
        duration: '6 minuten',
        link: '<iframe width="100%" height="280" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201364&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademstroom-1" title="De ademstroom" target="_blank" style="color: #cccccc; text-decoration: none;">De ademstroom</a></div>'
      },
      {
        id: '28',
        icon: require('../../assets/images/exercises_icons/ademhaling_ademhaling_icon.png'),
        title: 'De ademhaling en het borstgebied',
        description: 'Frans begeleidt je met een meditatie over het opmerken en volgen van de beweging van het borstgebied tijdens de ademhaling.',
        duration: '6 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201380&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademhaling-en-het-borstgebied-2" title="De ademhaling en het borstgebied" target="_blank" style="color: #cccccc; text-decoration: none;">De ademhaling en het borstgebied</a></div>'
      },
      {
        id: '29',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'De ademhaling en het buikgebied',
        description: 'Arjen begeleidt je met een meditatie over het opmerken en volgen van de beweging van het buikgebied tijdens de ademhaling.',
        duration: '4 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201376&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademhaling-en-het-buikgebied-3" title="De ademhaling en het buikgebied" target="_blank" style="color: #cccccc; text-decoration: none;">De ademhaling en het buikgebied</a></div>'
      },
      {
        id: '30',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'De ademhaling en stilte',
        description: 'Frans begeleidt je met een meditatie over het observeren van de stilte na de inademing en de uitademing.',
        duration: '5 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201372&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademhaling-en-stilte-4" title="De ademhaling en stilte" target="_blank" style="color: #cccccc; text-decoration: none;">De ademhaling en stilte</a></div>'
      },
      {
        id: '31',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'De ademhaling als geheel',
        description: 'Hënriette begeleidt je met een meditatie over de ademhaling als geheel.',
        duration: '5 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2068201368&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/de-ademhaling-als-geheel-5" title="De ademhaling als geheel" target="_blank" style="color: #cccccc; text-decoration: none;">De ademhaling als geheel</a></div>'
      },
      {
        id: '32',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'Het ademende lichaam',
        description: 'Harriëtte begeleidt je bij een meditatie waarbij je aandacht geeft aan je hele ademhalende lichaam. ',
        duration: '8 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2102258886&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/het-ademende-lichaam-5" title="Het-ademende-lichaam" target="_blank" style="color: #cccccc; text-decoration: none;">Het-ademende-lichaam</a></div>'
      },
      {
        id: '33',
        icon: require('../../assets/images/exercises_categories_icons/breathing_icon.png'),
        title: 'Strandmeditatie',
        description: 'Hënriette begeleidt je bij een rustgevende strandmeditatie die zich richt op de ademhaling. Je staat stil bij de beweging van de ademhaling die wordt verbonden aan de beweging van de golven aan het strand. Deze meditatie helpt je om meer in het hier-en-nu te komen en ontspannen door de dag te gaan.',
        duration: '6 minuten',
        link: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2102258895&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-878201022" title="MindfulnessFabriek | CVM | StressWise" target="_blank" style="color: #cccccc; text-decoration: none;">MindfulnessFabriek | CVM | StressWise</a> · <a href="https://soundcloud.com/user-878201022/strandmeditatie-1-9" title="Strandmeditatie-1" target="_blank" style="color: #cccccc; text-decoration: none;">Strandmeditatie-1</a></div>'
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
      return ExerciseCategory.Voelen;
    case 'Meditatie':
      return ExerciseCategory.Meditatie;
    case 'Ontspanning':
      return ExerciseCategory.Ontspanning;
    case 'Bewegen':
      return ExerciseCategory.Bewegen;
    case 'Adem':
      return ExerciseCategory.Adem;
    default:
      return ExerciseCategory.Voelen;
  }
};

export const getExerciseCategoryString = (category: ExerciseCategory) => {
  switch (category) {
    case ExerciseCategory.Voelen:
      return 'Voelen';
    case ExerciseCategory.Meditatie:
      return 'Meditatie';
    case ExerciseCategory.Ontspanning:
      return 'Ontspanning';
    case ExerciseCategory.Bewegen:
      return 'Bewegen';
    case ExerciseCategory.Adem:
      return 'Adem';
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
