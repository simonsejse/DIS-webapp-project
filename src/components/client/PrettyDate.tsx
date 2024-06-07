import { format } from "date-fns";
import { da } from "date-fns/locale";

type Props = {
    dateStr: string;
    className?: string;
};

export function PrettyDate({ dateStr, className }: Props) {
    return (
        <span className={`${className || ""}`}>
            {prettyDateAsString(dateStr)}
        </span>
    );
}

export function prettyDateAsString(dateStr: string) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }
    return format(date, "dd/MM/yyyy HH:mm", { locale: da });
}
