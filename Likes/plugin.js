import * as PluginUtil from "plugin-util";

PluginUtil.definePost(async post => {
	const likes = await PluginUtil.DB.query(`
		SELECT COUNT(*) AS like_count
		FROM ${PluginUtil.DB.table("likes")}
		WHERE post_id_json_id = :post_id_json_id
	`, {
		post_id_json_id: `${post.id}/${post.json_id}`
	});
	likes._hotreload = () => "";

	const liked = await PluginUtil.DB.query(`
		SELECT COUNT(*) AS liked
		FROM ${PluginUtil.DB.table("likes")}
		WHERE
			post_id_json_id = :post_id_json_id AND
			json_id = :json_id
	`, {
		post_id_json_id: `${post.id}/${post.json_id}`,
		json_id: await PluginUtil.DB.getJsonId("user")
	});
	liked._hotreload = () => "";

	return {likes, liked};
});