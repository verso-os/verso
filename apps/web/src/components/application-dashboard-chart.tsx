"use client";

import { Bar, BarChart, Label, Rectangle, ReferenceLine, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$web/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "$web/components/ui/chart";
import { useMemo } from "react";

export default function ApplicationDashboardChart({ data }: { data: { date: string; count: number }[] }) {
    const currentDate = new Date();

    const weekDates = useMemo(() => {
        const weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
        return Array.from({ length: 7 }, (_, index) => {
            const date = new Date(weekStart);
            date.setDate(date.getDate() + index);
            return date;
        });
    }, [currentDate]);

    const chartData = useMemo(() => {
        return weekDates.map((date) => {
            const formattedDate = date.toISOString().slice(0, 10);
            const dataForDate = data?.find((item: any) => item.date.slice(0, 10) === formattedDate);
            return {
                date: formattedDate,
                count: dataForDate ? dataForDate.count : 0,
            };
        });
    }, [weekDates, data]);

    const todayFormatted = useMemo(() => currentDate.toISOString().slice(0, 10), [currentDate]);
    const todayData = useMemo(
        () => data.filter((item) => item.date.slice(0, 10) === todayFormatted),
        [data, todayFormatted],
    );

    return (
        <Card className="">
            <CardHeader className="space-y-0 pb-2">
                <CardDescription>Today</CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                    {todayData?.[0]?.count}{" "}
                    <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">steps</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        users: {
                            label: "Users",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                >
                    <BarChart
                        accessibilityLayer
                        margin={{
                            left: -4,
                            right: -4,
                        }}
                        data={chartData}
                    >
                        <Bar
                            dataKey="count"
                            fill="green"
                            radius={5}
                            fillOpacity={0.6}
                            activeBar={<Rectangle fillOpacity={0.8} />}
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => {
                                return new Date(value)
                                    .toLocaleDateString("en-US", {
                                        weekday: "short",
                                    })
                                    .slice(0, 3);
                            }}
                            tickMargin={4}
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
            <CardFooter className="flex-col items-start gap-1">
                <CardDescription>
                    Over the past 7 days, you have walked <span className="font-medium text-foreground">53,305</span>{" "}
                    steps.
                </CardDescription>
            </CardFooter>
        </Card>
    );
}
