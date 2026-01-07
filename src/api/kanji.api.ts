import { KanjiItem } from '@/types/api.types';

const kanjiData: KanjiItem[] = [
    {
      id: "souzou",
      symbol: "創造",
      reading: "/sōzō/",
      meaning: "Creation; bringing something new into existence.",
      partOfSpeech: "noun",
    },
    {
        id: "kouchiku",
        symbol: "構築",
        reading: "/kōchiku/",
        meaning: "To build, construct, or architect systems and structures.",
        partOfSpeech: "noun",
    },
];

export async function getKanji(): Promise<KanjiItem[]> {
  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 150));
  return kanjiData;
}
