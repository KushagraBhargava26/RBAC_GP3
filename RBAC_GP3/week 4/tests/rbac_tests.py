import os
import sys
import json
import unittest

# Ensure src is importable
TEST_DIR = os.path.dirname(__file__)
SRC_DIR = os.path.normpath(os.path.join(TEST_DIR, "..", "src"))
if SRC_DIR not in sys.path:
    sys.path.insert(0, SRC_DIR)

from rbac_filter import RBACFilter


class RBACValidationTests(unittest.TestCase):
    results = []

    @classmethod
    def setUpClass(cls):
        # Locate config file in week 4 config
        cls.config_path = os.path.normpath(os.path.join(TEST_DIR, "..", "config", "role_hierarchy.json"))
        cls.rbac = RBACFilter(cls.config_path)

    def run_case(self, test_name, role, search_results, expected_ids, query_type):
        filtered = self.rbac.filter_by_role(role, search_results)
        actual_ids = [doc.get('id') for doc in filtered]
        passed = set(actual_ids) == set(expected_ids)

        entry = {
            "test_name": test_name,
            "role": role,
            "query_type": query_type,
            "expected": expected_ids,
            "actual": actual_ids,
            "passed": passed
        }
        self.__class__.results.append(entry)

        # Assert for unittest reporting
        self.assertEqual(set(actual_ids), set(expected_ids), msg=f"{test_name} failed: expected {expected_ids}, got {actual_ids}")

    # 1. Finance user queries finance docs → ALLOWED ✅
    def test_finance_queries_finance(self):
        search = [
            {"id": 1, "content": "Q4 Financial Report", "department": "Finance"},
            {"id": 2, "content": "HR Policy", "department": "HR"}
        ]
        self.run_case("finance_queries_finance", "finance", search, [1], "finance_docs")

    # 2. Finance user queries HR docs → DENIED ❌
    def test_finance_queries_hr(self):
        search = [
            {"id": 10, "content": "HR Salary Bands", "department": "HR"},
            {"id": 11, "content": "General Handbook", "department": "general"}
        ]
        self.run_case("finance_queries_hr", "finance", search, [11], "hr_docs")

    # 3. HR user queries employee data → ALLOWED ✅
    def test_hr_queries_employee_data(self):
        search = [
            {"id": 20, "content": "Employee Records", "department": "HR"},
            {"id": 21, "content": "Finance Summary", "department": "Finance"}
        ]
        self.run_case("hr_queries_employee_data", "hr", search, [20], "employee_data")

    # 4. Marketing user queries finance → DENIED ❌
    def test_marketing_queries_finance(self):
        search = [
            {"id": 30, "content": "Marketing Plan", "department": "marketing"},
            {"id": 31, "content": "Budget Q1", "department": "Finance"}
        ]
        self.run_case("marketing_queries_finance", "marketing", search, [30], "finance_docs")

    # 5. C-Level queries all departments → ALLOWED ✅
    def test_clevel_queries_all(self):
        search = [
            {"id": 40, "content": "Q4 Financial Report", "department": "Finance"},
            {"id": 41, "content": "HR Policy", "department": "HR"},
            {"id": 42, "content": "Marketing Brief", "department": "marketing"},
            {"id": 43, "content": "Engineering Spec", "department": "engineering"}
        ]
        self.run_case("clevel_queries_all", "c-level", search, [40,41,42,43], "all_depts")

    # 6. Employee queries general handbook → ALLOWED ✅
    def test_employee_queries_general(self):
        search = [
            {"id": 50, "content": "Employee Handbook", "department": "general"},
            {"id": 51, "content": "Finance Metrics", "department": "Finance"}
        ]
        self.run_case("employee_queries_general", "employees", search, [50], "general_handbook")

    @classmethod
    def tearDownClass(cls):
        # Write results to output file
        out_path = os.path.normpath(os.path.join(TEST_DIR, "..", "output", "test_results.json"))
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(cls.results, f, indent=2)

        passed = sum(1 for r in cls.results if r.get('passed'))
        total = len(cls.results)
        print(f"\nTests Passed: {passed}/{total}")


if __name__ == '__main__':
    unittest.main(verbosity=2)
