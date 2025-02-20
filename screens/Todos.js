import { useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, MD3LightTheme, Text, TextInput } from "react-native-paper";
import { TodoList } from '../components/TodoList';
import { addTodo, removeAllTodos } from "../firebase/Firestorecontroller";
import { UserTodosContext } from "../contexts/UserTodosContext";

export default function Todos() {

    const [todo, setTodo] = useState('');
    const todos = useContext(UserTodosContext);
  
    function removeAllAlert(){
      Alert.alert('Todolist', 'Remove all todo item?', [
        {text: 'Cancel'},
        {text:'OK', onPress: removeAllTodos}
      ])
    }

    return (
        <View style={styles.container}>
            <Text variant='headlineMedium'>Todolist ({todos ? todos.length : 0})</Text>
            <TextInput
                label={'New todo'}
                value={todo}
                onChangeText={setTodo}
                right={
                    <TextInput.Icon
                        icon={'plus-circle'}
                        onPress={() => addTodo(todo)}
                        size={32}
                        color={MD3LightTheme.colors.primary}
                    />
                }
            />
            <TodoList todos={todos} />
            <Button mode='contained' onPress={removeAllAlert}>Remove all</Button>
        </View>
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