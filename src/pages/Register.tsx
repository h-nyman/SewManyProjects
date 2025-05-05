import { IonButton, IonContent, IonInput, IonItem, IonLoading, IonPage, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../firebaseConfig';
import './Register.css';

const Register: React.FC = () => {

    const [busy, setBusy] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    const [present] = useIonToast()

    async function registerUser() {
        if (password !== cpassword) {
            present({ message: "Passwords don't match", duration: 3000 })
            return
        }
        setBusy(true)
        const res = await createUser(username, password)
        present({ message: `${res ? 'Register success' : 'Register failed'}`, duration: 3000 })
        setBusy(false)
    }

    return (
        <IonPage>
            <IonLoading message="Please wait..." duration={0} isOpen={busy} />
            <IonContent className="ion-padding">
                <img src="/Logo.png" alt="SMP Logo" className="logo" />
                <IonItem fill="outline">
                    <IonInput placeholder='E-mail adress' onIonInput={(e: any) => setUsername(e.target.value)} />
                </IonItem>
                <IonItem fill="outline">
                    <IonInput type="password" placeholder='Password' onIonInput={(e: any) => setPassword(e.target.value)} />
                </IonItem>
                <IonItem fill="outline">
                    <IonInput type="password" placeholder='Confirm Password' onIonInput={(e: any) => setCPassword(e.target.value)} />
                </IonItem>
                <div className="register-button" >
                    <IonButton onClick={registerUser}>Register</IonButton>
                </div>
                <p>
                    Already have account <Link to={`login`}>Login</Link>
                </p>
            </IonContent>
        </IonPage>
    );
};

export default Register;