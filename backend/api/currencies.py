"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

# currencies.py

# List of all world currencies

import pycountry

CURRENCY_CHOICES = [(currency.alpha_3, currency.name) for currency in pycountry.currencies]

# # Display the currency choices
# for code, name in CURRENCY_CHOICES:
#     print(f"('{code}', '{name}')")