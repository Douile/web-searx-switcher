export interface InstancesMetadata {
  timestamp: number;
}

export type NetworkType = 'normal' | 'tor';

export interface InstanceEngineStat {
  error_rate?: number;
  errors?: number[];
}

export type InstanceEngineStats = {
  [name: string]: InstanceEngineStat;
}

export interface Instance {
  analytics: boolean;
  comments: string[];
  alternativeUrls: unknown;
  main: boolean;
  contact_url: string;
  docs_url: string;
  generator: string;
  git_url: string;
  http: {
    error: unknown;
    status_code: number;
  }
  network_type: NetworkType;
  html: {
    ressources: unknown;
    grade: string;
  };
  engines: InstanceEngineStats;
  version: string;
  tls: {
    certificate: unknown;
    grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' | '?';
    gradeUrl: string;
  };
  timing: unknown;
  network: {
    ips: {
      [ip: string]: unknown;
    };
    ipv6: boolean;
    asn_privacy: number;
    dnssec: boolean;
  };
}

export type Instances = {
  [url: string]: Instance;
}

export type Engines = {
  [name: string]: unknown;
}

export interface InstancesResponse {
  metadata: InstancesMetadata;
  instances: Instances;
  engines: Engines;
  engine_errors: string[];
  categories: string[];
  hashes: unknown;
  cidrs: unknown;
  forks: string[];
}
