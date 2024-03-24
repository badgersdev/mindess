import { z } from "zod";

export const MediPrintSchema = z.object({
  sessionTime: z.coerce
    .number({
      required_error: "please tell me that you had 5 minutes chill :)",
    })
    .gt(4, { message: "Hey, im sure you chilled at least 5 minutes!" })
    .lt(241, { message: "maximum lenght of your session is 4 hours :(" }),
  mood: z
    .string({ required_error: "You need to share some feelings..." })
    .min(1, {
      message: "You need to pick one. I am sure you have some feelings",
    }),
  goldenThought: z.string().max(500, {
    message: "Long strory short please... Maximum 500 characters.",
  }),

  sessionDate: z.coerce.string(),
});
