export interface Experience {
  ID: number;
  COMPANY: string;
  ROLE: string;
  ST_DATE: string;
  END_DATE: string;
  SUMMARY: string;
  HIGHLIGHTS: string[];
  SKILLS: string[];
}

export interface Skill {
  ID: number;
  NAME: string;
  DISPLAY_ORDER: number;
}

export interface SkillCategory {
  ID: number;
  NAME: string;
  DESCRIPTION: string;
  DISPLAY_ORDER: number;
  SKILLS: Skill[];
}

export interface Profile {
  NAME: string;
  TITLE: string;
  DESCRIPTION: string;
  ABOUT_DESCRIPTION?: string | null;
  RESUME_LINK: string;
  EXPERIENCES: Experience[];
  SKILL_CATEGORIES: SkillCategory[];
}
