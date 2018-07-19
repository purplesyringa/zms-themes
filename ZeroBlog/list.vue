<template>
	<div class="content-container">
		<div class="content">
			<!-- New post -->
			<theme-button
				class="new-post"
				v-if="isAuthor || siteInfo.settings.own"
				@click="$router.navigate('admin/posts/new-post')"
				value="Add new post"
			/>

			<div class="post" v-for="post in posts">
				<div class="post-title">
					<a @click="$router.navigate(post.url)">{{post.title}}</a>
				</div>

				<div class="post-info">
					On {{(new Date(post.date)).toLocaleString()}}
					by <a @click="$router.navigate(post.userUrl)">{{post.user}}</a>
				</div>
				<div class="post-description">
					<div v-html="post.cut"></div>

					<a @click="$router.navigate(post.url)">Read more</a>
				</div>
			</div>

			<!-- Pagination -->
			<div class="pagination">
				<div v-for="page in pageCount" :class="{page: true, 'page-current': currentPage === page}" @click="$router.navigate(`page/${page}`)">
					{{page}}
				</div>
			</div>
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

		position: relative


	.post
		display: block

		padding-bottom: 50px
		border-bottom: 1px solid #EEE
		margin-bottom: 50px


	.post-title
		font-family: Verdana, Arial, sans-serif
		font-size: 32px

		a
			border-bottom: none
			font-weight: normal

	.post-info
		font-family: Verdana, Arial, sans-serif
		font-size: 16px
		color: #666

	.post-description
		font-family: Verdana, Arial, sans-serif
		font-size: 16px
		color: #222


	.new-post
		display: inline-block

		position: absolute
		top: -58px
		left: 50%
		transform: translateX(-50%)

		background-color: #FFF
		color: #CACACA
		border: 1px solid #EEE


	// Pagination
	.pagination
		font-size: 0
		margin-bottom: 16px
	.page
		display: inline-block
		margin-right: 8px
		padding: 4px 8px

		font-family: Verdana, Arial, sans-serif
		font-size: 16px
		color: #FFF
		background-color: #222
	.page:hover
		background-color: #333
		cursor: pointer
	.page-current
		background-color: $accent-color
	.page-current:hover
		background-color: lighten($accent-color, 10%)
</style>

<script language="text/javascript">
	import {zeroAuth} from "../zero";
	import Posts from "../libs/posts.js";
	import Settings from "../libs/settings.js";
	import Users from "../libs/users.js";

	export default {
		props: [],
		name: "list",

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
			}
		},

		asyncComputed: {
			async pageCount() {
				const PAGE = await Settings.get("posts_per_page", 10);

				let all = await Posts.getCount();
				return Math.ceil(all / PAGE);
			},

			async currentPage() {
				let page = this.$router.currentParams.page || "1";
				return parseInt(page);
			},

			async posts() {
				let page = this.$router.currentParams.page || "1";
				page = parseInt(page);
				page--;

				const PAGE = await Settings.get("posts_per_page", 10);
				return await Posts.getList("", page * PAGE, PAGE);
			},

			async isAuthor() {
				const auth = zeroAuth.getAuth();
				if(!auth) {
					return false;
				}

				return await Users.hasRoleByAddress(auth.address, "author");
			}
		}
	};
</script>