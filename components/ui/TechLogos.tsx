type LogoProps = { className?: string };

type IconComponent = (props: LogoProps) => JSX.Element;

export function AwsLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 17.2c5.1 3.8 12.6 3.3 17.2-.9-.3.5-.7 1-1.1 1.4-1.2 1.1-2.7 1.9-4.3 2.3-3.4.9-7-.2-9.5-2.4.4-.1.9-.2 1.3-.4h-.6zM4.2 15.1c-.2-.4-.3-.8-.4-1.2-.6-2.8.3-5.7 2.3-7.7 2.3-2.3 5.7-3.2 8.9-2.5-.9.8-1.7 1.7-2.4 2.7-1.8 2.5-2.6 5.6-2.2 8.6-.1 0-.1.1-.2.1zM19.8 8.4c.8 1.5 1.1 3.2.9 4.9-.1.8-.3 1.6-.6 2.3-.2.4-.4.8-.7 1.1.4-1.1.6-2.3.6-3.5 0-1.8-.5-3.5-1.5-5-.1.4-.2.8-.3 1.2z" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5.8 14.2c-4.2 3.1-10.1 2.4-13.4-1.7 4.3 3.5 10.5 3.2 14.4-.8.3-.4.6-.9.8-1.3-.6.5-1.2 1-1.8 1.5v-.7z" opacity="0.85" />
    </svg>
  );
}

export function AzureLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5.5 4.2 2 19.8h7.1l1.4-4.9 3.5 4.9h4.4L12.8 4.2H5.5zm2.1 11.5 1.8-6.2 3.2 6.2H7.6zM14.2 4.2l5.8 15.6h-4.1l-1.2-3.4-3.4 3.4h-1.1L14.2 4.2z" />
    </svg>
  );
}

export function GcpLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 10.2c.9 0 1.6-.7 1.6-1.6S12.9 7 12 7s-1.6.7-1.6 1.6.7 1.6 1.6 1.6z" />
      <path d="M17.8 11.4c-.3-1.7-1.3-3.2-2.7-4.2l-1.4 1.4c1 .8 1.7 2 1.9 3.3l2.2-.5z" />
      <path d="M8.3 7.2 6.9 5.8C5.1 7.2 3.9 9.3 3.6 11.7l2.2.5c.2-1.3.9-2.5 1.9-3.3l-.4-.7z" />
      <path d="M6.2 13.8c.5 2.2 2 4 4.1 4.9l.7-2.1c-1.3-.6-2.3-1.8-2.7-3.2l-2.1.4z" />
      <path d="M13 18.7c2.1-.9 3.6-2.7 4.1-4.9l-2.1-.4c-.4 1.4-1.4 2.6-2.7 3.2l.7 2.1z" />
      <path d="M12 4.5c4.1 0 7.6 2.7 8.7 6.5l-2.2.5C17.4 8.2 14.9 6.5 12 6.5S6.6 8.2 5.5 11.5l-2.2-.5C4.4 7.2 7.9 4.5 12 4.5z" opacity="0.7" />
    </svg>
  );
}

export function KubernetesLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5 9.8 8.5h4.4L12 2.5zM6.2 9.2l-5.2 3 4.5 2.6 1.9-3.3-1-2.3zm11.6 0-1 2.3 1.9 3.3 4.5-2.6-5.2-3zM12 10.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z" />
      <path d="M7.5 14.8 4 19.5l5.2-1.5 1.1-2.4-2.8-.8zm9 0-2.8.8 1.1 2.4 5.2 1.5-3.5-4.7zM12 14.8l-2.2 4.2h4.4L12 14.8z" opacity="0.85" />
    </svg>
  );
}

export function DockerLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M2 12.5h1.5v1.5H2v-1.5zm2.5 0h1.5v1.5H4.5v-1.5zm2.5 0H8.5v1.5H7v-1.5zm-5-2.5h1.5V11H2V10zm2.5 0h1.5V11H4.5V10zm2.5 0H8.5V11H7V10zm2.5 0h1.5V11H9.5V10zm2.5 0H14v1.5h-1.5V10zm-10-2.5h1.5v1.5H2V7.5zm2.5 0h1.5v1.5H4.5V7.5zm2.5 0H8.5v1.5H7V7.5zm2.5 0h1.5v1.5H9.5V7.5zm2.5 0H14v1.5h-1.5V7.5zm2.5 0h1.5v1.5H16.5V7.5zM16 14.5c-1.2 1.5-3.2 2.5-5.8 2.5-4.5 0-8.2-2.1-8.2-4.5h14c0 .3-.2.6-.5 1.2-.2.4-.3.6-.5.8z" />
      <path d="M18.5 10.5c-.3 0-.5.2-.5.5v2.5c0 2.2-1.8 4-4 4H12v-1.5h2c1.4 0 2.5-1.1 2.5-2.5v-2.5c0-.3-.2-.5-.5-.5h-2V10h2.5z" opacity="0.8" />
    </svg>
  );
}

export function PythonLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3C8.1 3 8 4.8 8 5.5v2h4v.5H6.5C4.5 8 3 9.4 3 12s1.5 4 3.5 4H8v-2.5c0-1.4 1.2-2.5 2.5-2.5h5c2 0 3.5-1.6 3.5-3.5V5.5C19 4.8 18.9 3 15 3h-3zm-1 1.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" />
      <path d="M12 21c3.9 0 4-.8 4-1.5v-2h-4v-.5h5.5c2 0 3.5-1.4 3.5-4s-1.5-4-3.5-4H16v2.5c0 1.4-1.2 2.5-2.5 2.5H9c-2 0-3.5 1.6-3.5 3.5v3C5.5 19.2 5.6 21 9.5 21h2.5zm1-1.5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" opacity="0.75" />
    </svg>
  );
}

export function SnowflakeLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2v4.5l-2.2-1.3-.8 1.4L12 8.8V12l-3.5-2V8.2l-1.4.8L6.3 7.6 4 8.9l1.4.8L4 11v2l1.4-.8-.8 1.4 2.3 1.3 1.4-.8V12l3.5 2v3.2l-2.2-1.3-.8 1.4L12 19.2V22h1.5v-2.8l2.2 1.3.8-1.4L13.5 17.2V14l3.5 2v1.8l1.4-.8 2.3 1.3-.8-1.4L19.8 15v-2l-1.4.8.8-1.4-2.3-1.3-1.4.8V14l-3.5-2V8.8l2.2 1.3.8-1.4L13.5 8.8V6.5l-1.5-.5V2H12z" />
    </svg>
  );
}

export function TerraformLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 3h7.5v7.5H3V3zm9 4.5h7.5V15H12V7.5zM3 13.5h7.5V21H3v-7.5z" />
    </svg>
  );
}

export function GithubLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.17-1.11-1.48-1.11-1.48-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

export function FigmaLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 2h4.5a4.5 4.5 0 0 1 0 9H8V2zm0 9h4.5a4.5 4.5 0 0 1 0 9H8v-9zm0 9h4a3 3 0 1 1-3-3v3zm-4-4.5a4 4 0 0 1 4-4V2a6 6 0 0 0 0 12v-3.5z" />
    </svg>
  );
}

export function SlackLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5.5 14.5A2 2 0 0 1 3.5 12a2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2zm0-5A2 2 0 0 1 3.5 7 2 2 0 0 1 5.5 5h2v2H5.5zm5 0V5a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2h-2a2 2 0 0 1-2-2zm5 0h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2v-2a2 2 0 0 1 2-2zm-5 9.5a2 2 0 0 1 2 2 2 2 0 0 1-2 2v-2a2 2 0 0 1 2-2h-2zm-5 0H3.5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2z" />
    </svg>
  );
}

export function JiraLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2 2 12l3.5 3.5L12 9l6.5 6.5L22 12 12 2zm0 8.5L5.5 17 12 22l6.5-5-6.5-6.5z" />
    </svg>
  );
}

export function OpenAiLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a6.2 6.2 0 0 0-5.8 4 6.5 6.5 0 0 0-2.5 8.2A6.2 6.2 0 0 0 12 22a6.2 6.2 0 0 0 5.8-4 6.5 6.5 0 0 0 2.5-8.2A6.2 6.2 0 0 0 12 2zm0 2.2c1.1 0 2.1.3 3 .8-.4.5-.9 1.1-1.3 1.7-.5-.2-1-.3-1.7-.3-2.8 0-5 2.2-5 5s2.2 5 5 5c.7 0 1.2-.1 1.7-.3.4.6.9 1.2 1.3 1.7a6 6 0 0 1-3 .8 4.8 4.8 0 1 1 0-9.6 6 6 0 0 1 0 .2zm4.2 1.5c.9.9 1.5 2.1 1.7 3.4-.6.3-1.2.5-1.9.6.1-.8 0-1.6-.3-2.3.2-.6.3-1.2.5-1.7zM8.8 8.5c.6-.3 1.2-.5 1.9-.6-.1.8 0 1.6.3 2.3-.5.1-1 .3-1.5.6-.3-.8-.5-1.6-.7-2.3z" />
    </svg>
  );
}

export function DatabricksLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2 3 7v10l9 5 9-5V7L12 2zm0 2.2 6.8 3.8L12 11.8 5.2 8 12 4.2zM5 9.3l6.5 3.6v7.3L5 16.7V9.3zm14 0v7.4l-6.5 3.5v-7.3L19 9.3z" />
    </svg>
  );
}

export function PostgresLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.5 2 6 4.2 6 7.2c0 1.5.6 2.8 1.6 3.7-.9.6-1.6 1.6-1.6 2.8 0 1.9 1.8 3.5 4 3.5h.5c.3 1.2 1.3 2 2.5 2.2v2.6h2V19c1.2-.2 2.2-1 2.5-2.2H18c2.2 0 4-1.6 4-3.5 0-1.2-.7-2.2-1.6-2.8 1-.9 1.6-2.2 1.6-3.7C22 4.2 19.5 2 16 2h-4zm0 2h4c2.2 0 3.5 1.2 3.5 3.2 0 1.2-.7 2.2-1.8 2.8l-.7.4.8.3c.8.3 1.2 1 1.2 1.8 0 1.1-1.2 2-2.5 2h-5c-1.3 0-2.5-.9-2.5-2 0-.8.4-1.5 1.2-1.8l.8-.3-.7-.4c-1.1-.6-1.8-1.6-1.8-2.8C8.5 5.2 9.8 4 12 4z" />
    </svg>
  );
}

export type TechStackItem = {
  name: string;
  Icon: IconComponent;
  color: string;
};

export const techStack: TechStackItem[] = [
  { name: "AWS", Icon: AwsLogo, color: "#FF9900" },
  { name: "Azure", Icon: AzureLogo, color: "#0078D4" },
  { name: "Google Cloud", Icon: GcpLogo, color: "#4285F4" },
  { name: "Kubernetes", Icon: KubernetesLogo, color: "#326CE5" },
  { name: "Docker", Icon: DockerLogo, color: "#2496ED" },
  { name: "Python", Icon: PythonLogo, color: "#3776AB" },
  { name: "Snowflake", Icon: SnowflakeLogo, color: "#29B5E8" },
  { name: "Databricks", Icon: DatabricksLogo, color: "#FF3621" },
  { name: "Terraform", Icon: TerraformLogo, color: "#7B42BC" },
  { name: "GitHub", Icon: GithubLogo, color: "#ffffff" },
  { name: "Figma", Icon: FigmaLogo, color: "#F24E1E" },
  { name: "Slack", Icon: SlackLogo, color: "#E01E5A" },
  { name: "Jira", Icon: JiraLogo, color: "#0052CC" },
  { name: "OpenAI", Icon: OpenAiLogo, color: "#10A37F" },
  { name: "PostgreSQL", Icon: PostgresLogo, color: "#4169E1" },
];
