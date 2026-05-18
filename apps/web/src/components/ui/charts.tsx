"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  AreaChart as RechartsAreaChart,
  PieChart as RechartsPieChart,
  Bar,
  Line,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  type TooltipContentProps,
} from "recharts"
import { cn } from "@/lib/utils"

const CHART_COLORS = [
  "oklch(72% 0.18 250)",
  "oklch(72% 0.18 145)",
  "oklch(72% 0.18 30)",
  "oklch(72% 0.18 300)",
]

const SURFACE = "oklch(8% 0.004 60)"
const SURFACE_2 = "oklch(12% 0.004 60)"
const BORDER = "oklch(100% 0 0 / 0.07)"
const TEXT_2 = "oklch(72% 0.003 80)"
const TEXT_4 = "oklch(33% 0.001 80)"
const CREAM = "oklch(96% 0.01 80)"

interface ChartContainerProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}

function ChartContainer({ children, className, title, description }: ChartContainerProps) {
  return (
    <div
      className={cn("rounded-xl border p-5 flex flex-col gap-4", className)}
      style={{ background: SURFACE, borderColor: BORDER }}
    >
      {(title || description) && (
        <div className="flex flex-col gap-0.5">
          {title && (
            <p className="text-sm font-semibold" style={{ color: CREAM }}>
              {title}
            </p>
          )}
          {description && (
            <p className="text-xs" style={{ color: TEXT_4 }}>
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

function ChartTooltip({ active, payload, label }: TooltipContentProps<number, string>) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-lg border px-3 py-2.5 shadow-xl text-xs flex flex-col gap-1.5"
      style={{ background: SURFACE_2, borderColor: BORDER }}
    >
      {label != null && (
        <p className="font-medium mb-0.5" style={{ color: TEXT_2 }}>
          {String(label)}
        </p>
      )}
      {payload.map((entry, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full flex-shrink-0"
            style={{ background: entry.color }}
          />
          <span style={{ color: TEXT_4 }}>{entry.name}:</span>
          <span className="font-semibold tabular-nums" style={{ color: CREAM }}>
            {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

const axisProps = {
  tick: { fill: TEXT_4, fontSize: 11 },
  axisLine: { stroke: BORDER },
  tickLine: false as const,
}

const gridProps = {
  stroke: "oklch(100% 0 0)",
  strokeOpacity: 0.07,
  strokeDasharray: "3 3",
}

interface BarChartProps {
  data: Record<string, unknown>[]
  dataKeys: string[]
  xKey?: string
  className?: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
  colors?: string[]
}

function BarChart({
  data,
  dataKeys,
  xKey = "name",
  className,
  height = 280,
  showLegend = false,
  showGrid = true,
  colors = CHART_COLORS,
}: BarChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} barGap={4} barCategoryGap="30%">
          {showGrid && <CartesianGrid vertical={false} {...gridProps} />}
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} width={36} />
          <Tooltip content={(props) => <ChartTooltip {...(props as TooltipContentProps<number, string>)} />} cursor={{ fill: "oklch(100% 0 0 / 0.04)" }} />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: 11, color: TEXT_4, paddingTop: 12 }}
              iconType="circle"
              iconSize={6}
            />
          )}
          {dataKeys.map((key, i) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
              isAnimationActive
              animationDuration={600}
              animationEasing="ease-out"
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface LineChartProps {
  data: Record<string, unknown>[]
  dataKeys: string[]
  xKey?: string
  className?: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
  colors?: string[]
  curved?: boolean
}

function LineChart({
  data,
  dataKeys,
  xKey = "name",
  className,
  height = 280,
  showLegend = false,
  showGrid = true,
  colors = CHART_COLORS,
  curved = true,
}: LineChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          {showGrid && <CartesianGrid vertical={false} {...gridProps} />}
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} width={36} />
          <Tooltip content={(props) => <ChartTooltip {...(props as TooltipContentProps<number, string>)} />} cursor={{ stroke: BORDER, strokeWidth: 1 }} />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: 11, color: TEXT_4, paddingTop: 12 }}
              iconType="circle"
              iconSize={6}
            />
          )}
          {dataKeys.map((key, i) => (
            <Line
              key={key}
              type={curved ? "monotone" : "linear"}
              dataKey={key}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: colors[i % colors.length] }}
              isAnimationActive
              animationDuration={700}
              animationEasing="ease-out"
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

interface AreaChartProps {
  data: Record<string, unknown>[]
  dataKeys: string[]
  xKey?: string
  className?: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
  colors?: string[]
  curved?: boolean
  stacked?: boolean
}

function AreaChart({
  data,
  dataKeys,
  xKey = "name",
  className,
  height = 280,
  showLegend = false,
  showGrid = true,
  colors = CHART_COLORS,
  curved = true,
  stacked = false,
}: AreaChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data}>
          <defs>
            {dataKeys.map((key, i) => (
              <linearGradient key={key} id={`area-grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors[i % colors.length]} stopOpacity={0.22} />
                <stop offset="100%" stopColor={colors[i % colors.length]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          {showGrid && <CartesianGrid vertical={false} {...gridProps} />}
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} width={36} />
          <Tooltip content={(props) => <ChartTooltip {...(props as TooltipContentProps<number, string>)} />} cursor={{ stroke: BORDER, strokeWidth: 1 }} />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: 11, color: TEXT_4, paddingTop: 12 }}
              iconType="circle"
              iconSize={6}
            />
          )}
          {dataKeys.map((key, i) => (
            <Area
              key={key}
              type={curved ? "monotone" : "linear"}
              dataKey={key}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              fill={`url(#area-grad-${key})`}
              stackId={stacked ? "stack" : undefined}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: colors[i % colors.length] }}
              isAnimationActive
              animationDuration={700}
              animationEasing="ease-out"
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

interface PieChartDatum {
  name: string
  value: number
  color?: string
}

interface PieChartProps {
  data: PieChartDatum[]
  className?: string
  height?: number
  innerRadius?: number
  outerRadius?: number
  showLegend?: boolean
  colors?: string[]
}

function PieChart({
  data,
  className,
  height = 280,
  innerRadius = 60,
  outerRadius = 100,
  showLegend = true,
  colors = CHART_COLORS,
}: PieChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            paddingAngle={3}
            isAnimationActive
            animationDuration={700}
            animationEasing="ease-out"
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell
                key={entry.name}
                fill={entry.color ?? colors[i % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const item = payload[0]
              return (
                <div
                  className="rounded-lg border px-3 py-2.5 shadow-xl text-xs flex flex-col gap-1"
                  style={{ background: SURFACE_2, borderColor: BORDER }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-full flex-shrink-0"
                      style={{ background: item.payload?.fill }}
                    />
                    <span style={{ color: TEXT_2 }}>{item.name}</span>
                  </div>
                  <span className="font-semibold tabular-nums" style={{ color: CREAM }}>
                    {Number(item.value).toLocaleString()}
                  </span>
                </div>
              )
            }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: 11, color: TEXT_4, paddingTop: 12 }}
              iconType="circle"
              iconSize={6}
              formatter={(value) => (
                <span style={{ color: TEXT_2 }}>{value}</span>
              )}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

export { ChartContainer, BarChart, LineChart, AreaChart, PieChart }
export type { ChartContainerProps, BarChartProps, LineChartProps, AreaChartProps, PieChartProps, PieChartDatum }
