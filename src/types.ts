export interface ShopeeProduct {
  id: string;
  title: string;
  price: string;
  url: string;
  imageUrl: string;
  category: string;
  sellingPoint: string;
}

export interface StoryboardFrame {
  sceneNo: number;
  visualPrompt: string; // Used to generate or display the visual
  imageUrl: string; // The generated/chosen image
  voiceover: string; // Thai text for speech
  subtitle: string; // On-screen text
  duration: number; // in seconds
}

export interface FunnyScript {
  productId: string;
  concept: string; // e.g. "พัดลมพกพาแต่กลายเป็นพัดลมเป่าหน้าผี"
  hook: string; // 3-second hook
  plotTwist: string; // The funny resolution
  title: string; // YouTube Shorts Title
  description: string; // YouTube Shorts Description & tags
  storyboard: StoryboardFrame[];
}

export interface AutomationJob {
  id: string;
  productId: string;
  productTitle: string;
  status: "idle" | "scraping" | "writing_script" | "generating_scenes" | "mixing_audio" | "uploading_youtube" | "completed" | "failed";
  progress: number; // 0 to 100
  script?: FunnyScript;
  youtubeUrl?: string;
  youtubeId?: string;
  createdAt: string;
  scheduledTime: string;
  logs: string[];
}

export interface AutomationSettings {
  shopeeSubId: string;
  automationInterval: string; // "6h" | "12h" | "24h" | "manual"
  tone: "extremely_funny" | "sarcastic" | "dramatic_twist" | "parody";
  categories: string[];
  autoUploadYoutube: boolean;
  hasYoutubeToken: boolean;
}
