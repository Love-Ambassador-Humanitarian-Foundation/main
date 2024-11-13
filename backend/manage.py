"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import update_license_year  #Import the update_license script


def main():
    # Get the current year
    current_year = update_license_year.datetime.now().year
    
    # Call the function to update or add license headers
    # update_license_year.process_directory('.', current_year)

    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()