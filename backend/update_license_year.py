"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

import os
import re
from datetime import datetime

# Configuration
def get_license_header(year):
    return f"""
\"\"\"Copyright (c) {year} Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository.\"\"\"

\n"""

def get_old_license_header_pattern():
    # Pattern to match any existing copyright notice
    return r"\"\"\"Copyright \(c\) [0-9]{4} .*?\"\"\""

def add_or_update_license_header(file_path, current_year):
    with open(file_path, 'r',encoding='ISO-8859-1') as file:
        content = file.read()

    # Create the current license header
    current_header = get_license_header(current_year).strip()

    # Create a pattern to match any existing copyright notice
    old_header_pattern = get_old_license_header_pattern()

    # Remove any existing copyright information
    updated_content = re.sub(
        old_header_pattern,
        '',
        content,
        flags=re.DOTALL
    ).strip()

    # Add the new license header at the beginning of the file
    updated_content = current_header + '\n\n' + updated_content

    with open(file_path, 'w') as file:
        file.write(updated_content)
    
    print(f"Added or updated license header in {file_path}")

def process_directory(directory, current_year):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.py'):
                file_path = os.path.join(root, file)
                add_or_update_license_header(file_path, current_year)

def main():
    current_year = datetime.now().year
    main_folder = '.'  # Set this to the path of your main folder if different
    process_directory(main_folder, current_year)

if __name__ == "__main__":
    main()