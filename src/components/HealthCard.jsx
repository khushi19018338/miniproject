import { cn } from "@/lib/utils";
import { Calendar, Activity, Moon, Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";

const HealthCard = ({ type, title, description, value, date, className }) => {
  const getIcon = () => {
    switch (type) {
      case "diet":
        return <Utensils className="w-5 h-5" />;
      case "exercise":
        return <Activity className="w-5 h-5" />;
      case "sleep":
        return <Moon className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (type) {
      case "diet":
        return "text-success";
      case "exercise":
        return "text-primary";
      case "sleep":
        return "text-secondary";
      default:
        return "";
    }
  };

  return (
    <Card
      className={cn(
        "p-4 hover:shadow-md transition-all duration-300 border-l-4",
        type === "diet" && "border-l-success",
        type === "exercise" && "border-l-primary",
        type === "sleep" && "border-l-secondary",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-lg bg-accent", getColor())}>
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-card-foreground">{title}</h3>
            {value && (
              <span className={cn("text-sm font-medium", getColor())}>
                {value}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-2">{description}</p>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HealthCard;
