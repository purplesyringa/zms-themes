<template>
	<div class="content-container">
		<div class="content">
			<div class="post-title">
				{{post.title}}

				<!-- Edit post -->
				<icon
					name="edit"
					class="edit-post"
					v-if="post.editable || siteInfo.settings.own"
					@click.native="$router.navigate(post.editUrl)"
				/>
				<!-- Delete post -->
				<icon
					name="trash"
					class="delete-post"
					v-if="post.editable || siteInfo.settings.own"
					@click.native="remove"
				/>
			</div>

			<div class="post-info">
				On {{(new Date(post.date)).toLocaleString()}}
				by <a @click="$router.navigate(post.userUrl)">{{post.user}}</a>
			</div>
			<div class="post-description" v-html="post.content"></div>
		</div>
	</div>
</template>

<style lang="sass" scoped>
	@import "variables.sass"

	.content-container
		max-width: 700px
		margin-left: 240px
		padding-left: 60px
		padding-right: 60px
		padding-top: 60px

		float: left

	.content
		display: block
		min-width: 500px
		margin-bottom: 50px


	.post-title
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


	.edit-post, .delete-post
		display: inline-block
		width: 24px
		height: 24px
		color: #888

		&:hover
			color: $accent-color
			cursor: pointer
</style>

<script language="text/javascript">
	import {zeroPage} from "../zero";
	import Posts from "../libs/posts.js";

	export default {
		props: [],
		name: "post",
		data() {
			return {
				siteInfo: {
					settings: {
						own: false
					}
				}
			};
		},

		mounted() {
			this.$eventBus.$on("setSiteInfo", this.setSiteInfo);
			this.$eventBus.$emit("needSiteInfo");
		},
		destroyed() {
			this.$eventBus.$off("setSiteInfo", this.setSiteInfo);
		},

		methods: {
			setSiteInfo(siteInfo) {
				this.siteInfo = siteInfo;
			},

			async remove() {
				if(await zeroPage.confirm("Do you want to delete this post?", "Delete")) {
					let post = await Posts.get(this.$router.currentParams.id);
					await Posts.remove(post);

					this.$router.navigate("");
				}
			}
		},

		asyncComputed: {
			post: {
				async get() {
					return await Posts.get(this.$router.currentParams.id);
				},
				default: {
					title: "",
					content: "",
					date: 0,
					userUrl: "",
					user: ""
				}
			}
		}
	};
</script>