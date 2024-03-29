import { MessageFlags } from "discord-api-types/v10";
import { registerComponent } from "../things";
import { ComponentContext } from "./contexts/ComponentContext";

interface ComponentOptions {
	id: string;
	acknowledge?: boolean;
	default?: boolean;
	flags?: MessageFlags;
	run: (interaction: ComponentContext) => void;
}

export class Component {
	public id: string;
	public acknowledge: boolean;
	public default: boolean;
	public flags: MessageFlags | undefined;
	public run: (interaction: ComponentContext) => void | Response;

	constructor(options: ComponentOptions) {
		this.id = options.id;
		this.acknowledge = options.acknowledge ?? true;
		this.default = options.default ?? false;
		this.flags = options.flags;
		this.run = options.run;

		registerComponent(this);
	}
}
