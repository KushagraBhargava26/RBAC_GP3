from models import create_user, get_user

def seed_users():
    users = [
        ("admin", "admin@company.com", "Admin@123", "c-level"),
        ("finance", "finance@company.com", "Finance@123", "finance"),
        ("hr", "hr@company.com", "HR@123", "hr"),
        ("marketing", "marketing@company.com", "Marketing@123", "marketing"),
        ("employee", "employee@company.com", "Employee@123", "employees"),
    ]

    for username, email, password, role in users:
        # Avoid duplicate insertion
        if not get_user(email):
            create_user(username, email, password, role)
            print(f"✅ Created user: {email}")
        else:
            print(f"⚠️ User already exists: {email}")

    print("\n Sample users inserted successfully!")

if __name__ == "__main__":
    seed_users()