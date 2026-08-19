export interface WorkflowBlueprint {
  slug: string;
  title: string;
  summary: string;
  audience: string;
  scope: string;
  outcome: string;
  steps: { type: string; title: string; detail: string }[];
  outputs: string[];
  approval: string;
}

export const workflowBlueprints: WorkflowBlueprint[] = [
  {
    slug: 'external-reconnaissance',
    title: 'External reconnaissance',
    summary: 'Move from passive subdomain discovery to approved vulnerability scanning without losing the chain of evidence.',
    audience: 'Pentest consultancies and red teams',
    scope: 'Authorized domain targets',
    outcome: 'A repeatable inventory of discovered subdomains, live hosts and scanner output.',
    approval: 'Review the complete scope and active-test policy before the workflow is approved to run.',
    steps: [
      { type: 'Input', title: 'Target domain', detail: 'Accept and validate the authorized domain scope.' },
      { type: 'Tool', title: 'Asset discovery', detail: 'Enumerate passive sources through an approved catalog action.' },
      { type: 'Tool', title: 'Service validation', detail: 'Identify reachable HTTP services and capture basic metadata.' },
      { type: 'Tool', title: 'Security checks', detail: 'Run the approved template and severity policy.' },
      { type: 'Output', title: 'Assessment export', detail: 'Retain node outputs with the execution record.' },
    ],
    outputs: ['Discovered subdomains', 'Live-host inventory', 'Scanner output', 'Approval and execution record'],
  },
  {
    slug: 'repository-security-review',
    title: 'Repository security review',
    summary: 'Standardize repository intake, static analysis, AI-assisted review and a human-controlled final result.',
    audience: 'AppSec and product-security teams',
    scope: 'Authorized source repository or uploaded archive',
    outcome: 'Consistent analysis artifacts that can be reviewed and reproduced against a known revision.',
    approval: 'Review the repository scope and complete workflow before it is approved to run.',
    steps: [
      { type: 'Input', title: 'Repository scope', detail: 'Record the repository and revision under review.' },
      { type: 'Tool', title: 'Static analysis', detail: 'Run the selected repository scanning tools.' },
      { type: 'Script', title: 'Normalize results', detail: 'Convert tool outputs into the workflow result contract.' },
      { type: 'Agent', title: 'Triage context', detail: 'Assist with grouping and summarization inside the governed workflow.' },
      { type: 'Output', title: 'Review package', detail: 'Export the reviewed artifacts for downstream use.' },
    ],
    outputs: ['Tool-native scan artifacts', 'Normalized result table', 'Analyst-reviewed summary', 'Revision and execution record'],
  },
  {
    slug: 'web-application-surface-review',
    title: 'Web application surface review',
    summary: 'Turn web discovery, probing and approved scanning into a visible workflow that can be repeated for each engagement.',
    audience: 'Pentest consultancies and AppSec teams',
    scope: 'Authorized application URLs and related hostnames',
    outcome: 'A traceable view of discovered endpoints, observed technologies and approved scanner results.',
    approval: 'Confirm the resolved application scope and active-test policy before the workflow is approved to run.',
    steps: [
      { type: 'Input', title: 'Application targets', detail: 'Capture the approved URLs and scope notes.' },
      { type: 'Tool', title: 'HTTP discovery', detail: 'Probe hosts and collect response metadata.' },
      { type: 'Script', title: 'Scope filter', detail: 'Keep later nodes inside the declared target boundaries.' },
      { type: 'Tool', title: 'Template scan', detail: 'Run the selected scanning policy against approved targets.' },
      { type: 'Output', title: 'Result package', detail: 'Centralize artifacts and execution context.' },
    ],
    outputs: ['Reachable target inventory', 'HTTP metadata', 'Scanner artifacts', 'Approval and execution record'],
  },
];
