---
id: london-rental-analysis
title: London Rental Market Analysis
sidebar_label: London Rental Analysis
description: End-to-end analysis of 2,838 London rental listings — cleaning, SQL, visualization, and a Power BI dashboard.
keywords: [data analysis, SQL, Python, pandas, Power BI, data visualization, case study]
---

# 🏙️ London Rental Market Analysis

> **End-to-end analytics:** raw CSV → cleaned SQLite database → SQL analysis →
> publication-quality Python visualizations → Power BI dashboard.

[![Code on GitHub](https://img.shields.io/badge/Code-GitHub-181717?logo=github)](https://github.com/Hamzas-github/london-rental-analysis)
&nbsp;
![Python](https://img.shields.io/badge/Python-3.13-3776AB?logo=python&logoColor=white)
![pandas](https://img.shields.io/badge/pandas-2.x-150458?logo=pandas&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-database-003B57?logo=sqlite&logoColor=white)
![Power BI](https://img.shields.io/badge/Power%20BI-dashboard-F2C811?logo=powerbi&logoColor=black)

## The question

**What actually drives rent in London, and where do you get the most space for your
money?** Using a public Kaggle dataset of London rental listings, I set out to
quantify the bedroom–price relationship, map the geographic premium, and find the
best *value* areas — while being honest about the dataset's sampling bias.

## At a glance

| Metric | Value |
|--------|-------|
| Properties analysed | **2,838** (from 3,478 raw) |
| Average monthly rent | **£2,825** |
| Median monthly rent | **£2,500** |
| Price range | **£95 – £39,000** |
| Most common size | **1 bedroom** (1,242 listings) |

## How I built it

The whole project is **reproducible end-to-end** — every artifact is generated from
the raw data by either the notebooks or a single headless script.

```
raw CSV  →  clean & validate (pandas)  →  SQLite DB  →  8 SQL queries  →  charts  →  Power BI
```

1. **Data cleaning (pandas).** Schema-agnostic column detection, currency parsing,
   and outlier handling. 3,478 raw rows → **2,838** clean rows (dropped listings
   missing an essential field like price/bedrooms — largely parking, garages, land).
2. **Feature engineering.** The raw data has no tidy neighborhood field, so I
   extracted the **postcode district (outcode)** and a readable **area name** from
   the free-text address, and derived `price_per_bed = price / bedrooms`.
3. **SQL analysis.** Loaded into SQLite and wrote **8 documented queries** answering
   each business question.
4. **Visualization.** 8 publication-quality charts at 300 DPI (Matplotlib/Seaborn).
5. **BI dashboard.** A Power BI dashboard for interactive exploration.

## Key findings

### 1 — Rent scales almost linearly with bedrooms

Rent climbs by roughly **£1,150 per extra bedroom** up to three beds, then flattens.
The marginal cost of the **4th** bedroom (+£449) is far smaller — so sharing a larger
flat sharply lowers per-person cost.

![Average rent by bedroom count](/img/projects/london-rental/01_rent_by_bedrooms.png)

| Bedrooms | Listings | Avg rent |
|---------:|---------:|---------:|
| 1 | 1,242 | £1,967 |
| 2 | 1,141 | £3,102 |
| 3 | 313 | £4,267 |
| 4 | 97 | £4,716 |
| 5 | 31 | £5,576 |

### 2 — A ~9× geographic premium

Among neighborhoods with **≥5 listings** (to avoid single-listing noise), the most
expensive area commands roughly **9×** the rent of the cheapest.

![Most expensive areas](/img/projects/london-rental/02_most_expensive_areas.png)

- **Most expensive:** Marylebone (£7,148), Knightsbridge (£6,348), Park Road (£6,167).
- **Cheapest:** Morden (£773), Mitcham (£780), Croydon (£792).

### 3 — Best value is in outer London

Measured by **rent per bedroom** — the most space per pound — the winners are
**Dagenham (£769/bed)**, Morden, Mitcham, Croydon and Edgware. The cheapest *headline*
areas and the best *value* areas largely overlap, and all sit away from the centre.

![Best value areas by rent per bedroom](/img/projects/london-rental/07_value_areas.png)

### 4 — A right-skewed market

The price distribution is right-skewed: **51.7%** of listings ask over £2,500/month,
while only 11.8% fall under £1,000. The median (£2,500) sits below the mean (£2,825)
because a long tail of prime-central listings pulls the average up.

![Price distribution](/img/projects/london-rental/04_price_distribution.png)

### 5 — Flats dominate supply

**Flats (1,201)** and **apartments (965)** make up ~76% of supply. The highest average
rents attach to low-volume premium types — mews, town houses, penthouses — so those
averages reflect prestige niches rather than the typical market.

![Average rent by property type](/img/projects/london-rental/08_rent_by_property_type.png)

## What I'd tell a renter

1. **Chase value, not headline price** — Dagenham, Morden and Mitcham give the most
   space per pound.
2. **Share to save** — the marginal cost per bedroom falls after the 3rd, so splitting
   a 3–4 bed materially cuts per-person rent.
3. **Look beyond the hotspots** — ~14% of listings cluster in five prime areas;
   widening the search opens up cheaper options.

## Being honest about the data

Good analysis names its own limits. The dataset **over-represents prime central/west
London** (Kensington, South Kensington and Earls Court alone are ~11% of listings), so
headline averages run **higher than a true London-wide figure**. The findings are best
read as **relative comparisons** (area vs area, bedroom vs bedroom) rather than
absolute market-wide rents. The raw CSV isn't redistributed (Kaggle terms); cleaned and
derived artifacts are committed so the analysis stays reproducible.

## Tech stack

| Layer | Tools |
|-------|-------|
| Data processing | Python, pandas, NumPy |
| Database | SQLite |
| Visualization | Matplotlib, Seaborn |
| Business intelligence | Power BI |
| Analysis | SQL, descriptive statistics |

---

👉 **[Full source, notebooks, and dashboard on GitHub →](https://github.com/Hamzas-github/london-rental-analysis)**
