import logging
from logging.handlers import TimedRotatingFileHandler
from datetime import datetime
from collections import Counter

class AuditLogger:
    def __init__(self, log_file="audit.log"):
        self.logger = logging.getLogger("AuditLogger")
        self.logger.setLevel(logging.INFO)

        formatter = logging.Formatter(
            "[%(asctime)s] [%(levelname)s] user=%(user_id)s role=%(role)s "
            "action=%(action)s endpoint=%(endpoint)s status=%(status)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )

        # File handler (daily rotation)
        file_handler = TimedRotatingFileHandler(
            log_file, when="midnight", interval=1, backupCount=7
        )
        file_handler.setFormatter(formatter)

        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)

        if not self.logger.handlers:
            self.logger.addHandler(file_handler)
            self.logger.addHandler(console_handler)

    def _log(self, level, user_id, role, action, endpoint, status):
        extra = {
            "user_id": user_id,
            "role": role,
            "action": action,
            "endpoint": endpoint,
            "status": status
        }
        self.logger.log(level, "", extra=extra)

    def log_login(self, user_id, role, status):
        self._log(
            logging.INFO,
            user_id=user_id,
            role=role,
            action="login",
            endpoint="/login",
            status=status
        )

    def log_access(self, user_id, role, action, endpoint):
        self._log(
            logging.INFO,
            user_id=user_id,
            role=role,
            action=action,
            endpoint=endpoint,
            status="allowed"
        )

    def log_denial(self, user_id, role, action, endpoint):
        self._log(
            logging.WARNING,
            user_id=user_id,
            role=role,
            action=action,
            endpoint=endpoint,
            status="denied"
        )

    def generate_summary_report(self, log_file="audit.log"):
        summary = {
            "total_events": 0,
            "by_status": Counter(),
            "by_role": Counter(),
            "by_action": Counter()
        }

        try:
            with open(log_file, "r") as f:
                for line in f:
                    summary["total_events"] += 1

                    if "status=" in line:
                        status = line.split("status=")[1].strip()
                        summary["by_status"][status] += 1

                    if "role=" in line:
                        role = line.split("role=")[1].split()[0]
                        summary["by_role"][role] += 1

                    if "action=" in line:
                        action = line.split("action=")[1].split()[0]
                        summary["by_action"][action] += 1

        except FileNotFoundError:
            return {"error": "Log file not found"}

        return summary
