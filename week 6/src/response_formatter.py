"""
Response Formatter Module - Week 6
Handles formatting and structuring responses from the RBAC-enabled chatbot system.
Ensures consistent response structure with metadata, filtering, and role-based access control.
"""

import json
from typing import Any, Dict, List, Optional
from datetime import datetime
from enum import Enum


class ResponseStatus(Enum):
    """Status codes for responses."""
    SUCCESS = "success"
    PARTIAL = "partial"
    ERROR = "error"
    UNAUTHORIZED = "unauthorized"
    NOT_FOUND = "not_found"


class ResponseFormatter:
    """Formats and structures responses with metadata and RBAC compliance."""

    def __init__(self, include_metadata: bool = True):
        """
        Initialize the response formatter.
        
        Args:
            include_metadata: Whether to include metadata in responses
        """
        self.include_metadata = include_metadata

    def format_success(
        self,
        data: Any,
        message: str = "Operation successful",
        metadata: Optional[Dict] = None,
        role: Optional[str] = None
    ) -> Dict:
        """
        Format a successful response.
        
        Args:
            data: The response data
            message: Success message
            metadata: Optional metadata to include
            role: User role for context
            
        Returns:
            Formatted response dictionary
        """
        response = {
            "status": ResponseStatus.SUCCESS.value,
            "message": message,
            "data": data,
            "timestamp": datetime.utcnow().isoformat()
        }

        if self.include_metadata:
            response["metadata"] = metadata or {
                "role": role,
                "data_type": type(data).__name__,
                "data_size": len(data) if isinstance(data, (list, dict)) else 1
            }

        return response

    def format_error(
        self,
        error_message: str,
        error_code: str = "INTERNAL_ERROR",
        status: ResponseStatus = ResponseStatus.ERROR,
        details: Optional[Dict] = None
    ) -> Dict:
        """
        Format an error response.
        
        Args:
            error_message: Human-readable error message
            error_code: Error code identifier
            status: Response status
            details: Additional error details
            
        Returns:
            Formatted error response dictionary
        """
        response = {
            "status": status.value,
            "message": error_message,
            "error_code": error_code,
            "timestamp": datetime.utcnow().isoformat()
        }

        if details:
            response["details"] = details

        return response

    def format_unauthorized(
        self,
        message: str = "User does not have permission to access this resource",
        required_role: Optional[str] = None,
        user_role: Optional[str] = None
    ) -> Dict:
        """
        Format an unauthorized access response.
        
        Args:
            message: Unauthorized message
            required_role: Required role for access
            user_role: User's current role
            
        Returns:
            Formatted unauthorized response
        """
        details = {}
        if required_role:
            details["required_role"] = required_role
        if user_role:
            details["user_role"] = user_role

        return self.format_error(
            error_message=message,
            error_code="UNAUTHORIZED_ACCESS",
            status=ResponseStatus.UNAUTHORIZED,
            details=details if details else None
        )

    def format_not_found(
        self,
        resource_type: str,
        resource_id: str
    ) -> Dict:
        """
        Format a not found response.
        
        Args:
            resource_type: Type of resource not found
            resource_id: ID of the resource
            
        Returns:
            Formatted not found response
        """
        return self.format_error(
            error_message=f"{resource_type} not found",
            error_code="RESOURCE_NOT_FOUND",
            status=ResponseStatus.NOT_FOUND,
            details={
                "resource_type": resource_type,
                "resource_id": resource_id
            }
        )

    def format_partial(
        self,
        data: Any,
        message: str = "Partial results returned",
        excluded_count: int = 0,
        reason: Optional[str] = None,
        metadata: Optional[Dict] = None
    ) -> Dict:
        """
        Format a partial response (e.g., some records excluded due to RBAC).
        
        Args:
            data: The partial data returned
            message: Message explaining partial results
            excluded_count: Number of items excluded
            reason: Reason for exclusion
            metadata: Optional metadata
            
        Returns:
            Formatted partial response
        """
        response = {
            "status": ResponseStatus.PARTIAL.value,
            "message": message,
            "data": data,
            "excluded_count": excluded_count,
            "timestamp": datetime.utcnow().isoformat()
        }

        if reason:
            response["exclusion_reason"] = reason

        if self.include_metadata:
            response["metadata"] = metadata or {
                "total_requested": len(data) + excluded_count if isinstance(data, list) else 1,
                "returned": len(data) if isinstance(data, list) else 1,
                "excluded": excluded_count
            }

        return response

    def format_list_response(
        self,
        items: List[Any],
        total_count: int,
        page: int = 1,
        page_size: int = 10,
        role: Optional[str] = None
    ) -> Dict:
        """
        Format a paginated list response.
        
        Args:
            items: List of items
            total_count: Total count of items available
            page: Current page number
            page_size: Items per page
            role: User role
            
        Returns:
            Formatted list response with pagination
        """
        total_pages = (total_count + page_size - 1) // page_size

        response = {
            "status": ResponseStatus.SUCCESS.value,
            "message": f"Retrieved {len(items)} items",
            "data": items,
            "pagination": {
                "page": page,
                "page_size": page_size,
                "total_items": total_count,
                "total_pages": total_pages,
                "has_next": page < total_pages,
                "has_previous": page > 1
            },
            "timestamp": datetime.utcnow().isoformat()
        }

        if self.include_metadata:
            response["metadata"] = {
                "role": role,
                "item_count": len(items),
                "data_type": "list"
            }

        return response

    def format_search_results(
        self,
        results: List[Dict],
        query: str,
        total_matches: int,
        search_time_ms: float,
        filters_applied: Optional[Dict] = None,
        role: Optional[str] = None
    ) -> Dict:
        """
        Format search results response.
        
        Args:
            results: Search result items
            query: Search query executed
            total_matches: Total number of matches found
            search_time_ms: Time taken for search in milliseconds
            filters_applied: Filters that were applied
            role: User role
            
        Returns:
            Formatted search results response
        """
        response = {
            "status": ResponseStatus.SUCCESS.value,
            "message": f"Found {total_matches} matches",
            "data": results,
            "search_metadata": {
                "query": query,
                "total_matches": total_matches,
                "returned_count": len(results),
                "search_time_ms": search_time_ms
            },
            "timestamp": datetime.utcnow().isoformat()
        }

        if filters_applied:
            response["search_metadata"]["filters"] = filters_applied

        if self.include_metadata:
            response["metadata"] = {
                "role": role,
                "data_type": "search_results"
            }

        return response

    def to_json(self, response: Dict, pretty: bool = False) -> str:
        """
        Convert response to JSON string.
        
        Args:
            response: Response dictionary
            pretty: Whether to format as pretty JSON
            
        Returns:
            JSON string representation
        """
        if pretty:
            return json.dumps(response, indent=2, default=str)
        return json.dumps(response, default=str)

    @staticmethod
    def validate_response(response: Dict) -> bool:
        """
        Validate response structure.
        
        Args:
            response: Response to validate
            
        Returns:
            True if valid, False otherwise
        """
        required_fields = {"status", "message", "timestamp"}
        return all(field in response for field in required_fields)


class BatchResponseFormatter:
    """Formats batch operation responses with error handling."""

    def __init__(self, formatter: Optional[ResponseFormatter] = None):
        """
        Initialize batch response formatter.
        
        Args:
            formatter: Response formatter instance to use
        """
        self.formatter = formatter or ResponseFormatter()

    def format_batch_results(
        self,
        successful: List[Dict],
        failed: List[Dict],
        total_processed: int,
        role: Optional[str] = None
    ) -> Dict:
        """
        Format batch operation results.
        
        Args:
            successful: List of successful operations
            failed: List of failed operations
            total_processed: Total items processed
            role: User role
            
        Returns:
            Formatted batch response
        """
        failed_count = len(failed)
        success_count = len(successful)

        if failed_count == 0:
            return self.formatter.format_success(
                data={
                    "successful_operations": successful,
                    "total_processed": total_processed
                },
                message=f"Batch operation completed: {success_count} successful",
                role=role
            )
        else:
            return self.formatter.format_partial(
                data=successful,
                message=f"Batch operation partially completed",
                excluded_count=failed_count,
                reason="Some operations failed",
                metadata={
                    "successful": success_count,
                    "failed": failed_count,
                    "total": total_processed,
                    "failures": failed,
                    "role": role
                }
            )
