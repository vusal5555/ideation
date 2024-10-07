import { Configuration, OpenAIApi } from "openai-edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generateImagePrompt(name: string) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a creative and helpful AI assistant capable of generating interesting thumbnail descriptions for my notes, Your output will be fetched into the DALLE API to generate a thumbnail. I want the description to be minimalistic and flat styled`,
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my note titled ${name}`,
        },
      ],
    });
    const data = await response.json();
    const image_description = data.choices[0].message.content;
    return image_description as string;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate image prompt");
  }
}

export async function generateImage(image_description: string) {
  try {
    const response = await openai.createImage({
      prompt: image_description,
      n: 1,
      size: "512x512",
    });
    const data = await response.json();
    const image_url = data.data[0].url;
    return image_url as string;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate image");
  }
}
