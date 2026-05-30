import streamlit as st
import requests
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="PBPE Dashboard", layout="wide")

# Sidebar
st.sidebar.title("PBPE Marketplace")
page = st.sidebar.radio("Navigation", ["Dashboard", "GHG Breakdown", "Finance"])

# Backend API base URL
API_BASE = "https://pbpe-backend-production.up.railway.app/api"

# Dashboard Page
if page == "Dashboard":
    st.title("PBPE Dashboard")

    # Fetch summary
    summary_url = f"{API_BASE}/dashboard/summary"
    summary = requests.get(summary_url).json()

    col1, col2, col3 = st.columns(3)
    col1.metric("GHG Reduction (tCO2e/yr)", summary.get("ghg_reduction_tco2e_per_year", 0))
    col2.metric("PBPE Issued (per yr)", summary.get("pbpe_issued_per_year", 0))
    col3.metric("Market Value (USD/yr)", summary.get("pbpe_market_value_usd_per_year", 0))

# GHG Breakdown Page
elif page == "GHG Breakdown":
    st.title("GHG Breakdown")

    url = f"{API_BASE}/dashboard/ghg-breakdown"
    data = requests.get(url).json()

    df = pd.DataFrame(data["breakdown"])
    fig = px.bar(df, x="category", y="value", title="GHG Breakdown by Category")
    st.plotly_chart(fig, use_container_width=True)

# Finance Page
elif page == "Finance":
    st.title("Finance Overview")

    url = f"{API_BASE}/dashboard/finance"
    data = requests.get(url).json()

    df = pd.DataFrame(data["finance"])
    fig = px.line(df, x="year", y="value", title="PBPE Market Value Over Time")
    st.plotly_chart(fig, use_container_width=True)
