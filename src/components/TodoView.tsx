import { IonList, IonItem, IonInput, IonButton, IonCheckbox } from "@ionic/react";
import { Todo } from "../pages/Home";
import { DocumentReference, updateDoc } from "firebase/firestore";

interface Props {
    todosMap: Record<string, Todo>
    projectRef: DocumentReference
}

const TodoView = ({ todosMap, projectRef }: Props) => {
    const addTodo = () => {
        const newTodo: Todo = {
            text: "",
            check: false
        }

        updateDoc(projectRef, {
            [`todosMap.${Object.keys(todosMap).length}`]: newTodo
        })
    }
    const toggleComplete = (id: string) => {
        updateDoc(projectRef, {
            [`todosMap.${id}.check`]: !todosMap[id].check
        })
    };

    const updateTodoText = (id: string, newText: string) => {
        updateDoc(projectRef, {
            [`todosMap.${id}.text`]: newText
        })
    };
    return (
        <IonList>
            {Object.entries(todosMap).map(([id, todo]) => (
                <IonItem key={id}>
                    <IonCheckbox
                        slot="start"
                        checked={todo.check}
                        onIonChange={() => toggleComplete(id)}
                    />
                    <IonInput
                        placeholder="Type here"
                        debounce={1000}
                        value={todo.text}
                        aria-label="todo"
                        onIonInput={(event) => updateTodoText(id, event.detail.value ?? '')}
                    ></IonInput>
                </IonItem>)
            )}
            <IonButton onClick={addTodo}>Add</IonButton>
        </IonList >
    )
}

export default TodoView;