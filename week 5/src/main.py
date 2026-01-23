"""
RBAC Chatbot API - FastAPI Application
Week 5: Backend Foundation

This is the main entry point for the FastAPI backend server.
"""

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from config import settings
from routes import auth_router, query_router, health_router
from middleware import LoggingMiddleware

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ==================== LIFESPAN EVENTS ====================
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup
    logger.info("🚀 Starting RBAC Chatbot API...")
    logger.info(f"📊 App: {settings.APP_NAME} v{settings.APP_VERSION}")
    logger.info(f"🔧 Debug mode: {settings.DEBUG}")
    
    # TODO: Initialize database connections
    logger.info("📁 Initializing database connections...")
    
    # TODO: Initialize vector database
    logger.info("🔍 Initializing vector database...")
    
    logger.info("✅ All services initialized successfully!")
    
    yield  # Application is running
    
    # Shutdown
    logger.info("🛑 Shutting down RBAC Chatbot API...")
    
    # TODO: Close database connections
    logger.info("📁 Closing database connections...")
    
    logger.info("👋 Goodbye!")


# ==================== CREATE APP ====================
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="""
    ## RBAC Chatbot API
    
    A Role-Based Access Control chatbot backend with:
    - 🔐 **Authentication** - User login and JWT tokens
    - 🔍 **Query** - Semantic search with RBAC filtering
    - ❤️ **Health** - Service health monitoring
    
    ### Features
    - Role-based document access control
    - Vector similarity search
    - LLM-powered responses (coming in Week 6)
    """,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)


# ==================== CORS MIDDLEWARE ====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== CUSTOM MIDDLEWARE ====================
app.add_middleware(LoggingMiddleware)


# ==================== ERROR HANDLERS ====================
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """
    Global exception handler for unhandled errors.
    """
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "detail": str(exc) if settings.DEBUG else "An unexpected error occurred"
        }
    )


@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    """
    Handler for 404 Not Found errors.
    """
    return JSONResponse(
        status_code=404,
        content={
            "error": "Not Found",
            "detail": f"Path '{request.url.path}' not found"
        }
    )


# ==================== INCLUDE ROUTERS ====================
app.include_router(auth_router)
app.include_router(query_router)
app.include_router(health_router)


# ==================== ROOT ENDPOINT ====================
@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint - API information.
    """
    return {
        "message": "Welcome to RBAC Chatbot API!",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "health": "/health"
    }


# ==================== RUN WITH UVICORN ====================
if __name__ == "__main__":
    import uvicorn
    
    logger.info(f"Starting server on {settings.HOST}:{settings.PORT}")
    
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    )
