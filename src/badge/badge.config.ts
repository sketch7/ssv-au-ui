import { badgeType, BadgeType } from "./badge.model";

export interface BadgeConfig {
	type: BadgeType;
	color?: string;
}

export const badgeConfig: BadgeConfig = {
	type: badgeType.label
};