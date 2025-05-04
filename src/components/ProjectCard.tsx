import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react"

interface Props {
    projectName: string
    href: string
}

const ProjectCard = ({ projectName, href }: Props) => {
    return (
        <IonCard href={href}>
            <IonCardHeader>
                <IonCardTitle>{projectName}</IonCardTitle>
            </IonCardHeader>
        </IonCard>
    )
}

export default ProjectCard;