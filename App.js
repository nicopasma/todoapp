import { StyleSheet } from 'react-native';
import { IconButton, PaperProvider } from 'react-native-paper';
import { logoutUser, useFireAuth } from './firebase/FirebaseAuthController';
import Login from './screens/Login';
import Todos from './screens/Todos';
import { UserContext } from './contexts/UserContext';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserTodosContext } from './contexts/UserTodosContext';

const Drawer = createDrawerNavigator();

export default function App() {

  const [user, todos] = useFireAuth();

  return (
    <UserTodosContext.Provider value={todos}>
      <UserContext.Provider value={user}>
        <PaperProvider >
          {user ? <Navigation /> : <Login />}
        </PaperProvider>
      </UserContext.Provider>
    </UserTodosContext.Provider>
  );
}

function Navigation() {
  const user = useContext(UserContext);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerRight: () => <IconButton icon={'logout'} onPress={logoutUser} />,
          headerTitle: user?.email
        }}
      >
        <Drawer.Screen
          name='Todos'
          component={Todos}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    gap: 5
  },
});