import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { triangle, ellipse, square } from "ionicons/icons";

interface Props {
    loggedIn: boolean
}

const TabBar = ({ loggedIn }: Props) => {
    if (!loggedIn) {
        return null
    }

    return (<IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Profile</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>About</IonLabel>
        </IonTabButton>
    </IonTabBar>
    )
}

export default TabBar;