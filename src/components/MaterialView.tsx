import { IonList, IonItem, IonInput, IonButton, IonCheckbox } from "@ionic/react";
import { Material } from "../pages/Home";
import { DocumentReference, updateDoc } from "firebase/firestore";

interface Props {
    materialMap: Record<string, Material>
    projectRef: DocumentReference
}

const MaterialView = ({ materialMap, projectRef }: Props) => {
    const addMaterial = () => {
        const newMaterial: Material = {
            text:"",
            check: false
        }

        updateDoc(projectRef, {
            [`materialMap.${Object.keys(materialMap).length}`]: newMaterial
        })
    }
    const toggleComplete = (id:string) => {
        updateDoc(projectRef, {
            [`materialMap.${id}.check`]: !materialMap[id].check
        })
      };

      const updateMaterialText = (id: string, newText: string) => {
        updateDoc(projectRef, {
            [`materialMap.${id}.text`]: newText
        })
    };

    return (
        <IonList>
          {Object.entries(materialMap).map(([id, material]) => (
            <IonItem key={id}>
              <IonCheckbox
                slot="start"
                checked={material.check}
                onIonChange={() => toggleComplete(id)}
              />
                <IonInput 
                placeholder="Type here"
                debounce={1000}
                value={material.text} 
                aria-label="material"
                onIonInput={(event) => updateMaterialText(id, event.detail.value ?? '')}
                ></IonInput>
            </IonItem>)
            )}
            <IonButton onClick={addMaterial}>Add</IonButton>
        </IonList>
    )
}

export default MaterialView;