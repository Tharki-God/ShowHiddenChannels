import { PluginInjector, SettingValues } from "../index";
import { DiscordConstants, PermissionStore } from "../lib/requiredModules";
import { defaultSettings } from "../lib/consts";
import * as Types from "../types";
export const patchPermissions = (): void => {
  PluginInjector.after(PermissionStore, "can", (args: [number, Types.Channel], res) => {
    if (!args[1]?.isHidden?.()) return res;
    if (args[0] == DiscordConstants.Permissions.VIEW_CHANNEL)
      return (
        !SettingValues.get("blacklistedGuilds", defaultSettings.blacklistedGuilds)[
          args[1].guild_id
        ] &&
        SettingValues.get("channels", defaultSettings.channels)[
          DiscordConstants.ChanneTypes[args[1].type]
        ]
      );
    if (args[0] == DiscordConstants.Permissions.CONNECT) return false;

    return res;
  });
};
