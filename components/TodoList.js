import { ScrollView, StyleSheet } from "react-native";
import TodoItem from "./ToDoItem";
import { List, MD3LightTheme } from "react-native-paper";

export function TodoList({ todos }) {
    const doneTodos = [];
    const undoneTodos = [];

    todos.forEach(t => t.done ? doneTodos.push(t) : undoneTodos.push(t));

    return (
        <ScrollView>
            <AccordionList todos={undoneTodos} title={'Unchecked'}/>
            <AccordionList todos={doneTodos} title={'Checked'}/>
        </ScrollView>
    );
}

/**
 * List that may be collapsed 
 */
function AccordionList({ todos, title }) {
    return (
        <List.Accordion style={styles.accordion} titleStyle={styles.accordionTitle} title={`${title} (${todos.length})`} >
            {todos.map(t => <TodoItem key={t.id} todoItem={t} />)}
        </List.Accordion>
    )
}

const styles = StyleSheet.create({
    accordion: {
        borderBottomWidth: 1,
        borderColor: MD3LightTheme.colors.primary
    },
    accordionTitle: {
        fontSize: 22
    }
})