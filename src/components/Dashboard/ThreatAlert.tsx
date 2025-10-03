import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Threat {
  id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  timestamp: string;
  ip?: string;
  location?: string;
  details?: string;
  recommendedAction?: string;
}

interface ThreatAlertProps {
  threats: Threat[];
}

const severityConfig = {
  low: { color: "text-success", bg: "bg-success/10" },
  medium: { color: "text-warning", bg: "bg-warning/10" },
  high: { color: "text-warning", bg: "bg-warning/10" },
  critical: { color: "text-critical", bg: "bg-critical/10" }
};

export function ThreatAlert({ threats }: ThreatAlertProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Threats</CardTitle>
        <CardDescription>Active security alerts and incidents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {threats.map((threat) => {
            const config = severityConfig[threat.severity];
            const isExpanded = expandedId === threat.id;

            return (
              <div
                key={threat.id}
                className={cn(
                  "rounded-lg border p-4 transition-all",
                  threat.severity === "critical" && "border-critical/30 pulse-glow",
                  config.bg
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{threat.type}</span>
                      <Badge variant={threat.severity === "critical" ? "destructive" : "secondary"}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{threat.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span>{threat.timestamp}</span>
                      {threat.ip && <span>IP: {threat.ip}</span>}
                    </div>
                      
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t space-y-2">
                        {threat.details && (
                          <div className="text-sm">
                            <span className="font-medium">Details: </span>
                            <span className="text-muted-foreground">{threat.details}</span>
                          </div>
                        )}
                        {threat.location && (
                          <div className="text-sm">
                            <span className="font-medium">Location: </span>
                            <span className="text-muted-foreground">{threat.location}</span>
                          </div>
                        )}
                        {threat.recommendedAction && (
                          <div className="text-sm">
                            <span className="font-medium">Recommended Action: </span>
                            <span className="text-muted-foreground">{threat.recommendedAction}</span>
                          </div>
                        )}
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">Block IP</Button>
                          <Button size="sm" variant="outline">Isolate Host</Button>
                          <Button size="sm" variant="outline">Escalate</Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedId(isExpanded ? null : threat.id)}
                  >
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      isExpanded && "rotate-180"
                    )} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
