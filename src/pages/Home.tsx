import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import ProjectCard from '../components/ProjectCard';
import { db } from '../firebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useAuthState from '../useAuthState';

export interface Todo {
  id: string
  check: boolean
  text: string
}

export interface Project {
  id: string
  status: 'Planning' | 'Ongoing' | 'Completed'
  name: string
  ideas: string
  todos: Todo[]
}

const Tab1: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthState();
  const userId = user?.uid;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (userId) {
          setLoading(true);

          const projectsCollection = collection(db, 'users', userId, 'projects');

          const q = query(projectsCollection);

          const querySnapshot = await getDocs(q);
          const projectList: Project[] = [];
          querySnapshot.forEach((doc) => {
            projectList.push({ id: doc.id, ...doc.data() } as unknown as Project);
          });
          setProjects(projectList);
        };
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My projects</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My projects</IonTitle>
          </IonToolbar>
        </IonHeader>
        {projects.map((project) => (
          <ProjectCard key={project.id} imgSrc="https://ionicframework.com/docs/img/demos/card-media.png" projectName={project.name} href={`/projects/${project.id}`} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
