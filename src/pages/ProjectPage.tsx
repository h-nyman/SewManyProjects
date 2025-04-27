import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { useParams } from 'react-router';

const ProjectPage: React.FC = () => {
  const {id} = useParams();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">New Project</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p className="ion-padding">This is where you add a new project </p>
      </IonContent>
    </IonPage>
  );
};

export default ProjectPage;
