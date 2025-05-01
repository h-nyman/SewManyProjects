import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Project } from './Home';
import { pencilOutline } from 'ionicons/icons';
import useAuthState from '../useAuthState';
import TodoView from '../components/TodoView';

interface Params { id: string };

const ProjectPage: React.FC = () => {
  const { id } = useParams<Params>();
  const [project, setProject] = useState<Project>();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthState();
  const userId = user?.uid
  const projectRef = doc(db, 'users', userId ?? 'none', 'projects', id);
  const [segment, setSegment] = useState("first");

  useEffect(() => {
    if (userId) {
      const unsub = onSnapshot(projectRef, (doc) => {
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
    updateDoc(projectRef, { name: input.current?.value });
    setIsOpen(false);
  }

  function onIdeasChange(ideas: string) {
    updateDoc(projectRef, { ideas });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
          <IonTitle>{project.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol size="auto">
                  <IonTitle size="large">{project.name}</IonTitle>
                </IonCol>
                <IonCol size="auto">
                  <IonButton onClick={() => setIsOpen(true)}>
                    <IonIcon slot="icon-only" icon={pencilOutline} ></IonIcon>
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
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
                value={project.name}
              />
            </IonItem>
          </IonContent>
        </IonModal>
        <IonSegment value={segment} onIonChange={(e)=> setSegment(e.detail.value)}>
          <IonSegmentButton value="first" contentId="first">
            <IonLabel>Ideas</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="second" contentId="second">
            <IonLabel>To-do's</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="third" contentId="third">
            <IonLabel>Material</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonSegmentView>
          <IonSegmentContent id="first">
            <IonTextarea
              placeholder="Type something here"
              autoGrow={true}
              value={project.ideas}
              debounce={1000}
              onIonInput={(event) => onIdeasChange(event.detail.value ?? '')}
            ></IonTextarea>
          </IonSegmentContent>
          <IonSegmentContent id="second">
            <TodoView todosMap={project.todosMap} projectRef={projectRef}></TodoView>
          </IonSegmentContent>
          <IonSegmentContent id="third">Third</IonSegmentContent>
        </IonSegmentView>
      </IonContent>
    </IonPage>
  );
};

export default ProjectPage;
