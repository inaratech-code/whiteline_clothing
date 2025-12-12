/**
 * AI-Generated Image URLs for Menswear Products
 * These can be replaced with actual AI-generated images from services like:
 * - Midjourney
 * - DALL-E
 * - Stable Diffusion
 * - Or use AI image generation APIs
 */

export const AI_IMAGE_SERVICES = {
  // Placeholder service that generates AI images on demand
  placeholder: (text: string, width = 800, height = 1000) => 
    `https://placehold.co/${width}x${height}/000000/FFFFFF?text=${encodeURIComponent(text)}`,
  
  // Using Unsplash with AI-generated style filters
  unsplash: (query: string, width = 800) =>
    `https://source.unsplash.com/${width}x${width}/?${encodeURIComponent(query)}&sig=${Math.random()}`,
};

/**
 * Generate product image URLs based on product type
 */
export function getProductImages(category: 'shirts' | 'pants' | 'shorts', color?: string): string[] {
  const baseImages = {
    shirts: [
      'https://images.unsplash.com/photo-1594938291221-94f5044435e1?w=800&q=80',
      'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80',
      'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80',
    ],
    pants: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
      'https://images.unsplash.com/photo-1624378515194-6b8c57a2a1aa?w=800&q=80',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80',
    ],
    shorts: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
      'https://images.unsplash.com/photo-1624378515194-6b8c57a2a1aa?w=800&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80',
    ],
  };

  return baseImages[category] || baseImages.shirts;
}

/**
 * Generate AI image URL using placeholder service
 * Replace this with your actual AI image generation service
 */
export function generateAIImage(
  prompt: string,
  options: { width?: number; height?: number; style?: string } = {}
): string {
  const { width = 800, height = 1000, style = 'photorealistic' } = options;
  
  // Example: Replace with your AI image generation API
  // return `https://your-ai-service.com/generate?prompt=${encodeURIComponent(prompt)}&width=${width}&height=${height}&style=${style}`;
  
  // For now, using Unsplash with the prompt as search query
  return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(prompt)}&sig=${Date.now()}`;
}

