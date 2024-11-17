import React, { useState, useContext } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Dimensions,
  TextStyle,
  Platform,
  TextInput,
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import '../utils/localeConfig';
import { Calendar } from 'react-native-calendars';

import { GoalCategory, Timeframe } from '../types';
import { GoalContext } from '../context/GoalContext';
import {
  categoryIcons,
  getDescription,
  getGoalCategory,
  getGoalCategoryIcon,
  getGoalCategoryString,
  getTimeframeString,
} from '../utils/goal';
import { Fonts } from '../styles';

import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

const windowWidth = Dimensions.get('window').width;

const categories = [
  [
    'Releafe',
    'Bepaal doelen voor het gebruik van de functies in de Releafe-app',
  ],
  ['Bewegen', 'Stel doelen om actiever bezig te zijn met fysieke beweging'],
  ['Slapen', 'Stel doelen om bewuster om te gaan met je slaapkwaliteit'],
  ['Voeding', 'Stel doelen om je voedingsgewoonten actief te verbeteren'],
  [
    'Alcohol, drugs en cafeïne',
    'Stel doelen om bewust om te gaan met je gebruik van alcohol, drugs en cafeine',
  ],
  [
    'Ontspanning',
    'Stel doelen om regelmatig tijd voor ontspanning in te plannen',
  ],
  [
    'Ervaringen delen',
    'Stel doelen om je ervaringen regelmatig te delen met anderen',
  ],
  [
    'Ondernemen',
    'Stel doelen om actief nieuwe ondernemingskansen te verkennen',
  ],
];

const categoryGoals = new Map<GoalCategory, string[][]>([
  [
    // Releafe.
    GoalCategory.Releafe,
    [
      [
        'Releafe',
        'Reflecteren in dagboek',
        'Het regelmatig bijhouden van het dagboek bevordert zelfinzicht en emotionele verwerking. Dit draagt bij aan betere mentale gezondheid.',
        'mijn dagboek in Releafe invullen.',
      ],
      [
        'Releafe',
        'Ontspannen',
        'Ontspanningsoefeningen helpen bij het verbeteren van concentratie, het verlagen van stress en het verhogen van algemeen welzijn.',
        'een ontspannende oefening doen in Releafe.',
      ],
      [
        'Releafe',
        'Ervaringen delen in de Community',
        'Het delen van je eigen (positieve en minder positieve) ervaringen en het lezen van ervaringen van anderen helpt je te realiseren dat je hier niet alleen in staat en zorgt ervoor dat je de mogelijkheid hebt om te relativeren waardoor je gevoelens dragelijker worden.  ',
        'een persoonlijke ervaring delen in de Community.',
      ],
      [
        'Releafe',
        'Cognitief reframen',
        'Het reframen van een situatie of (negatieve) gedachte kan je helpen om patronen te doorbreken. Hierdoor voel je je gezonder en meer ‘in control’ over je eigen gedachtes.',
        'een zorg van mij Reframen in Releafe.',
      ],
    ],
  ],
  // Bewegen
  [
    GoalCategory.Bewegen,
    [
      [
        'Bewegen',
        'Regelmatig bewegen',
        'Regelmatige lichaamsbeweging verbetert de fysieke gezondheid. Dit heeft direct invloed op het mentale welzijn doordat het symptomen van depressie en angst vermindert.',
        'bewegen.',
      ],
      [
        'Bewegen',
        'Krachttraining',
        'Krachttraining kan helpen bij het verbeteren van het zelfbeeld en hoe je je in je eigen lichaam voelt. Ook maakt het endorfines vrij die je humeur verbeteren.',
        'krachttraining uitvoeren.',
      ],
      [
        'Bewegen',
        'Actief transport',
        'Het gebruik van actief transport zoals wandelen of fietsen kan de dagelijkse fysieke activiteit verhogen en dit vermindert stress en verbetert de mentale helderheid.',
        'op een actieve manier naar een plaats van bestemming.',
      ],
      [
        'Bewegen',
        'Interval training',
        'Intervaltraining kan helpen bij het effectief managen van stress en het verbeteren van de algehele energieniveaus. Daarnaast kan het helpen je hart gezond te houden en calorieën efficiënt te verbranden.',
        'aan intervaltraining doen.',
      ],
      [
        'Bewegen',
        'Stappendoel',
        'Het stellen van een dagelijks stappendoel helpt bij het verhogen van fysieke activiteit. Dit is belangrijk voor zowel je fysieke als mentale gezondheid. Regelmatig wandelen kan stress verminderen, je humeur verbeteren en je algehele energieniveau verhogen.',
        'per dag zetten.',
      ],
    ],
  ],
  // Slapen
  [
    GoalCategory.Slapen,
    [
      [
        'Slapen',
        'Consistente slaaptijden',
        'Het handhaven van een regelmatig slaapschema helpt de interne klok te stabiliseren. Dit leidt tot betere slaapkwaliteit en een verbeterd humeur.',
        'op dezelfde tijd naar bed gaan en opstaan.',
      ],
      [
        'Slapen',
        'Kwaliteit van slaap',
        'Het verbeteren van de slaapkwaliteit door ontspanningsoefeningen kan de algehele gezondheid verbeteren en symptomen van depressie en angst verminderen.',
        'iets ontspannends doen voor het slapen gaan.',
      ],
      [
        'Slapen',
        'Voldoende slaap',
        'Voldoende slaap krijgen is essentieel voor de cognitieve functie en emotionele regulatie.',
        '7 tot 9 uren slapen.',
      ],
      [
        'Slapen',
        'Geen of minder middagdutjes',
        'Beperking van middagdutjes kan nachtelijke slaapkwaliteit verbeteren. Dit is cruciaal voor emotioneel en fysiek herstel.',
        'geen middagdutje doen.',
      ],
    ],
  ],
  // Voeding
  [
    GoalCategory.Voeding,
    [
      [
        'Voeding',
        'Groente en fruit boost',
        'Een dieet rijk aan groenten en fruit kan het energieniveau verhogen en bijdragen aan een beter humeur door de aanvoer van essentiële vitaminen en mineralen. Eet minimaal 250 gram groenten en 2 stuks fruit.',
        '250 gram groente en twee stuks fruit eten.',
      ],
      [
        'Voeding',
        'Volkoren voorkeur',
        'Volkorenproducten bevatten meer voedingsstoffen en vezels. Deze helpen bij het reguleren van de bloedsuikerspiegel en het verbeteren van de hersenfunctie.',
        'een volkoren maaltijd eten.',
      ],
      [
        'Voeding',
        'Noten noodzaak',
        'Ongezouten noten bieden gezonde vetten en eiwitten die bijdragen aan hersengezondheid en stemmingstabilisatie.',
        'een handvol ongezouten noten eten.',
      ],
      [
        'Voeding',
        'Minder rood vlees',
        'Het verminderen van de consumptie van rood vlees kan het risico op fysieke gezondheidsproblemen verlagen, wat indirect bijdraagt aan een beter mentaal welzijn.',
        'geen rood vlees eten.',
      ],
      [
        'Voeding',
        'Minder suikerhoudende dranken',
        'Het vermijden van suikerhoudende dranken helpt bij het stabiliseren van energieniveaus en het voorkomen van stemmingswisselingen.',
        'suikerhoudende dranken drinken.',
      ],
    ],
  ],
  // Alcohol, drugs en cafeïne
  [
    GoalCategory.AlcoholDrugsCafeine,
    [
      [
        'Alcohol, drugs en cafeïne',
        'Alcoholvrije dagen',
        'Het verminderen van alcoholgebruik kan leiden tot betere slaapkwaliteit en verminderde angst en depressie.',
        'geen alcohol drinken.',
      ],
      [
        'Alcohol, drugs en cafeïne',
        'Cafeïne controle',
        'Het beperken van cafeïne helpt bij het verminderen van angst, slaapproblemen en rusteloosheid.',
        'koffie drinken.',
      ],
      [
        'Alcohol, drugs en cafeïne',
        'Stoppen met roken',
        'Stoppen met roken verbetert de fysieke gezondheid. Dit is essentieel voor je mentale welzijn.',
        'sigaret roken.',
      ],
      [
        'Alcohol, drugs en cafeïne',
        'Minder drugs',
        "Verminderen van (recreatief) druggebruik vermindert risico's van stemmingsstoornissen en cognitieve beperkingen.",
        'drugs gebruiken',
      ],
      [
        'Alcohol, drugs en cafeïne',
        'Verminder energie dranken',
        'Vermijden van energiedranken vermindert overstimulatie en bevordert een stabieler energieniveau en mentaal evenwicht.',
        'energiedranken drinken.',
      ],
    ],
  ],
  // Ontspanning
  [
    GoalCategory.Ontspanning,
    [
      [
        'Ontspanning',
        'Mediteren',
        'Regelmatige meditatie bevordert mindfulness. Dit helpt bij het managen van stress en het verbeteren van emotionele veerkracht.',
        'een meditatieoefening doen.',
      ],
      [
        'Ontspanning',
        'Yoga',
        'Yoga ondersteunt zowel fysieke als mentale gezondheid door het verbeteren van flexibiliteit, kracht, en stressverlichting.',
        'een yoga sessie doen.',
      ],
      [
        'Ontspanning',
        'Ademhalingsbeheersing',
        'Regelmatige ademhalingsoefeningen kunnen helpen bij het reguleren van de reactie van het lichaam op stress.',
        'een ademhalingsoefening doen.',
      ],
      [
        'Ontspanning',
        'Stress management',
        'Het toepassen van stressmanagementtechnieken helpt bij het verminderen van algehele stressniveaus en het bevorderen van mentale gezondheid.',
        'een stressmanagementoefening.',
      ],
      [
        'Ontspanning',
        'Mindfulness routine',
        'Het integreren van mindfulness in het dagelijks leven helpt bij het verbeteren van concentratie, het verlagen van stress en het verhogen van algemeen welzijn.',
        'een mindfulnessoefening doen.',
      ],
    ],
  ],
  // Ervaringen
  [
    GoalCategory.ErvaringenDelen,
    [
      [
        'Ervaringen delen',
        'Deel je ervaringen en zorgen',
        'Het delen van ervaringen biedt emotionele ondersteuning en helpt bij het verminderen van het gevoel van isolatie.',
        'mijn ervaringen met iemand delen.',
      ],
      [
        'Ervaringen delen',
        'Groepsondersteuning',
        'Deelnemen aan steungroepen biedt gemeenschappelijke ondersteuning en vermindert gevoelens van eenzaamheid en isolatie.',
        'deelnemen aan een steun- of lotgenoten groep.',
      ],
      [
        'Ervaringen delen',
        'Familie en vrienden betrekken',
        'Het betrekken van naasten bij het persoonlijke proces bevordert openheid en begrip, wat leidt tot betere relaties en emotionele steun.',
        'mijn ervaringen delen met een vriend of familie.',
      ],
    ],
  ],
  // Ondernemen
  [
    GoalCategory.Ondernemen,
    [
      [
        'Ondernemen',
        'Vermijding overwinnen',
        'Het aangaan van uitdagingen helpt je om angsten te confronteren en vermijdingsgedrag te verminderen. Dit leidt tot grotere zelfverzekerdheid en controle over je leven.',
        'een uitdaging aangaan.',
      ],
      [
        'Ondernemen',
        "Tijd nemen voor hobby's",
        "Het onderhouden van hobby's zorgt voor noodzakelijke ontspanning en afleiding van dagelijkse stress. Dit bevordert emotioneel evenwicht.",
        'besteden aan een hobby.',
      ],
      [
        'Ondernemen',
        'Sociale contacten onderhouden',
        'Meer sociale contacten bevorderen het gevoel van verbondenheid en steun. Dit is cruciaal voor je emotionele gezondheid en het verminderen van gevoelens van isolatie.',
        'een sociale interactie hebben.',
      ],
      [
        'Ondernemen',
        'Deelnemen aan sociale activiteiten',
        'Regelmatig deelnemen aan sociale activiteiten bevordert verbinding en verminderen gevoelens van isolatie. Ze helpen bij het opbouwen van sociale vaardigheden en zelfvertrouwen. Dit is essentieel voor mentaal welzijn en emotionele stabiliteit.',
        'een sociale activiteit ondernemen.',
      ],
    ],
  ],
]);

const dropdownData = [
  { label: 'Dagelijks', value: Timeframe.Daily },
  { label: 'Wekelijks', value: Timeframe.Weekly },
  { label: 'Maandelijks', value: Timeframe.Monthly },
];

interface GoalListItemAddModalProps {
  modalAddGoalListItemVisible: boolean;
  setModalAddGoalListItemVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GoalListItemAddModal: React.FC<GoalListItemAddModalProps> = ({
  modalAddGoalListItemVisible,
  setModalAddGoalListItemVisible,
}) => {
  const {
    category,
    title,
    description,
    timeframe,
    targetFrequency,
    startDate,
    endDate,
    setCategory,
    setTitle,
    setDescription,
    setTimeframe,
    setTargetFrequency,
    setStartDate,
    setEndDate,
    createGoalEntry,
    resetGoalEntryFields,
  } = useContext(GoalContext);

  // @TODO Change this to `goalSentence` and add it to the `GoalContext`!
  const [goalEndText, setGoalEndText] = useState<string>('');

  const [goalListItemAddModalIndex, setGoalListItemAddModalIndex] =
    useState<number>(0);
  const [dropdownValue, setDropdownValue] = useState<Timeframe>(
    Timeframe.Daily
  );
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [textInputValue, setTextInputValue] = useState<string>('');
  const [markedDates, setMarkedDates] = useState<{}>({});

  const handleCalendarPeriodSelect = (day: string) => {
    // Helper function to get all dates between two dates
    const getDatesInRange = (start: Date, end: Date) => {
      let dates = [];
      let currentDate = new Date(start);
      while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates.map((date) => date.toISOString().split('T')[0]); // Return date in 'YYYY-MM-DD' format
    };

    if (startDate === null) {
      // Set the start date
      setStartDate(new Date(day));
      setMarkedDates((prevMarkedDates) => ({
        [day]: {
          selected: true,
          startingDay: true,
          color: '#90A38A',
        },
      }));
    } else if (startDate && endDate === null) {
      // Set the end date and color the range between start and end
      const selectedEndDate = new Date(day);
      setEndDate(selectedEndDate);

      const datesInRange = getDatesInRange(startDate, selectedEndDate);

      setMarkedDates((prevMarkedDates) => {
        const rangeMarkedDates = datesInRange.reduce((acc, date, index) => {
          if (index === 0) {
            acc[date] = { selected: true, startingDay: true, color: '#90A38A' };
          } else if (index === datesInRange.length - 1) {
            acc[date] = { selected: true, endingDay: true, color: '#5C6B57' };
          } else {
            acc[date] = { color: '#E5F1E3' }; // Mark all days in the range with green
          }
          return acc;
        }, {});

        return { ...prevMarkedDates, ...rangeMarkedDates };
      });
    } else {
      // Reset if both start and end date are selected (allowing reselection)
      setStartDate(null);
      setEndDate(null);
      setMarkedDates({});
    }
  };

  const validateTextInput = (text: string, max: number) => {
    const min = 1;
    const number = parseInt(text, 10);

    if (!isNaN(number) && number >= min && number <= max) {
      setTextInputValue(text);
      setTargetFrequency(number);
    } else if (text === '') {
      setTextInputValue('');
    }
  };

  const handleCategorySelect = (index: number) => {
    setCategory(getGoalCategory(index));
    setGoalListItemAddModalIndex(goalListItemAddModalIndex + 1);
  };

  const handleGoalSelect = (
    title: string,
    description: string,
    text: string
  ) => {
    setTitle(title);
    setDescription(description);
    setGoalEndText(text);
    setGoalListItemAddModalIndex(goalListItemAddModalIndex + 1);
  };

  const handleBack = () => {
    if (goalListItemAddModalIndex !== 0) {
      setGoalListItemAddModalIndex(goalListItemAddModalIndex - 1);
    }
  };

  const handleFinish = () => {
    createGoalEntry();
    resetGoalEntryFields();
    setMarkedDates({});
    setGoalListItemAddModalIndex(0);
    setModalAddGoalListItemVisible(!modalAddGoalListItemVisible);
  };

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={modalAddGoalListItemVisible}
      onRequestClose={() =>
        setModalAddGoalListItemVisible(!modalAddGoalListItemVisible)
      }
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>
          <View style={styles.headersContainer}>
            {/* Title + Close Button */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={styles.headersTitleText}>Nieuwe doel toevoegen</Text>
              <Pressable
                style={{ position: 'absolute', right: 0 }}
                onPress={() =>
                  setModalAddGoalListItemVisible(!modalAddGoalListItemVisible)
                }
              >
                <Feather name='x-circle' size={24} color='gray' />
              </Pressable>
            </View>

            {/* Instructions */}
            <Text style={[styles.headersDescriptionText, { fontSize: 14 }]}>
              {getDescription(goalListItemAddModalIndex)}
            </Text>

            {/* Selected Goal */}
            {goalListItemAddModalIndex === 2 && (
              <View
                style={{
                  marginTop: 20,
                  rowGap: 10,
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    columnGap: 5,
                  }}
                >
                  <Image
                    style={{ width: 40, height: 40 }}
                    source={getGoalCategoryIcon(category)}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <Text style={styles.h2Text}>
                      {getGoalCategoryString(category)}
                    </Text>
                    <Text style={styles.h3Text}>{title}</Text>
                  </View>
                </View>
                <Text style={styles.bodyText}>{description}</Text>
              </View>
            )}
          </View>

          {/* Main Content Wrapper */}
          <View
            style={{
              flex: 1,
            }}
          >
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              style={styles.goalContainer}
              contentContainerStyle={styles.goalContentContainerStyles}
            >
              {goalListItemAddModalIndex === 0 && (
                <View style={styles.categoriesContainer}>
                  {categories.map((category, index) => (
                    <Pressable
                      key={index}
                      style={styles.categoryComponent}
                      onPress={() => handleCategorySelect(index)}
                    >
                      {/* Icon + Title + Description */}
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          height: '100%',
                          columnGap: 5,
                        }}
                      >
                        <Image
                          style={{ width: 50, height: 50 }}
                          source={categoryIcons[index]}
                        />
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '100%',
                            width: '73%',
                          }}
                        >
                          <Text style={styles.h3Text}>{category[0]}</Text>
                          <Text style={styles.bodyText}>{category[1]}</Text>
                        </View>

                        {/* Chevron Right Icon */}
                        <Entypo
                          name='chevron-right'
                          size={34}
                          color='#5C6B57'
                        />
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
              {goalListItemAddModalIndex === 1 && (
                <View style={styles.goalsContainer}>
                  {/* @ts-ignore */}
                  {categoryGoals.get(category).map((goal, index) => (
                    <Pressable
                      key={index}
                      style={styles.goalComponent}
                      onPress={() =>
                        handleGoalSelect(goal[1], goal[2], goal[3])
                      }
                    >
                      {/* Icon + Category + Title */}
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '100%',
                          columnGap: 5,
                        }}
                      >
                        <Image
                          style={{ width: 40, height: 40 }}
                          source={getGoalCategoryIcon(category)}
                        />
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: '100%',
                          }}
                        >
                          {/* Category */}
                          <Text style={styles.h2Text}>{goal[0]}</Text>
                          {/* Title */}
                          <Text style={styles.h3Text}>{goal[1]}</Text>
                        </View>
                      </View>
                      {/* Description */}
                      <Text style={styles.bodyText}>{goal[2]}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
              {goalListItemAddModalIndex === 2 && (
                <View style={styles.selectionMenusContainer}>
                  {/* Timeframe Menu */}
                  <View style={styles.menuComponent}>
                    <Text style={styles.h2Text}>Mijn doel</Text>
                    <Text style={styles.h3Text}>{title}</Text>
                    <Text style={styles.bodyText}>
                      Binnen welk tijdsbestek wil jij je doel opstellen en
                      evalueren?
                    </Text>

                    {/* Dropdown */}
                    <Dropdown
                      style={styles.dropdown}
                      containerStyle={styles.dropdownContainer}
                      iconColor='black'
                      iconStyle={styles.icon}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      itemContainerStyle={styles.itemContainerStyle}
                      data={dropdownData}
                      labelField='label'
                      valueField='value'
                      placeholder='Kies een tijdsbestek'
                      placeholderStyle={styles.placeholderStyle}
                      value={dropdownValue}
                      onChange={(item) => {
                        setDropdownValue(item.value);
                        setTimeframe(item.value);
                      }}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      renderRightIcon={() => (
                        <Feather
                          name={`${isFocus ? 'chevron-up' : 'chevron-down'}`}
                          size={24}
                        />
                      )}
                    />
                  </View>

                  {/* Target Frequency Menu */}
                  <View style={styles.menuComponent}>
                    <Text style={styles.h2Text}>Mijn doel</Text>
                    <Text style={styles.h3Text}>{title}</Text>
                    <Text style={styles.bodyText}>
                      Hoe vaak wil je je doel behalen binnen het gekozen
                      tijdsbestek?
                    </Text>
                    <Text style={styles.bodyText}>
                      Selecteer een aantal tussen:{'\n'}Wekelijks: 1 - 7 keer.
                      {'\n'}
                      Maandelijks: 1 - 30 keer.
                    </Text>
                    {/* Text Input */}
                    <TextInput
                      value={textInputValue}
                      onChangeText={(text) =>
                        validateTextInput(
                          text,
                          timeframe === Timeframe.Weekly ? 7 : 30
                        )
                      }
                      inputMode='numeric'
                      style={styles.textInputStyle}
                      placeholder='Maak een keuze...'
                    />
                  </View>

                  <View style={styles.menuComponent}>
                    <Text style={[styles.h2Text, { textAlign: 'center' }]}>
                      Start-en einddatum (optioneel)
                    </Text>

                    {/* Calendar */}
                    <Calendar
                      onDayPress={(day) =>
                        handleCalendarPeriodSelect(day.dateString)
                      }
                      markingType={'period'}
                      markedDates={markedDates}
                      renderArrow={(direction) =>
                        direction === 'left' ? (
                          <Feather
                            name='chevron-left'
                            size={24}
                            color='black'
                            style={{ marginLeft: 40 }}
                          />
                        ) : (
                          <Feather
                            name='chevron-right'
                            size={24}
                            color='black'
                            style={{ marginRight: 40 }}
                          />
                        )
                      }
                    />
                    <Pressable
                      onPress={() =>
                        setGoalListItemAddModalIndex(
                          goalListItemAddModalIndex + 1
                        )
                      }
                      style={styles.viewButton}
                    >
                      <Text style={styles.buttonText}>Doel bekijken</Text>
                    </Pressable>
                  </View>
                </View>
              )}
              {goalListItemAddModalIndex === 3 && (
                <View style={styles.selectedGoalContainer}>
                  <View style={styles.selectedGoalComponent}>
                    <View
                      style={{
                        rowGap: 10,
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '100%',
                          columnGap: 5,
                        }}
                      >
                        <Image
                          style={{ width: 40, height: 40 }}
                          source={getGoalCategoryIcon(category)}
                        />
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: '100%',
                          }}
                        >
                          <Text style={styles.h2Text}>
                            {getGoalCategoryString(category)}
                          </Text>
                          <Text style={styles.h3Text}>{title}</Text>
                        </View>
                      </View>
                      <Text style={styles.bodyText}>
                        Ik wil{' '}
                        <Text
                          style={
                            {
                              ...Fonts.poppinsSemiBold[Platform.OS],
                            } as TextStyle
                          }
                        >
                          {getTimeframeString(timeframe)} {targetFrequency}x
                        </Text>{' '}
                        {goalEndText}
                      </Text>

                      <Text style={styles.h3Text}>
                        Startdatum:{' '}
                        <Text style={styles.bodyText}>
                          {startDate?.toLocaleDateString('nl-NL', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </Text>
                      </Text>
                      <Text style={styles.h3Text}>
                        Einddatum:{' '}
                        <Text style={styles.bodyText}>
                          {endDate?.toLocaleDateString('nl-NL', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
            {/* TODO: Is there a way to achieve this layout without a wrapper? */}
            {/* Progress Wrapper */}
            <View
              style={{
                position: 'absolute',
                bottom: 40,
                width: '100%',
                alignSelf: 'center',
                paddingHorizontal: 15,
              }}
            >
              {/* Progress Container */}
              <View style={styles.progressContainer}>
                {/* Buttons Container */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Go Back Button */}
                  <Pressable
                    onPress={() => handleBack()}
                    disabled={goalListItemAddModalIndex == 0 ? true : false}
                    style={
                      goalListItemAddModalIndex == 0
                        ? [styles.backButton, { opacity: 0.4 }]
                        : styles.backButton
                    }
                  >
                    <Text style={styles.buttonText}>Ga terug</Text>
                  </Pressable>
                  {/* Finish Button */}
                  {goalListItemAddModalIndex === 3 && (
                    <Pressable
                      onPress={() => handleFinish()}
                      style={styles.finishButton}
                    >
                      <Text style={styles.buttonText}>
                        Opslaan en afsluiten
                      </Text>
                    </Pressable>
                  )}
                </View>
                {/* Progress Dots Container */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    columnGap: 7,
                  }}
                >
                  {Array.from({ length: 4 }).map((_, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor:
                            index === goalListItemAddModalIndex
                              ? '#829c7a'
                              : '#E4E1E1',
                          borderRadius: 99,
                        }}
                      ></View>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    borderRadius: 15,
    height: '90%',
    width: windowWidth,
    backgroundColor: '#E5F1E3',
    display: 'flex',
    flexDirection: 'column',
  },
  headersContainer: {
    width: '100%',
    padding: 25,
    borderRadius: 15,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headersTitleText: {
    ...Fonts.poppinsBold[Platform.OS],
    fontSize: 20,
  } as TextStyle,
  headersHeadingText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  headersDescriptionText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
    marginTop: 5,
  } as TextStyle,
  goalContainer: {
    flex: 1,
  },
  goalContentContainerStyles: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoriesContainer: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 170,
  },
  categoryComponent: {
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    height: 100,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  goalsContainer: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 170,
  },
  goalComponent: {
    flex: 1,
    rowGap: 10,
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectionMenusContainer: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 170,
  },
  menuComponent: {
    flex: 1,
    rowGap: 10,
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedGoalContainer: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 170,
  },
  selectedGoalComponent: {
    flex: 1,
    rowGap: 10,
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#F6FFF3',
    paddingHorizontal: 15,
    paddingVertical: 15,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  h2Text: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 16,
  } as TextStyle,
  h3Text: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  bodyText: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 13,
  } as TextStyle,
  progressContainer: {
    width: '100%',
    height: 115,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
    // Shadow Test
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    width: 130,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 6,
    backgroundColor: '#a8c1a0',
  },
  finishButton: {
    width: 170,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 6,
    backgroundColor: '#5C6B57',
  },
  buttonText: {
    ...Fonts.poppinsSemiBold[Platform.OS],
    fontSize: 13,
    color: 'white',
  } as TextStyle,
  viewButton: {
    marginTop: 20,
    marginBottom: 10,
    width: 150,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 8,
    backgroundColor: '#5c6b57',
  },
  // @TODO: Move the dropdown and it's styles into a separate component!
  dropdown: {
    height: 45,
    width: '100%',
    backgroundColor: '#EDF8E9',
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 10,
  },
  placeholderStyle: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  selectedTextStyle: {
    ...Fonts.poppinsMedium[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  itemTextStyle: {
    ...Fonts.poppinsRegular[Platform.OS],
    fontSize: 14,
  } as TextStyle,
  dropdownContainer: {
    width: '79%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  itemContainerStyle: {
    borderRadius: 10,
  },
  icon: {
    height: 30,
    width: 30,
  },
  textInputStyle: {
    marginTop: 5,
    backgroundColor: '#f6f7f8',
    padding: 10,
    borderRadius: 10,
  },
});
