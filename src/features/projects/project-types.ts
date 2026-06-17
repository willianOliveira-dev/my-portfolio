export type ProjectTechnology = {
  name: string;
  iconSrc: string;
};

export type Project = {
  title: string;
  description: string;
  status: string;
  statusLabel: string;
  technologies: ProjectTechnology[];
  imageSrc?: string;
  imageAlt: string;
  sourceUrl?: string;
  liveUrl?: string;
  downloadUrl?: string;
};
