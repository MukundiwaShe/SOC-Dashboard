import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  severity?: "success" | "warning" | "critical";
}

export function MetricsCard({ title, value, icon: Icon, trend, severity }: MetricsCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all hover:shadow-lg",
      severity === "critical" && "border-critical/50 cyber-glow-sm",
      severity === "warning" && "border-warning/50",
      severity === "success" && "border-success/50"
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            <span className={cn(
              "font-medium",
              trend.value > 0 && severity === "critical" && "text-critical",
              trend.value > 0 && severity === "success" && "text-success",
              trend.value < 0 && severity === "critical" && "text-success",
              trend.value < 0 && severity === "success" && "text-critical"
            )}>
              {trend.value > 0 ? "+" : ""}{trend.value}%
            </span>{" "}
            {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
