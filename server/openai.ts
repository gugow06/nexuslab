// Referenced from blueprint: javascript_openai_ai_integrations
import OpenAI from "openai";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

export async function generateCareerRoute(params: {
  currentPosition: string;
  targetPosition: string;
  skills: string[];
}): Promise<Array<{ title: string; description: string; skills: string[]; timeframe: string }>> {
  const prompt = `Generate a career roadmap from ${params.currentPosition} to ${params.targetPosition}. 
Current skills: ${params.skills.join(", ")}. 

Create a JSON array of 3-4 steps with:
- title: Position/milestone name
- description: What to achieve
- skills: Required skills (3-4 items)
- timeframe: Estimated duration

Return ONLY valid JSON array, no other text.`;

  const response = await openai.chat.completions.create({
    model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    max_completion_tokens: 2000,
  });

  const content = response.choices[0]?.message?.content || "{}";
  const parsed = JSON.parse(content);
  return parsed.steps || parsed.route || [];
}

export async function generateSkillRecommendations(params: {
  currentPosition: string;
  targetPosition: string;
}): Promise<Array<{ skill: string; reason: string; priority: "high" | "medium" | "low" }>> {
  const prompt = `Recommend skills needed to transition from ${params.currentPosition} to ${params.targetPosition}.

Create a JSON object with a "recommendations" array containing:
- skill: Skill name
- reason: Why it's important
- priority: "high", "medium", or "low"

Return ONLY valid JSON object, no other text.`;

  const response = await openai.chat.completions.create({
    model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    max_completion_tokens: 1500,
  });

  const content = response.choices[0]?.message?.content || "{}";
  const parsed = JSON.parse(content);
  return parsed.recommendations || [];
}

export async function generateLabFeedback(params: {
  labName: string;
  score: number;
  decisions: string[];
}): Promise<string> {
  const prompt = `Provide constructive feedback for a ${params.labName} simulation where the user scored ${params.score}/100. They made these decisions: ${params.decisions.join(", ")}.

Give 2-3 sentences of actionable feedback. Be encouraging but highlight areas for improvement.`;

  const response = await openai.chat.completions.create({
    model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    messages: [{ role: "user", content: prompt }],
    max_completion_tokens: 300,
  });

  return response.choices[0]?.message?.content || "Great effort! Keep practicing to improve your skills.";
}

export async function generateWellnessSuggestion(params: {
  mood: number;
  note?: string;
}): Promise<string> {
  const moodLabels = ["very low", "low", "okay", "good", "great"];
  const moodLabel = moodLabels[params.mood - 1] || "okay";
  
  const prompt = `The user is feeling ${moodLabel} (${params.mood}/5)${params.note ? ` and notes: "${params.note}"` : ""}. 

Provide a brief, actionable wellness suggestion (1-2 sentences) to help them maintain or improve their well-being.`;

  const response = await openai.chat.completions.create({
    model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    messages: [{ role: "user", content: prompt }],
    max_completion_tokens: 200,
  });

  return response.choices[0]?.message?.content || "Take care of yourself and remember to balance work with rest.";
}

export async function chatWithAI(messages: Array<{ role: "user" | "assistant"; content: string }>): Promise<string> {
  const systemMessage = {
    role: "system" as const,
    content: "You are Nexus.AI, a professional career mentor helping users advance their careers. Provide actionable, encouraging advice focused on professional development, skill building, and career strategy. Keep responses concise (2-3 paragraphs maximum)."
  };

  const response = await openai.chat.completions.create({
    model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
    messages: [systemMessage, ...messages],
    max_completion_tokens: 500,
  });

  return response.choices[0]?.message?.content || "I'm here to help with your career development. How can I assist you?";
}
