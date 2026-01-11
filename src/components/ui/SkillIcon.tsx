import { 
  SiTypescript, 
  SiJavascript, 
  SiReact, 
  SiNestjs, 
  SiNodedotjs,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiNginx,
  SiLinux,
  SiPostman,
  SiDocker
} from "@icons-pack/react-simple-icons";
import { 
  Workflow, 
  Shield, 
  Database, 
  ServerCog,
  Key,
  RefreshCw,
  Boxes,
  LucideIcon
} from "lucide-react";
import { ComponentType, SVGProps } from "react";

type SimpleIconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; color?: string }>;

const simpleIconMap: Record<string, SimpleIconType> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  react: SiReact,
  nestjs: SiNestjs,
  nodejs: SiNodedotjs,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  tailwindcss: SiTailwindcss,
  git: SiGit,
  github: SiGithub,
  nginx: SiNginx,
  linux: SiLinux,
  postman: SiPostman,
  docker: SiDocker,
};

const lucideIconMap: Record<string, LucideIcon> = {
  tanstack: Boxes,
  cicd: Workflow,
  pm2: ServerCog,
  api: Workflow,
  auth: Key,
  migration: RefreshCw,
  security: Shield,
  database: Database,
  zod: Shield,
};

const colorMap: Record<string, string> = {
  typescript: "#3178C6",
  javascript: "#F7DF1E",
  react: "#61DAFB",
  nestjs: "#E0234E",
  nodejs: "#339933",
  postgresql: "#4169E1",
  mysql: "#4479A1",
  mongodb: "#47A248",
  tailwindcss: "#06B6D4",
  git: "#F05032",
  github: "currentColor",
  nginx: "#009639",
  linux: "#FCC624",
  postman: "#FF6C37",
  docker: "#2496ED",
  zod: "#3E67B1",
  tanstack: "#FF4154",
};

interface SkillIconProps {
  icon?: string;
  className?: string;
  size?: number;
}

export function SkillIcon({ icon, className = "", size = 14 }: SkillIconProps) {
  if (!icon) return null;
  
  const key = icon.toLowerCase();
  const color = colorMap[key];
  
  // Check simple icons first
  const SimpleIcon = simpleIconMap[key];
  if (SimpleIcon) {
    return <SimpleIcon className={className} size={size} color={color} />;
  }
  
  // Then check lucide icons
  const LucideIconComponent = lucideIconMap[key];
  if (LucideIconComponent) {
    return <LucideIconComponent className={className} size={size} color={color} />;
  }
  
  return null;
}
