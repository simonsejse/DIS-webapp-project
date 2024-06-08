import { DateHelper } from "@/lib/utils";
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
    return DateHelper.formatPretty(dateStr);
}
