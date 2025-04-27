import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Project } from './Home';
import { OverlayEventDetail } from '@ionic/core/components';
import { pencilOutline, settingsSharp } from 'ionicons/icons';

interface Params { id: string };

const ProjectPage: React.FC = () => {
  const { id } = useParams<Params>();
  const userId = auth.currentUser?.uid
  const [project, setProject] = useState<Project>();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      const unsub = onSnapshot(doc(db, 'users', userId, 'projects', id), (doc) => {
        console.log("Current data: ", doc.data());
        setProject({ id: doc.id, ...doc.data() } as unknown as Project);
      });
      return unsub;
    }
  }, [id, userId])

  if (!project) {
    return "Loading..."
  }

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm')
    const projectRef = doc(db, 'users', userId, 'projects', id);
    updateDoc(projectRef, { name: input.current?.value});
    setIsOpen(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{project.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{project.name}</IonTitle>
            <IonList>
              <IonItem>
                <IonSelect aria-label="Status" placeholder="Select status" value={project.status} onIonChange={event => {
                  if (userId) {
                    const projectRef = doc(db, 'users', userId, 'projects', id);
                    updateDoc(projectRef, { status: event.detail.value })
                  }
                }}>
                  <IonSelectOption value="Planning">Planning</IonSelectOption>
                  <IonSelectOption value="Ongoing">Ongoing</IonSelectOption>
                  <IonSelectOption value="Completed">Completed</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={() => setIsOpen(true)}>
          <IonIcon slot="icon-only" icon={pencilOutline} ></IonIcon>
        </IonButton>
        <IonModal ref={modal} isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Project Name</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonInput
                label="Enter project name"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="Project name"
                defaultValue={project.name}
              />
            </IonItem>
          </IonContent>
        </IonModal>
        <p className="ion-padding">This is where you add a new project </p>
      </IonContent>
    </IonPage>
  );
};

export default ProjectPage;
