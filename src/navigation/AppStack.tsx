import { createDrawerNavigator } from '@react-navigation/drawer';
import { TabNavigator } from './TabNavigator';

import { CustomDrawerContent } from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerPosition: 'right',
        drawerStyle: {
          width: '85%',
          borderTopStartRadius: 30,
          borderBottomStartRadius: 30,
        },
      }}
    >
      <Drawer.Screen
        name='TabNavigator' // @TODO: How should this screen be called?
        component={TabNavigator}
        options={{ drawerItemStyle: { height: 0 } }} // Hide the TabNavigator from the drawer list
      />
    </Drawer.Navigator>
  );
};
export default AppStack;
