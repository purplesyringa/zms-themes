<template>
	<div class="comments">
		<h2>Comments</h2>

		<textarea placeholder="Write a response" v-model="newComment"></textarea>
		<theme-button value="Post comment" :small="true" @click="submit" />
		<div class="clearfix" />

		<div class="comment" v-for="comment in post.comments">
			{{comment}}
		</div>
	</div>
</template>

<style lang="sass" scoped>
	.clearfix
		clear: both
</style>

<script type="text/javascript">
	import PluginUtil from "plugin-util";

	export default {
		props: ["post"],
		name: "comments",
		title: "Comment list",
		scope: "post",

		data() {
			return {
				newComment: ""
			};
		},
		methods: {
			async submit() {
				await PluginUtil.DB.insert(
					"comments",
					{
						post_id: this.post.id,
						post_json_id: this.post.json_id,
						content: this.newComment,
						date: Date.now()
					}
				);

				this.newComment = "";
			}
		}
	};
</script>