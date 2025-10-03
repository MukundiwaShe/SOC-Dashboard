import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  status: "success" | "failed" | "pending";
  ip: string;
}

interface ActivityLogProps {
  activities: Activity[];
}

const statusColors = {
  success: "bg-success/10 text-success",
  failed: "bg-critical/10 text-critical",
  pending: "bg-warning/10 text-warning"
};

export function ActivityLog({ activities }: ActivityLogProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredActivities = activities.filter(activity =>
    activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activity Log</CardTitle>
        <CardDescription>Recent user actions and access attempts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.user}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell className="font-mono text-xs">{activity.resource}</TableCell>
                    <TableCell className="font-mono text-xs">{activity.ip}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{activity.timestamp}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[activity.status]}>
                        {activity.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
