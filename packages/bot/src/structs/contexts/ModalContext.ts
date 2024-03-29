import { APIModalSubmitInteraction } from "discord-api-types/v10";
import { Context } from "./Context";
import { Env } from "../../types";

export class ModalContext extends Context {
	public interaction: APIModalSubmitInteraction;

	constructor(interaction: APIModalSubmitInteraction, env: Env) {
		super(interaction, env);

		this.interaction = interaction;
	}
}
