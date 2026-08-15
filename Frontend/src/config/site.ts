export const contactLinks = [
  { label: "Email", value: "51125katty@gmail.com", href: "mailto:51125katty@gmail.com" },
  { label: "GitHub", value: "@Kaipei0502", href: "https://github.com/Kaipei0502" },
  {
    label: "LinkedIn",
    value: "愷旆 張",
    href: "https://www.linkedin.com/in/%E6%84%B7%E6%97%86-%E5%BC%B5-82aa97221/",
  },
] as const;

export const navigationLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
] as const;
