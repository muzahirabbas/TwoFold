// File: functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.joinCoupleWithCode = functions.https.onCall(async (data, context) => {
  // 1. Ensure the user is authenticated.
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to join a couple.",
    );
  }

  const inviteCode = data.code;
  const userId = context.auth.uid;

  if (!inviteCode || typeof inviteCode !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "A valid invite code must be provided.",
    );
  }

  // 2. Find the couple document with the matching invite code.
  const coupleQuery = db.collection("couples").where("inviteCode", "==", inviteCode).limit(1);
  const coupleSnapshot = await coupleQuery.get();

  if (coupleSnapshot.empty) {
    throw new functions.https.HttpsError(
      "not-found",
      "No couple found with this invite code.",
    );
  }

  const coupleDoc = coupleSnapshot.docs[0];
  const coupleData = coupleDoc.data();

  // 3. Perform validation checks.
  if (coupleData.memberIds.length >= 2) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "This couple is already full.",
    );
  }

  if (coupleData.memberIds.includes(userId)) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "You are already a member of this couple.",
    );
  }

  // 4. Use a transaction to safely update both documents.
  return db.runTransaction(async (transaction) => {
    const userRef = db.collection("users").doc(userId);

    // Update the couple: add the new member and set status to active.
    transaction.update(coupleDoc.ref, {
      memberIds: admin.firestore.FieldValue.arrayUnion(userId),
      status: "active",
    });

    // Update the user: add the coupleId to their profile.
    transaction.update(userRef, {
      coupleId: coupleDoc.id,
    });

    return {success: true, message: "Successfully joined the couple!"};
  });
});