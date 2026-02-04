# RBAC Test Report

Overview
- This document lists the RBAC validation test cases, their purpose, expected outcomes, and where results are stored.

Test Cases

1. finance_queries_finance
- Purpose: Verify that a user with the `finance` role can access Finance documents.
- Expected: Finance documents allowed; non-finance denied.

2. finance_queries_hr
- Purpose: Verify that `finance` role cannot access HR-only documents.
- Expected: HR documents denied; `general` is allowed.

3. hr_queries_employee_data
- Purpose: Verify that `hr` role can access HR/employee data.
- Expected: HR documents allowed; Finance denied.

4. marketing_queries_finance
- Purpose: Verify that `marketing` role cannot access Finance documents.
- Expected: Marketing and general allowed; Finance denied.

5. clevel_queries_all
- Purpose: Verify that `c-level` role can access documents across all departments.
- Expected: All departmental documents allowed.

6. employee_queries_general
- Purpose: Verify that `employees` (non-privileged users) can access `general` handbook content only.
- Expected: General allowed; departmental docs denied.

Test Execution and Results
- The test suite is `week 4/tests/rbac_tests.py` and writes results to `week 4/output/test_results.json`.
- Each result entry contains: `test_name`, `role`, `query_type`, `expected`, `actual`, `passed`.

Notes and Issues
- Tests use the configuration in `week 4/config/role_hierarchy.json`.
- If the config changes, expected outcomes may need updates.

Next Steps
- Run the tests via: `python -m unittest week\ 4.tests.rbac_tests` or run the script directly from the `week 4/tests` folder.
- Review the generated `week 4/output/test_results.json` and update this report with observed run-time results.
