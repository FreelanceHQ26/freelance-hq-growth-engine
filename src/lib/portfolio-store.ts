// Frontend-only project store backed by localStorage.
// Projects added by an admin persist on THAT browser only. Replace with a backend
// (Lovable Cloud / Supabase storage + DB) when you want shared, multi-device data.

export type Project = {
  id: string;
  title: string;
  category: string;
  type: string;
  url?: string;
  image: string; // data URL or remote URL
  createdAt: number;
};

const KEY = "fhq_projects_v1";

export const loadProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveProjects = (projects: Project[]) => {
  localStorage.setItem(KEY, JSON.stringify(projects));
};

export const addProject = (p: Omit<Project, "id" | "createdAt">): Project => {
  const projects = loadProjects();
  const project: Project = {
    ...p,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  projects.unshift(project);
  saveProjects(projects);
  return project;
};

export const deleteProject = (id: string) => {
  saveProjects(loadProjects().filter((p) => p.id !== id));
};

export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
