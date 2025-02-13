import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TodoItem from './components/ToDoItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Button, Divider, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFireTodos } from './firebase/Firestorecontroller';

export default function App() {

  const [items, setItems] = useState();
  const [todo, setTodo] = useState('');
  const todos = useFireTodos();

  useEffect(()=>{
    if(items){
      AsyncStorage.setItem('todos', JSON.stringify(items))
        .catch(error => console.log(error.message));
    } else {
      getItems();
    }
  },[items])

  function getItems(){
    AsyncStorage.getItem('todos')
      .then(json => {
        let itemList = JSON.parse(json);
        setItems(itemList ? itemList : []);
      }) 
      .catch(error => console.log(error.message))
  }

  function addTodo(){
    setItems([...items, {text: todo, checked: false}])
  }

  function todoChecked(item, checked){
    setItems( items.map( i => i.text == item.text ? {...i, checked} : i)  )
  }

  function removeTodos(){
    setItems( items.filter( i => !i.checked) )
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label={'Todo'}
        value={todo}
        onChangeText={setTodo}
        right={<TextInput.Icon icon={'plus-thick'} onPress={addTodo}/>}
      />
      <Button mode='contained' onPress={removeTodos}>Remove selected</Button>
      <FlatList
        data={items}
        renderItem={({item}) => <TodoItem text={item.text} checked={item.checked} onCheck={checked=>todoChecked(item, checked)}/>}
        ItemSeparatorComponent={<Divider bold={true}/>}
      />
    </SafeAreaView>
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