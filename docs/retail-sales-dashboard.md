---
id: retail-sales-dashboard
title: Retail Sales Performance Dashboard
sidebar_label: Retail Sales Dashboard
description: An interactive Power BI dashboard on the Superstore dataset, sales, profitability, segments and regional performance.
keywords: [Power BI, DAX, dashboard, data visualization, business intelligence, retail analytics, Superstore, case study]
---

# Retail Sales Performance Dashboard

> **Business intelligence:** the Superstore dataset turned into an interactive Power BI
> dashboard a commercial team can actually click around in.

[![Code on GitHub](https://img.shields.io/badge/Code-GitHub-181717?logo=github)](https://github.com/Hamzas-github/retail-sales-dashboard-powerbi)
&nbsp;
![Power BI](https://img.shields.io/badge/Power%20BI-dashboard-F2C811?logo=powerbi&logoColor=black)
![DAX](https://img.shields.io/badge/DAX-measures-blue)
![Excel](https://img.shields.io/badge/Excel-data%20prep-217346?logo=microsoftexcel&logoColor=white)

## The question

Most of my other projects live in code, so I wanted one that lives where a lot of real
business reporting actually happens: Power BI. The brief I set myself was simple, take a
messy retail sales dataset and build a dashboard a manager could open and answer their
own questions from, without me in the room.

## At a glance

| Metric | Value |
|--------|-------|
| Total sales | **$2.30M** |
| Total profit | **$286K** |
| Total orders | **5K** |
| Profit margin | **12.5%** |

![Dashboard overview](/img/projects/retail-powerbi/dashboard-overview.png)

## How I built it

1. **Cleaned and shaped the data** (the Superstore sales extract) in Excel and Power
   Query, so the model was tidy before it hit the report.
2. **Wrote DAX measures** for sales, profit, margin and order counts so the cards and
   charts all share one consistent source of truth.
3. **Designed the report** around the questions a sales or category manager asks, with
   slicers for region, customer segment and product category so people can self-serve.

## Key findings

### Technology sells, furniture doesn't pay

Technology is the top revenue category, but furniture is the warning sign: strong sales,
weak profitability. A category that sells well isn't automatically a category that earns
well, and the dashboard makes that gap obvious at a glance.

![Profit by sub-category](/img/projects/retail-powerbi/profit-analysis.png)

### Profit hides at the sub-category level

Drilling into sub-categories, **copiers** are the most profitable line, while several
groups quietly run on thin or negative margins. This is the level a buyer actually acts
on, so it's where the dashboard puts its detail.

![Category analysis](/img/projects/retail-powerbi/category-analysis.png)

### A clear Q4 seasonal peak

Sales build toward the end of the year and peak in **November**, the same kind of
seasonal shape worth planning stock and staffing around rather than reading the year as
one flat average.

## What I'd tell the business

1. **Watch margin, not just sales.** Furniture's revenue masks a profitability problem.
2. **Manage at the sub-category level.** That's where copiers win and weak lines hide.
3. **Plan around the Q4 peak** instead of a flat monthly view.

## Tech stack

| Layer | Tools |
|-------|-------|
| Data prep | Excel, Power Query |
| Measures | DAX |
| Visualization | Power BI |
| Analysis | Sales, profitability, segment and regional breakdowns |

---

The dashboard file (.pbix), the dataset and full screenshots are
**[on GitHub](https://github.com/Hamzas-github/retail-sales-dashboard-powerbi)**.
