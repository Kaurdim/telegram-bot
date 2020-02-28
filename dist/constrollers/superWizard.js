"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const wizard_1 = __importDefault(require("telegraf/scenes/wizard"));
const stepHandler = new telegraf_1.Composer();
const stepThree = new telegraf_1.Composer();
stepHandler.action('next', (ctx) => {
    ctx.reply('Step 2. Via inline button');
    return ctx.wizard.next();
});
stepHandler.command('next', (ctx) => {
    ctx.reply('Step 2. Via command');
    return ctx.wizard.next();
});
stepThree.action('back', (ctx) => {
    ctx.reply('back Step 2. inline button');
    return ctx.wizard.back();
});
stepThree.command('back', (ctx) => {
    ctx.reply(' back Step 2. Via command');
    return ctx.wizard.back();
});
stepHandler.use((ctx) => ctx.replyWithMarkdown('Press `Next` button or type /next'));
exports.superWizard = new wizard_1.default('super-wizard', (ctx) => {
    ctx.reply('Step 1', telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.urlButton('❤️', 'http://telegraf.js.org'), telegraf_1.Markup.callbackButton('➡️ Next', 'next')
    ]).extra());
    return ctx.wizard.next();
}, stepHandler, stepThree, (ctx) => {
    ctx.reply('Step 4');
    return ctx.wizard.next();
}, (ctx) => {
    ctx.reply('Done');
    return ctx.scene.leave();
});
//# sourceMappingURL=superWizard.js.map