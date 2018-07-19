<template>
	<input type="submit" :value="value" @click="$emit('click')" :class="{small}">
</template>

<style lang="sass" scoped>
	input
		display: block
		width: 100px
		margin-top: 16px
		float: right

		font-family: Verdana, Arial, sans-serif
		font-size: 16px
		color: #FFF

		background-color: #803
		padding: 12px
		cursor: pointer

		border: none


	.small
		padding: 6px 8px
</style>

<script type="text/javascript">
	export default {
		name: "theme-button",
		props: ["value", "small"],
		data() {
			return {
				value: "",
				small: false
			};
		}
	};
</script>