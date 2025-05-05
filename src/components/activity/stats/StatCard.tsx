
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  colorScheme: "blue" | "yellow" | "green";
}

const StatCard = ({ title, value, subtitle, icon: Icon, colorScheme }: StatCardProps) => {
  // Color mapping based on the scheme
  const colorClasses = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
    },
    yellow: {
      bg: "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/20 border-yellow-200 dark:border-yellow-800",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-600 dark:text-yellow-400",
    },
    green: {
      bg: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
    },
  };
  
  const { bg, iconBg, text } = colorClasses[colorScheme];
  
  return (
    <Card className={`shadow-subtle ${bg}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${text}`}>{title}</p>
            <h3 className="text-2xl font-bold text-high-contrast mt-1">{value}</h3>
          </div>
          <div className={`h-12 w-12 rounded-full ${iconBg} flex items-center justify-center`}>
            <Icon className={`h-6 w-6 ${text}`} />
          </div>
        </div>
        <div className="mt-2 text-sm text-medium-contrast">
          {subtitle}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
