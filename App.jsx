/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect, useLayoutEffect} from 'react';
import {Platform, StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {COLORS} from '~/assets';
import {HeaderBar} from '~/components';
import {useAuthStore} from '~/hooks/stores/useAuthStore';
import {
  ChangePassScreen,
  DetailHistoryScreen,
  ForgotPassScreen,
  HistoryScreen,
  LoginScreen,
  OTPScreen,
  PingFrequencyScreen,
  SignUpScreen,
} from '~/screens';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ModalContain from '~/components/ModalContain';
import Dialog from '~/components/Dialog';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

function App() {
  const {startToken} = useAuthStore();

  useEffect(() => {
    startToken();
  }, [startToken]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <SafeAreaView
            style={{flex: 1, backgroundColor: COLORS.black}}
            edges={['top']}>
            <NavigationContainer>
              <QueryClientProvider client={queryClient}>
                <FlashMessage
                  position={
                    Platform.OS === 'ios'
                      ? 'top'
                      : {top: StatusBar.currentHeight, left: 0, right: 0}
                  }
                  floating={Platform.OS !== 'ios'}
                />
                <Navigator />
                <Dialog />
              </QueryClientProvider>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const Navigator = () => {
  const {token} = useAuthStore();
  const {reset} = useNavigation();

  useEffect(() => {
    if (!token) {
      queryClient.clear();
      reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }, [token]);

  return (
    <Stack.Navigator
      initialRouteName={token ? 'PingFrequency' : 'Login'}
      screenOptions={{
        headerShown: true,
        header: props => <HeaderBar {...props} />,
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: 'Login',
          desc: 'Welcome back, Rohit thakur',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTitle: 'Sign up',
          desc: 'Create your account',
        }}
      />
      <Stack.Screen
        name="ForgotPass"
        component={ForgotPassScreen}
        options={{
          headerTitle: 'Forgot password',
          desc: 'Reset your password',
        }}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{
          headerTitle: 'Enter OTP',
          desc: 'Enter the OTP to reset your password',
        }}
      />
      <Stack.Screen
        name="ChangePass"
        component={ChangePassScreen}
        options={{
          headerTitle: 'Change password',
          desc: 'Change your password',
        }}
      />
      <Stack.Screen
        name="PingFrequency"
        component={PingFrequencyScreen}
        options={{
          headerTitle: 'Ping frequency',
          desc: 'Set the frequency of ping',
        }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerTitle: 'History',
          desc: 'View your history',
        }}
      />
      <Stack.Screen
        name="DetailHistory"
        component={DetailHistoryScreen}
        options={{
          headerTitle: 'Detail history',
          desc: 'View your detail history',
        }}
      />
    </Stack.Navigator>
  );
};

export default App;
