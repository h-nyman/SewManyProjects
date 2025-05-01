import { IonTabBar, IonTabButton, IonIcon, IonLabel, useIonRouter } from "@ionic/react";
import { homeOutline, personOutline, addOutline } from "ionicons/icons";
import { auth, db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Project } from "../pages/Home";

interface Props {
    loggedIn: boolean
}

const TabBar = ({ loggedIn }: Props) => {
    const router = useIonRouter();
    const addProjectAndNavigate = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            const userId = user.uid;
            const projectsCollection = collection(db, `users/${userId}/projects`);
      
            const newProjectData: Omit<Project, 'id'> = {
              name: 'New Project',
              status: 'Planning',
              todosMap: {},
              ideas:'',
              materialMap: {}
            };
      
            const docRef = await addDoc(projectsCollection, newProjectData);
            console.log("Document written with ID: ", docRef.id);
            router.push(`/projects/${docRef.id}`)
          } else {
            console.log("No user is currently logged in.");
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
      
    if (!loggedIn) {
        return null
    }

    return (<IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" onClick={addProjectAndNavigate}>
            <IonIcon aria-hidden="true" icon={addOutline} />
            <IonLabel>New Project</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={personOutline} />
            <IonLabel>Profile</IonLabel>
        </IonTabButton>
    </IonTabBar>
    )
}

export default TabBar;