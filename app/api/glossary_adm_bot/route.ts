import { Bot, GrammyError, HttpError } from "grammy";
import * as _ from "lodash";

const bot_token = _.get(process, "env.BOT_API_KEY", "token");
const bot = new Bot(bot_token);

// Reply to any message with "Hi there!".
bot.on("message", (ctx) => ctx.reply("Hi there!"));

bot.api.setMyCommands([
  {
    command: "get_glossary_name",
    description: "Get glossary name",
  },
]);
bot.command("get_glossary_name", async (ctx) => {
  await ctx.reply("name")
});

bot.catch((error) => {
  const ctx = _.get(error, "ctx", false);
  const updateId = _.get(ctx, "update.update_id", false);
  console.error(`Error while handling update ${updateId}:`);
  const e = error.error;

  if (e instanceof GrammyError) {
    console.error("Error in request", e.description);
  } else if (e instanceof HttpError) {
    console.log("Could not contact Telegram", e);
  } else {
    console.error("Unknown error:", e);
  }
});
bot.start();
