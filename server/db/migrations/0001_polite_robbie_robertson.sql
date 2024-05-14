CREATE TABLE `world_state` (
	`world_id` text NOT NULL,
	`state` text,
	`iterations` integer NOT NULL,
	FOREIGN KEY (`world_id`) REFERENCES `worlds`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `world_users` (
	`world_id` text NOT NULL,
	`userId` text NOT NULL,
	`user_color` text NOT NULL,
	FOREIGN KEY (`world_id`) REFERENCES `worlds`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `worlds` DROP COLUMN `users`;--> statement-breakpoint
ALTER TABLE `worlds` DROP COLUMN `state`;