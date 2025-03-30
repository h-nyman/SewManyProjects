import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
                <IonInput placeholder='Username' onIonChange={(e: any) => setUsername(e.target.value)} />
                <IonInput type="password" placeholder='Password' onIonChange={(e: any) => setPassword(e.target.value)} />
                <IonButton onClick={loginUser}>Login</IonButton>

                <p>
                    New here? <Link to={`register`}>Register a New Account</Link>
                </p>
            </IonContent>
        </IonPage>
    );
};

export default Login;