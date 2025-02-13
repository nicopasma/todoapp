import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, TODOS_REF } from "./config";

export function useFireTodos(){
    const [todos, setTodos] = useState([]);

    useEffect(()=>{

        const q = query(collection(db, TODOS_REF));

        onSnapshot(q, querySnaphot => {
            setTodos( querySnaphot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            }));
        } );

    }, []);


    return todos;
}