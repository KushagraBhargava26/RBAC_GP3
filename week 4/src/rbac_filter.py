import json
import logging
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)

class RBACFilter:
    """
    RBACFilter handles the filtering of search results based on user roles and department access.
    """
    def __init__(self, config_path):
        self.config_path = config_path
        self.hierarchy = {}
        self.department_access = {}
        self.load_config()

    def load_config(self):
        """Loads the role hierarchy and department access from role_hierarchy.json."""
        try:
            if not os.path.exists(self.config_path):
                raise FileNotFoundError(f"Config file not found: {self.config_path}")
            
            with open(self.config_path, 'r') as f:
                config = json.load(f)
                self.hierarchy = config.get('hierarchy', {})
                self.department_access = config.get('department_access', {})
                logging.info(f"Successfully loaded RBAC configuration from {self.config_path}")
        except Exception as e:
            logging.error(f"Error loading RBAC configuration: {e}")
            raise

    def get_accessible_departments(self, user_role):
        """Returns a list of departments accessible by the given user role."""
        user_role = user_role.lower()
        # Find if the role exists in our configuration
        if user_role in self.department_access:
            return self.department_access[user_role]
        
        # Default behavior: if role is not found, only general access
        logging.warning(f"Role '{user_role}' not found in configuration. Defaulting to 'general' access.")
        return ["general"]

    def filter_by_role(self, user_role, search_results):
        """
        Filters search results based on the user's role.
        
        Args:
            user_role (str): The role of the user (e.g., 'finance', 'hr', 'c-level').
            search_results (list): A list of dictionaries, each containing 'content' and 'department' metadata.
            
        Returns:
            list: A list of accessible search results.
        """
        user_role = user_role.lower()
        accessible_departments = self.get_accessible_departments(user_role)
        
        filtered_results = []
        
        for result in search_results:
            doc_department = result.get('department', 'general')
            
            # Case insensitive match for department access
            if any(doc_department.lower() == access_dept.lower() for access_dept in accessible_departments):
                filtered_results.append(result)
                logging.info(f"ACCESS ALLOWED: Role '{user_role}' accessed document from department '{doc_department}'")
            else:
                logging.warning(f"ACCESS DENIED: Role '{user_role}' attempted to access document from department '{doc_department}'")
        
        return filtered_results

# Test Script
if __name__ == "__main__":
    # Define the config path relative to the script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    config_file = os.path.join(script_dir, "..", "config", "role_hierarchy.json")
    
    # Initialize RBAC Filter
    rbac = RBACFilter(config_file)
    
    # Sample search results with department metadata
    sample_results = [
        {"id": 1, "content": "Engineering Roadmap 2026", "department": "engineering"},
        {"id": 2, "content": "Q4 Financial Report", "department": "Finance"},
        {"id": 3, "content": "Employee Onboarding Guide", "department": "general"},
        {"id": 4, "content": "HR Disciplinary Actions", "department": "HR"},
        {"id": 5, "content": "Marketing Strategy Q1", "department": "marketing"}
    ]
    
    print("\n--- Testing Access for FINANCE User ---")
    finance_results = rbac.filter_by_role("finance", sample_results)
    print(f"Finance User saw {len(finance_results)} results.")
    
    print("\n--- Testing Access for HR User querying Finance docs ---")
    # This specifically tests if HR can see Finance docs (should be denied according to hierarchy)
    hr_finance_test = [
         {"id": 2, "content": "Q4 Financial Report", "department": "Finance"}
    ]
    hr_results = rbac.filter_by_role("hr", hr_finance_test)
    print(f"HR User saw {len(hr_results)} Finance results.")

    print("\n--- Testing Access for C-LEVEL User ---")
    clevel_results = rbac.filter_by_role("c-level", sample_results)
    print(f"C-Level User saw {len(clevel_results)} results.")

    print("\n--- Testing Access for EMPLOYEE User ---")
    employee_results = rbac.filter_by_role("employees", sample_results)
    print(f"Employee saw {len(employee_results)} results.")
