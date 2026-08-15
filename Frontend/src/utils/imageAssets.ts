const profileImageModules = import.meta.glob<string>(
  "../assets/images/profile/profile.{jpg,jpeg,png,webp}",
  { eager: true, import: "default", query: "?url" },
);

const projectImageModules = import.meta.glob<string>(
  "../assets/images/projects/project-*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default", query: "?url" },
);

const profileImage = Object.values(profileImageModules)[0] ?? null;

const projectImages = new Map<number, string>();

Object.entries(projectImageModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .forEach(([path, imageUrl]) => {
    const match = path.match(/project-(\d+)\.(?:jpe?g|png|webp)$/i);
    if (!match) return;

    const projectId = Number(match[1]);
    if (!projectImages.has(projectId)) projectImages.set(projectId, imageUrl);
  });

export function getProfileImage(): string | null {
  return profileImage;
}

export function getProjectImageSources(projectId: number, apiImageUrl?: string): string[] {
  const localImage = projectImages.get(projectId);
  const remoteImage = apiImageUrl?.trim();

  return Array.from(new Set([localImage, remoteImage].filter((url): url is string => Boolean(url))));
}
