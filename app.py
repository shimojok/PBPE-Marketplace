import streamlit as st
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="PBPE Dashboard", layout="wide")

# Sidebar
st.sidebar.title("PBPE Marketplace")
page = st.sidebar.radio("Navigation", ["Dashboard", "GHG Breakdown", "Finance"])

# -------------------------
# ダミーデータ（即表示用）
# -------------------------

summary = {
    "ghg_reduction_tco2e_per_year": 12500,
    "pbpe_issued_per_year": 82000,
    "pbpe_market_value_usd_per_year": 4100000
}

ghg_breakdown = pd.DataFrame([
    {"category": "Soil Carbon", "value": 5200},
    {"category": "Methane Reduction", "value": 3100},
    {"category": "Nitrous Oxide", "value": 1800},
    {"category": "Biochar", "value": 2400}
])

finance_data = pd.DataFrame([
    {"year": 2021, "value": 1200000},
    {"year": 2022, "value": 1800000},
    {"year": 2023, "value": 2600000},
    {"year": 2024, "value": 4100000}
])

# -------------------------
# Dashboard Page
# -------------------------
if page == "Dashboard":
    st.title("PBPE Dashboard")

    col1, col2, col3 = st.columns(3)
    col1.metric("GHG Reduction (tCO2e/yr)", summary["ghg_reduction_tco2e_per_year"])
    col2.metric("PBPE Issued (per yr)", summary["pbpe_issued_per_year"])
    col3.metric("Market Value (USD/yr)", summary["pbpe_market_value_usd_per_year"])

# -------------------------
# GHG Breakdown Page
# -------------------------
elif page == "GHG Breakdown":
    st.title("GHG Breakdown")

    fig = px.bar(ghg_breakdown, x="category", y="value", title="GHG Breakdown by Category")
    st.plotly_chart(fig, use_container_width=True)

# -------------------------
# Finance Page
# -------------------------
elif page == "Finance":
    st.title("Finance Overview")

    fig = px.line(finance_data, x="year", y="value", markers=True,
                  title="PBPE Market Value Over Time")
    st.plotly_chart(fig, use_container_width=True)
