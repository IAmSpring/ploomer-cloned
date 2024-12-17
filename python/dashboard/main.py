import streamlit as st
import requests
from datetime import datetime

st.set_page_config(
    page_title="Ploomer Clone Dashboard",
    page_icon="📊",
    layout="wide"
)

st.title("Ploomer Clone Dashboard")

# Health Check endpoint
def health_check():
    try:
        response = requests.get("http://localhost:8000/health")
        return response.json()
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Display health status
health_status = health_check()
if health_status["status"] == "healthy":
    st.success("All systems operational")
else:
    st.error(f"System error: {health_status.get('message', 'Unknown error')}")

# Display current time
st.sidebar.write(f"Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

# Main dashboard content
col1, col2 = st.columns(2)

with col1:
    st.header("System Status")
    st.metric(label="API Status", value="Online" if health_status["status"] == "healthy" else "Offline")

with col2:
    st.header("Quick Actions")
    if st.button("Refresh Dashboard"):
        st.experimental_rerun() 