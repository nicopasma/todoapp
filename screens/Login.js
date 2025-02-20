import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser, signUpUser } from "../firebase/FirebaseAuthController";

const buttons = [
    {value: false, label: 'Login'},
    {value: true, label: 'Register'}
]

export default function Login(){
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [nickname, setNickname] = useState('');
    const [register, setRegister] = useState(false);
    const [error, setError] = useState();
    
    async function signAction(){
        if(register){
            let e = await signUpUser(email, pw, nickname);
            setError(e);
        }else{
            let e = await loginUser(email, pw);
            setError(e);
        }
    }

    if(error){
        Alert.alert(error);
        setError(null);
    }

    return(
        <SafeAreaView style={Styles.loginView}>
            <SegmentedButtons
                value={register}
                onValueChange={setRegister}
                buttons={buttons}
            />
            { register &&
                <TextInput
                    value={nickname}
                    onChangeText={setNickname}
                    label={'Nickname'}
                    left={<TextInput.Icon icon={'account'}/>}
                />
            }   
            <TextInput
                value={email}
                onChangeText={setEmail}
                label={'Email'}
                left={<TextInput.Icon icon={'email'}/>}
            />
            <TextInput
                value={pw}
                onChangeText={setPw}
                label={'Password'}
                left={<TextInput.Icon icon={'lock'}/>}
                secureTextEntry={true}
            />
            <Button mode='contained' onPress={signAction}>
               { register ? 'Register' : 'Login'}
            </Button>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    loginView:{
        gap: 10,
        padding: 10
    }
})