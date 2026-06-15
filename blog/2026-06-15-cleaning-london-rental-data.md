---
slug: cleaning-messy-rental-data
title: "From 3,478 messy rows to 2,838 you can trust"
authors: [hamza]
tags: [data-analysis, python]
description: A short walkthrough of the data-cleaning decisions behind my London rental analysis.
---

Every analysis I've ever done has spent most of its time *before* the interesting
part. The London rental dataset was no exception: 3,478 raw rows in, **2,838** rows I
was willing to put my name on out. Here's how that gap closed — and why each decision
mattered.

{/* truncate */}

## The raw data lies to you politely

The Kaggle export looked clean at a glance, but a quick profile showed three problems:

1. **Non-residential listings.** Parking spaces, garages, and plots of land were mixed
   in with flats. They had no bedroom count and wildly different prices.
2. **No usable geography.** There was no tidy neighborhood column, and the
   `subdistrict_code` field was ~46% null.
3. **Prices as free text.** Currency symbols, commas, and the occasional outlier.

## The decisions

**Drop, don't impute, the essentials.** If a row was missing `price` or `bedrooms`,
I dropped it — 637 rows, almost all non-residential. Imputing a bedroom count for a
parking space would have been inventing data. For *contextual* fields (`location`,
`postcode`, `property_type`), I filled missing values with `"Unknown"` so I didn't
lose otherwise-good rows.

**Engineer the geography you need.** Since there was no clean area field, I parsed the
**postcode district (outcode)** and a readable **area name** out of the free-text
address. That single step is what made the entire geographic analysis — the ~9× premium
between Marylebone and Morden — possible.

**Constrain outliers, don't delete blindly.** I capped prices to a sane £1–£50,000/month
and bedrooms to 1–10, removing 3 clearly invalid rows. Zero exact duplicates.

## The honest caveat

The cleaned data still **over-represents prime central/west London**, so the headline
averages run high. I say so explicitly in the analysis, because a finding you can't
trust the boundaries of isn't a finding — it's a guess with a chart.

➡️ See the full project: **[London Rental Market Analysis](/projects/london-rental-analysis)**.
