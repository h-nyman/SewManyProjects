import { IonButton, IonContent, IonPage } from '@ionic/react';
import './welcome.css';

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <img src="/Logo.png" alt="SMP Logo" className="logo" />
        <IonButton expand="block" className='ion-padding' routerLink="/login">Login</IonButton>
        <IonButton expand="block" className='ion-padding' routerLink="/register">Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;