"use server";

import {
  generateProjectIdeas,
  type GenerateProjectIdeasInput,
} from "@/ai/flows/generate-project-ideas";
import {
  personalizedSkillJourney,
  type PersonalizedSkillJourneyInput,
} from "@/ai/flows/personalized-skill-journey";
import {
  provideProjectFeedback,
  type ProvideProjectFeedbackInput,
} from "@/ai/flows/provide-project-feedback";

export async function runPersonalizedSkillJourney(
  input: PersonalizedSkillJourneyInput
) {
  try {
    const result = await personalizedSkillJourney(input);
    return result;
  } catch (e: any) {
    return { error: e.message || "An unexpected error occurred." };
  }
}

export async function runGenerateProjectIdeas(
  input: GenerateProjectIdeasInput
) {
  try {
    const result = await generateProjectIdeas(input);
    return result;
  } catch (e: any) {
    return { error: e.message || "An unexpected error occurred." };
  }
}

export async function runProvideProjectFeedback(
  input: ProvideProjectFeedbackInput
) {
  try {
    const result = await provideProjectFeedback(input);
    return result;
  } catch (e: any) {
    return { error: e.message || "An unexpected error occurred." };
  }
}
