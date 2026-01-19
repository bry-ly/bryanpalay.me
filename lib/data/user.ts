import type { User } from "@/lib/types/user";

export const USER: User = {
  firstName: "Bryan",
  lastName: "Palay",
  displayName: "Bryan Palay",
  displayNameBaybayin: "ᜊ᜔ᜍ᜔ᜌᜈ᜔ ᜉᜎᜌ᜔",
  username: "bry-ly",
  gender: "male",
  pronouns: "he/him",
  bio: "Creating with code. Small details matter.",
  flipSentences: [
    "Fullstack Dev",
    "Student",
    "Creating with code. Small details matter.",
  ],
  address: "San Manuel, Puerto Princesa City, Palawan",
  phoneNumber: "MDkxOTc4MTI2OTc=", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "YnJ5YW5wYWxheTExOUBnbWFpbC5jb20", // base64 encoded
  website: "https://bryanpalay.me",
  jobTitle: "Design Engineer",

  about: `
- **Fullstack Dev** & **Student** with a passion for building user-centric modern web applications.
- Proficient in **Next.js**, **React**, and **TypeScript**, focusing on clean code and performance.
- Always eager to learn new technologies and apply them to solve real-world problems.
`,
  avatar: "/images/icon/bryanpalay.jpg",
  avatarAlt: "/images/icon/luffy.jpg",
  ogImage: "/images/luffy.jpg",
  namePronunciationUrl: "/audio/chanhdai.mp3",
  timeZone: "Asia/Manila",
  keywords: [
    "bryan palay",
    "bryan",
    "palay",
    "bry-ly",
    "bryanpalay",
    "design engineer",
    "web developer",
    "student",
  ],
  dateCreated: "2026-1-14", // YYYY-MM-DD
} satisfies User;
