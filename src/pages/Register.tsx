import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    function registerUser() {
        console.log(username, password, cpassword)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Register</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonInput placeholder='Username' onIonChange={(e: any) => setUsername(e.target.value)} />
                <IonInput type="password" placeholder='Password' onIonChange={(e: any) => setPassword(e.target.value)} />
                <IonInput type="password" placeholder='Confirm Password' onIonChange={(e: any) => setCPassword(e.target.value)} />
                <IonButton onClick={registerUser}>Register</IonButton>
                <p>
                    Already have account <Link to={`login`}>Login</Link>
                </p>
            </IonContent>
        </IonPage>
    );
};

export default Register;