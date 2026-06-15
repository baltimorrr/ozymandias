import type { Metadata } from "next";
import { StudyWithMeContainer } from "@/sections/study-with-me/StudyWithMeContainer";

export const metadata: Metadata = {
  title: "Study With Me",
};

export default function StudyWithMe() {
  return <StudyWithMeContainer />;
}
