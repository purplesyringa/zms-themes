<template>
	<input type="submit" :value="value" @click="$emit('click')">
</template>

<style lang="sass" scoped>
	input
		display: inline-block
		float: right
		padding: 5px 10px
		margin-top: 16px
		margin-left: 10px

		background: none
		background-color: #DDE0E0
		border: none
		border-bottom: 2px solid #999998
		background-position: left center
		border-radius: 2px

		font-family: Verdana, Arial, sans-serif
		font-size: 16px
		font-weight: bold
		color: #333

		transition: all 0.5s ease-out

		&:hover
			background-color: #FFF400
			border-color: #FFF
			border-bottom: 2px solid #4D4D4C
			transition: none
			color: #000
			cursor: pointer
</style>

<script type="text/javascript">
	export default {
		name: "theme-button",
		props: ["value"],
		data() {
			return {
				value: ""
			};
		}
	};
</script>