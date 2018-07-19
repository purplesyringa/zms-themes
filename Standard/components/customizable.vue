<template>
	<div class="customizable">
		<div class="add" v-if="siteInfo.settings.own" @click.stop="showPopup" title="Add widget">
			<icon class="add-icon" name="plus" />

			<div class="popup" @click.stop v-show="popupShown">
				<icon name="times" class="popup-close" @click.native.stop="closePopup" />

				<b>Add a widget</b><br>
				You'll find more widgets when you <a @click="$router.navigate('admin/store/plugins')">install plugins</a>.<br>
				<br>
				The following widgets can be used here:<br>
				<select v-model="addWidgetName">
					<option>A</option>
					<option>B</option>
					<option>C</option>
				</select><br>
				<theme-button value="Add" :small="true" @click="addWidget" />
			</div>
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

		position: relative

		.add-icon
			width: 20px
			height: 20px


		&:hover
			border: 2px solid transparent
			background-color: rgba(0, 0, 0, 0.5)
			color: #FFF

			cursor: pointer



		.popup
			$arrow-size: 8px

			display: inline-block
			padding: 16px
			margin-top: $arrow-size
			width: 256px

			position: absolute
			left: 50%
			top: 100%
			transform: translateX(-50%)
			z-index: 1000

			background-color: #F8F8F8
			box-shadow: 0 0 16px rgba(0, 0, 0, 0.2)
			border-radius: 4px
			cursor: default

			font-family: Verdana, Arial, sans-serif
			font-size: 16px
			color: #000

			&::after
				content: ""

				position: absolute
				top: 0
				left: 50%

				width: 0
				height: 0
				margin-left: -$arrow-size
				margin-top: -$arrow-size
				border: $arrow-size solid transparent
				border-bottom-color: #FFF
				border-top: 0


			.popup-close
				position: absolute
				right: 16px
				top: 16px

				color: #888
				cursor: pointer


			select
				width: 100%


	.widget
		display: inline-block
		margin-right: 16px
</style>

<script language="text/javascript">
	let currentCustomizable = null;

	export default {
		props: ["scope"],
		name: "customizable",
		data() {
			return {
				siteInfo: {
					settings: {
						own: false
					}
				},

				popupShown: false,
				addWidgetName: ""
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

			showPopup() {
				if(currentCustomizable) {
					currentCustomizable.popupShown = false;
				}

				if(currentCustomizable === this) {
					currentCustomizable = null;
				} else {
					currentCustomizable = this;
					currentCustomizable.popupShown = true;
				}
			},
			closePopup() {
				currentCustomizable.popupShown = false;
				currentCustomizable = null;
			},

			addWidget() {
				if(!this.addWidgetName) {
					return;
				}

				
			}
		}
	};
</script>