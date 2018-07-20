<template>
	<div class="header-container" @click="$router.navigate('')">
		<div class="header">
			<div class="right">
				<customizable scope="layout" name="header-right" />
			</div>

			<div class="title">
				{{siteInfo.content.title}}
				<span title="Admin" v-if="isAuthor || siteInfo.settings.own" class="cog-container">
					<icon name="cog" scale="2" @click.native.stop="$router.navigate('admin')" class="cog" />
				</span>
				<span title="Manage widgets" v-if="siteInfo.settings.own" class="cog-container">
					<icon name="object-group" scale="2" @click.native.stop="manageCustomizable" :class="['cog', {'customizable-managed': $global.customizableManaged}]" />
				</span>
			</div>
			<div class="description">{{siteInfo.content.description}}</div>

			<div class="bottom">
				<customizable scope="layout" name="below-header" />
			</div>
		</div>
	</div>
</template>

<style lang="sass" scoped>
	@import "variables.sass"

	.header-container
		display: block
		background-color: $header-bg
		padding: 64px 0
		cursor: pointer
	.header
		display: block
		width: $view-width
		max-width: calc(100% - #{$hspacing})
		margin: 0 auto


	.title
		font-size: 64px
		color: #FFF

	.description
		font-size: 24px
		color: rgba(255, 255, 255, 0.8)

	.cog-container
		display: inline-block
		vertical-align: top
		margin-top: 24px

		.cog
			display: inline-block
			vertical-align: top

			color: rgba(255, 255, 255, 0.4)

			&:hover
				color: rgba(255, 127, 127, 0.6)
				cursor: pointer

			&.customizable-managed
				color: rgba(255, 127, 127, 0.6)


	.right
		float: right

	.bottom
		margin-top: 16px


	/deep/ .customizable .add
		color: rgba(255, 255, 255, 0.5)

		&:hover
			background-color: rgba(255, 255, 255, 0.5)
</style>

<script language="text/javascript">
	import {zeroAuth} from "../zero";
	import Users from "../libs/users.js";

	export default {
		props: [],
		name: "header",
		data() {
			return {
				siteInfo: {
					content: {
						title: "",
						description: ""
					},
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

			manageCustomizable() {
				this.$global.customizableManaged = !this.$global.customizableManaged;
			}
		},

		asyncComputed: {
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