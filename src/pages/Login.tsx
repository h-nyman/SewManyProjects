import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../firebaseConfig'

const Login: React.FC = () => {

    const [busy, setBusy] =useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [present] = useIonToast()

    async function login() {
        setBusy(true)
        const res = await loginUser(username, password)
        present({
            message: `${res ? 'Login success' : 'Login failed'}`
        })
        setBusy(false)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading message="Please wait..." duration={0} isOpen={busy} />
            <IonContent className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Login</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonInput placeholder='Username' onIonChange={(e: any) => setUsername(e.target.value)} />
                <IonInput type="password" placeholder='Password' onIonChange={(e: any) => setPassword(e.target.value)} />
                <IonButton onClick={login}>Login</IonButton>

                <p>
                    New here? <Link to={`register`}>Register a New Account</Link>
                </p>
            </IonContent>
        </IonPage>
    );
};

export default Login;