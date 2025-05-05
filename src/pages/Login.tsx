import { IonButton, IonContent, IonInput, IonItem, IonLoading, IonPage, useIonRouter, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../firebaseConfig'
import useAuthState from '../useAuthState';
import './Login.css';

const Login: React.FC = () => {
    const router = useIonRouter()

    const [busy, setBusy] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [present] = useIonToast()
    const authState = useAuthState()

    async function login() {
        setBusy(true)
        const res = await loginUser(username, password)
        present({
            message: `${res ? 'Login success' : 'Login failed'}`,
            duration: 3000
        })
        setBusy(false)
    }

    useEffect(() => {
        if (authState.user) {
            router.push('/tab1')
        }
    }, [authState.user, router])

    return (
        <IonPage>
            <IonLoading message="Please wait..." duration={0} isOpen={busy} />
            <IonContent className="ion-padding">
                <img src="/Logo.png" alt="SMP Logo" className="logo" />
                <IonItem fill="outline">
                    <IonInput
                        placeholder="E-mail address"
                        onIonInput={(e: any) => setUsername(e.target.value)}
                    />
                </IonItem>

                <IonItem fill="outline">
                    <IonInput
                        type="password"
                        placeholder="Password"
                        onIonInput={(e: any) => setPassword(e.target.value)}
                    />
                </IonItem>
                <div className="login-button" >
                    <IonButton onClick={login}>Login</IonButton>
                </div>
                <p>
                    New here? <Link to={`register`}>Register a New Account</Link>
                </p>
            </IonContent>
        </IonPage>
    );
};

export default Login;