import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Project } from './Home';

interface Params { id: string };

const ProjectPage: React.FC = () => {
  const { id } = useParams<Params>();
  const userId = auth.currentUser?.uid
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    if (userId) {
      const unsub = onSnapshot(doc(db, 'users', userId, 'projects', id), (doc) => {
        console.log("Current data: ", doc.data());
        setProject({ id: doc.id, ...doc.data() } as unknown as Project);
        return unsub;
      });
    }
  }, [id, userId])

  if (!project) {
    return "Loading..."
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
        <p className="ion-padding">This is where you add a new project </p>
      </IonContent>
    </IonPage>
  );
};

export default ProjectPage;
