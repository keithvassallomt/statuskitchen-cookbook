/**
 * Recipe data types matching the schema from statuskitchen-recipes/recipes.json
 * and src/cookbook/github_client.rs
 */

export interface RecipesIndex {
	version: number;
	last_updated: string;
	recipes: RecipeIndexEntry[];
}

export interface RecipeIndexEntry {
	uuid: string;
	name: string;
	description: string;
	version: number;
	author: string;
	author_url: string;
	license: string;
	download_url: string;
	icon_url?: string;
	screenshot_url?: string;
	gnome_shell_versions: string[];
	tags: string[];
	/** URL to extensions.gnome.org if the extension is available there (enables installation without logout) */
	gnome_extensions_url?: string;
}
