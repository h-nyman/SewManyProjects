import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { homeOutline, personOutline, addOutline } from "ionicons/icons";

interface Props {
    loggedIn: boolean
}

const TabBar = ({ loggedIn }: Props) => {
    if (!loggedIn) {
        return null
    }

    return (<IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={addOutline} />
            <IonLabel>New Project</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={personOutline} />
            <IonLabel>Profile</IonLabel>
        </IonTabButton>
    </IonTabBar>
    )
}

export default TabBar;