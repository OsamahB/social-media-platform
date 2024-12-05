const subject = 'Join Request Accepted';

const html = `
  <div>
    <h3>Dear {receiverName},</h3>
    <p>Your join request for the event <strong>{eventTitle}</strong> on {eventDate} has been accepted.</p>
    <p>Thank you for joining the event.</p>
  </div>
`;

export default { subject, html };
