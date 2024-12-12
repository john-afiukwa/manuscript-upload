import React from 'react';

interface NewManuscriptEmailProps {
  toEmail: string;
  user: {
    name: string;
    email: string;
  };
  title: string;
}

export const NewManuscriptEmailTemplate: React.FC<Readonly<NewManuscriptEmailProps>> = ({ user, title }) => {
  return (
    <div>
      <p>Dear Editor,</p>
      <p>
        A new manuscript has been submitted by {user.name}({user.email}) on the JBSMR Hub.
      </p>
      <p>
        <strong>Manuscript Title:</strong> {title}
      </p>
      <p>
        Please find the manuscript attached to this email.
      </p>
      <p>
        Best regards,<br />
        The JBSMR Hub Team
      </p>
    </div>
  );
};