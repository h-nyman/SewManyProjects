import { IonList, IonItem, IonInput, IonButton, IonCheckbox, IonLabel } from "@ionic/react";
import { Todo } from "../pages/Home";
import { arrayUnion, DocumentReference, updateDoc } from "firebase/firestore";

interface Props {
    todos: Todo[]
    projectRef: DocumentReference
}

const TodoView = ({ todos, projectRef }: Props) => {
    const addTodo = () => {
        const newTodo: Todo = {
            text:"hej",
            id: window.crypto.randomUUID(),
            check: false
        }

        updateDoc(projectRef, {
            todos: arrayUnion(newTodo)
        })
    }
    const toggleComplete = (id) => {
        updateDoc(projectRef, {
            "todos[0]check": true
        })
      };

    return (
        <IonList>
          {todos.map((todo) => (
            <IonItem key={todo.id}>
              <IonCheckbox
                slot="start"
                checked={todo.check}
                onIonChange={() => toggleComplete(todo.id)}
              />
                <IonInput value={todo.text} aria-label="todo"></IonInput>
            </IonItem>)
            )}
            <IonButton onClick={addTodo}>Add</IonButton>
        </IonList>
    )
}

export default TodoView;