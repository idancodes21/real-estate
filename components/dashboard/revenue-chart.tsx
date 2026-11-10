"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { ArrowUp } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const lastMonth = [480, 400, 380, 300, 520, 520, 360];
const runningMonth = [330, 260, 250, 170, 370, 380, 190];

function readColor(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

export default function RevenueChart() {
  const [colors, setColors] = useState({
    primary: "#4b5bea",
    light: "#c9ceff",
    grid: "#e8e9ef",
    text: "#85879a",
  });

  useEffect(() => {
    function update() {
      const primary = readColor("--primary");
      setColors({
        primary,
        light: `color-mix(in srgb, ${primary} 30%, transparent)`,
        grid: readColor("--border"),
        text: readColor("--muted-foreground"),
      });
    }

    update();
    
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Last Month",
        data: lastMonth,
        backgroundColor: colors.primary,
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
      {
        label: "Running Month",
        data: runningMonth,
        backgroundColor: colors.light,
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: colors.text, font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: colors.grid },
        border: { display: false },
        ticks: {
          color: colors.text,
          font: { size: 11 },
          stepSize: 200,
          callback: (value) => `${value}k`,
        },
      },
    },
  };

  return (
    <section className="rounded-xl bg-card p-5 text-card-foreground">
      <div className="flex items-start justify-between">
        <h2 className="text-base font-semibold text-foreground">
          Total Revenue
        </h2>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary" />
            Last Month
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary/30" />
            Running Month
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <p className="text-2xl font-bold text-foreground">$236,535</p>
        <div className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ArrowUp className="size-3" />
          </span>
          <div className="text-xs leading-tight">
            <p className="font-medium text-primary">0.8%</p>
            <p className="text-muted-foreground">Than last Month</p>
          </div>
        </div>
      </div>

      <div className="mt-6 h-64">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
}