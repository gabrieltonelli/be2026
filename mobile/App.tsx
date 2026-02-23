import React from 'react';
import "./global.css";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import i18n from './src/i18n';

import WelcomeScreen from './src/screens/WelcomeScreen';
import WizardScreen from './src/screens/WizardScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import RatingScreen from './src/screens/RatingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Wizard" component={WizardScreen} />
            <Stack.Screen name="Contacts" component={ContactsScreen} />
            <Stack.Screen name="Rating" component={RatingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}
