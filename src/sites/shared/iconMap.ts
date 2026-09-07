/**
 * Lucide icon resolution for data-driven icon names (skill categories etc).
 */
import {
  Code2,
  Cpu,
  Layout,
  Server,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Mail,
  Cloud,
  Bot,
  type LucideIcon,
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  Code2,
  Cpu,
  Layout,
  Server,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Mail,
  Cloud,
  Bot,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Code2;
}
