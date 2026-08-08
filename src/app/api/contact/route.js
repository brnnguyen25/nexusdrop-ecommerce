export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: "All fields are required." },
        { status: 400 },
      );
    }

    // No email service is wired up yet — for now we just log it server-side.
    // A future module could send this via a service like Resend or SendGrid.
    console.log("New contact message:", { name, email, message });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
