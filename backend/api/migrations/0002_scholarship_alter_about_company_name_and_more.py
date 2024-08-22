"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

# Generated by Django 4.2.15 on 2024-08-21 13:00

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Scholarship',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=2555)),
                ('middle_name', models.CharField(blank=True, max_length=2555, null=True)),
                ('last_name', models.CharField(max_length=2555)),
                ('profile_picture', models.TextField(blank=True, null=True)),
                ('birthday', models.DateField()),
                ('home_address', models.CharField(max_length=2555)),
                ('email', models.EmailField(max_length=2555)),
                ('phone_number', models.CharField(max_length=2555)),
                ('guardian_parent_name', models.CharField(max_length=2555)),
                ('guardian_parent_home_address', models.CharField(max_length=2555)),
                ('guardian_parent_email', models.EmailField(max_length=2555)),
                ('guardian_parent_phone_number', models.CharField(max_length=2555)),
                ('nursery', models.BooleanField(default=False)),
                ('primary', models.BooleanField(default=False)),
                ('secondary', models.BooleanField(default=False)),
                ('tertiary', models.BooleanField(default=False)),
                ('name_of_institution', models.CharField(max_length=2555)),
                ('address_of_institution', models.CharField(max_length=2555)),
                ('class_level', models.CharField(choices=[('Nursery', 'Nursery'), ('Primary', 'Primary'), ('JSS', 'Junior Secondary School'), ('SSS', 'Senior Secondary School'), ('Tertiary', 'Tertiary')], max_length=2555)),
                ('amount_approved', models.DecimalField(decimal_places=2, max_digits=2555)),
                ('year', models.PositiveIntegerField()),
                ('currency', models.CharField(choices=[('AED', 'United Arab Emirates Dirham'), ('AFN', 'Afghan Afghani'), ('ALL', 'Albanian Lek'), ('AMD', 'Armenian Dram'), ('ANG', 'Netherlands Antillean Guilder'), ('AOA', 'Angolan Kwanza'), ('ARS', 'Argentine Peso'), ('AUD', 'Australian Dollar'), ('AWG', 'Aruban Florin'), ('AZN', 'Azerbaijani Manat'), ('BAM', 'Bosnia and Herzegovina Convertible Mark'), ('BBD', 'Barbadian Dollar'), ('BDT', 'Bangladeshi Taka'), ('BGN', 'Bulgarian Lev'), ('BHD', 'Bahraini Dinar'), ('BIF', 'Burundian Franc'), ('BMD', 'Bermudian Dollar'), ('BND', 'Brunei Dollar'), ('BOB', 'Bolivian Boliviano'), ('BRL', 'Brazilian Real'), ('BSD', 'Bahamian Dollar'), ('BTN', 'Bhutanese Ngultrum'), ('BWP', 'Botswana Pula'), ('BYN', 'Belarusian Ruble'), ('BZD', 'Belize Dollar'), ('CAD', 'Canadian Dollar'), ('CDF', 'Congolese Franc'), ('CHF', 'Swiss Franc'), ('CLP', 'Chilean Peso'), ('CNY', 'Chinese Yuan'), ('COP', 'Colombian Peso'), ('CRC', 'Costa Rican Colón'), ('CUP', 'Cuban Peso'), ('CVE', 'Cape Verdean Escudo'), ('CZK', 'Czech Koruna'), ('DJF', 'Djiboutian Franc'), ('DKK', 'Danish Krone'), ('DOP', 'Dominican Peso'), ('DZD', 'Algerian Dinar'), ('EGP', 'Egyptian Pound'), ('ERN', 'Eritrean Nakfa'), ('ETB', 'Ethiopian Birr'), ('EUR', 'Euro'), ('FJD', 'Fijian Dollar'), ('FKP', 'Falkland Islands Pound'), ('FOK', 'Faroese Króna'), ('GBP', 'British Pound Sterling'), ('GEL', 'Georgian Lari'), ('GHS', 'Ghanaian Cedi'), ('GIP', 'Gibraltar Pound'), ('GMD', 'Gambian Dalasi'), ('GNF', 'Guinean Franc'), ('GTQ', 'Guatemalan Quetzal'), ('GYD', 'Guyanese Dollar'), ('HKD', 'Hong Kong Dollar'), ('HNL', 'Honduran Lempira'), ('HRK', 'Croatian Kuna'), ('HTG', 'Haitian Gourde'), ('HUF', 'Hungarian Forint'), ('IDR', 'Indonesian Rupiah'), ('ILS', 'Israeli New Shekel'), ('INR', 'Indian Rupee'), ('IQD', 'Iraqi Dinar'), ('IRR', 'Iranian Rial'), ('ISK', 'Icelandic Króna'), ('JMD', 'Jamaican Dollar'), ('JOD', 'Jordanian Dinar'), ('JPY', 'Japanese Yen'), ('KES', 'Kenyan Shilling'), ('KGS', 'Kyrgystani Som'), ('KHR', 'Cambodian Riel'), ('KID', 'Kiribati Dollar'), ('KMF', 'Comorian Franc'), ('KRW', 'South Korean Won'), ('KWD', 'Kuwaiti Dinar'), ('KYD', 'Cayman Islands Dollar'), ('KZT', 'Kazakhstani Tenge'), ('LAK', 'Laotian Kip'), ('LBP', 'Lebanese Pound'), ('LKR', 'Sri Lankan Rupee'), ('LRD', 'Liberian Dollar'), ('LSL', 'Lesotho Loti'), ('MAD', 'Moroccan Dirham'), ('MDL', 'Moldovan Leu'), ('MGA', 'Malagasy Ariary'), ('MKD', 'Macedonian Denar'), ('MMK', 'Myanma Kyat'), ('MNT', 'Mongolian Tugrik'), ('MOP', 'Macanese Pataca'), ('MRU', 'Mauritanian Ouguiya'), ('MUR', 'Mauritian Rupee'), ('MVR', 'Maldivian Rufiyaa'), ('MWK', 'Malawian Kwacha'), ('MXN', 'Mexican Peso'), ('MYR', 'Malaysian Ringgit'), ('MZN', 'Mozambican Metical'), ('NAD', 'Namibian Dollar'), ('NGN', 'Nigerian Naira'), ('NIO', 'Nicaraguan Córdoba'), ('NOK', 'Norwegian Krone'), ('NPR', 'Nepalese Rupee'), ('NZD', 'New Zealand Dollar'), ('OMR', 'Omani Rial'), ('PAB', 'Panamanian Balboa'), ('PEN', 'Peruvian Nuevo Sol'), ('PGK', 'Papua New Guinean Kina'), ('PHP', 'Philippine Peso'), ('PKR', 'Pakistani Rupee'), ('PLN', 'Polish Zloty'), ('PYG', 'Paraguayan Guarani'), ('QAR', 'Qatari Rial'), ('RON', 'Romanian Leu'), ('RSD', 'Serbian Dinar'), ('RUB', 'Russian Ruble'), ('RWF', 'Rwandan Franc'), ('SAR', 'Saudi Riyal'), ('SBD', 'Solomon Islands Dollar'), ('SCR', 'Seychellois Franc'), ('SDG', 'Sudanese Pound'), ('SEK', 'Swedish Krona'), ('SGD', 'Singapore Dollar'), ('SHP', 'Saint Helena Pound'), ('SLL', 'Sierra Leonean Leone'), ('SOS', 'Somali Shilling'), ('SRD', 'Surinamese Dollar'), ('SSP', 'South Sudanese Pound'), ('STN', 'São Tomé and Príncipe Dobra'), ('SYP', 'Syrian Pound'), ('SZL', 'Swazi Lilangeni'), ('THB', 'Thai Baht'), ('TJS', 'Tajikistani Somoni'), ('TMT', 'Turkmenistani Manat'), ('TND', 'Tunisian Dinar'), ('TOP', 'Tongan Paʻanga'), ('TRY', 'Turkish Lira'), ('TTD', 'Trinidad and Tobago Dollar'), ('TVD', 'Tuvaluan Dollar'), ('TZS', 'Tanzanian Shilling'), ('UAH', 'Ukrainian Hryvnia'), ('UGX', 'Ugandan Shilling'), ('USD', 'US Dollar'), ('UYU', 'Uruguayan Peso'), ('UZS', 'Uzbekistani Som'), ('VES', 'Venezuelan Bolívar'), ('VND', 'Vietnamese Dong'), ('VUV', 'Vanuatu Vatu'), ('WST', 'Samoan Tala'), ('XAF', 'CFA Franc BEAC'), ('XAG', 'Silver Ounce'), ('XAU', 'Gold Ounce'), ('XCD', 'East Caribbean Dollar'), ('XDR', 'Special Drawing Rights'), ('XOF', 'CFA Franc BCEAO'), ('XPF', 'CFP Franc'), ('YER', 'Yemeni Rial'), ('ZAR', 'South African Rand'), ('ZMW', 'Zambian Kwacha'), ('ZWL', 'Zimbabwean Dollar')], default='NGN', max_length=3)),
                ('duration', models.CharField(max_length=2555)),
                ('organisation_signature_date', models.DateField()),
                ('candidate_signature_date', models.DateField()),
                ('barcode', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='about',
            name='company_name',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='about',
            name='emailone',
            field=models.EmailField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='about',
            name='emailthree',
            field=models.EmailField(blank=True, max_length=2555, null=True),
        ),
        migrations.AlterField(
            model_name='about',
            name='emailtwo',
            field=models.EmailField(blank=True, max_length=2555, null=True),
        ),
        migrations.AlterField(
            model_name='email',
            name='recipient',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='email',
            name='sender',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='email',
            name='subject',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='event',
            name='title',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='event',
            name='type',
            field=models.CharField(choices=[('seminar', 'Seminar'), ('fundraiser', 'Fundraiser'), ('donation', 'Donation'), ('awareness', 'Awareness')], max_length=2555),
        ),
        migrations.AlterField(
            model_name='logs',
            name='action',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='notification',
            name='message',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='notification',
            name='recipient',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='partners',
            name='link',
            field=models.URLField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='partners',
            name='title',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='payments',
            name='contributor',
            field=models.CharField(max_length=2555),
        ),
        migrations.AlterField(
            model_name='payments',
            name='reason',
            field=models.CharField(max_length=2555),
        ),
    ]