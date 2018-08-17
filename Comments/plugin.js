import * as PluginUtil from "plugin-util";

PluginUtil.definePost(async post => {
	const comments = await PluginUtil.DB.query(`
		SELECT
			${PluginUtil.DB.table("comments")}.*,
			json.cert_user_id

		FROM ${PluginUtil.DB.table("comments")}

		LEFT JOIN json ON (
			json.json_id = ${PluginUtil.DB.table("comments")}.json_id
		)

		WHERE
			post_id = :post_id AND
			post_json_id = :post_json_id

		ORDER BY date DESC
	`, {
		post_id: post.id,
		post_json_id: post.json_id
	});
	comments._hotreload = comment => {
		return `${comment.json_id}/${comment.id}`;
	};

	return {comments};
});