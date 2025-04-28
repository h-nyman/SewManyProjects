import { IonAvatar, IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { logOut } from '../firebaseConfig';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="center-container">
          <IonItem>
            <IonAvatar className="large-avatar">
              <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
          </IonItem>
        </div>
        <p className="ion-padding">This is the profile page that will contain information about the user.</p>
        <div className="center-container">
          <IonButton className="centered-button" onClick={logOut} routerLink='/welcome' >Sign out</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
