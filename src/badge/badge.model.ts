import _ from "lodash";

export type BadgeType = "label" | "rounded";

export const badgeType = {
	label: "label" as BadgeType,
	rounded: "rounded" as BadgeType
};

export const supportedBadgeTypes: string[] = _.values<string>(badgeType);