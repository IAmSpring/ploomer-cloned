"""
API module initialization.
"""

from fastapi import FastAPI

app = FastAPI(
    title="Ploomer Clone API",
    description="Backend API for the Ploomer Clone platform",
    version="1.0.0"
)

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

# Import and include routers
from .routers import users, analytics, reports

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
app.include_router(reports.router, prefix="/reports", tags=["reports"]) 