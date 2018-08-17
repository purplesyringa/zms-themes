<template>
	<div class="comment-count">
		<icon name="comment-alt" class="icon" />
		{{post.comments.length}} comments
	</div>
</template>

<style lang="sass" scoped>
	.comment-count
		display: inline-block

	.icon
		color: #B10DC9
</style>

<script type="text/javascript">
	export default {
		props: ["post"],
		name: "comment-count",
		title: "Comment count",
		scope: "post"
	};
</script>