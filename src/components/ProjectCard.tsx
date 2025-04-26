import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/react"

interface Props {
    imgSrc: string
    projectName: string
    href: string
}

const ProjectCard = ({ imgSrc, projectName, href }: Props) => {
    return (
        <IonCard href={href}>
            <img src={imgSrc} />
            <IonCardHeader>
                <IonCardTitle>{projectName}</IonCardTitle>
            </IonCardHeader>
        </IonCard>
    )
}

export default ProjectCard;