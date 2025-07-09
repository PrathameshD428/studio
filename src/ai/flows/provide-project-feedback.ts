'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-driven feedback on user projects.
 *
 * - provideProjectFeedback - An async function that takes project data and returns feedback.
 * - ProvideProjectFeedbackInput - The input type for the provideProjectFeedback function.
 * - ProvideProjectFeedbackOutput - The return type for the provideProjectFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideProjectFeedbackInputSchema = z.object({
  projectDataUri: z
    .string()
    .describe(
      "A data URI of the user's project (image, video, etc.), that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('A description of the project, including the medium, techniques used, and goals.'),
  aspectsToEvaluate: z
    .array(z.enum(['composition', 'color', 'technique']))
    .describe('An array of aspects to evaluate in the project.'),
});
export type ProvideProjectFeedbackInput = z.infer<typeof ProvideProjectFeedbackInputSchema>;

const ProvideProjectFeedbackOutputSchema = z.object({
  feedback: z.object({
    composition: z.string().optional().describe('Feedback on the composition of the project.'),
    color: z.string().optional().describe('Feedback on the color palette and usage in the project.'),
    technique: z.string().optional().describe('Feedback on the techniques used in the project.'),
    overallImpression: z.string().describe('Overall impression and suggestions for improvement.'),
  }),
});
export type ProvideProjectFeedbackOutput = z.infer<typeof ProvideProjectFeedbackOutputSchema>;

export async function provideProjectFeedback(
  input: ProvideProjectFeedbackInput
): Promise<ProvideProjectFeedbackOutput> {
  return provideProjectFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideProjectFeedbackPrompt',
  input: {schema: ProvideProjectFeedbackInputSchema},
  output: {schema: ProvideProjectFeedbackOutputSchema},
  prompt: `You are an AI assistant providing feedback on creative projects.  You are to evaluate the provided project data, and provide detailed and constructive feedback on the aspects requested, and an overall impression. 

Project Description: {{{description}}}
Project Data: {{media url=projectDataUri}}

You must provide feedback on the following aspects:
{{#each aspectsToEvaluate}}
  - {{{this}}}
{{/each}}

Ensure that the feedback is specific, actionable, and helps the user improve their skills. In your overall impression, provide suggestions on how they can improve their project.

Make sure the 'composition', 'color', and 'technique' fields are only populated if they are present in the 'aspectsToEvaluate' input field.

Your response must be structured in JSON format as described by ProvideProjectFeedbackOutputSchema.
`,
});

const provideProjectFeedbackFlow = ai.defineFlow(
  {
    name: 'provideProjectFeedbackFlow',
    inputSchema: ProvideProjectFeedbackInputSchema,
    outputSchema: ProvideProjectFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
