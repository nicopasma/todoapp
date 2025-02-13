import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";

export default function TodoItem({text, checked, onCheck}){

    const bgColor = checked ? 'red' : 'white';

    return(
        <View style={[styles.itemContent, {backgroundColor: bgColor}]}>
            <Text variant="titleLarge">{text}</Text>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={()=> onCheck(!checked)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemContent:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})