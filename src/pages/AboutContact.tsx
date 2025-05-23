import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { logOut } from '../firebaseConfig';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader color="primary">
        <IonToolbar color="primary">
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">About & Contact</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h2> Sew Many Projects</h2>
        <p className="ion-padding">Welcome to Sew Many Projects, your go-to app for managing and organizing all your sewing creations! Whether you're just starting out or an experienced seamstress, Sew Many Projects is designed to simplify the way you plan, track, and complete your sewing endeavors.</p>
        <h2>Contact:</h2>
        <p className="ion-padding">sewmanyprojects@example.com</p>
        <div className="logout-button">
          <IonButton  onClick={logOut} routerLink='/welcome' >Sign out</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
