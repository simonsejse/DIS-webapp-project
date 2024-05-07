import { Loader, CheckCircle, Lock } from "lucide-react";

export type StatusSizes = "sm" | "md" | "lg";
export type Status = "igangværende" | "færdig" | "lukket";

type Props = {
  status: Status;
  className?: string;
};

export function StatusIcon({ status, className }: Props) {
  switch (status) {
    case "igangværende":
      return <Loader {...{ className }} />;
    case "færdig":
      return <CheckCircle {...{ className }} />;
    case "lukket":
      return <Lock {...{ className }} />;
    default:
      return <span>Unknown Status</span>;
  }
}
