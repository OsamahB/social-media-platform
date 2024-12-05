const subject = 'New Join Request';

const html = `
  <div>
    <h3>Dear {receiverName},</h3>
    <p>You have a new join request from {senderName} ({senderEmail}) for the event <strong>{eventTitle}</strong> on {eventDate}.</p>
    <p>Please login to your account to accept or reject the request.</p>
  </div>
`;

export default { subject, html };
