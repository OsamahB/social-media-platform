const subject = 'Join Request Rejected';

const html = `
  <div>
    <h3>Dear {receiverName},</h3>
    <p>Your join request for the event <strong>{eventTitle}</strong> on {eventDate} has been rejected.</p>
    <p>Thank you for showing interest.</p>
  </div>
`;

export default { subject, html };
