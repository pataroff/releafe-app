import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    TextStyle,
    Platform,
    Modal,
    Dimensions,
} from 'react-native';

import { AuthContext } from '../context/AuthContext';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import { Fonts } from '../styles';
import Feather from '@expo/vector-icons/Feather';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { topLeft } from '@shopify/react-native-skia';
import { useSharedValue } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenWidth } from '@rneui/base';
const windowWidth = Dimensions.get('window').width;

interface BonsaiInformationModalProps {
    modalBonsaiInformationVisible: boolean,
    setModalBonsaiInformationVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const BonsaiInformationModal: React.FC<BonsaiInformationModalProps> = ({
    modalBonsaiInformationVisible,
    setModalBonsaiInformationVisible,
    route,
}) => {
    const { user } = useContext(AuthContext);
    const [informatiegidsIndex, setInformatiegidsIndex] = useState<number>(0);

    const handleNext = () => {
        if (informatiegidsIndex < informatiegidsSteps.length) {
            setInformatiegidsIndex((prev) => ++prev);
        }
    }
    const handlePrevious = () => {
        if (informatiegidsIndex != 0) {
            setInformatiegidsIndex((prev) => --prev);
        }
    }
    const handleWebsitePress = () => {
        console.log("WEBSITE BUTTON PRESSED");
    }
    const informatiegidsSteps = [
        {
            title: 'Releafe',
            description: '',
        },
        {
            title: 'Releafe-Puten',
            description: 'Met de mobiele app kun je op verschillende manieren Releafe-punten verdienen, zoals door een zorg te reframen of een persoonlijk doel te behalen.',
        },
        {
            title: 'Bonsaiboom upgraden',
            description: 'Je kunt jouw bonsaiboom op drie manieren upgraden: door de takken, bladeren of bloesems aan te passen.',
        },
        {
            title: 'Punten en prestaties',
            description: 'Linksonder zie je hoeveel Releafe-punten je momenteel hebt. Klik hierop om upgrades te kopen voor de takken, bladeren en bloesems van jouw bonsaiboom.',
        },
    ]

    return (
        <SafeAreaView>
            <Modal
                animationType='none'
                transparent={true}
                visible={modalBonsaiInformationVisible}
                onRequestClose={() => {
                    setInformatiegidsIndex(0);
                    setModalBonsaiInformationVisible(!modalBonsaiInformationVisible)
                }
                }
            >
                <View style={styles.modalWrapper}>
                    <View style={styles.modalContainer}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            {/*First Page*/}
                            {informatiegidsIndex == 0 && (
                                <>
                                    <Image source={require('../../assets/images/bonsai_tree_information_icon.png')}
                                        style={{ width: 88, height: 62, paddingBottom: 90 }}
                                        resizeMode='contain' />
                                    <View style={{ rowGap: 20 }}>
                                        <Text style={styles.informationTitleIntro}>
                                            Hi {user?.firstName}, welkom bij je bonsaiboom.
                                        </Text>
                                        <Text style={{...styles.informationBody, paddingBottom: 30}}>
                                            Hier kun je jouw persoonlijke bonsaiboom aanpassen en upgraden helemaal naar jouw wensen. Ontdek hier alle mogelijkheden!
                                        </Text>
                                    </View>
                                </>
                            )}
                            {/*Title, Description & Icon for pages past the first*/}
                            {informatiegidsIndex >= 1 && (
                                <>
                                    <View style={
                                        {
                                            display: 'flex',
                                            flexDirection: 'row',
                                            marginBottom: 10,
                                        }
                                    }>
                                        {informatiegidsSteps[informatiegidsIndex].icon && (
                                            <Image style={
                                                {
                                                    objectFit: 'contain',
                                                    paddingRight: 10,
                                                    paddingLeft: 10,
                                                    height: 20,
                                                    width: 20,
                                                    marginRight: 5,
                                                    top: 4,
                                                }
                                            }
                                                source={informatiegidsSteps[informatiegidsIndex].icon}></Image>
                                        )}
                                        <Text style={styles.informationTitle}>
                                            {informatiegidsSteps[informatiegidsIndex].title}
                                        </Text>
                                    </View>
                                    <Text style={{ ...styles.informationBody, marginBottom: 10 }}>
                                        {informatiegidsSteps[informatiegidsIndex].description}
                                    </Text>
                                </>)}
                            {/*Second Page*/}
                            {informatiegidsIndex == 1 && (
                                <>
                                <Text style={{...styles.informationBody, marginBottom: 10}}>Op plekken waar je Releafe-punten kunt verdienen én badges kunt behalen, zie je deze symbolen:</Text>
                                <Image source={require('../../assets/images/information_achievement_points_icon.png')} style={{ objectFit: 'contain', width: 128, height: 36, marginVertical: 10, }}/>
                                </>
                            )}
                            {/*Third Page*/}
                            {informatiegidsIndex == 2 && (
                                <>
                                <Image source = {require('../../assets/images/bonsai_upgrades_information_icons.png')} style={{ objectFit:'contain', width: ScreenWidth - 80, height: 128, paddingVertical: 70, marginBottom: 20}}/>
                                </>
                            )}
                            {/*Fourth Page*/}
                            {informatiegidsIndex == 3 && (
                                <>
                                    <Text style={{ ...styles.informationBody, marginBottom: 10 }}>Rechtsonder vind je jouw prestaties: de badges die je hebt verdiend, bijvoorbeeld door een streak te behalen.</Text>
                                    <Image source={require('../../assets/images/bonsai_points_achievements_information_icons.png')} style={{ objectFit: 'contain', alignSelf: 'center', width: 360, height: 160 }} />
                                </>
                            )}
                        </View>
                        {/*Close out Button*/}
                        <Pressable style={{ position: 'absolute', top: 24, right: 24, }}
                            onPress={() =>
                                setModalBonsaiInformationVisible(!modalBonsaiInformationVisible)
                            }
                        >
                            <Feather name='x-circle' size={24} color='gray' />
                        </Pressable>
                        {/*Navigation controls*/}
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 20,
                            }}
                        >
                            <Pressable
                                onPress={() => handlePrevious()}
                                disabled={informatiegidsIndex == 0 ? true : false}
                                style={informatiegidsIndex == 0 ? { opacity: 0.4 } : {}}
                            >
                                <MaterialCommunityIcons
                                    name='chevron-left-circle-outline'
                                    size={27}
                                    color='black'
                                />
                            </Pressable>

                            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 7 }}>
                                {Array.from({ length: informatiegidsSteps.length}).map((_, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={{
                                                width: 8,
                                                height: 8,
                                                backgroundColor: index === informatiegidsIndex ? '#829c7a' : '#E4E1E1',
                                                borderRadius: 99,
                                            }}
                                        ></View>
                                    );
                                })}
                            </View>
                            <Pressable
                                onPress={() => handleNext()}
                                disabled={informatiegidsIndex == informatiegidsSteps.length - 1? true : false}
                                style={informatiegidsIndex == informatiegidsSteps.length - 1 ? { opacity: 0.4 } : {}}
                            >
                                <MaterialCommunityIcons
                                    name='chevron-right-circle-outline'
                                    size={27}
                                    color='black'
                                />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    headersContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#C1D6BA',
        height: 150,
        width: '100%',
        borderRadius: 30,
        borderTopEndRadius: 0,
        paddingBottom: 20,
    },
    h1Text: {
        ...Fonts.sofiaProBold[Platform.OS],
        fontSize: 20,
        color: 'white',
    } as TextStyle,
    bodyText: {
        ...Fonts.sofiaProRegular[Platform.OS],
        fontSize: 14,
        color: 'white',
    } as TextStyle,
    labelStyle: {
        ...Fonts.sofiaProSemiBold[Platform.OS],
        color: 'black',
        fontSize: 16,
    } as TextStyle,
    informationTitleIntro:
        {
            ...Fonts.sofiaProMedium[Platform.OS],
            color: 'black',
            fontSize: 20,
        } as TextStyle,
    informationTitle:
        {
            ...Fonts.sofiaProSemiBold[Platform.OS],
            color: 'black',
            fontSize: 18,
        } as TextStyle,
    informationBody:
        {
            ...Fonts.sofiaProLight[Platform.OS],
            color: 'black',
            fontSize: 14,
        } as TextStyle,
    informationBodyBold:
        {
            ...Fonts.sofiaProSemiBold[Platform.OS],
            color: 'black',
            fontSize: 14,
        } as TextStyle,
    drawerItem: {
        paddingVertical: 10,
    },
    drawerItemWithBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#00000033',
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContainer: {
        borderRadius: 30,
        width: windowWidth - 2 * 15,
        backgroundColor: 'white',
        padding: 25,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    navigationScreenIcon:
    {
        objectFit: 'contain',
        paddingRight: 10,
        paddingLeft: 10,
        height: 26,
        width: 26,
        marginRight: 25,
        top: 4,
        alignSelf: 'center'
    },
    websiteButton: {
        width: 200,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'black',
        paddingVertical: 6,
        backgroundColor: '#5C6B57',
        marginVertical: 20,
    },
    websiteButtonText: {
        ...Fonts.sofiaProSemiBold[Platform.OS],
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    } as TextStyle,
});