"""Copyright (c) 2024 Esther Onyenoro

This software is licensed under [Proprietary License].
You may not modify, copy, or distribute this software without permission.
For more details, see the LICENSE file in the root of the repository."""

# newslettertemplate = f"""
#             <!DOCTYPE html>
#             <html>
#             <head>
#                 <title>News Letter</title>
#                 <style>
#                     body {{ font-family: Arial, 
#                             sans-serif; background-color: 
#                             #f4f4f4; margin: 0; padding: 0; color: #333; }}
#                     .container {{ max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }}
#                     .header {{ text-align: center; padding: 10px 0; border-bottom: 1px solid #ddd; }}
#                     .header h1 {{ margin: 0; color: #4CAF50; }}
#                     .content {{ padding: 20px; }}
#                     .content p {{ margin: 10px 0; line-height: 1.6; }}
#                     .verify-button {{ display: block; width: 200px; margin: 20px auto; padding: 10px 0; text-align: center; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; }}
#                     .footer {{ text-align: center; padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px; color: #888; }}
#                 </style>
#             </head>
#             <body>
#                 <div class="container">
#                     <div class="header">
#                         <h1>Email Verification</h1>
#                     </div>
#                     <div class="content">
#                         <p>Hi {user.firstname},</p>
#                         <p>Click the link below to verify your email address:</p>
#                         <a href="{verify_link}" class="verify-button">Verify Email</a>
#                         <p>If you did not request this email, please ignore it.</p>
#                     </div>
#                     <div class="footer">
#                         <p>Thank you for using our service!</p>
#                     </div>
#                 </div>
#             </body>
#             </html>
#             """

# logintemplate=""""""
# emailverificationtemplate=""""""
# pwdconfirmationemail=""""""
# pwdchangedtemplate=""""""
# scholarshipapplicantiontemplate=""""""
# scholarshipapprovaltemplate=""""""

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