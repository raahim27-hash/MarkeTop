export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  icon: 'chart' | 'trophy' | 'dollar';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  metric: string;
  metricLabel: string;
  iconName: 'chart' | 'bot' | 'trending';
}

export interface AuditReport {
  domain: string;
  overallScore: number;
  seoHealth: number;
  pageSpeed: number;
  backlinks: number;
  organicKeywords: number;
  topRecommendation: string;
}
