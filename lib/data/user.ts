import type { User } from "@/lib/types/user";

export const USER = {
  firstName: "Bryan",
  lastName: "Palay",
  displayName: "Bryan Palay",
  username: "bry-ly",
  gender: "male",
  pronouns: "he/him",
  bio: "Creating with code. Small details matter.",
  flipSentences: [
    "Creating with code. Small details matter.",
    "Still Learning",
    "Student",
  ],
  address: "San Manuel, Puerto Princesa City, Palawan",
  phoneNumber: "MDkxOTc4MTI2OTc=", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "YnJ5YW5wYWxheTExOUBnbWFpbC5jb20", // base64 encoded
  website: "https://bryanpalay.me",
  jobTitle: "Design Engineer",
  jobs: [
    {
      title: "Student",
      company: "Fullbright College",
      website: "https://www.facebook.com/fullbrightcollegeofficial",
    },
  ],

  about: `
- **Design Engineer** & **Student** with a passion for building user-centric web applications.
- Proficient in **Next.js**, **React**, and **TypeScript**, focusing on clean code and performance.
- Always eager to learn new technologies and apply them to solve real-world problems.
- Enthusiastic about open source and contributing to the developer community.
- Dedicated to creating intuitive user experiences and pixel-perfect interfaces.
`,
  avatar: "/images/bryanpalay.jpg",
  ogImage:
    "https://assets.chanhdai.com/images/screenshot-og-image-light.png?v=4",
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
