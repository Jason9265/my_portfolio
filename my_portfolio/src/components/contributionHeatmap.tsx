"use client";
import React, { useState, useEffect } from "react";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface GitHubResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: ContributionCalendar;
      };
    };
  };
}

interface ContributionMap {
  [key: string]: number;
}

const ContributionHeatmap = () => {
  const [contributions, setContributions] = useState<ContributionMap>({});
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContributions = async (): Promise<void> => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setFullYear(endDate.getFullYear() - 1);
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

        const query = `
          query($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `;

        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            variables: {
              username: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            },
          }),
        });

        const data: GitHubResponse = await response.json();
        const contributionData =
          data.data.user.contributionsCollection.contributionCalendar;

        const contributionMap: ContributionMap = {};
        contributionData.weeks.forEach((week) => {
          week.contributionDays.forEach((day) => {
            contributionMap[day.date] = day.contributionCount;
          });
        });

        setContributions(contributionMap);
        setTotalCount(contributionData.totalContributions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const generateDates = (): Date[][] => {
    const dates: Date[][] = [];
    const today = new Date();
    for (let i = 0; i < 52; i++) {
      const week: Date[] = [];
      for (let j = 0; j < 7; j++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (51 - i) * 7 - (6 - j));
        week.push(date);
      }
      dates.push(week);
    }
    return dates;
  };

  const getContributionLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 1) return 1;
    if (count <= 3) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  const dates = generateDates();
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days: Array<{ label: string; index: number }> = [
    { label: "Mon", index: 1 },
    { label: "Wed", index: 3 },
    { label: "Fri", index: 5 },
  ];

  // Function to get month label positions
  const getMonthLabels = () => {
    const labels: { name: string; position: number }[] = [];
    let currentMonth = -1;

    dates.forEach((week, weekIndex) => {
      const date = week[0];
      const monthIndex = date.getMonth();
      if (monthIndex !== currentMonth) {
        labels.push({
          name: months[monthIndex],
          position: weekIndex,
        });
        currentMonth = monthIndex;
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();

  if (loading) {
    return <div className="text-gray-300">Loading contributions...</div>;
  }

  return (
    <div className="w-full max-w-6xl bg-[#0d1117] rounded-xl p-4 font-sans">
      <div className="mb-4">
        <h2 className="text-[16px] text-[#e6edf3]">
          {totalCount} contributions in the last year
        </h2>
      </div>

      <div className="relative flex flex-col mt-4">
        {/* Days column + Contribution grid container */}
        <div className="flex">
          {/* Days column */}
          <div className="flex flex-col mr-2 pt-[30px] text-[10px] text-[#7d8590]">
            <div style={{ height: "15px" }}></div>
            <div style={{ height: "15px" }}>Mon</div>
            <div style={{ height: "15px" }}></div>
            <div style={{ height: "15px" }}>Wed</div>
            <div style={{ height: "15px" }}></div>
            <div style={{ height: "15px" }}>Fri</div>
          </div>

          {/* Months + Contributions container */}
          <div className="flex flex-col flex-1">
            {/* Months row */}
            <div className="relative h-[30px] mb-2">
              {getMonthLabels().map(({ name, position }) => (
                <div
                  key={`${name}-${position}`}
                  className="absolute text-[10px] text-[#7d8590]"
                  style={{
                    left: `${position * 12}px`,
                    top: 0,
                  }}
                >
                  {name}
                </div>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="flex gap-[2px]">
              {dates.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px]">
                  {week.map((date) => {
                    const dateStr = date.toISOString().split("T")[0];
                    const count = contributions[dateStr] || 0;
                    const level = getContributionLevel(count);
                    const bgColor =
                      level === 0
                        ? "bg-[#161b22]"
                        : level === 1
                        ? "bg-[#0e4429]"
                        : level === 2
                        ? "bg-[#006d32]"
                        : level === 3
                        ? "bg-[#26a641]"
                        : "bg-[#39d353]";

                    return (
                      <div
                        key={dateStr}
                        className={`w-[10px] h-[10px] rounded-[2px] ${bgColor} transition-all duration-100 hover:ring-1 hover:ring-[#7d8590]/50`}
                        title={`${date.toDateString()}: ${count} contributions`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end mt-2 gap-2">
          <span className="text-[10px] text-[#7d8590]">Less</span>
          <div className="flex gap-[2px]">
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#161b22]" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429]" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#006d32]" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#26a641]" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#39d353]" />
          </div>
          <span className="text-[10px] text-[#7d8590]">More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
