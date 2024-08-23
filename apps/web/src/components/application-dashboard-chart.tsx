"use client";

import { Bar, BarChart, CartesianGrid, Label, Rectangle, ReferenceLine, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$web/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "$web/components/ui/chart";
import { useMemo, useState } from "react";

import { useApplicationQuery } from "$web/hooks/api/useApplicationQuery";
import { useParams } from "next/navigation";

export default function ApplicationDashboardChart() {
    const { app } = useParams<{ app: string }>();
    const { data: application } = useApplicationQuery(app);

    const [currentDate] = useState(new Date(new Date().toUTCString()));

    const data = useMemo(() => {
        return application?.users_created || [];
    }, [application]);

    const dates = useMemo(() => {
        const now = new Date(currentDate);
        const dateRangeStart = new Date(now.setDate(now.getDate() - now.getDay()));
        return Array.from({ length: 7 }, (_, index) => {
            const date = new Date(dateRangeStart);
            date.setDate(date.getDate() + index);
            return date;
        });
    }, [currentDate]);

    const dataWithLocalDate = useMemo(() => {
        return data.map((item) => {
            return {
                ...item,
                date: item.date,
            };
        });
    }, [data]);

    const chartData = useMemo(() => {
        return dates.map((date) => {
            const formattedDate = date.toISOString().slice(0, 10);
            const dataForDate = dataWithLocalDate.find((item) => item.date.split("T")[0] === formattedDate);
            return {
                date: formattedDate,
                count: dataForDate ? dataForDate.count : 0,
            };
        });
    }, [dates, dataWithLocalDate]);

    const todayFormatted = useMemo(() => currentDate.toISOString().split("T")[0], [currentDate]);
    const todayTotal = useMemo(
        () => data.filter((item) => item.date.split("T")[0] === todayFormatted)[0]?.count || 0,
        [data, todayFormatted],
    );

    const total = useMemo(() => data.reduce((acc, item) => acc + item.count, 0), [data]);

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardDescription>Today</CardDescription>
                    <CardTitle className="text-4xl tabular-nums">
                        {todayTotal}{" "}
                        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                            new users
                        </span>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    className="aspect-auto h-[250px] w-full"
                    config={{
                        count: {
                            label: "New Users",
                            color: "#8b5cf6",
                        },
                    }}
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <Bar dataKey="count" radius={5} fill="#8b5cf6" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    timeZone: "UTC",
                                });
                            }}
                        />
                        <ChartTooltip
                            defaultIndex={2}
                            content={
                                <ChartTooltipContent
                                    hideIndicator
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            timeZone: "UTC",
                                        });
                                    }}
                                />
                            }
                            cursor={false}
                        />
                        <ReferenceLine
                            y={1200}
                            stroke="hsl(var(--muted-foreground))"
                            strokeDasharray="3 3"
                            strokeWidth={1}
                        >
                            <Label
                                position="insideBottomLeft"
                                value="Average Steps"
                                offset={10}
                                fill="hsl(var(--foreground))"
                            />
                            <Label
                                position="insideTopLeft"
                                value="12,343"
                                className="text-lg"
                                fill="hsl(var(--foreground))"
                                offset={10}
                                startOffset={100}
                            />
                        </ReferenceLine>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1 border-t p-0">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardDescription>
                        Over the past week, you have gained <span className="font-medium text-foreground">{total}</span>{" "}
                        new users.
                    </CardDescription>
                </div>
            </CardFooter>
        </Card>
    );
}
