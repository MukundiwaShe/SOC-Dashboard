import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface NetworkChartProps {
  data: Array<{
    time: string;
    inbound: number;
    outbound: number;
  }>;
}

export function NetworkChart({ data: initialData }: NetworkChartProps) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData];
        newData.shift();
        
        const lastEntry = newData[newData.length - 1];
        const lastInbound = lastEntry.inbound;
        const lastOutbound = lastEntry.outbound;
        
        // Generate realistic fluctuations
        const inboundChange = (Math.random() - 0.5) * 20;
        const outboundChange = (Math.random() - 0.5) * 15;
        
        const newTime = new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        
        newData.push({
          time: newTime,
          inbound: Math.max(30, Math.min(100, lastInbound + inboundChange)),
          outbound: Math.max(20, Math.min(90, lastOutbound + outboundChange)),
        });
        
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Traffic</CardTitle>
        <CardDescription>Real-time bandwidth usage (Mbps)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem"
              }}
            />
            <Area 
              type="monotone" 
              dataKey="inbound" 
              stroke="hsl(var(--primary))" 
              fillOpacity={1}
              fill="url(#colorInbound)"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="outbound" 
              stroke="hsl(var(--success))" 
              fillOpacity={1}
              fill="url(#colorOutbound)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm text-muted-foreground">Inbound</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-sm text-muted-foreground">Outbound</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
