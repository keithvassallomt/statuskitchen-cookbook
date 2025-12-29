/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'statuskitchen-cookbook',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			protect: ['production'].includes(input?.stage),
			home: 'aws',
			providers: {
				aws: {
					region: 'eu-west-1'
				}
			}
		};
	},
	async run() {
		// Existing ACM certificate in us-east-1 for *.statuskitchen.app
		const certificateArn =
			'arn:aws:acm:us-east-1:781345700122:certificate/a8fab219-2dab-4962-aa29-04fc015ef3a0';

		new sst.aws.SvelteKit('Cookbook', {
			domain: {
				name:
					$app.stage === 'production'
						? 'cookbook.statuskitchen.app'
						: `${$app.stage}.cookbook.statuskitchen.app`,
				dns: sst.aws.dns(),
				cert: certificateArn
			},
			// Set cache headers to avoid CloudFront invalidations
			// index.html: no-cache (always revalidate with ETag)
			// Hashed assets: immutable (SvelteKit already hashes filenames)
			assets: {
				versionedFilesCacheHeader: 'public,max-age=31536000,immutable',
				nonVersionedFilesCacheHeader: 'public,max-age=0,must-revalidate'
			}
		});
	}
});
