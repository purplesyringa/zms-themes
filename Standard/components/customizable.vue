<template>
	<div class="customizable">
		<div class="add" v-if="siteInfo.settings.own">
			<icon class="add-icon" name="plus" />
		</div>
	</div>
</template>

<style lang="sass" scoped>
	.add
		display: inline-block
		width: 40px
		height: 40px
		padding: 8px

		border: 2px dotted
		border-radius: 8px
		color: rgba(0, 0, 0, 0.5)

		.add-icon
			width: 20px
			height: 20px


		&:hover
			border: 2px solid transparent
			background-color: rgba(0, 0, 0, 0.5)
			color: #FFF

			cursor: pointer


	.widget
		display: inline-block
		margin-right: 16px
</style>

<script language="text/javascript">
	export default {
		props: ["scope"],
		name: "customizable",
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
		}
	};
</script>