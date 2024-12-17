"""
Main FastAPI application entry point.
"""

from . import app

# This file is required for the Docker configuration to work correctly
# The app is imported from __init__.py where it is fully configured 