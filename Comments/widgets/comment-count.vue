<template>
	<div class="comment-count">
		<icon name="comment-alt" class="icon" />
		{{commentCount}}
		<template v-if="commentCount == 1">comment</template>
		<template v-else>comments</template>
	</div>
</template>

<style lang="sass" scoped>
	.comment-count
		display: inline-block
		margin: 4px 0
		margin-right: 16px

	.icon
		color: #B10DC9
</style>

<script type="text/javascript">
	export default {
		props: ["post"],
		name: "comment-count",
		title: "Comment count",
		scope: "post",

		computed: {
			commentCount() {
				return (this.post.comments || []).length;
			}
		}
	};
</script>