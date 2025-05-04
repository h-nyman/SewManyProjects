import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import ProjectCard from '../components/ProjectCard';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useAuthState from '../useAuthState';

export interface Todo {
  check: boolean;
  text: string;
}

export interface Material {
  check: boolean;
  text: string;
}

export interface Project {
  id: string;
  status: 'Planning' | 'Ongoing' | 'Completed';
  name: string;
  ideas: string;
  todosMap: Record<string, Todo>;
  materialMap: Record<string, Material>;
}

const Tab1: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthState();
  const userId = user?.uid;

  useEffect(() => {
      try {
        if (userId) {
          setLoading(true);

          const projectsCollection = collection(db, 'users', userId, 'projects');
          const q = query(projectsCollection);

          const unsub = onSnapshot(q, snapshot => {
            const projectList: Project[] = [];
            snapshot.forEach((doc) => {
              projectList.push({ id: doc.id, ...doc.data() } as unknown as Project);
            });
            setProjects(projectList);
          })
          return unsub
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
  }, [userId]);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const planningProjects = projects.filter(project => project.status === 'Planning');
  const ongoingProjects = projects.filter(project => project.status === 'Ongoing');
  const completedProjects = projects.filter(project => project.status === 'Completed');

  return (
    <IonPage>
      <IonHeader color="primary">
        <IonToolbar color="primary">
          <IonTitle>My projects</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader color="primary" collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">My projects</IonTitle>
          </IonToolbar>
        </IonHeader>

        <section>
          <h2 className="underlined">Ongoing</h2>
          {ongoingProjects.map((project) => (
            <ProjectCard key={project.id} projectName={project.name} href={`/projects/${project.id}`} />
          ))}
        </section>

        <section>
          <h2 className="underlined">Planning</h2>
          {planningProjects.map((project) => (
            <ProjectCard key={project.id} projectName={project.name} href={`/projects/${project.id}`} />
          ))}
        </section>

        <section>
          <h2 className="underlined">Completed</h2>
          {completedProjects.map((project) => (
            <ProjectCard key={project.id} projectName={project.name} href={`/projects/${project.id}`} />
          ))}
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
