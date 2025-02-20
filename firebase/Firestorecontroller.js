import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db, TODOS_REF, USERS_REF } from "./config";

/**
 * Hook for listening the changes in Firestore todos collections
 * If changes, the whole colleciton is set to state ==> rerendering the calling component
 */
// export function useFireTodos(){
//     const [todos, setTodos] = useState([]);

//     useEffect(()=>{
//         const q = query(collection(db, TODOS_REF), orderBy('todoText'));

//         onSnapshot(q, querySnaphot => {
//             setTodos( querySnaphot.docs.map(doc => {
//                 return { id: doc.id, ...doc.data() }
//             }));
//         } );
//     }, []);

//     return todos;
// }

/**
 * Adding new todo into the Firestore colletion (initiates onsnapshot call)
 */
export function addTodo(todoText){
    const subColRef = collection(db, USERS_REF, auth.currentUser.uid, TODOS_REF);
    addDoc( subColRef, {done: false, todoText } )
        .catch(error => console.log(error.message));
}

/**
 * Removing single todo item from Firestore by id
 */
export function removeTodo(id){
    const subColRef = collection(db, USERS_REF, auth.currentUser.uid, TODOS_REF);
    deleteDoc(doc(subColRef, id))
        .catch(error => console.log(error.message));
}

/**
 * Removes all the todo items from Firestore
 */
export function removeAllTodos(){
    const subColRef = collection(db, USERS_REF, auth.currentUser.uid, TODOS_REF);
    getDocs( subColRef )
        .then( docs => docs.forEach(doc => removeTodo(doc.id)))
        .catch(error => console.log(error.message));
}

/**
 * Updates single todo with id and new data
 */
export function updateTodo(id, data){
    const subColRef = collection(db, USERS_REF, auth.currentUser.uid, TODOS_REF);
    updateDoc(doc(subColRef, id), data)
        .catch( error => console.log(error.message));
}