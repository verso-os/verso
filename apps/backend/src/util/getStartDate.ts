export function getStartDate(period: "month" | "week" | "year"): Date {
    const now = new Date();

    switch (period.toLowerCase()) {
        case "month":
            return new Date(now.getFullYear(), now.getMonth(), 1);
        case "week":
            const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
            return new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate());
        case "year":
            return new Date(now.getFullYear(), 0, 1);
        default:
            throw new Error("Invalid period. Use 'month', 'week', or 'year'.");
    }
}
