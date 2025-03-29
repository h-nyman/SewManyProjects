import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {useState} from 'react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function loginUser() {
        console.log(username, password)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Login</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonInput placeholder='Username?' onIonChange={(e: any) => setUsername(e.target.value)} />
                <IonInput placeholder='Password?' onIonChange={(e: any) => setPassword(e.target.value)} />
                <IonButton onClick={loginUser}>Login</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Login;