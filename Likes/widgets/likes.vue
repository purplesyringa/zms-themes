<template>
	<div :class="['likes', {liked}]">
		<icon name="heart" class="icon" @click.native="like" />
		{{likes}}
		<template v-if="likes == 1">like</template>
		<template v-else>likes</template>
	</div>
</template>

<style lang="sass" scoped>
	.likes
		display: inline-block
		margin: 4px 0
		margin-right: 16px

	.icon
		color: #CCC
	.liked .icon
		color: #FF5442
</style>

<script type="text/javascript">
	import PluginUtil from "plugin-util";

	export default {
		props: ["post"],
		name: "likes",
		title: "Likes",
		scope: "post",

		computed: {
			liked() {
				return this.post.liked && this.post.liked.length && this.post.liked[0].liked;
			},
			likes() {
				return this.post.likes ? this.post.likes[0].like_count : 0;
			}
		},

		methods: {
			async like() {
				await PluginUtil.DB.insert(
					"likes",
					{
						post_id_json_id: `${this.post.id}/${this.post.json_id}`
					}
				);
			}
		}
	};
</script>