import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" padding-bottom>
          <IonToolbar>
            <IonTitle size="large">Welcome to the app!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton expand="block" className='ion-padding' routerLink="/login">Login</IonButton>
        <IonButton expand="block" className='ion-padding' routerLink="/register" color="secondary">Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;