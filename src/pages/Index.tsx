import { Shield, Activity, AlertTriangle, Users, Server, Clock, TrendingUp } from "lucide-react";
import { MetricsCard } from "@/components/Dashboard/MetricsCard";
import { ThreatAlert } from "@/components/Dashboard/ThreatAlert";
import { NetworkChart } from "@/components/Dashboard/NetworkChart";
import { VulnerabilityList } from "@/components/Dashboard/VulnerabilityList";
import { ActivityLog } from "@/components/Dashboard/ActivityLog";
import { ThemeToggle } from "@/components/Dashboard/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const metrics = [
  { title: "Threats Blocked", value: "1,234", icon: Shield, severity: "success" as const, trend: { value: -12, label: "from yesterday" } },
  { title: "Active Sessions", value: "847", icon: Users, severity: undefined, trend: { value: 5, label: "from last hour" } },
  { title: "Open Vulnerabilities", value: "23", icon: AlertTriangle, severity: "warning" as const, trend: { value: -3, label: "this week" } },
  { title: "System Uptime", value: "99.8%", icon: TrendingUp, severity: "success" as const, trend: { value: 0.2, label: "increase" } },
];

const threats = [
  {
    id: "1",
    type: "Brute Force Attack",
    severity: "critical" as const,
    description: "Multiple failed login attempts detected from 192.168.1.105",
    timestamp: "2 minutes ago",
    ip: "192.168.1.105",
    location: "Unknown",
    details: "15 failed login attempts in the last 5 minutes from the same IP address.",
    recommendedAction: "Block IP address and review authentication logs for similar patterns."
  },
  {
    id: "2",
    type: "DDoS Attempt",
    severity: "high" as const,
    description: "Unusual spike in traffic from multiple sources",
    timestamp: "15 minutes ago",
    ip: "Multiple IPs",
    location: "Various",
    details: "Traffic volume increased by 300% from multiple geographic locations.",
    recommendedAction: "Enable rate limiting and activate DDoS protection."
  },
  {
    id: "3",
    type: "Malware Detection",
    severity: "medium" as const,
    description: "Suspicious file detected in user upload directory",
    timestamp: "1 hour ago",
    ip: "10.0.0.45",
    location: "Internal Network",
    details: "File hash matches known malware signature in threat database.",
    recommendedAction: "Quarantine file and scan all systems for similar signatures."
  },
];

const networkData = [
  { time: "00:00", inbound: 45, outbound: 32 },
  { time: "04:00", inbound: 52, outbound: 38 },
  { time: "08:00", inbound: 78, outbound: 65 },
  { time: "12:00", inbound: 95, outbound: 82 },
  { time: "16:00", inbound: 88, outbound: 75 },
  { time: "20:00", inbound: 65, outbound: 55 },
  { time: "23:59", inbound: 48, outbound: 35 },
];

const vulnerabilities = [
  {
    id: "1",
    system: "Web Server (Apache 2.4.41)",
    issue: "Outdated version with known CVE vulnerabilities",
    severity: "critical" as const,
    cvss: 9.1,
    status: "open" as const
  },
  {
    id: "2",
    system: "Database Server (MySQL 5.7)",
    issue: "SSL certificate expired",
    severity: "high" as const,
    cvss: 7.5,
    status: "patching" as const
  },
  {
    id: "3",
    system: "Email Server (Postfix)",
    issue: "Weak encryption configuration",
    severity: "medium" as const,
    cvss: 5.3,
    status: "open" as const
  },
  {
    id: "4",
    system: "File Server (Samba)",
    issue: "Default credentials detected",
    severity: "critical" as const,
    cvss: 9.8,
    status: "open" as const
  },
];

const activities = [
  {
    id: "1",
    user: "john.doe@company.com",
    action: "Login",
    resource: "/admin/dashboard",
    timestamp: "2024-01-15 14:23:45",
    status: "success" as const,
    ip: "192.168.1.100"
  },
  {
    id: "2",
    user: "jane.smith@company.com",
    action: "File Upload",
    resource: "/uploads/documents",
    timestamp: "2024-01-15 14:22:10",
    status: "success" as const,
    ip: "192.168.1.101"
  },
  {
    id: "3",
    user: "unknown",
    action: "Login Attempt",
    resource: "/admin/login",
    timestamp: "2024-01-15 14:20:33",
    status: "failed" as const,
    ip: "203.0.113.45"
  },
  {
    id: "4",
    user: "admin@company.com",
    action: "Config Change",
    resource: "/system/settings",
    timestamp: "2024-01-15 14:15:22",
    status: "success" as const,
    ip: "192.168.1.1"
  },
  {
    id: "5",
    user: "bob.wilson@company.com",
    action: "Data Export",
    resource: "/api/export/users",
    timestamp: "2024-01-15 14:10:55",
    status: "success" as const,
    ip: "192.168.1.102"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 cyber-glow-sm rounded-lg bg-primary/10 px-3 py-2">
                <h1 className="text-xl font-bold">ThreatScope</h1>
              </div>
              <span className="text-sm text-muted-foreground">Security Operations Center</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="threats">Threats</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="response">Response</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, index) => (
                <MetricsCard key={index} {...metric} />
              ))}
            </div>

            {/* Network Chart */}
            <NetworkChart data={networkData} />

            {/* Two Column Layout */}
            <div className="grid gap-6 lg:grid-cols-2">
              <ThreatAlert threats={threats.slice(0, 3)} />
              <VulnerabilityList vulnerabilities={vulnerabilities.slice(0, 4)} />
            </div>
          </TabsContent>

          <TabsContent value="threats">
            <ThreatAlert threats={threats} />
          </TabsContent>

          <TabsContent value="logs">
            <ActivityLog activities={activities} />
          </TabsContent>

          <TabsContent value="vulnerabilities">
            <VulnerabilityList vulnerabilities={vulnerabilities} />
          </TabsContent>

          <TabsContent value="response">
            <div className="grid gap-6 lg:grid-cols-2">
              <ThreatAlert threats={threats.filter(t => t.severity === "critical")} />
              <VulnerabilityList vulnerabilities={vulnerabilities.filter(v => v.severity === "critical")} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
