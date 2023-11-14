import { type OAuthUserConfig, type OAuthConfig } from "next-auth/providers/oauth";
import { env } from "~/env.mjs";

export interface HomeAssistantProfile extends Record<string, unknown> {
  id: string;
}

export default function HomeAssistant<P extends HomeAssistantProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: "homeAssistant",
    name: "HomeAssistant",
    type: "oauth",
    authorization: { 
      url: `${env.HOME_ASSISTANT_URL}/auth/authorize`,
      params: { scope: "email profile" } 
    },
    token: `${env.HOME_ASSISTANT_URL}/auth/token`,
    client: {
      client_id: env.HOME_ASSISTANT_CLIENT_ID,
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    },
    userinfo: {
      url: '',
      async request() {
        return Promise.resolve({});
      }, 
    },
    checks: ["state"],
    profile() {
      return {
        id: "ttt",
      };
    },
    style: { logo: "/discord.svg", bg: "#5865F2", text: "#fff" },
    options,
  };
}
