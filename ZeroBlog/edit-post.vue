<template>
	<div class="content-container">
		<div class="content">
			<input class="post-title" placeholder="Title" v-model="value.title" @input="$emit('input', value)">

			<div class="post-info" v-if="showInfo">
				On {{(new Date(value.date)).toLocaleString()}}
				by <a @click="$router.navigate(value.userUrl)">{{value.user}}</a>
			</div>

			<div class="post-description">
				<trumbowyg v-model="value.content" :config="config" @input="$emit('input', value)" />
			</div>
		</div>
	</div>
</template>

<style lang="sass" scoped>
	@import "variables.sass"

	.content-container
		width: 700px
		margin-top: 32px

	.content
		display: block
		min-width: 500px
		margin-bottom: 50px


	.post-title
		width: 100%
		padding: 0
		margin: 0
		border: none

		font-family: Verdana, Arial, sans-serif
		font-size: 32px
		color: #222

	.post-info
		font-family: Verdana, Arial, sans-serif
		font-size: 16px
		color: #666

	.post-description
		font-family: Verdana, Arial, sans-serif
		font-size: 16px
		color: #222

		/deep/ zms-cut
			display: block
			width: 100%
			height: 1px
			margin: 16px 0

			border-bottom: 1px dashed #888

			&::before
				content: "[Read more]"
				color: #888
				font-size: 12px

				position: absolute
				margin-top: -8px
				padding-right: 8px
				background-color: #FFF


	.intro-button
		display: block
		margin: 16px 0

		font-family: Verdana, Arial, sans-serif
		font-size: 16px


</style>

<script language="text/javascript">
	export default {
		props: ["value", "showInfo"],
		name: "edit-post",
		data() {
			return {
				config: {
					btns: [
						["viewHTML"],
						["formatting"],
						["strong", "em", "del"],
						["superscript", "subscript"],
						["link"],
						["insertImage"],
						["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
						["unorderedList", "orderedList"],
						["cut"],
						["removeformat"],
						["fullscreen"]
					],
					btnsDef: {
						cut: {
							title: "Insert [Read more] button",
							text: "Read more",
							hasIcon: true,
							ico: "horizontalRule",

							fn: "insertHTML",
							param: "<zms-cut></zms-cut>"
						}
					},

					autogrow: true,
					semantic: false,
					imageWidthModalEdit: true
				}
			};
		}
	};
</script>