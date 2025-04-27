import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Project } from './Home';
import { OverlayEventDetail } from '@ionic/core/components';

interface Params { id: string };

const ProjectPage: React.FC = () => {
  const { id } = useParams<Params>();
  const userId = auth.currentUser?.uid
  const [project, setProject] = useState<Project>();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

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
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      // Assume you're updating the project name, modify as needed
      setProject(prev => prev ? { ...prev, name: `Hello, ${event.detail.data}!` } : prev);
    }
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
          </IonToolbar>
        </IonHeader>
        <IonButton id="open-modal" expand="block">
          Open
        </IonButton>
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(event) => onWillDismiss(event)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>New Project</IonTitle>
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
                label="Enter your name"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="Your name"
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
