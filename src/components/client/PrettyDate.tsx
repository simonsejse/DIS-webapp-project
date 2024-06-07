type Props = {
    date: string;
};

export function PrettyDate(props: Props) {
    const date = props.date;
    return (
        <span>
            {new Date(date).toLocaleDateString()}{" "}
            {new Date(date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}
        </span>
    );
}

export function PrettyDateAsString(props: Props) {
    const date = props.date;
    return `${new Date(date).toLocaleDateString()} ${new Date(
        date
    ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })}`;
}
