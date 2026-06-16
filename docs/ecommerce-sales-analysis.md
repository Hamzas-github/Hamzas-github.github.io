---
id: ecommerce-sales-analysis
title: E-commerce Sales & Customer Analytics
sidebar_label: E-commerce Analytics
description: Two years of real online-retail transactions (~1M sales lines) turned into a commercial story — revenue seasonality, RFM segmentation, cohort retention, and a Power BI dashboard.
keywords: [data analysis, SQL, Python, pandas, Power BI, RFM, cohort analysis, customer analytics, e-commerce, retail, case study]
---

# 🛒 E-commerce Sales & Customer Analytics

> **End-to-end analytics:** raw Excel → cleaned SQLite database → SQL analysis →
> publication-quality Python visualizations → Power BI dashboard.

[![Code on GitHub](https://img.shields.io/badge/Code-GitHub-181717?logo=github)](https://github.com/Hamzas-github/ecommerce-sales-analysis)
&nbsp;
![Python](https://img.shields.io/badge/Python-3.13-3776AB?logo=python&logoColor=white)
![pandas](https://img.shields.io/badge/pandas-2.x-150458?logo=pandas&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-database-003B57?logo=sqlite&logoColor=white)
![Power BI](https://img.shields.io/badge/Power%20BI-dashboard-F2C811?logo=powerbi&logoColor=black)

## The question

I wanted a project that looked like the work a real data analyst does on the job —
not a tidy textbook dataset, but messy commercial data with a business leaning over
your shoulder asking *"so what should we do?"* So I picked two full years of real
transactions from a UK online retailer and set out to answer the questions a sales or
commercial team genuinely cares about: **Where is revenue going? Which products and
markets matter? Who are our best customers — and do they actually come back?**

## At a glance

| Metric | Value |
|--------|-------|
| Sales lines analysed | **1,003,214** |
| Total revenue | **£19.6M** |
| Orders | **39,516** |
| Average order value | **£497** |
| Customers / products / countries | **5,852 / 4,707 / 43** |

## How I built it

The whole project is **reproducible end-to-end** — every artifact is generated from
the raw data by either the notebooks or a single headless script.

```
raw .xlsx  →  clean & validate (pandas)  →  SQLite DB  →  SQL analysis  →  charts  →  Power BI
```

1. **Data cleaning (pandas).** ~1.07M raw rows → **1.0M** clean sales lines. I split
   out cancellations (invoices starting with `C`) into a separate returns table,
   dropped non-product line items (postage, bank charges, manual adjustments), kept
   only positive quantity and price, and derived `revenue = quantity × price`.
2. **Customer features.** Built an **RFM** table (Recency, Frequency, Monetary) and a
   **monthly cohort** matrix — the backbone of the customer analysis.
3. **SQL analysis.** Loaded into SQLite and answered **8 business questions** in SQL,
   including a `NTILE` window query for revenue concentration.
4. **Visualization.** 8 publication-quality charts at 300 DPI (Matplotlib/Seaborn).
5. **BI dashboard.** A Power BI dashboard for interactive exploration.

## Key findings

### 1 — Revenue is strongly seasonal

Sales build through the autumn and peak in **November** both years (£1.45M in
Nov 2011) — the wholesale run-up to Christmas — then fall away. That single pattern
should shape inventory, cash flow and marketing spend far more than a flat monthly
average would.

![Monthly revenue](/img/projects/ecommerce/01_monthly_revenue.png)

### 2 — A small core of customers drives the business

This was the headline. Scoring every customer on RFM and grouping them into segments,
the **Champions** are just **35% of customers but generate £13.1M — 67% of all
revenue.**

![Customer segments](/img/projects/ecommerce/04_rfm_segments.png)

![Revenue by segment](/img/projects/ecommerce/05_revenue_by_segment.png)

The commercial read is two clear plays: **retain the Champions** (loyalty perks, early
access, great service) and **win back the £2.2M "At Risk" group** before they go cold —
rather than blanket-discounting to everyone, which just burns margin on people who'd
buy anyway.

### 3 — Customers come back, but month-to-month retention is the weak spot

**72%** of identified customers order more than once — but the cohort view tells the
fuller story: first-month repeat rate averages only **~21%**, and retention settles in
the high-teens. The biggest growth lever here isn't acquisition; it's a **post-purchase
programme** to lift that early-retention curve.

![Cohort retention](/img/projects/ecommerce/06_cohort_retention.png)

### 4 — UK-first, with a handful of real export markets

The United Kingdom is **85.5%** of revenue. Among export markets, **EIRE, the
Netherlands, Germany and France** lead — the realistic place to look for international
growth.

![Revenue by country](/img/projects/ecommerce/03_revenue_by_country.png)

### 5 — Orders happen on weekday mornings

Orders cluster on **weekday mornings to mid-afternoon** and thin out on evenings and
weekends — a strong signal that this is a **wholesale / B2B** buyer base ordering during
office hours. That changes how you'd staff dispatch and time campaigns.

![Orders by time](/img/projects/ecommerce/07_orders_by_time.png)

## What I'd tell the business

1. **Plan around the autumn peak** — build inventory and marketing toward an
   August–November ramp, not a flat year.
2. **Protect and grow the Champions** — a third of customers fund two-thirds of the
   business; that relationship is the company's biggest asset.
3. **Fix the second purchase** — a focused win-back and post-purchase programme is
   worth more than chasing new logos.

## Being honest about the data

Good analysis names its own limits. About **22%** of line items have no customer ID —
they count toward revenue but are excluded from the customer-level analysis (RFM,
cohorts), which is standard for this dataset. The first and last months are partial, so
I don't read them as full-month totals. And the ordering pattern points to a mostly
**wholesale** retailer, so I'm careful not to over-generalise to consumer e-commerce.

## Tech stack

| Layer | Tools |
|-------|-------|
| Data processing | Python, pandas, NumPy |
| Database | SQLite |
| Visualization | Matplotlib, Seaborn |
| Business intelligence | Power BI |
| Analysis | SQL, RFM segmentation, cohort analysis |

---

👉 **[Full source, notebooks, and dashboard on GitHub →](https://github.com/Hamzas-github/ecommerce-sales-analysis)**
