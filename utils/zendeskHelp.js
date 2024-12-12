/**
 * Allowed statuses for Zendesk tickets are:
   - open
   - pending
   - solved
 * The function returns "true" if the status update was successful, otherwise
 * it returns "false"
*/
export const updateZendeskStatus = async (ticketID, status) => {
  if (['open', 'pending', 'solved'].includes(status)) {
    const subdomain = process.env.NEXT_PUBLIC_ZENDESK_SUBDOMAIN;

    const data = {
      "ticket": {
        "status": status
      }
    }

    console.log(`Authorization: Basic ${process.env.NEXT_PUBLIC_ZENDESK_EMAIL}/token:${process.env.NEXT_PUBLIC_ZENDESK_API}`)

    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Basic ${process.env.NEXT_PUBLIC_ZENDESK_EMAIL}/token:${process.env.NEXT_PUBLIC_ZENDESK_API}`
      };
      const response = await fetch(
        `http://${subdomain}.zendesk.com/api/v2/tickets/${ticketID}.json`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers
        }
      );
      await response.json();
      return true
    } catch (error) {
      console.log(error)
      return false;
    }
  } else {
    return false
  }
}