"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

# Generated by Django 4.2.15 on 2024-09-01 22:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('firstname', models.CharField(max_length=255)),
                ('lastname', models.CharField(max_length=255)),
                ('numberpre', models.CharField(blank=True, max_length=255, null=True)),
                ('number', models.IntegerField(blank=True, null=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('facebook', models.CharField(blank=True, max_length=255, null=True)),
                ('instagram', models.CharField(blank=True, max_length=255, null=True)),
                ('twitter', models.CharField(blank=True, max_length=255, null=True)),
                ('linkedIn', models.CharField(blank=True, max_length=255, null=True)),
                ('whatsapp', models.CharField(blank=True, max_length=255, null=True)),
                ('profileImage', models.TextField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('joined_date', models.DateTimeField(auto_now_add=True)),
                ('last_login', models.DateTimeField(auto_now=True)),
                ('position', models.CharField(blank=True, max_length=255)),
                ('groups', models.ManyToManyField(related_name='custom_user_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(related_name='custom_user_set', to='auth.permission')),
            ],
            options={
                'ordering': ['-last_login', '-joined_date', 'firstname', 'lastname'],
            },
        ),
        migrations.CreateModel(
            name='About',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('company_name', models.CharField(max_length=2555)),
                ('story', models.TextField(blank=True, null=True)),
                ('logo', models.TextField(blank=True, null=True)),
                ('phonenumberpre', models.CharField(default=0, max_length=15)),
                ('phonenumber', models.CharField(default=0, max_length=15)),
                ('emailone', models.EmailField(max_length=2555)),
                ('emailtwo', models.EmailField(blank=True, max_length=2555, null=True)),
                ('emailthree', models.EmailField(blank=True, max_length=2555, null=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('mission', models.TextField(blank=True, null=True)),
                ('values', models.TextField(blank=True, null=True)),
                ('achievements', models.JSONField(blank=True, null=True)),
                ('created_date', models.DateTimeField()),
                ('updated_date', models.DateTimeField()),
                ('branches', models.JSONField(blank=True, null=True)),
                ('policies', models.TextField(blank=True, null=True)),
                ('socials', models.JSONField(blank=True, null=True)),
                ('account_details', models.JSONField(blank=True, null=True)),
            ],
            options={
                'ordering': ['-created_date'],
            },
        ),
        migrations.CreateModel(
            name='Email',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('sender', models.CharField(max_length=2555)),
                ('recipient', models.CharField(max_length=2555)),
                ('subject', models.CharField(max_length=2555)),
                ('body', models.TextField()),
                ('sent_at', models.DateTimeField(auto_now_add=True)),
                ('read', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-sent_at', 'recipient'],
            },
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=2555)),
                ('description', models.TextField()),
                ('eventtype', models.CharField(choices=[('seminar', 'Seminar'), ('fundraiser', 'Fundraiser'), ('donation', 'Donation'), ('awareness', 'Awareness'), ('conference', 'Conference'), ('workshop', 'Workshop'), ('webinar', 'Webinar'), ('networking', 'Networking'), ('panel', 'Panel Discussion'), ('training', 'Training'), ('charity', 'Charity Event'), ('meetup', 'Meetup'), ('competition', 'Competition'), ('hackathon', 'Hackathon'), ('retreat', 'Retreat'), ('social', 'Social Event'), ('volunteering', 'Volunteering'), ('exhibition', 'Exhibition'), ('summit', 'Summit'), ('launch', 'Product Launch'), ('celebration', 'Celebration'), ('festival', 'Festival'), ('fundraising', 'Fundraising Event'), ('gala', 'Gala Dinner'), ('concert', 'Concert'), ('reunion', 'Reunion'), ('rally', 'Rally'), ('workshop', 'Workshop'), ('lecture', 'Lecture'), ('symposium', 'Symposium'), ('openhouse', 'Open House'), ('networking', 'Networking Event'), ('camp', 'Camp'), ('screening', 'Film Screening'), ('birthday', 'Birthday Party'), ('wedding', 'Wedding'), ('anniversary', 'Anniversary Celebration'), ('trade_show', 'Trade Show'), ('expo', 'Expo'), ('community', 'Community Event'), ('roundtable', 'Roundtable Discussion'), ('debate', 'Debate'), ('press_conference', 'Press Conference'), ('demonstration', 'Demonstration'), ('fund', 'Fundraising')], default='seminar', max_length=2555)),
                ('participants', models.JSONField()),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('media', models.JSONField(default=None)),
            ],
            options={
                'ordering': ['-end_date', 'start_date', 'title'],
            },
        ),
        migrations.CreateModel(
            name='Newsletter',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=2555)),
                ('sender', models.CharField(max_length=2555)),
                ('recipients', models.JSONField()),
                ('message', models.TextField()),
                ('is_sent', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField()),
                ('media', models.JSONField()),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Partners',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=2555)),
                ('description', models.TextField()),
                ('logo', models.TextField(blank=True, null=True)),
                ('link', models.URLField(max_length=2555)),
                ('created_date', models.DateField()),
            ],
            options={
                'ordering': ['-created_date', 'title'],
            },
        ),
        migrations.CreateModel(
            name='Payments',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('amount', models.IntegerField()),
                ('date_paid', models.DateTimeField()),
                ('contributor', models.CharField(max_length=2555)),
                ('reason', models.CharField(max_length=2555)),
                ('details', models.TextField()),
                ('image', models.TextField(blank=True, null=True)),
            ],
            options={
                'ordering': ['-date_paid', 'contributor', 'amount'],
            },
        ),
        migrations.CreateModel(
            name='Scholarship',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=2555)),
                ('description', models.TextField()),
                ('year', models.PositiveIntegerField()),
                ('token', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('amount_approved', models.DecimalField(decimal_places=2, max_digits=2555)),
                ('currency', models.CharField(choices=[('AED', 'UAE Dirham'), ('AFN', 'Afghani'), ('ALL', 'Lek'), ('AMD', 'Armenian Dram'), ('ANG', 'Netherlands Antillean Guilder'), ('AOA', 'Kwanza'), ('ARS', 'Argentine Peso'), ('AUD', 'Australian Dollar'), ('AWG', 'Aruban Florin'), ('AZN', 'Azerbaijan Manat'), ('BAM', 'Convertible Mark'), ('BBD', 'Barbados Dollar'), ('BDT', 'Taka'), ('BGN', 'Bulgarian Lev'), ('BHD', 'Bahraini Dinar'), ('BIF', 'Burundi Franc'), ('BMD', 'Bermudian Dollar'), ('BND', 'Brunei Dollar'), ('BOB', 'Boliviano'), ('BOV', 'Mvdol'), ('BRL', 'Brazilian Real'), ('BSD', 'Bahamian Dollar'), ('BTN', 'Ngultrum'), ('BWP', 'Pula'), ('BYN', 'Belarusian Ruble'), ('BZD', 'Belize Dollar'), ('CAD', 'Canadian Dollar'), ('CDF', 'Congolese Franc'), ('CHE', 'WIR Euro'), ('CHF', 'Swiss Franc'), ('CHW', 'WIR Franc'), ('CLF', 'Unidad de Fomento'), ('CLP', 'Chilean Peso'), ('CNY', 'Yuan Renminbi'), ('COP', 'Colombian Peso'), ('COU', 'Unidad de Valor Real'), ('CRC', 'Costa Rican Colon'), ('CUC', 'Peso Convertible'), ('CUP', 'Cuban Peso'), ('CVE', 'Cabo Verde Escudo'), ('CZK', 'Czech Koruna'), ('DJF', 'Djibouti Franc'), ('DKK', 'Danish Krone'), ('DOP', 'Dominican Peso'), ('DZD', 'Algerian Dinar'), ('EGP', 'Egyptian Pound'), ('ERN', 'Nakfa'), ('ETB', 'Ethiopian Birr'), ('EUR', 'Euro'), ('FJD', 'Fiji Dollar'), ('FKP', 'Falkland Islands Pound'), ('GBP', 'Pound Sterling'), ('GEL', 'Lari'), ('GHS', 'Ghana Cedi'), ('GIP', 'Gibraltar Pound'), ('GMD', 'Dalasi'), ('GNF', 'Guinean Franc'), ('GTQ', 'Quetzal'), ('GYD', 'Guyana Dollar'), ('HKD', 'Hong Kong Dollar'), ('HNL', 'Lempira'), ('HRK', 'Kuna'), ('HTG', 'Gourde'), ('HUF', 'Forint'), ('IDR', 'Rupiah'), ('ILS', 'New Israeli Sheqel'), ('INR', 'Indian Rupee'), ('IQD', 'Iraqi Dinar'), ('IRR', 'Iranian Rial'), ('ISK', 'Iceland Krona'), ('JMD', 'Jamaican Dollar'), ('JOD', 'Jordanian Dinar'), ('JPY', 'Yen'), ('KES', 'Kenyan Shilling'), ('KGS', 'Som'), ('KHR', 'Riel'), ('KMF', 'Comorian Franc'), ('KPW', 'North Korean Won'), ('KRW', 'Won'), ('KWD', 'Kuwaiti Dinar'), ('KYD', 'Cayman Islands Dollar'), ('KZT', 'Tenge'), ('LAK', 'Lao Kip'), ('LBP', 'Lebanese Pound'), ('LKR', 'Sri Lanka Rupee'), ('LRD', 'Liberian Dollar'), ('LSL', 'Loti'), ('LYD', 'Libyan Dinar'), ('MAD', 'Moroccan Dirham'), ('MDL', 'Moldovan Leu'), ('MGA', 'Malagasy Ariary'), ('MKD', 'Denar'), ('MMK', 'Kyat'), ('MNT', 'Tugrik'), ('MOP', 'Pataca'), ('MRU', 'Ouguiya'), ('MUR', 'Mauritius Rupee'), ('MVR', 'Rufiyaa'), ('MWK', 'Malawi Kwacha'), ('MXN', 'Mexican Peso'), ('MXV', 'Mexican Unidad de Inversion (UDI)'), ('MYR', 'Malaysian Ringgit'), ('MZN', 'Mozambique Metical'), ('NAD', 'Namibia Dollar'), ('NGN', 'Naira'), ('NIO', 'Cordoba Oro'), ('NOK', 'Norwegian Krone'), ('NPR', 'Nepalese Rupee'), ('NZD', 'New Zealand Dollar'), ('OMR', 'Rial Omani'), ('PAB', 'Balboa'), ('PEN', 'Sol'), ('PGK', 'Kina'), ('PHP', 'Philippine Peso'), ('PKR', 'Pakistan Rupee'), ('PLN', 'Zloty'), ('PYG', 'Guarani'), ('QAR', 'Qatari Rial'), ('RON', 'Romanian Leu'), ('RSD', 'Serbian Dinar'), ('RUB', 'Russian Ruble'), ('RWF', 'Rwanda Franc'), ('SAR', 'Saudi Riyal'), ('SBD', 'Solomon Islands Dollar'), ('SCR', 'Seychelles Rupee'), ('SDG', 'Sudanese Pound'), ('SEK', 'Swedish Krona'), ('SGD', 'Singapore Dollar'), ('SHP', 'Saint Helena Pound'), ('SLE', 'Leone'), ('SLL', 'Leone'), ('SOS', 'Somali Shilling'), ('SRD', 'Surinam Dollar'), ('SSP', 'South Sudanese Pound'), ('STN', 'Dobra'), ('SVC', 'El Salvador Colon'), ('SYP', 'Syrian Pound'), ('SZL', 'Lilangeni'), ('THB', 'Baht'), ('TJS', 'Somoni'), ('TMT', 'Turkmenistan New Manat'), ('TND', 'Tunisian Dinar'), ('TOP', 'Pa’anga'), ('TRY', 'Turkish Lira'), ('TTD', 'Trinidad and Tobago Dollar'), ('TWD', 'New Taiwan Dollar'), ('TZS', 'Tanzanian Shilling'), ('UAH', 'Hryvnia'), ('UGX', 'Uganda Shilling'), ('USD', 'US Dollar'), ('USN', 'US Dollar (Next day)'), ('UYI', 'Uruguay Peso en Unidades Indexadas (UI)'), ('UYU', 'Peso Uruguayo'), ('UYW', 'Unidad Previsional'), ('UZS', 'Uzbekistan Sum'), ('VED', 'Bolívar Soberano'), ('VES', 'Bolívar Soberano'), ('VND', 'Dong'), ('VUV', 'Vatu'), ('WST', 'Tala'), ('XAF', 'CFA Franc BEAC'), ('XAG', 'Silver'), ('XAU', 'Gold'), ('XBA', 'Bond Markets Unit European Composite Unit (EURCO)'), ('XBB', 'Bond Markets Unit European Monetary Unit (E.M.U.-6)'), ('XBC', 'Bond Markets Unit European Unit of Account 9 (E.U.A.-9)'), ('XBD', 'Bond Markets Unit European Unit of Account 17 (E.U.A.-17)'), ('XCD', 'East Caribbean Dollar'), ('XDR', 'SDR (Special Drawing Right)'), ('XOF', 'CFA Franc BCEAO'), ('XPD', 'Palladium'), ('XPF', 'CFP Franc'), ('XPT', 'Platinum'), ('XSU', 'Sucre'), ('XTS', 'Codes specifically reserved for testing purposes'), ('XUA', 'ADB Unit of Account'), ('XXX', 'The codes assigned for transactions where no currency is involved'), ('YER', 'Yemeni Rial'), ('ZAR', 'Rand'), ('ZMW', 'Zambian Kwacha'), ('ZWL', 'Zimbabwe Dollar')], default='NGN', max_length=3)),
                ('duration', models.CharField(max_length=2555)),
                ('created_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='ScholarshipApplicant',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=2555)),
                ('middle_name', models.CharField(blank=True, max_length=2555, null=True)),
                ('last_name', models.CharField(max_length=2555)),
                ('birthday', models.DateField()),
                ('home_address', models.CharField(max_length=2555)),
                ('email', models.EmailField(max_length=2555)),
                ('phone_number', models.CharField(max_length=2555)),
                ('guardian_parent_name', models.CharField(max_length=2555)),
                ('guardian_parent_home_address', models.CharField(max_length=2555)),
                ('guardian_parent_email', models.EmailField(max_length=2555)),
                ('guardian_parent_phone_number', models.CharField(max_length=2555)),
                ('name_of_institution', models.CharField(max_length=2555)),
                ('address_of_institution', models.CharField(max_length=2555)),
                ('class_level', models.CharField(choices=[('Nursery', 'Nursery'), ('Primary', 'Primary'), ('JSS', 'Junior Secondary School'), ('SSS', 'Senior Secondary School'), ('Tertiary', 'Tertiary')], max_length=2555)),
                ('qrcode', models.TextField(blank=True, null=True)),
                ('organisation_approved', models.BooleanField(default=False)),
                ('organisation_signature_date', models.DateField(blank=True, null=True)),
                ('candidate_signature_date', models.DateField()),
                ('scholarship', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applicants', to='api.scholarship')),
            ],
        ),
        migrations.CreateModel(
            name='Logs',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('action', models.CharField(max_length=2555)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('details', models.TextField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-date_created', 'user', 'action'],
            },
        ),
    ]