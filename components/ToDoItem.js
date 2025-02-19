import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, Chip, IconButton, MD3LightTheme, Text } from "react-native-paper";
import { removeTodo, updateTodo } from "../firebase/Firestorecontroller";

export default function TodoItem({todoItem}){

    const [done, setDone] = useState(todoItem.done);

    function onCheck(){
        updateTodo(todoItem.id, {done: !done})
        setDone(!done);
    }    

    const chipStyle ={
        flex: 1,
        backgroundColor: done ? MD3LightTheme.colors.primaryContainer : MD3LightTheme.colors.onTertiary,
        borderWidth: 2,
        paddingVertical: 2
    }


    return(
        <View style={styles.todoItem}>
            <Checkbox
                status={done ? 'checked' : 'unchecked'}
                onPress={onCheck}
            />
            <Chip style={chipStyle} onPress={onCheck}>{todoItem.todoText}</Chip>
            <IconButton 
                disabled={!done} 
                icon={'trash-can'} 
                iconColor='black'
                onPress={()=> removeTodo(todoItem.id)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
   todoItem:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginVertical: 5
   }
})