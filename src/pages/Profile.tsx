import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
        <IonButton className='ion-padding' onClick={logOut} routerLink='/welcome' >Sign out</IonButton>
        <p className="ion-padding">This is the profile page that will contain information about the user.</p>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
