import { NewManuscriptEmailTemplate } from '@src/templates/new-manuscript';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewManuscriptNotification(title: string, downloadURL: string, user: { email: string, name: string }) {
  const emailToNotify = process.env.NOTIFY_EMAIL;
  if (!emailToNotify) {
    return console.error('sendNewManuscriptNotification: NOTIFY_EMAIL is not set');
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('sendNewManuscriptNotification:', { title, downloadURL, user });
    }

    if (process.env.NODE_ENV === 'production') {
      const { data, error } = await resend.emails.send({
        from: 'jbsmrhub <notifications@app.jbsmrhub.com>',
        to: [emailToNotify],
        subject: 'New Manuscript Submission',
        react: NewManuscriptEmailTemplate({ toEmail: emailToNotify, user, title }),
        replyTo: user.email,
        attachments: [
          {
            filename: `${title}.docx`,
            path: downloadURL,
          }
        ],
      });

      if (error) {
        throw error;
      }
      return Response.json(data);
    }
  } catch (error) {
    return console.error('Error sending email notification:', error);
  }
}