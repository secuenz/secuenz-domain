export interface UseCase {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  problems: string[];
  outcomes: string[];
  workflowSlugs: string[];
}

export const useCases: UseCase[] = [
  {
    slug: 'pentest-consultancies',
    title: 'Standardize delivery across every engagement.',
    eyebrow: 'Pentest consultancies',
    summary: 'Give consultants reusable assessment workflows while keeping scope review, execution evidence and handoff visible to the team.',
    problems: ['Assessment scripts differ between consultants', 'Engagement knowledge lives in terminals and local files', 'Active stages need explicit client-scope review', 'Reproducing a prior engagement takes avoidable effort'],
    outcomes: ['Reusable delivery patterns', 'Recorded workflow approval', 'Consistent execution records', 'Structured artifacts for reporting and handoff'],
    workflowSlugs: ['external-reconnaissance', 'web-application-surface-review'],
  },
  {
    slug: 'appsec-teams',
    title: 'Make recurring security reviews reproducible.',
    eyebrow: 'AppSec teams',
    summary: 'Compose repository and application checks into governed workflows that security engineers can rerun, review and hand off.',
    problems: ['Tool output is fragmented across systems', 'Review steps drift between releases', 'Security context is difficult to hand to engineering', 'AI-assisted analysis needs human control'],
    outcomes: ['Repeatable review sequences', 'A visible record of inputs and outputs', 'Governed AI-assisted triage', 'Consistent export and engineering handoff'],
    workflowSlugs: ['repository-security-review', 'web-application-surface-review'],
  },
  {
    slug: 'internal-red-teams',
    title: 'Govern repeatable red-team operations.',
    eyebrow: 'Internal red teams',
    summary: 'Coordinate reconnaissance, tool execution and analysis with explicit scope, reviewer decisions and execution history.',
    problems: ['Operational knowledge is encoded in personal scripts', 'Parallel tool runs are difficult to audit', 'Approval context gets separated from execution', 'Results require manual consolidation'],
    outcomes: ['Reusable operational playbooks', 'Workflow approval before execution', 'Worker-backed execution history', 'Centralized artifacts for review'],
    workflowSlugs: ['external-reconnaissance', 'web-application-surface-review'],
  },
];
