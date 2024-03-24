import { z } from "zod";

export const DiaryEntrySchema = z.object({
  gratefulThing: z
    .string()
    .min(1, { message: "It must be something you are grateful for ! :)" })
    .max(25, { message: "maximum 25 characters please... :)" }),

  ratherGood: z
    .string()
    .min(1, { message: "Something good must have happend today! :)" })
    .max(500, {
      message: "maximum 500 characters please :)",
    }),
  ratherBad: z.string().max(500, {
    message: "maximum 500 characters please :)",
  }),
});
