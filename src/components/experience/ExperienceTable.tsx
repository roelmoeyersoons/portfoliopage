import React, { useState } from 'react';
import { ArrowUpDown, Search, Eye } from 'lucide-react';
import { ExperienceItem } from '../../types/portfolio';

interface ExperienceTableProps {
  experiences: ExperienceItem[];
  onSelectExperience: (item: ExperienceItem) => void;
}

export const ExperienceTable: React.FC<ExperienceTableProps> = ({
  experiences,
  onSelectExperience,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'period' | 'company' | 'role'>('period');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredExperiences = experiences.filter((exp) => {
    const q = searchQuery.toLowerCase();
    return (
      exp.company.toLowerCase().includes(q) ||
      exp.role.toLowerCase().includes(q) ||
      exp.domain.toLowerCase().includes(q) ||
      exp.techStack.some((t) => t.toLowerCase().includes(q)) ||
      exp.tableData.keyDeliverable.toLowerCase().includes(q) ||
      exp.tableData.impactMetric.toLowerCase().includes(q)
    );
  });

  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'period') {
      comparison = a.period.localeCompare(b.period);
    } else if (sortField === 'company') {
      comparison = a.company.localeCompare(b.company);
    } else if (sortField === 'role') {
      comparison = a.role.localeCompare(b.role);
    }
    return sortAsc ? comparison : -comparison;
  });

  const handleSort = (field: 'period' | 'company' | 'role') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles, tech stack, deliverables..."
            className="w-full rounded-xl border border-white/10 bg-surface-100/60 pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-slate-400 backdrop-blur-md focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Showing {sortedExperiences.length} of {experiences.length} records</span>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-100/50 backdrop-blur-xl shadow-xl">
        <table className="w-full text-left text-xs">
          {/* Table Header */}
          <thead className="border-b border-white/10 bg-surface-200/80 font-mono text-slate-300 uppercase tracking-wider">
            <tr>
              <th
                onClick={() => handleSort('period')}
                className="cursor-pointer px-5 py-3.5 hover:text-cyan-400 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Timeline</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>

              <th
                onClick={() => handleSort('company')}
                className="cursor-pointer px-5 py-3.5 hover:text-cyan-400 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Company / Organization</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>

              <th
                onClick={() => handleSort('role')}
                className="cursor-pointer px-5 py-3.5 hover:text-cyan-400 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Role & Domain</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>

              <th className="px-5 py-3.5">System Scope & Deliverable</th>

              <th className="px-5 py-3.5">Impact Metric</th>

              <th className="px-5 py-3.5">Core Tech Stack</th>

              <th className="px-5 py-3.5 text-right">Deep Dive</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-white/5 font-sans">
            {sortedExperiences.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-mono text-xs">
                  No matching experience records found for query "{searchQuery}".
                </td>
              </tr>
            ) : (
              sortedExperiences.map((exp) => (
                <tr
                  key={exp.id}
                  onClick={() => onSelectExperience(exp)}
                  className="group cursor-pointer hover:bg-white/[0.04] transition-colors"
                >
                  {/* Period */}
                  <td className="px-5 py-4 whitespace-nowrap font-mono text-cyan-400 font-medium">
                    {exp.period}
                  </td>

                  {/* Company */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.company}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{exp.location}</div>
                  </td>

                  {/* Role & Domain */}
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-200">{exp.role}</div>
                    <span className="inline-block mt-1 rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-white/5">
                      {exp.domain}
                    </span>
                  </td>

                  {/* System Scope & Deliverable */}
                  <td className="px-5 py-4">
                    <div className="text-slate-300 font-medium">{exp.tableData.systemScope}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {exp.tableData.keyDeliverable}
                    </div>
                  </td>

                  {/* Impact Metric */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-mono text-emerald-300 font-medium">
                      {exp.tableData.impactMetric}
                    </span>
                  </td>

                  {/* Core Tech Stack */}
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {exp.techStack.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                      {exp.techStack.length > 3 && (
                        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-cyan-400">
                          +{exp.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Deep Dive Action */}
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectExperience(exp);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-mono text-slate-300 group-hover:border-cyan-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300 transition-all"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
