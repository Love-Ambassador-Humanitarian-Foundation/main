"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

class Html:
    """
    Generates an HTML newsletter template with a custom layout and styles.

    The template includes a title, image (which can be a base64 string or external URL), 
    article title, article body, and custom styles.
    """

    def newsletter_template(self, title, firstname,article_title, article_body):
        """
        Generates an HTML newsletter template with the provided content and styles.

        Args:
            title (str): The title of the newsletter.
            firstname (str): The recipient's first name.
            image_url (str): The base64 or external image URL to be displayed in the newsletter.
            article_title (str): The title of the article in the newsletter.
            article_body (str): The body of the article in the newsletter.

        Returns:
            str: A formatted HTML string for the newsletter.
        """


        return f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{title}</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333;">
            <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center; padding: 0; border-bottom: 1px solid #ddd;">
                    <h1 style="margin: 0; color: #34356b;">{title}</h1>
                </div>
                <div style="padding: 6px;">
                    <p style="margin: 10px 0; line-height: 1.6;">Hi {firstname},</p>
                    <h2 style="font-size: 24px; color: #34356b; margin-bottom: 10px;">{article_title}</h2>
                    <p style="margin: 10px 0; line-height: 1.6; font-size: 16px; color: #333;">{article_body}</p>
                </div>
                <div style="text-align: center; padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px; color: #888;">
                    <p>Thank you for reading our newsletter!</p>
                </div>
            </div>
        </body>
        </html>
        """

    def registration_complete_template(self,name, password ):
        return f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Registration Complete</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="padding: 6px;">
                        <p style="margin: 10px 0; line-height: 1.6;">Hi {name},</p>
                        <p style="margin: 10px 0; line-height: 1.6;">Your Registration is complete. Thank You for volunteering with us</p>
                        <p style="font-size: 14px;">Your password is </p>
                        <h3 style="font-size: 20px; color: #34356b; margin-bottom: 10px;">{password}</h3>
                        <small style="margin: 10px 0; line-height: 1.6; color: #333;">NB: your password is strictly confidential</small>
                    </div>
                    <div style="padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px; color: #888;">
                        <p>Best Regards</p>
                        <p>Executive Team</p>
                        <p>Love Ambassador Humanitarian Foundation (Lahf)</p>
                    </div>
                </div>
            </body>
            </html>
            """
    
    def email_verification_template(self, name, verification_link):
        return f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="padding: 6px;">
                        <p style="margin: 10px 0; line-height: 1.6;">Hi {name},</p>
                        <p style="margin: 10px 0; line-height: 1.6;">Thank you for registering with us! Please verify your email address to complete the registration process.</p>
                        <p style="margin: 10px 0; line-height: 1.6;">Click the button below to verify your email:</p>
                        <a href="{verification_link}" style="display: inline-block; padding: 12px 20px; background-color: #34356b; border: 1px solid #34356b !important; color: whitesmoke; text-decoration: none; font-size: 16px; border-radius: 0px; margin: 20px 0;">Verify Email</a>
                        <p>of click on the link given {verification_link}</p>
                        <p style="font-size: 14px; color: #555;">If you did not request this verification, please ignore this email.</p>
                    </div>
                    <div style="padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px; color: #888;">
                        <p>Best Regards</p>
                        <p>Executive Team</p>
                        <p>Love Ambassador Humanitarian Foundation (Lahf)</p>
                    </div>
                </div>
            </body>
            </html>
        """
    
    def password_confirmation_template(self, name, reset_link):
        return f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset Confirmation</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="padding: 6px;">
                        <p style="margin: 10px 0; line-height: 1.6;">Hi {name},</p>
                        <p style="margin: 10px 0; line-height: 1.6;">We received a request to reset your password. Please click the button below to set a new password.</p>
                        <a href="{reset_link}" style="display: inline-block; padding: 12px 20px; background-color: #34356b; border: 1px solid #34356b !important; color: whitesmoke; text-decoration: none; font-size: 16px; border-radius: 0px; margin: 20px 0;">Reset Password</a>
                        <p>or click on the link given {reset_link}</p>
                        <p style="font-size: 14px; color: #555;">If you did not request a password reset, please ignore this email.</p>
                    </div>
                    <div style="padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px; color: #888;">
                        <p>Best Regards</p>
                        <p>Executive Team</p>
                        <p>Love Ambassador Humanitarian Foundation (Lahf)</p>
                    </div>
                </div>
            </body>
            </html>
        """
    def password_changed_template(self, name, new_password):
        return f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Changed</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="padding: 6px;">
                        <p style="margin: 10px 0; line-height: 1.6;">Hi {name},</p>
                        <p style="margin: 10px 0; line-height: 1.6;">Your password has been successfully changed.</p>
                        <p style="margin: 10px 0; line-height: 1.6;">For your records, here is your new password:</p>
                        <h3 style="font-size: 20px; color: #34356b; margin-bottom: 10px;">{new_password}</h3>
                        <p style="margin: 10px 0; line-height: 1.6;">Please take the following precautions to keep your account secure:</p>
                        <ul style="margin: 10px 0; line-height: 1.6;">
                            <li>Do not share your password with anyone.</li>
                            <li>Use a unique password for each of your online accounts.</li>
                            <li>Change your password regularly and avoid using easily guessable passwords.</li>
                        </ul>
                        <p style="font-size: 14px; color: #555;">If you did not initiate this change, please contact our support team immediately.</p>
                    </div>
                    <div style="padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px; color: #888;">
                        <p>Best Regards</p>
                        <p>Executive Team</p>
                        <p>Love Ambassador Humanitarian Foundation (Lahf)</p>
                    </div>
                </div>
            </body>
            </html>
        """
    def scholarship_application_success_template(self, name, application_number, scholarship_name):
        return f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Scholarship Application Successful</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="padding: 6px;">
                        <p style="margin: 10px 0; line-height: 1.6;">Hi {name},</p>
                        <p style="margin: 10px 0; line-height: 1.6;">We are pleased to inform you that your scholarship application has been successfully received.</p>
                        <p style="margin: 10px 0; line-height: 1.6;">Here are the details of your application:</p>
                        <ul style="margin: 10px 0; line-height: 1.6;">
                            <li><strong>Application Number:</strong> {application_number}</li>
                            <li><strong>Scholarship Name:</strong> {scholarship_name}</li>
                        </ul>
                        <p style="margin: 10px 0; line-height: 1.6;">Our team will review your application and get back to you with the next steps soon.</p>
                        <p style="font-size: 14px; color: #555;">If you have any questions, please do not hesitate to contact us.</p>
                    </div>
                    <div style="padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px; color: #888;">
                        <p>Best Regards</p>
                        <p>Executive Team</p>
                        <p>Love Ambassador Humanitarian Foundation (Lahf)</p>
                    </div>
                </div>
            </body>
            </html>
        """
    
    def scholarship_application_approval_template(self, name, application_number, scholarship_name):
        return f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Scholarship Application Approved</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="padding: 6px;">
                        <p style="margin: 10px 0; line-height: 1.6;">Hi {name},</p>
                        <p style="margin: 10px 0; line-height: 1.6;">Congratulations! We are excited to inform you that your scholarship application has been approved.</p>
                        <p style="margin: 10px 0; line-height: 1.6;">Here are the details of your approved scholarship:</p>
                        <ul style="margin: 10px 0; line-height: 1.6;">
                            <li><strong>Application Number:</strong> {application_number}</li>
                            <li><strong>Scholarship Name:</strong> {scholarship_name}</li>
                        </ul>
                        <p style="margin: 10px 0; line-height: 1.6;">You will receive further instructions regarding the disbursement of the scholarship funds shortly.</p>
                        <p style="font-size: 14px; color: #555;">If you have any questions or need further information, please contact us.</p>
                    </div>
                    <div style="padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px; color: #888;">
                        <p>Best Regards</p>
                        <p>Executive Team</p>
                        <p>Love Ambassador Humanitarian Foundation (Lahf)</p>
                    </div>
                </div>
            </body>
            </html>
        """
    def scholarship_application_rejection_template(self, name, application_number, scholarship_name):
        return f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Scholarship Application Rejected</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="padding: 6px;">
                        <p style="margin: 10px 0; line-height: 1.6;">Hi {name},</p>
                        <p style="margin: 10px 0; line-height: 1.6;">Thank you for applying for the scholarship. We regret to inform you that your application has not been selected.</p>
                        <p style="margin: 10px 0; line-height: 1.6;">Here are the details of your application:</p>
                        <ul style="margin: 10px 0; line-height: 1.6;">
                            <li><strong>Application Number:</strong> {application_number}</li>
                            <li><strong>Scholarship Name:</strong> {scholarship_name}</li>
                        </ul>
                        <p style="margin: 10px 0; line-height: 1.6;">We appreciate the effort you put into your application. Please feel free to apply for other scholarship opportunities in the future.</p>
                        <p style="font-size: 14px; color: #555;">If you have any questions or need feedback on your application, please contact us.</p>
                    </div>
                    <div style="padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px; color: #888;">
                        <p>Best Regards</p>
                        <p>Executive Team</p>
                        <p>Love Ambassador Humanitarian Foundation (Lahf)</p>
                    </div>
                </div>
            </body>
            </html>
        """