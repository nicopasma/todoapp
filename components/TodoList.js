import { ScrollView, StyleSheet } from "react-native";
import TodoItem from "./ToDoItem";
import { List, MD3LightTheme } from "react-native-paper";
import { useState } from "react";

export function TodoList({ todos }) {
    const doneTodos = [];
    const undoneTodos = [];

    todos.forEach(t => t.done ? doneTodos.push(t) : undoneTodos.push(t));

    return (
        <ScrollView>
            <List.Accordion style={styles.accordion} titleStyle={styles.accordionTitle} title={`Unchecked (${undoneTodos.length})`} >
                {undoneTodos.map(t => <TodoItem key={t.id} todoItem={t} />)}
            </List.Accordion>
            <List.Accordion style={styles.accordion} titleStyle={styles.accordionTitle} title={`Checked (${doneTodos.length})`} >
                {doneTodos.map(t => <TodoItem key={t.id} todoItem={t} />)}
            </List.Accordion>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    accordion:{
        borderBottomWidth: 1,
        borderColor: MD3LightTheme.colors.primary
    },
    accordionTitle: {
       fontSize: 22
    }
})