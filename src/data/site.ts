/**
 * Single source of truth for contact addresses and CTA links.
 * Changing an inbox here updates every page that references it.
 */
export const EMAIL = {
  hello: 'core@secuenz.com',
  security: 'core@secuenz.com',
} as const;

const mailto = (address: string, subject?: string) =>
  subject ? `mailto:${address}?subject=${encodeURIComponent(subject)}` : `mailto:${address}`;

export const CTA = {
  earlyAccess: '/early-access/',
  workflowMigration: '/early-access/#apply',
  earlyAccessEmail: mailto(EMAIL.hello, 'ChaosEngine Early Access'),
  securityReport: mailto(EMAIL.security, 'Security Report'),
  hello: mailto(EMAIL.hello),
  security: mailto(EMAIL.security),
} as const;
