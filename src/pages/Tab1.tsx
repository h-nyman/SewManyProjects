import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { logOut } from '../firebaseConfig';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton expand="block" className='ion-padding' onClick={logOut} routerLink='/welcome' >Sign out</IonButton>
        <p className="ion-padding"> This is the home page where information to get started will be stored. </p>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
