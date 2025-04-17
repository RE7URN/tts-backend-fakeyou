
require("dotenv").config();
const axios = require("axios");

const { TWITCH_CLIENT_ID, APP_ACCESS_TOKEN } = process.env;

async function deleteAllSubscriptions() {
  try {
    const res = await axios.get("https://api.twitch.tv/helix/eventsub/subscriptions", {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        "Authorization": `Bearer ${APP_ACCESS_TOKEN}`
      }
    });

    const subs = res.data.data;

    if (subs.length === 0) {
      console.log("✅ No hay suscripciones activas.");
      return;
    }

    for (const sub of subs) {
      await axios.delete("https://api.twitch.tv/helix/eventsub/subscriptions", {
        headers: {
          "Client-ID": TWITCH_CLIENT_ID,
          "Authorization": `Bearer ${APP_ACCESS_TOKEN}`
        },
        params: {
          id: sub.id
        }
      });
      console.log(`🗑️  Eliminada suscripción: ${sub.type} (${sub.id})`);
    }

    console.log("✅ Todas las suscripciones han sido eliminadas.");
  } catch (err) {
    console.error("❌ Error al eliminar suscripciones:", err.response?.data || err.message);
  }
}

deleteAllSubscriptions();
