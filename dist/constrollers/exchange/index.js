"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const wizard_1 = __importDefault(require("telegraf/scenes/wizard"));
const select_from_1 = __importDefault(require("./select-from"));
const stepHandler = new telegraf_1.Composer();
stepHandler.action('next', (ctx) => {
    ctx.reply('Step 2. Via inline button');
    return ctx.wizard.next();
});
stepHandler.command('next', (ctx) => {
    ctx.reply('Step 2. Via command');
    return ctx.wizard.next();
});
stepHandler.use((ctx) => ctx.replyWithMarkdown('Press `Next` button or type /next'));
const exchange = new wizard_1.default('exchange', (ctx) => {
    console.log('step 1');
    ctx.reply('Step 1', telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.callbackButton('➡️ Next', 'next')
    ]).extra());
    return ctx.wizard.next();
}, select_from_1.default, (ctx) => {
    ctx.reply(ctx.message.text);
    if (ctx.message.text === 'next4') {
        ctx.reply('Step 4');
        return ctx.wizard.next();
    }
}, (ctx) => {
    ctx.reply('Done');
    return ctx.scene.leave();
});
exports.default = exchange;
//# sourceMappingURL=index.js.map