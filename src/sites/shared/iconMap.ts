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
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Code2;
}
