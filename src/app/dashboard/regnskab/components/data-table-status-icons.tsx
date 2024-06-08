import { Loader, CheckCircle, Lock } from "lucide-react";

export type StatusSizes = "sm" | "md" | "lg";
export type Status = "OPEN" | "CLOSED";

type Props = {
  status: Status;
  className?: string;
};

export function StatusIcon({ status, className }: Props) {
  switch (status) {
    case "OPEN":
      return <Loader {...{ className }} />;
    case "CLOSED":
      return <Lock {...{ className }} />;
    default:
      return <span>Unknown Status</span>;
  }
}
