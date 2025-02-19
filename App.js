import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { use, useEffect, useState } from 'react';
import { Button, Divider, MD2LightTheme, MD3LightTheme, PaperProvider, Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addTodo, removeAllTodos, useFireTodos } from './firebase/Firestorecontroller';
import TodoItem from './components/ToDoItem';
import { TodoList } from './components/TodoList';
import { logoutUser, signUpUser, useFireAuth } from './firebase/FirebaseAuthController';

export default function App() {

  const [todo, setTodo] = useState('');
  const todos = useFireTodos();
  const user = useFireAuth();

  function removeAllAlert(){
    Alert.alert('Todolist', 'Remove all todo item?', [
      {text: 'Cancel'},
      {text:'OK', onPress: removeAllTodos}
    ])
  }


  return (
    <PaperProvider >
      <SafeAreaView style={styles.container}>
        <Text variant='headlineMedium'>Todolist ({todos ? todos.length : 0 })</Text>
        <TextInput
          label={'New todo'}
          value={todo}
          onChangeText={setTodo}
          right={
            <TextInput.Icon 
              icon={'plus-circle'} 
              onPress={()=>addTodo(todo)} 
              size={32}
              color={MD3LightTheme.colors.primary}
            />
          }
        />
        <TodoList todos={todos}/>
        <Button mode='contained' onPress={removeAllAlert}>Remove all</Button>
      </SafeAreaView>
    </PaperProvider>
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