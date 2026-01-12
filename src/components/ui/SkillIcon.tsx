import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiNestjs,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiNginx,
  SiLinux,
  SiPostman,
  SiDocker,
} from "@icons-pack/react-simple-icons";
import { Lock, Server, Database, Code, Zap, GitBranch, Workflow, LucideIcon } from "lucide-react";
import { ComponentType, SVGProps } from "react";

type SimpleIconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

const simpleIcons: Record<string, SimpleIconType> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  react: SiReact,
  nodejs: SiNodedotjs,
  nestjs: SiNestjs,
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

const lucideIcons: Record<string, LucideIcon> = {
  api: Server,
  auth: Lock,
  database: Database,
  code: Code,
  zod: Zap,
  tanstack: Workflow,
  cicd: GitBranch,
  pm2: Server,
};

interface SkillIconProps {
  icon?: string;
  className?: string;
  size?: number;
}

export function SkillIcon({ icon, className = "", size = 14 }: SkillIconProps) {
  if (!icon) return null;
  
  const iconKey = icon.toLowerCase();
  
  // Check simple icons first
  const SimpleIcon = simpleIcons[iconKey];
  if (SimpleIcon) {
    return <SimpleIcon size={size} className={className} />;
  }
  
  // Check lucide icons
  const LucideIconComp = lucideIcons[iconKey];
  if (LucideIconComp) {
    return <LucideIconComp size={size} className={className} />;
  }
  
  return null;
}
