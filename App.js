
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ActivityIndicator, Modal, StatusBar, View, } from 'react-native';
import RootStack from './src/navigation/RootStack';
import { navigationRef } from './src/navigation';
import Providers from './src/Providers';
import Colors from './src/constant/Colors';
import { AppContext } from './src/Providers/AppProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationController from './src/Providers/NotificationController';

const queryClient = new QueryClient()


const App = () => {

  return (
    <QueryClientProvider client={queryClient} >
      <Providers>
        <NotificationController/>
        <NavigationContainer ref={navigationRef} >
          <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
          <RootStack />
          <LoadingModal />
        </NavigationContainer>
      </Providers>
    </QueryClientProvider>

  );
};



export default App;



const LoadingModal = () => {
  const { loading } = useContext(AppContext)

  return (
    <Modal
      visible={loading}
      transparent={true}
      hardwareAccelerated
      statusBarTranslucent
      animationType="fade">
      <View style={{ flex: 1, backgroundColor: "#00000080", alignItems: 'center', justifyContent: 'center' }} >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 30 }}>
          <ActivityIndicator color={Colors.green_Color} />
        </View>
      </View>
    </Modal>
  )
}

