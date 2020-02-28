import { ContextMessageUpdate } from 'telegraf';

export async function countResponseTime (ctx: ContextMessageUpdate, next: Function)  {
  const start = Number(new Date());
  console.log(ctx.from.first_name);
  await next(ctx);
  const ms = Number(new Date()) - start;
  console.log('Response time: %sms', ms);
}