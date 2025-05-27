// functions/index.js

// Import Cloud Functions v2 triggers and admin SDK
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
admin.initializeApp(); // Initializes the Firebase Admin SDK

// Import Nodemailer and its Google OAuth2 transport
const nodemailer = require("nodemailer");
const { google } = require("googleapis"); // For Google's OAuth2 client

/**
 * Firebase Cloud Function: sendOrderNotificationEmail
 *
 * This function triggers every time a new document is created in the 'orders' collection in Firestore.
 * It then sends a simple email notification to elsokrya2@gmail.com.
 */
exports.sendOrderNotificationEmail = onDocumentCreated(
  {
    document: "orders/{orderId}",
    region: "us-central1", // Explicitly setting the region for the function and its trigger
  },
  async (event) => {
    // Access credentials and sender email from environment variables (process.env)
    const client_id = process.env.GOOGLEAPI_CLIENT_ID;
    const client_secret = process.env.GOOGLEAPI_CLIENT_SECRET;
    const refresh_token = process.env.GOOGLEAPI_REFRESH_TOKEN;
    const sender_email = process.env.GOOGLEAPI_SENDER_EMAIL;

    // --- DEBUGGING LINE (keep this to see all env vars in logs) ---
    console.log("Current process.env variables:", process.env);
    // --- END DEBUGGING LINE ---

    if (!client_id || !client_secret || !refresh_token || !sender_email) {
      console.error(
        "OAuth credentials or sender email not configured using environment variables. Skipping email send."
      );
      return null; // Stop execution if credentials are missing
    }

    // Setup OAuth2 client for Nodemailer
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      "https://developers.google.com/oauthplayground" // This matches the redirect URI you set up
    );
    oAuth2Client.setCredentials({ refresh_token: refresh_token });

    // Configure the email transporter using OAuth2
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: sender_email, // The email address that will send the email (elsokrya2@gmail.com)
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: refresh_token,
        accessToken: (await oAuth2Client.getAccessToken()).token, // Get new access token using refresh token
      },
    });

    const snap = event.data;
    if (!snap) {
      console.log("No data associated with the event.");
      return null;
    }

    const orderId = snap.id; // Get the automatically generated ID of the order

    // Define the simple email content
    const mailOptions = {
      from: `El Sokrya Notifications <${sender_email}>`, // Sender display name and email address
      to: "elsokrya2@gmail.com", // Recipient email address
      subject: `New Order Notification! (#${orderId})`, // Simple email subject
      html: `
            <p>Hello El Sokrya,</p>
            <p>A new order has been placed on your website. Order ID: <strong>${orderId}</strong></p>
            <p>Please check your Firebase Console for full order details.</p>
            <p>Thank you!</p>
        `,
    };

    // Attempt to send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Simple notification email sent for order: ${orderId}`);
      return null; // Function completed successfully
    } catch (error) {
      console.error(
        `Error sending simple notification email for order ${orderId}:`,
        error
      );
      // Important: Log any error details from nodemailer if available
      if (error.response) {
        console.error(error.response);
      }
      return null; // Indicate completion even on error
    }
  }
);
