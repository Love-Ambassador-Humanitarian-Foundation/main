"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

from django.core.mail import send_mail
import base64
from io import BytesIO
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from django.core.mail import EmailMessage
from django.core.files.base import ContentFile
from django.conf import settings
import threading
class Utils:
    def __init__(self):
        self.thread = None

    def send_email_message(self, subject, message, from_email, recipient_list, html_message):
        """
        Send an email with the specified subject, message, and HTML content.

        Args:
            subject (str): The subject of the email.
            message (str): The plain text content of the email.
            from_email (str): The sender's email address.
            recipient_list (list): List of recipient email addresses.
            html_message (str): The HTML content of the email.

        Returns:
            dict: A dictionary with 'success' status and 'data' containing any error if occurred.
        """
        def send_email():
            try:
                
                # Create EmailMessage object
                msg = EmailMessage(
                    subject=subject,
                    body=html_message,
                    from_email=from_email,  # Your sender email from settings
                    to=recipient_list
                )
                msg.content_subtype = 'html'  # Set the email content to HTML

                # Send the email
                msg.send(fail_silently=False)
                print("Email sent successfully")
                return {'success': True, 'data': None}
            except Exception as error:
                print(f"Error sending email: {error}")
                return {'success': False, 'data': error}
        
        # Start a new thread to send the email
        self.thread = threading.Thread(target=send_email)
        self.thread.start()
        return {'success': True, 'data': None}

    def wait_for_email_to_send(self):
        """
        Wait for the email thread to complete.
        """
        if self.thread:
            self.thread.join()