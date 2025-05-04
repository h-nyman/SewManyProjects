import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './welcome.css';

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonButton expand="block" className='ion-padding' routerLink="/login">Login</IonButton>
        <IonButton expand="block" className='ion-padding' routerLink="/register">Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;